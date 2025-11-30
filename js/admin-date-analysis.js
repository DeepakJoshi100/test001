// js/admin-date-analysis.js
// Small non-destructive add-on that injects a "Date Analysis (Highest / Lowest)" panel
// into #adminMain. It reads test_results either from window.resultsCache (if admin.js keeps it)
// or directly from Firestore if available.
//
// Usage: include this file in admin.html after admin.js:
// <script defer src="js/admin-date-analysis.js"></script>

(function () {
  // Helpers
  const $ = sel => document.querySelector(sel);
  const escapeHtml = s => (s===null||s===undefined)?'':String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]);

  function toShortDateKeyIso(dt) {
    // dt: Date object -> YYYY-MM-DD
    if (!dt) return null;
    return `${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,'0')}-${String(dt.getDate()).padStart(2,'0')}`;
  }

  function parseIsoDateKey(iso) {
    if (!iso) return null;
    // Accept "YYYY-MM-DD" or full ISO
    const d = new Date(iso);
    if (isNaN(d)) return null;
    return toShortDateKeyIso(d);
  }

  function formatDateTime(iso) {
    if (!iso) return '-';
    try { return new Date(iso).toLocaleString(); } catch(e) { return iso; }
  }

  function downloadCsv(filename, csv) {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
  }

  // compute highest/lowest for MCQ and Typing for a given dateKey (YYYY-MM-DD)
  function analyzeForDate(rows, dateKey) {
    // filter rows by dateKey
    const filtered = (rows||[]).filter(r => {
      const key = r.date ? toShortDateKeyIso(new Date(r.date)) : null;
      return key === dateKey;
    });

    // Partition MCQ and Typing
    const mcq = filtered.filter(r => (r.testType && String(r.testType).toLowerCase()==='mcq') || (typeof r.score !== 'undefined'));
    const typing = filtered.filter(r => (r.testType && String(r.testType).toLowerCase()==='typing') || (typeof r.wpm !== 'undefined'));

    // sort MCQ by score desc for highest, asc for lowest
    const mcqSortedDesc = mcq.slice().sort((a,b) => (Number(b.score)||0) - (Number(a.score)||0));
    const mcqSortedAsc = mcq.slice().sort((a,b) => (Number(a.score)||0) - (Number(b.score)||0));

    // sort Typing by wpm desc/asc (use net wpm if present)
    const typingSortedDesc = typing.slice().sort((a,b) => (Number(b.wpm)||0) - (Number(a.wpm)||0));
    const typingSortedAsc = typing.slice().sort((a,b) => (Number(a.wpm)||0) - (Number(b.wpm)||0));

    return {
      mcq: { all: mcq, highest: mcqSortedDesc, lowest: mcqSortedAsc },
      typing: { all: typing, highest: typingSortedDesc, lowest: typingSortedAsc },
      totalCount: filtered.length
    };
  }

  // render small table
  function renderTable(rows, columns) {
    if (!rows || rows.length === 0) return '<div class="small muted">No results</div>';
    let html = '<div style="overflow:auto"><table class="table"><thead><tr>';
    columns.forEach(c => { html += `<th>${escapeHtml(c.heading)}</th>`; });
    html += '</tr></thead><tbody>';
    rows.forEach(r => {
      html += '<tr>';
      columns.forEach(c => {
        let v;
        try { v = typeof c.value === 'function' ? c.value(r) : r[c.value] ; } catch(e) { v = ''; }
        html += `<td>${escapeHtml(String(v===undefined||v===null? '': v))}</td>`;
      });
      html += '</tr>';
    });
    html += '</tbody></table></div>';
    return html;
  }

  // Build UI and insert into adminMain (without removing existing content)
  function injectPanel() {
    const adminMain = document.getElementById('adminMain');
    if (!adminMain) {
      // nothing to do if adminMain missing
      return;
    }

    // Avoid injecting twice
    if (document.getElementById('dateAnalysisPanel')) return;

    const panel = document.createElement('div');
    panel.id = 'dateAnalysisPanel';
    panel.className = 'glass';
    panel.style.marginTop = '1rem';
    panel.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap;">
        <div>
          <h3 class="kicker">Date Analysis — Highest / Lowest</h3>
          <div class="small muted">Choose a date to view top and bottom results (MCQ by % score; Typing by WPM)</div>
        </div>

        <div style="display:flex;gap:.6rem;align-items:center;">
          <label class="small muted">Date:</label>
          <input id="daaDateInput" type="date" class="input" />
          <button id="daaLoadBtn" class="btn btn-primary btn-sm">Load</button>
          <button id="daaExportBtn" class="btn btn-ghost btn-sm">Export CSV</button>
        </div>
      </div>

      <div id="daaSummary" style="margin-top:1rem;"></div>
      <div id="daaResults" style="margin-top:1rem;display:grid;grid-template-columns:1fr 1fr;gap:1rem;"></div>
    `;

    // Insert panel at top of adminMain (after existing header if present)
    adminMain.insertBefore(panel, adminMain.firstChild);

    // wire events
    panel.querySelector('#daaLoadBtn').addEventListener('click', onLoadDate);
    panel.querySelector('#daaExportBtn').addEventListener('click', onExportDate);

    // prefill today
    const todayInput = panel.querySelector('#daaDateInput');
    if (todayInput) {
      const t = new Date();
      todayInput.value = `${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,'0')}-${String(t.getDate()).padStart(2,'0')}`;
    }
  }

  async function fetchAllResultsForAnalysis() {
    // Prefer resultsCache if available (admin.js often keeps it)
    if (window.resultsCache && Array.isArray(window.resultsCache) && window.resultsCache.length > 0) {
      return window.resultsCache;
    }

    // If admin.js used different var name (resultsCache inside closure), try to call fetchAllResultsOnce() if it exists
    if (typeof window.fetchAllResultsOnce === 'function') {
      try {
        const docs = await window.fetchAllResultsOnce(2000);
        return docs;
      } catch (e) {
        console.warn('fetchAllResultsOnce failed:', e);
      }
    }

    // Fallback: query Firestore directly (requires firebase to be initialized)
    if (window.firebase && window.firebase.firestore && window.firebaseInitialized) {
      try {
        const db = firebase.firestore();
        const snapshot = await db.collection('test_results').orderBy('date','desc').get();
        const docs = [];
        snapshot.forEach(d => docs.push({ id: d.id, ...d.data() }));
        return docs;
      } catch (err) {
        console.error('Firestore fallback fetch failed:', err);
      }
    }

    // Nothing available
    return [];
  }

  // Called when user clicks Load
  async function onLoadDate(e) {
    const dateInput = document.getElementById('daaDateInput');
    if (!dateInput || !dateInput.value) {
      alert('Choose a date first');
      return;
    }
    const selectedKey = parseIsoDateKey(dateInput.value);
    if (!selectedKey) { alert('Invalid date'); return; }

    const results = await fetchAllResultsForAnalysis();
    const analysis = analyzeForDate(results, selectedKey);

    const summaryEl = document.getElementById('daaSummary');
    const resultsEl = document.getElementById('daaResults');
    summaryEl.innerHTML = `<div class="small muted">Total results on <strong>${selectedKey}</strong>: <strong>${analysis.totalCount}</strong></div>`;

    // Left column: MCQ highest / lowest
    const mcqHighest = analysis.mcq.highest.slice(0,10);
    const mcqLowest = analysis.mcq.lowest.slice(0,10);

    const mcqHtml = `
      <div class="glass">
        <h4 class="kicker">MCQ — Highest (Top ${mcqHighest.length})</h4>
        ${renderTable(mcqHighest, [
          { heading:'Rank', value:(r,i)=> i+1 },
          { heading:'Test', value:'testName' },
          { heading:'Student', value:'studentName' },
          { heading:'Score (%)', value: r => (typeof r.score!=='undefined'? r.score : '') },
          { heading:'Mode', value:'testMode' },
          { heading:'Time', value: r => formatDateTime(r.date) }
        ])}
      </div>

      <div style="height:12px"></div>

      <div class="glass">
        <h4 class="kicker">MCQ — Lowest (Bottom ${mcqLowest.length})</h4>
        ${renderTable(mcqLowest, [
          { heading:'Rank', value:(r,i)=> i+1 },
          { heading:'Test', value:'testName' },
          { heading:'Student', value:'studentName' },
          { heading:'Score (%)', value: r => (typeof r.score!=='undefined'? r.score : '') },
          { heading:'Mode', value:'testMode' },
          { heading:'Time', value: r => formatDateTime(r.date) }
        ])}
      </div>
    `;

    // Right column: Typing highest / lowest
    const typingHighest = analysis.typing.highest.slice(0,10);
    const typingLowest = analysis.typing.lowest.slice(0,10);

    const typingHtml = `
      <div class="glass">
        <h4 class="kicker">Typing — Highest (Top ${typingHighest.length})</h4>
        ${renderTable(typingHighest, [
          { heading:'Rank', value:(r,i)=> i+1 },
          { heading:'Test', value:'testName' },
          { heading:'Student', value:'studentName' },
          { heading:'WPM', value: r => (typeof r.wpm!=='undefined'? r.wpm : '') },
          { heading:'Accuracy', value: r => (typeof r.accuracy!=='undefined'? r.accuracy + '%' : '') },
          { heading:'Time', value: r => formatDateTime(r.date) }
        ])}
      </div>

      <div style="height:12px"></div>

      <div class="glass">
        <h4 class="kicker">Typing — Lowest (Bottom ${typingLowest.length})</h4>
        ${renderTable(typingLowest, [
          { heading:'Rank', value:(r,i)=> i+1 },
          { heading:'Test', value:'testName' },
          { heading:'Student', value:'studentName' },
          { heading:'WPM', value: r => (typeof r.wpm!=='undefined'? r.wpm : '') },
          { heading:'Accuracy', value: r => (typeof r.accuracy!=='undefined'? r.accuracy + '%' : '') },
          { heading:'Time', value: r => formatDateTime(r.date) }
        ])}
      </div>
    `;

    // inject into two columns
    if (resultsEl) {
      resultsEl.innerHTML = `<div>${mcqHtml}</div><div>${typingHtml}</div>`;
    }

    // remember last analysis for export
    panelState.lastAnalysis = { dateKey: selectedKey, rowsForExport: analysis };
  }

  // Export CSV for the currently loaded analysis (if any)
  function onExportDate(e) {
    const st = panelState.lastAnalysis;
    if (!st || !st.rowsForExport) { alert('No analysis loaded to export'); return; }
    const dateKey = st.dateKey;
    // create CSV: list all rows in combined (MCQ + Typing) with a 'type' column
    const combine = (st.rowsForExport.mcq.all || []).concat(st.rowsForExport.typing.all || []);
    if (!combine || combine.length === 0) { alert('No rows on selected date to export'); return; }

    const cols = ['testId','testName','testCategory','testType','testMode','studentId','studentName','score','wpm','accuracy','duration','date'];
    const header = ['Date','TestId','TestName','TestCategory','TestType','TestMode','StudentId','StudentName','Score','WPM','Accuracy','Duration','DateTime'].join(',') + '\n';
    const lines = combine.map(r => {
      const row = [
        dateKey,
        r.testId || '',
        (r.testName || '').replace(/"/g,'""'),
        (r.testCategory || '').replace(/"/g,'""'),
        r.testType || '',
        r.testMode || '',
        r.studentId || '',
        (r.studentName || '').replace(/"/g,'""'),
        (typeof r.score!=='undefined'? (r.score) : ''),
        (typeof r.wpm!=='undefined'? (r.wpm) : ''),
        (typeof r.accuracy!=='undefined'? (r.accuracy) : ''),
        (r.duration || ''),
        (r.date || '')
      ];
      return row.map(v => `"${String(v).replace(/"/g,'""')}"`).join(',');
    });

    const csv = header + lines.join('\n');
    downloadCsv(`analysis_${dateKey}.csv`, csv);
  }

  const panelState = { lastAnalysis: null };

  // small util wrapper to parse date input nicely
  function parseIsoDateKey(val) {
    if (!val) return null;
    try { return toShortDateKeyIso(new Date(val)); } catch(e) { return null; }
  }

  // wire on DOMContentLoaded (but do nothing destructive)
  document.addEventListener('DOMContentLoaded', () => {
    injectPanel();
  });

})();
