// js/firebase-config.js
/**
 * Centralized Firebase initializer.
 * Exposes window.initFirebase() and sets window.firebaseInitialized = true on success.
 *
 * NOTE: Ensure firebase SDK scripts are included before this file in index.html.
 */

async function initFirebase() {
    if (window.firebaseInitialized) return;

    try {
        if (typeof firebase === 'undefined') {
            throw new Error('Firebase SDK not loaded. Include Firebase scripts before firebase-config.js');
        }

        const firebaseConfig = {
            apiKey: "AIzaSyDxuQ4ANmVFr_XXVBLlIDRY56QhPsWvxAE",
            authDomain: "student-20933.firebaseapp.com",
            projectId: "student-20933",
            storageBucket: "student-20933.firebasestorage.app",
            messagingSenderId: "957175384424",
            appId: "1:957175384424:web:0d5545f5024f260790eedd",
            measurementId: "G-CEHXF5LCVS"
        };

        // Only initialize once
        if (!firebase.apps || firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig);
        }

        // Try to enable offline persistence (best-effort)
        try {
            await firebase.firestore().enablePersistence();
        } catch (err) {
            // Known failures: multiple tabs or browser unsupported
            if (err.code === 'failed-precondition') {
                console.warn('Persistence failed (multiple tabs open).');
            } else if (err.code === 'unimplemented') {
                console.warn('Persistence not available in this browser.');
            } else {
                console.warn('Persistence error:', err);
            }
        }

        // Optional analytics
        if (typeof firebase.analytics === 'function') {
            try { firebase.analytics(); } catch (e) { /* ignore analytics errors */ }
        }

        window.firebaseInitialized = true;
        console.log('✅ Firebase initialized successfully (firebase-config.js)');
    } catch (error) {
        console.error('Error initializing Firebase:', error);
        throw error;
    }
}
// === GLOBAL LOADER HELPER ===
function showLoader(text = 'Loading…') {
  try {
    const loader = document.getElementById('global-loader');
    if (!loader) return;
    const t = loader.querySelector('.loader-text');
    if (t) t.textContent = text;
    document.body.classList.add('loading');
  } catch (e) {}
}

function hideLoader() {
  try {
    const loader = document.getElementById('global-loader');
    if (!loader) return;
    document.body.classList.remove('loading');
    const t = loader.querySelector('.loader-text');
    if (t) t.textContent = 'Loading…';
  } catch (e) {}
}


// export globally
window.initFirebase = initFirebase;
