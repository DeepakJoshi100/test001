// js/app.js
// Robust application bootstrap:
// - Only requires Firebase core (initFirebase or firebase global)
// - Does NOT block on optional UI modules (mcqTest, typingTest, studentDashboard)
// - Tries to detect optional modules in background and logs when they arrive
// - Binds login UI and theme toggle safely
(function(){
  const REQUIRED_CORE = ['firebaseInitialized'];
  const OPTIONAL = ['mcqTest','typingTest','studentDashboard'];
  const CORE_WAIT_MS = 8000;
  const OPTIONAL_WAIT_MS = 10000;

  function lg(...a){ console.log('%c[app]','color:navy;font-weight:700',...a); }
  function wrn(...a){ console.warn('%c[app]','color:orange;font-weight:700',...a); }
  function err(...a){ console.error('%c[app]','color:red;font-weight:700',...a); }

  function $(id){ return document.getElementById(id) || null; }
  function sleep(ms){ return new Promise(r=>setTimeout(r,ms)); }

  async function ensureFirebaseOnce(timeout=CORE_WAIT_MS){
    // Try to call initFirebase if present; otherwise rely on window.firebase
    const start = Date.now();
    if (typeof initFirebase === 'function' && !window.firebaseInitialized){
      try{ const ret = initFirebase(); if (ret instanceof Promise) await ret; } catch(e){ wrn('initFirebase() threw', e); }
    }
    while (Date.now() - start < timeout){
      if (window.firebaseInitialized || window.firebase) { lg('Firebase ready'); return true; }
      await sleep(200);
    }
    wrn('Firebase not ready after wait; continuing but operations may fail until ready');
    return !!(window.firebaseInitialized || window.firebase);
  }

  async function waitForOptionalModules(timeout=OPTIONAL_WAIT_MS){
    const start = Date.now();
    const missing = ()=> OPTIONAL.filter(n=>!window[n]);
    while (Date.now()-start < timeout){
      const m = missing();
      if (m.length === 0){ lg('Optional modules present'); return true; }
      await sleep(250);
    }
    const m = missing();
    if (m.length) wrn('Optional modules missing after wait:', m);
    return false;
  }

  // safe toast (optional)
  function showToast(msg, type='info'){
    const toast = $('toast'), tm = $('toastMessage');
    if (toast && tm){ tm.textContent = msg; toast.className = `toast ${type}`; toast.classList.remove('hidden'); setTimeout(()=>toast.classList.add('hidden'), 3500); }
    else console.log(`[${type}] ${msg}`);
  }

  // ensureStudentDoc: creates student doc id = username if missing
  async function ensureStudentDoc(username, extra={}){
    if (!username) throw new Error('username required');
    await ensureFirebaseOnce();
    if (!window.firebase || !firebase.firestore) throw new Error('Firebase not available');
    const db = firebase.firestore();
    const docRef = db.collection('students').doc(username);
    try {
      const snap = await docRef.get();
      if (!snap.exists){
        const payload = {
          id: username,
          username,
          name: extra.name || username,
          dob: extra.dob || '',
          createdAt: firebase.firestore.FieldValue ? firebase.firestore.FieldValue.serverTimestamp() : new Date().toISOString()
        };
        await docRef.set(payload);
        return payload;
      }
      return snap.data();
    } catch(e){
      throw e;
    }
  }

  // UI helpers
  function showPage(id){
    document.querySelectorAll('.page').forEach(p=>p.classList.add('hidden'));
    const el = $(id);
    if (el) el.classList.remove('hidden');
  }

  function bindLoginUI(){
    const studentForm = $('studentLoginForm');
    const adminForm = $('adminLoginForm');

    // toggle buttons if present
    const studentBtn = $('studentLoginBtn');
    const adminBtn = $('adminLoginBtn');
    if (studentBtn && adminBtn){
      studentBtn.addEventListener('click', ()=>{ if (studentForm) studentForm.classList.remove('hidden'); if (adminForm) adminForm.classList.add('hidden'); studentBtn.classList.add('active'); adminBtn.classList.remove('active'); });
      adminBtn.addEventListener('click', ()=>{ if (adminForm) adminForm.classList.remove('hidden'); if (studentForm) studentForm.classList.add('hidden'); adminBtn.classList.add('active'); studentBtn.classList.remove('active'); });
    }

    if (studentForm){
      studentForm.addEventListener('submit', async (e)=>{
        e.preventDefault();
        const username = ($('studentUsername') && $('studentUsername').value.trim()) || null;
        const dob = ($('studentDOB') && $('studentDOB').value) || null;
        if (!username){ showToast('Enter username', 'info'); return; }
        showToast('Logging in...', 'info');
        try {
          const profile = await ensureStudentDoc(username, {name: username, dob});
          localStorage.setItem('isLoggedIn','true');
          localStorage.setItem('isAdmin','false');
          localStorage.setItem('studentId', username);
          localStorage.setItem('studentName', profile.name || username);
          if (window.studentDashboard && typeof window.studentDashboard.init === 'function'){
            await window.studentDashboard.init(username, profile.name || username, username);
            showPage('studentDashboard');
            showToast('Logged in as student', 'success');
          } else {
            showPage('loginPage');
            showToast('Dashboard module not ready yet. Try again shortly.', 'info');
          }
        } catch(err){
          err && err.stack ? console.error(err.stack) : console.error(err);
          showToast('Login failed (check console).', 'error');
        }
      });
    }

    if (adminForm){
      adminForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        const username = ($('adminUsername') && $('adminUsername').value.trim()) || null;
        const password = ($('adminPassword') && $('adminPassword').value) || null;
        if (!username || !password){ showToast('Enter admin credentials', 'info'); return; }
        if (username.toLowerCase() === 'admin'){ localStorage.setItem('isLoggedIn','true'); localStorage.setItem('isAdmin','true'); localStorage.setItem('adminName', username); showToast('Logged in (admin)', 'success'); if (!(window.location.pathname && window.location.pathname.endsWith('admin.html'))) window.location.href = 'admin.html'; }
        else showToast('Invalid admin credentials (demo)', 'error');
      });
    }

    const logout = $('logoutBtn');
    if (logout) logout.addEventListener('click', ()=>{ localStorage.clear(); showPage('loginPage'); });
  }

  function bindTheme(){
    const btn = $('themeToggleBtn'), icon = $('themeIcon');
    if (!btn) return;
    const THEME_KEY = 'uiTheme';
    function apply(t){
      if (t==='dark'){ document.documentElement.setAttribute('data-theme','dark'); if(icon) icon.textContent='☀️'; btn.setAttribute('aria-pressed','true'); }
      else { document.documentElement.setAttribute('data-theme','light'); if(icon) icon.textContent='🌙'; btn.setAttribute('aria-pressed','false'); }
    }
    btn.addEventListener('click', ()=>{ const cur = localStorage.getItem(THEME_KEY) || 'light'; const next = (cur==='light'?'dark':'light'); localStorage.setItem(THEME_KEY,next); apply(next); });
    apply(localStorage.getItem(THEME_KEY) || 'light');
  }

  // app start
  async function appStart(){
    lg('appStart');
    bindLoginUI();
    bindTheme();
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const studentId = localStorage.getItem('studentId');
    const studentName = localStorage.getItem('studentName');

    if (isLoggedIn && isAdmin){ if (!(window.location.pathname && window.location.pathname.endsWith('admin.html'))) window.location.href = 'admin.html'; return; }
    if (isLoggedIn && studentId){
      if (window.studentDashboard && typeof window.studentDashboard.init === 'function'){ try{ await window.studentDashboard.init(studentId, studentName || studentId, studentId); showPage('studentDashboard'); } catch(e){ wrn('dashboard init failed', e); showPage('loginPage'); } }
      else { wrn('studentDashboard not available'); showPage('loginPage'); }
      return;
    }
    showPage('loginPage');
  }

  // boot sequence
  (async function boot(){
    try {
      await ensureFirebaseOnce();
      // start optional module detection in background
      waitForOptionalModules().then(found=>{ if (found) lg('Optional modules ready'); else wrn('Optional modules did not appear quickly'); });
      // proceed with appStart immediately (does not depend on optional modules)
      await appStart();
    } catch(e){
      err('Boot failed', e);
      try { bindLoginUI(); bindTheme(); } catch(e2){}
    }
  })();

  // exports for debug
  window.app = { ensureStudentDoc, appStart, waitForOptionalModules };
})();
