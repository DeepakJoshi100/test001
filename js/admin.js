// js/admin.js (with loading UI integration)
// Replace your existing file with this. Includes global loading overlay and button-level loading helpers.

(function () {
  // Safe logger
  if (!window.__admin_log) {
    window.__admin_log = (...a) => console.log('%c[admin]', 'color:teal;font-weight:700', ...a);
    window.__admin_warn = (...a) => console.warn('%c[admin]', 'color:orange;font-weight:700', ...a);
    window.__admin_error = (...a) => console.error('%c[admin]', 'color:red;font-weight:700', ...a);
  }
  const log = window.__admin_log, warn = window.__admin_warn, error = window.__admin_error;
  const $ = id => document.getElementById(id) || null;

  /* ---------- Loading UI helpers ---------- */
  function showGlobalLoading(text) {
    try {
      const loader = $('globalLoader');
      if (!loader) return;
      if (text) {
        const t = loader.querySelector('.loaderText');
        if (t) t.textContent = text;
      } else {
        const t = loader.querySelector('.loaderText');
        if (t) t.textContent = 'Loading…';
      }
      loader.style.display = 'flex';
      loader.setAttribute('aria-hidden', 'false');
    } catch (e) { /* ignore */ }
  }
  function hideGlobalLoading() {
    try {
      const loader = $('globalLoader');
      if (!loader) return;
      loader.style.display = 'none';
      loader.setAttribute('aria-hidden', 'true');
      // restore default text
      const t = loader.querySelector('.loaderText');
      if (t) t.textContent = 'Loading…';
    } catch (e) { /* ignore */ }
  }

  // Button-level loading wrapper: replaces button text with spinner (or appends inline spinner)
  async function withButtonLoading(btn, fn, loadingText) {
    if (!btn) return await fn();
    try {
      btn.disabled = true;
      btn.classList.add('btn-loading');
      // store original content
      const origHTML = btn.innerHTML;
      // append inline spinner
      btn.innerHTML = (loadingText ? `${loadingText}` : origHTML) + ' <span class="inline-spinner"></span>';
      return await fn();
    } finally {
      try {
        btn.disabled = false;
        btn.classList.remove('btn-loading');
        // restore original innerHTML but remove spinner if loadingText used
        btn.innerHTML = btn.getAttribute('data-orig') || btn.innerHTML.replace(/<span class="inline-spinner"><\/span>/g, '').trim();
      } catch (e) {}
    }
  }

  // Preserve original innerHTML for known buttons (so restore is clean)
  function preserveButtonOriginal(btn) {
    if (!btn) return;
    if (!btn.getAttribute('data-orig')) btn.setAttribute('data-orig', btn.innerHTML);
  }

  /* ---------- Firebase availability helper ---------- */
  async function ensureFirebase() {
    if (window.firebaseInitialized || window.firebase) return true;
    if (typeof initFirebase === 'function') {
      try { const r = initFirebase(); if (r instanceof Promise) await r; } catch (e) { warn('initFirebase() failed', e); }
    }
    return !!(window.firebaseInitialized || window.firebase);
  }

  /* ---------- Fetch results from Firestore (with loader) ---------- */
  async function fetchResultsRaw(limit = 1000) {
    // show global loading for big fetches
    showGlobalLoading('Fetching results…');
    try {
      if (!await ensureFirebase()) {
        warn('Firebase not ready when fetching results');
        return [];
      }
      if (!window.firebase || !firebase.firestore) {
        warn('Firestore SDK missing');
        return [];
      }
      const db = firebase.firestore();
      try {
        const snap = await db.collection('test_results').orderBy('date', 'desc').limit(limit).get();
        const docs = [];
        snap.forEach(d => docs.push({ id: d.id, data: d.data(), meta: { createTime: d.createTime ? d.createTime.toDate().toISOString() : undefined } }));
        return docs;
      } catch (e) {
        warn('orderBy(date) failed -> fallback to unordered get', e);
        const snap = await db.collection('test_results').limit(limit).get();
        const docs = [];
        snap.forEach(d => docs.push({ id: d.id, data: d.data(), meta: { createTime: d.createTime ? d.createTime.toDate().toISOString() : undefined } }));
        return docs;
      }
    } finally {
      hideGlobalLoading();
    }
  }

  /* ---------- Normalize a Firestore wrapper to stable shape ---------- */
  function normalizeDoc(wrapper) {
    const raw = wrapper && wrapper.data ? wrapper.data : {};
    const studentName = raw.studentName || raw.student || raw.username || (raw.student && raw.student.name) || '';
    const testName = raw.testName || raw.test || raw.section || '';
    const wpm = (typeof raw.wpm !== 'undefined') ? Number(raw.wpm) : (typeof raw.rawWpm !== 'undefined' ? Number(raw.rawWpm) : undefined);
    const accuracy = (typeof raw.accuracy !== 'undefined') ? Number(raw.accuracy) : undefined;
    const duration = (typeof raw.duration !== 'undefined') ? Number(raw.duration) : undefined;
    const errorCharacters = (typeof raw.errorCharacters !== 'undefined') ? Number(raw.errorCharacters) : undefined;
    const testMode = raw.testMode || raw.testType || raw.type || null;
    let dateIso = null;
    if (raw.date) {
      if (raw.date && typeof raw.date.toDate === 'function') dateIso = raw.date.toDate().toISOString();
      else dateIso = (new Date(raw.date)).toISOString();
    } else if (raw.createdAt) {
      if (raw.createdAt && typeof raw.createdAt.toDate === 'function') dateIso = raw.createdAt.toDate().toISOString();
      else dateIso = (new Date(raw.createdAt)).toISOString();
    } else if (wrapper && wrapper.meta && wrapper.meta.createTime) {
      dateIso = wrapper.meta.createTime;
    } else {
      dateIso = null;
    }
    const score = (typeof raw.score !== 'undefined') ? Number(raw.score) : (typeof raw.marks !== 'undefined' ? Number(raw.marks) : undefined);
    return {
      id: wrapper.id,
      raw,
      studentName,
      testName,
      wpm: isNaN(wpm) ? undefined : wpm,
      accuracy: isNaN(accuracy) ? undefined : accuracy,
      duration: isNaN(duration) ? undefined : duration,
      errorCharacters: isNaN(errorCharacters) ? undefined : errorCharacters,
      testMode,
      score: isNaN(score) ? undefined : score,
      dateIso
    };
  }

  function formatDateShort(iso) { if (!iso) return '-'; try { return new Date(iso).toLocaleString(); } catch (e) { return iso; } }
  function escapeHtml(s) { if (s === null || s === undefined) return ''; return String(s).replace(/[&<>"']/g, function (m) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]; }); }

  /* ---------- Render helpers ---------- */
  function renderOverview(rowsNormalized) {
    const container = $('adminContent') || $('adminInner') || $('adminMain') || $('adminOverviewTab') || document.body;
    if (!container) { warn('No container found for admin overview'); return; }
    if (!rowsNormalized || rowsNormalized.length === 0) {
      container.innerHTML = `<div class="glass"><p class="small muted">No test results found. If you expect data, run diagnostics from console.</p></div>`;
      window.__admin_last_results = [];
      return;
    }
    const totalStudents = new Set(rowsNormalized.map(r => (r.studentName || (r.raw && (r.raw.student || r.raw.username)) || '').trim() || 'Unknown')).size;
    const totalTests = rowsNormalized.length;
    const numericScores = rowsNormalized.map(r => typeof r.score === 'number' ? r.score : undefined).filter(v => typeof v === 'number');
    const avgScore = numericScores.length ? (numericScores.reduce((a, b) => a + b, 0) / numericScores.length) : null;
    const numericWpm = rowsNormalized.map(r => typeof r.wpm === 'number' ? r.wpm : undefined).filter(v => typeof v === 'number');
    const avgWpm = numericWpm.length ? (numericWpm.reduce((a, b) => a + b, 0) / numericWpm.length) : null;

    container.innerHTML = `
      <div class="grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px">
        <div class="glass"><div class="kicker">Total Students</div><div class="h1-future">${totalStudents}</div></div>
        <div class="glass"><div class="kicker">Total Tests</div><div class="h1-future">${totalTests}</div></div>
        <div class="glass"><div class="kicker">Average Score</div><div class="h1-future">${avgScore !== null ? Math.round(avgScore * 100) / 100 + '%' : '—'}</div></div>
        <div class="glass"><div class="kicker">Average WPM</div><div class="h1-future">${avgWpm !== null ? Math.round(avgWpm * 100) / 100 : '—'}</div></div>
      </div>

      <div style="margin-top:12px">
        <h4 class="kicker">Recent activity</h4>
        <div style="overflow:auto;max-height:320px">
          <table class="table">
            <thead><tr><th>Student</th><th>Test</th><th>Type</th><th>Score/WPM</th><th>Date</th></tr></thead>
            <tbody>
              ${rowsNormalized.slice(0, 80).map(r => {
      const student = r.studentName || (r.raw && (r.raw.student || r.raw.username)) || '—';
      const test = r.testName || (r.raw && (r.raw.testName || r.raw.test)) || '—';
      const type = r.testMode || (typeof r.wpm !== 'undefined' ? 'Typing' : 'MCQ');
      const scoreDisp = (typeof r.score !== 'undefined') ? r.score : (typeof r.wpm !== 'undefined' ? r.wpm + ' wpm' : '—');
      return `<tr><td>${escapeHtml(student)}</td><td>${escapeHtml(test)}</td><td>${escapeHtml(type)}</td><td>${escapeHtml(scoreDisp)}</td><td>${escapeHtml(formatDateShort(r.dateIso))}</td></tr>`;
    }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
    window.__admin_last_results = rowsNormalized;
  }

  function renderSections(rowsNormalized) {
    const container = $('adminInner') || $('adminContent') || $('adminMain') || $('adminOverviewTab') || document.body;
    if (!container) { warn('No container for sections'); return; }
    if (!rowsNormalized || rowsNormalized.length === 0) { container.innerHTML = `<div class="glass"><p class="small muted">No results</p></div>`; return; }

    const map = new Map();
    rowsNormalized.forEach(r => {
      const key = (r.testName || (r.raw && (r.raw.section || r.raw.testName || r.raw.test)) || 'Unknown').toString();
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(r);
    });

    const html = Array.from(map.entries()).map(([sec, arr]) => {
      const avgWpm = arr.filter(x => typeof x.wpm === 'number').length ? Math.round((arr.filter(x => typeof x.wpm === 'number').reduce((s, x) => s + x.wpm, 0) / arr.filter(x => typeof x.wpm === 'number').length) * 100) / 100 : null;
      const avgScore = arr.filter(x => typeof x.score === 'number').length ? Math.round((arr.filter(x => typeof x.score === 'number').reduce((s, x) => s + x.score, 0) / arr.filter(x => typeof x.score === 'number').length) * 100) / 100 : null;
      return `<div class="glass" style="margin-bottom:8px"><div style="display:flex;justify-content:space-between"><div><strong>${escapeHtml(sec)}</strong><div class="small muted">${arr.length} attempts</div></div><div class="kicker">Avg WPM: ${avgWpm !== null ? avgWpm : '—'} / Avg Score: ${avgScore !== null ? avgScore + '%' : '—'}</div></div></div>`;
    }).join('');

    container.innerHTML = html;
  }

  function renderDatewise(rowsNormalized) {
    const container = $('adminInner') || $('adminContent') || $('adminMain') || $('adminOverviewTab') || document.body;
    if (!container) { warn('No container for datewise'); return; }
    if (!rowsNormalized || rowsNormalized.length === 0) { container.innerHTML = `<div class="glass"><p class="small muted">No results</p></div>`; return; }

    const byDate = {};
    rowsNormalized.forEach(r => {
      const k = r.dateIso ? r.dateIso.slice(0, 10) : 'Unknown';
      (byDate[k] = byDate[k] || []).push(r);
    });

    const keys = Object.keys(byDate).sort((a, b) => b.localeCompare(a));
    const html = keys.map(k => {
      const arr = byDate[k];
      const best = arr.slice().sort((a, b) => (Number(b.score || 0) - Number(a.score || 0)))[0];
      return `<div class="glass" style="margin-bottom:8px"><div style="display:flex;justify-content:space-between"><div><strong>${escapeHtml(k)}</strong><div class="small muted">${arr.length} attempts</div></div><div class="small muted">Best: ${best ? (escapeHtml(best.studentName || (best.raw && (best.raw.studentName || best.raw.username)) || '—')) + ' — ' + (best.score || best.wpm || '—') : '—'}</div></div></div>`;
    }).join('');

    container.innerHTML = html;
  }

  /* ---------- Public API: fetch + render (with global loader) ---------- */
  async function doFetchAndRender(view = 'overview') {
    showGlobalLoading('Loading overview…');
    try {
      const rawDocs = await fetchResultsRaw(1000);
      if (!rawDocs || rawDocs.length === 0) {
        const container = $('adminContent') || $('adminInner') || $('adminMain') || $('adminOverviewTab') || document.body;
        if (container) container.innerHTML = `<div class="glass"><p class="small muted">No test_results documents found (0). If you expect data, run diagnostics from console.</p></div>`;
        window.__admin_last_results = [];
        return [];
      }
      const normalized = rawDocs.map(normalizeDoc);
      normalized.sort((a, b) => {
        if (a.dateIso && b.dateIso) return b.dateIso.localeCompare(a.dateIso);
        if (a.dateIso) return -1;
        if (b.dateIso) return 1;
        return 0;
      });

      if (view === 'overview') renderOverview(normalized);
      else if (view === 'section') renderSections(normalized);
      else if (view === 'datewise') renderDatewise(normalized);
      else renderOverview(normalized);

      return normalized;
    } catch (err) {
      error('doFetchAndRender error:', err);
      const container = $('adminContent') || $('adminInner') || $('adminMain') || $('adminOverviewTab') || document.body;
      if (container) container.innerHTML = `<div class="glass"><p class="small muted">Error rendering admin UI. See console for details.</p></div>`;
      throw err;
    } finally {
      hideGlobalLoading();
    }
  }

  /* ---------- Expose helpers/globals ---------- */
  window.doFetchAndRender = doFetchAndRender;
  window.fetchResultsRaw = fetchResultsRaw;
  window.normalizeAdminDoc = normalizeDoc;

  window.__admin_debug = window.__admin_debug || {
    fetchResultsRaw: fetchResultsRaw,
    loadResults: async function (view = 'overview') {
      try {
        await doFetchAndRender(view);
        log('admin_debug: loadResults done for view=', view);
      } catch (e) { error('admin_debug loadResults error', e); }
    }
  };

  /* ---------- Student management (uses loader and button-level loading) ---------- */
  async function addOrUpdateStudent({ username, name = '', dob = '' }) {
    showGlobalLoading(username ? 'Saving student…' : 'Creating student…');
    try {
      if (!username) throw new Error('username required');
      await ensureFirebase();
      const db = firebase.firestore();
      const ref = db.collection('students').doc(username);
      const payload = {
        id: username,
        username,
        name: name || username,
        dob: dob || '',
        updatedAt: firebase.firestore.FieldValue ? firebase.firestore.FieldValue.serverTimestamp() : new Date().toISOString()
      };
      await ref.set(payload, { merge: true });
      return true;
    } finally {
      hideGlobalLoading();
    }
  }

  async function fetchAndRenderStudents(filter = '') {
    // small local button-level spinner handled by caller; show global loader as well
    showGlobalLoading('Loading students…');
    const studentsCount = $('studentsCount');
    const studentsTableBody = $('studentsTableBody');
    try {
      if (studentsCount) studentsCount.textContent = 'Loading students…';
      if (studentsTableBody) studentsTableBody.innerHTML = '';
      await ensureFirebase();
      if (!window.firebase || !firebase.firestore) throw new Error('Firestore missing');
      const db = firebase.firestore();
      const snap = await db.collection('students').orderBy('username').limit(2000).get();
      const rows = [];
      snap.forEach(d => rows.push({ id: d.id, data: d.data() }));
      const q = (filter || '').toLowerCase();
      const filtered = rows.filter(r => {
        if (!q) return true;
        const u = (r.data.username || '').toLowerCase();
        const n = (r.data.name || '').toLowerCase();
        return u.includes(q) || n.includes(q);
      });
      if (studentsCount) studentsCount.textContent = `${filtered.length} students`;
      if (!studentsTableBody) return;
      if (filtered.length === 0) { studentsTableBody.innerHTML = '<tr><td colspan="5" class="small muted">No students</td></tr>'; return; }
      const html = filtered.map(r => {
        const d = r.data || {};
        const uname = escapeHtml(r.id || d.username || '');
        const name = escapeHtml(d.name || '');
        const dob = escapeHtml(d.dob || '');
        const tests = (d.testsTaken || d.mcqTestsTaken || d.typingTestsTaken) ? (d.testsTaken || ((d.mcqTestsTaken || 0) + (d.typingTestsTaken || 0))) : '';
        return `<tr><td>${uname}</td><td>${name}</td><td>${dob}</td><td>${tests}</td><td>
          <button class="btn btn-sm" data-action="view" data-id="${uname}">View</button>
          <button class="btn btn-sm btn-danger" data-action="delete" data-id="${uname}">Delete</button>
        </td></tr>`;
      }).join('');
      studentsTableBody.innerHTML = html;
      studentsTableBody.querySelectorAll('button[data-action]').forEach(btn => {
        btn.addEventListener('click', (ev) => {
          const action = btn.getAttribute('data-action');
          const id = btn.getAttribute('data-id');
          if (action === 'delete') deleteStudentById(id, btn);
          else if (action === 'view') viewStudent(id);
        });
      });
    } catch (err) {
      console.error('fetchAndRenderStudents error', err);
      if (studentsCount) studentsCount.textContent = 'Error loading students';
      if (studentsTableBody) studentsTableBody.innerHTML = `<tr><td colspan="5" class="small muted">Error loading students (see console)</td></tr>`;
    } finally {
      hideGlobalLoading();
    }
  }

  async function deleteStudentById(id, btn = null) {
    if (!id) return;
    if (!confirm('Delete student ' + id + ' ? This cannot be undone.')) return;
    // use button-level spinner if available
    if (btn) {
      await withButtonLoading(btn, async () => {
        try {
          await ensureFirebase();
          const db = firebase.firestore();
          await db.collection('students').doc(id).delete();
          alert('Deleted: ' + id);
          fetchAndRenderStudents();
        } catch (err) {
          console.error('Delete student failed', err);
          alert('Delete failed. See console.');
        }
      }, 'Deleting');
      return;
    }

    showGlobalLoading('Deleting student…');
    try {
      await ensureFirebase();
      const db = firebase.firestore();
      await db.collection('students').doc(id).delete();
      alert('Deleted: ' + id);
      fetchAndRenderStudents();
    } catch (err) {
      console.error('Delete student failed', err);
      alert('Delete failed. See console.');
    } finally {
      hideGlobalLoading();
    }
  }

  async function viewStudent(id) {
    if (!id) return;
    showGlobalLoading('Loading student…');
    try {
      await ensureFirebase();
      const db = firebase.firestore();
      const snap = await db.collection('students').doc(id).get();
      if (!snap.exists) { alert('Student not found: ' + id); return; }
      const data = snap.data() || {};
      const modal = $('addStudentModal'), inpUsername = $('addStudentUsername'), inpName = $('addStudentName'), inpDob = $('addStudentDOB');
      if (!modal || !inpUsername) { console.log('Student data', id, data); alert('Student data opened in console (UI modal missing)'); return; }
      modal.classList.remove('hidden');
      inpUsername.value = id; inpUsername.readOnly = true;
      inpName.value = data.name || ''; inpDob.value = data.dob || (data.dateOfBirth ? data.dateOfBirth : '') || '';
      const form = $('addStudentForm'); if (form) { form.dataset.editing = 'true'; form.dataset.editId = id; }
      const submitBtn = modal.querySelector('button[type="submit"]'); if (submitBtn) submitBtn.textContent = 'Save Changes';
    } catch (err) {
      console.error('viewStudent error', err);
      alert('Failed to open student for edit. See console.');
    } finally {
      hideGlobalLoading();
    }
  }

  // expose
  window.adminFetchStudents = fetchAndRenderStudents;
  window.adminAddStudent = addOrUpdateStudent;
  window.adminDeleteStudent = deleteStudentById;

  /* ---------- UI wiring (integrates loading helpers) ---------- */
  (function wireUi() {
    try {
      // preserve original innerHTML for some buttons
      preserveButtonOriginal($('refreshBtn'));
      preserveButtonOriginal($('runRender'));
      preserveButtonOriginal($('openConsole'));
      preserveButtonOriginal($('openAddStudentBtn'));
      preserveButtonOriginal($('btnExport'));

      const studentSearch = $('studentSearch');
      if (studentSearch) {
        studentSearch.addEventListener('input', () => {
          // small debounce to avoid too many fetches
          if (studentSearch._deb) clearTimeout(studentSearch._deb);
          studentSearch._deb = setTimeout(() => fetchAndRenderStudents(studentSearch.value.trim()), 300);
        });
      }

      const openAddStudentBtn = $('openAddStudentBtn');
      const addStudentModal = $('addStudentModal');
      const closeAddStudentModal = $('closeAddStudentModal');

      if (openAddStudentBtn && addStudentModal) {
        openAddStudentBtn.addEventListener('click', () => {
          addStudentModal.classList.remove('hidden');
          const u = $('addStudentUsername'); if (u) { u.value = ''; u.readOnly = false; }
          const n = $('addStudentName'); if (n) n.value = '';
          const d = $('addStudentDOB'); if (d) d.value = '';
          const form = $('addStudentForm'); if (form) { delete form.dataset.editing; delete form.dataset.editId; }
          setTimeout(() => { const u2 = $('addStudentUsername'); if (u2) u2.focus(); }, 60);
          const submitBtn = addStudentModal.querySelector('button[type="submit"]'); if (submitBtn) submitBtn.textContent = 'Create';
        });
      }

      if (closeAddStudentModal) {
        closeAddStudentModal.addEventListener('click', () => {
          const modal = $('addStudentModal');
          if (modal) modal.classList.add('hidden');
          const form = $('addStudentForm');
          if (form) { delete form.dataset.editing; delete form.dataset.editId; }
          const u = $('addStudentUsername'); if (u) u.readOnly = false;
          const submitBtn = modal && modal.querySelector('button[type="submit"]'); if (submitBtn) submitBtn.textContent = 'Create';
        });
      }

      const addStudentForm = $('addStudentForm');
      if (addStudentForm) {
        addStudentForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          const form = addStudentForm;
          const isEditing = !!(form && form.dataset && form.dataset.editing === 'true');
          const originalId = form && form.dataset.editId ? form.dataset.editId : null;
          let username = ($('addStudentUsername') && $('addStudentUsername').value || '').trim();
          const name = ($('addStudentName') && $('addStudentName').value || '').trim();
          const dob = ($('addStudentDOB') && $('addStudentDOB').value) || '';
          if (!username) { alert('Enter username'); $('addStudentUsername') && $('addStudentUsername').focus(); return; }

          const submitBtn = addStudentForm.querySelector('button[type="submit"]');
          // Use button-level loading
          await withButtonLoading(submitBtn, async () => {
            try {
              if (isEditing && originalId && originalId !== username) {
                const ok = confirm('Username changed during edit. Create new student with new username instead? (OK = create new, Cancel = abort)');
                if (!ok) return;
              }
              await addOrUpdateStudent({ username, name, dob });
              if ($('addStudentModal')) $('addStudentModal').classList.add('hidden');
              alert(isEditing ? 'Student updated' : 'Student created');
              if (form) { delete form.dataset.editing; delete form.dataset.editId; }
              const u = $('addStudentUsername'); if (u) u.readOnly = false;
              if (typeof fetchAndRenderStudents === 'function') fetchAndRenderStudents();
            } catch (err) {
              console.error('Add / Update student failed', err);
              alert('Failed to save student. See console.');
            }
          }, isEditing ? 'Saving' : 'Creating');
        });
      }

      const refreshStudentsBtn = $('refreshStudentsBtn');
      if (refreshStudentsBtn) refreshStudentsBtn.addEventListener('click', () => withButtonLoading(refreshStudentsBtn, () => fetchAndRenderStudents(), 'Refreshing'));

      const adminLogoutBtn = $('adminLogoutBtn');
      if (adminLogoutBtn) {
        adminLogoutBtn.addEventListener('click', async () => {
          // call same logout logic as before, show loader while signing out
          showGlobalLoading('Signing out…');
          try {
            try { localStorage.removeItem('isLoggedIn'); localStorage.removeItem('isAdmin'); localStorage.removeItem('isAdminLoggedIn'); localStorage.removeItem('adminId'); localStorage.removeItem('adminUsername'); localStorage.removeItem('adminLoginAt'); } catch(e){}
            try { sessionStorage.setItem('justLoggedOut', '1'); setTimeout(()=>{ try{ sessionStorage.removeItem('justLoggedOut'); }catch(e){} }, 3000); } catch(e){}
            if (window.firebase && firebase.auth && typeof firebase.auth === 'function') {
              await firebase.auth().signOut();
            }
            try { history.replaceState(null, '', 'index.html'); } catch(e) {}
            window.location.replace('index.html');
          } catch (e) {
            console.error('logout failed', e);
            hideGlobalLoading();
            alert('Logout failed (see console)');
          }
        });
      }

      const runRender = $('runRender');
      if (runRender) runRender.addEventListener('click', () => withButtonLoading(runRender, () => doFetchAndRender('overview'), 'Rendering'));
      const openConsole = $('openConsole');
      if (openConsole) openConsole.addEventListener('click', () => { console.log('Open console to inspect variables (window.doFetchAndRender, window.__admin_debug)'); });

      // CSV Export button wiring: use button loading & global loading during CSV preparation
      const btnExport = $('btnExport');
      if (btnExport) {
        btnExport.addEventListener('click', async () => {
          await withButtonLoading(btnExport, async () => {
            showGlobalLoading('Preparing CSV…');
            try {
              if (typeof window.fetchResultsRaw !== 'function') { alert('Export unavailable: fetchResultsRaw not present.'); return; }
              const docs = await window.fetchResultsRaw(5000);
              if (!docs || !docs.length) { alert('No documents to export'); return; }
              const rows = docs.map(d => {
                const raw = d.data || {};
                const date = (raw.date && raw.date.toDate) ? raw.date.toDate().toISOString() : (raw.date || raw.createdAt || d.meta && d.meta.createTime || '');
                return {
                  id: d.id,
                  student: raw.studentName || raw.student || raw.username || '',
                  testName: raw.testName || raw.test || raw.section || '',
                  score: typeof raw.score !== 'undefined' ? raw.score : (raw.marks || ''),
                  wpm: typeof raw.wpm !== 'undefined' ? raw.wpm : (raw.rawWpm || ''),
                  accuracy: raw.accuracy || '',
                  date
                };
              });
              const header = ['id','student','testName','score','wpm','accuracy','date'];
              const csv = [header.join(',')].concat(rows.map(r => header.map(h => `"${String(r[h]||'').replace(/"/g,'""')}"`).join(','))).join('\n');
              const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
              const link = document.createElement('a');
              link.href = URL.createObjectURL(blob);
              link.download = `test_results_export_${new Date().toISOString().slice(0,10)}.csv`;
              document.body.appendChild(link);
              link.click();
              link.remove();
            } catch (e) {
              console.error('Export failed', e);
              alert('Export failed: see console');
            } finally {
              hideGlobalLoading();
            }
          }, 'Exporting');
        });
      }

      const refreshBtn = $('refreshBtn');
      if (refreshBtn) refreshBtn.addEventListener('click', () => withButtonLoading(refreshBtn, () => doFetchAndRender('overview'), 'Refreshing'));

      // If students tab visible on load, fetch
      const adminStudentsTab = $('adminStudentsTab');
      if (adminStudentsTab && !adminStudentsTab.classList.contains('hidden')) fetchAndRenderStudents();
    } catch (e) {
      console.warn('UI wiring failed', e);
    }
  })();

  /* ---------- Auto-run: attempt to render overview on load ---------- */
  (async function autoRun() {
    try {
      await new Promise(r => setTimeout(r, 600));
      await ensureFirebase().catch(() => { /* ignore */ });
      if (document.getElementById('adminMain') || document.getElementById('adminOverviewTab')) {
        try { await doFetchAndRender('overview'); log('admin: auto-render complete'); }
        catch (e) { warn('admin: auto-render failed', e); }
      } else {
        warn('admin: no adminMain/adminOverviewTab found for auto-render');
      }
    } catch (e) {
      warn('admin: autorun error', e);
    }
  })();

})();
