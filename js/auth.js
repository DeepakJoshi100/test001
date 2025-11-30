// js/auth.js
/**
 * Authentication Module
 * - Null-safe DOM bindings
 * - Uses centralized initFirebase()
 * - Student login (username + DOB as demo "password")
 * - Admin demo login (hardcoded demo only)
 */

class Auth {
    constructor() {
        this.bindEvents();
    }

    bindEvents() {
        const studentLoginForm = document.getElementById('studentLoginForm');
        const adminLoginForm = document.getElementById('adminLoginForm');
        const studentLoginBtn = document.getElementById('studentLoginBtn');
        const adminLoginBtn = document.getElementById('adminLoginBtn');

        if (studentLoginForm) studentLoginForm.addEventListener('submit', (e) => { e.preventDefault(); this.handleStudentLogin(); });
        if (adminLoginForm) adminLoginForm.addEventListener('submit', (e) => { e.preventDefault(); this.handleAdminLogin(); });

        if (studentLoginBtn && adminLoginBtn) {
            studentLoginBtn.addEventListener('click', () => this.switchLoginType('student'));
            adminLoginBtn.addEventListener('click', () => this.switchLoginType('admin'));
        }

        // check session
        this.checkLoggedInUser();
    }

    switchLoginType(type) {
        const studentLoginBtn = document.getElementById('studentLoginBtn');
        const adminLoginBtn = document.getElementById('adminLoginBtn');
        const studentLoginForm = document.getElementById('studentLoginForm');
        const adminLoginForm = document.getElementById('adminLoginForm');

        if (type === 'student') {
            if (studentLoginBtn) studentLoginBtn.classList.add('active');
            if (adminLoginBtn) adminLoginBtn.classList.remove('active');
            if (studentLoginForm) studentLoginForm.classList.remove('hidden');
            if (adminLoginForm) adminLoginForm.classList.add('hidden');
        } else {
            if (adminLoginBtn) adminLoginBtn.classList.add('active');
            if (studentLoginBtn) studentLoginBtn.classList.remove('active');
            if (adminLoginForm) adminLoginForm.classList.remove('hidden');
            if (studentLoginForm) studentLoginForm.classList.add('hidden');
        }
    }

    async handleStudentLogin() {
        try {
            const usernameInput = document.getElementById('studentUsername');
            const dobInput = document.getElementById('studentDOB');
            if (!usernameInput || !dobInput) {
                this.showToast('Login form not found.', 'error');
                return;
            }
            const username = usernameInput.value.trim();
            const dob = dobInput.value;

            if (!username || !dob) {
                this.showToast('Please enter both username and date of birth.', 'error');
                return;
            }

            // show loading overlay if app exists
            if (window.app && typeof window.app.showLoading === 'function') window.app.showLoading(true);

            // init firebase if needed
            if (!window.firebaseInitialized) {
                if (typeof initFirebase === 'function') await initFirebase();
            }

            const db = firebase.firestore();
            const snapshot = await db.collection('students').where('username', '==', username).get();
            if (snapshot.empty) {
                if (window.app && typeof window.app.showLoading === 'function') window.app.showLoading(false);
                this.showToast('Student not found. Please check username.', 'error');
                return;
            }

            const doc = snapshot.docs[0];
            const data = doc.data();

            if ((data.dob || '') !== dob) {
                if (window.app && typeof window.app.showLoading === 'function') window.app.showLoading(false);
                this.showToast('Incorrect date of birth. Please try again.', 'error');
                return;
            }

            // success
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('studentId', doc.id);
            localStorage.setItem('studentName', data.name || '');
            localStorage.setItem('studentUsername', data.username || '');

            if (window.app && typeof window.app.showLoading === 'function') window.app.showLoading(false);

            // init dashboard
            if (window.studentDashboard) window.studentDashboard.init(doc.id, data.name || '', data.username || '');
        } catch (err) {
            console.error('Error during student login:', err);
            if (window.app && typeof window.app.showLoading === 'function') window.app.showLoading(false);
            this.showToast('Login failed. See console for details.', 'error');
        }
    }

    // Replace / add this function in js/auth.js
// Usage: call handleAdminLogin(adminId, adminUsername) after verifying credentials
async  handleAdminLogin(adminId, adminUsername) {
  try {
    // set consistent flags used across the app
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('isAdmin', 'true');

    // keep the older admin-specific keys too (some code paths use these)
    localStorage.setItem('isAdminLoggedIn', 'true');
    if (adminId) localStorage.setItem('adminId', String(adminId));
    if (adminUsername) localStorage.setItem('adminUsername', String(adminUsername));

    // Optional: store a timestamp for debugging / expiry checks
    try { localStorage.setItem('adminLoginAt', new Date().toISOString()); } catch (e) {}

    // If you use Firebase Auth and just signed in the admin through it, nothing more needed.
    // If you perform a redirect to admin page after login:
    // Use location.replace so back doesn't go to the login form again.
    try {
      history.replaceState(null, '', 'admin.html');
    } catch (e) { /* ignore */ }
    window.location.replace('admin.html');

  } catch (err) {
    console.error('handleAdminLogin error', err);
    throw err;
  }
}


    showToast(message, type='info') {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');
        if (!toast || !toastMessage) {
            console.log(`[${type.toUpperCase()}] ${message}`);
            return;
        }
        toastMessage.textContent = message;
        toast.className = `toast ${type}`;
        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.add('hidden'), 3000);
    }
}

// init
let auth;
document.addEventListener('DOMContentLoaded', () => {
    auth = new Auth();
    window.auth = auth;
    console.log('✅ Auth module initialized');
});
