// js/dashboard.js
/**
 * Student Dashboard (Full)
 * - Displays overview cards (total MCQ tests, avg score, best MCQ, best English/Hindi WPM)
 * - Loads student profile and results from Firestore
 * - Recomputes language-specific best WPM from 'test_results' and updates student doc if improved
 * - Robust DOM guards and defensive Firebase initialization
 *
 * Expected DOM IDs (add to your HTML if missing):
 * - studentDashboard, welcomeUser, logoutBtn
 * - totalMcqTests, avgScore, totalTypingTests, bestScore, bestEnglishWpm, bestHindiWpm
 * - recentResultsBody, allResultsBody, resultFilter (select), testsTab, overviewTab, typingTab, resultsTab (for tab switching)
 *
 * The dashboard listens for a CustomEvent('refreshDashboard', { detail: { studentId } })
 * to reload student data (used after submitting tests).
 */

class StudentDashboard {
    constructor() {
        this.studentId = null;
        this.studentName = null;
        this.studentUsername = null;
        this.testResults = []; // cached results for the student (most recent first)

        // safe DOM getter
        const getEl = id => document.getElementById(id) || null;

        // Elements used by the dashboard
        this.elements = {
            dashboard: getEl('studentDashboard'),
            welcomeUser: getEl('welcomeUser'),
            logoutBtn: getEl('logoutBtn'),

            // tabs
            dashboardTabs: document.querySelectorAll('.dashboard-tab') || [],
            overviewTab: getEl('overviewTab'),
            testsTab: getEl('testsTab'),
            typingTab: getEl('typingTab'),
            resultsTab: getEl('resultsTab'),

            // overview cards
            totalMcqTests: getEl('totalMcqTests'),
            avgScore: getEl('avgScore'),
            totalTypingTests: getEl('totalTypingTests'),
            bestScore: getEl('bestScore'),
            bestEnglishWpm: getEl('bestEnglishWpm'),
            bestHindiWpm: getEl('bestHindiWpm'),

            // results tables
            recentResultsBody: getEl('recentResultsBody'),
            allResultsBody: getEl('allResultsBody'),
            resultFilter: getEl('resultFilter')
        };

        this.bindEvents();
    }

    bindEvents() {
        // Tab switching (if you have .dashboard-tab elements)
        if (this.elements.dashboardTabs && this.elements.dashboardTabs.length) {
            this.elements.dashboardTabs.forEach(tab => {
                tab.addEventListener('click', (e) => {
                    const target = e.currentTarget.getAttribute('data-tab');
                    if (target) this.switchTab(target);
                });
            });
        }

        if (this.elements.logoutBtn) {
            this.elements.logoutBtn.addEventListener('click', () => this.logout());
        }

        if (this.elements.resultFilter) {
            this.elements.resultFilter.addEventListener('change', () => this.filterAndDisplayResults());
        }

        // Listen for external refresh requests (e.g., after a test finishes)
        document.addEventListener('refreshDashboard', (e) => {
            const id = e && e.detail && e.detail.studentId ? e.detail.studentId : null;
            if (id && id === this.studentId) {
                // reload results for the same student
                this.loadTestResults(id).catch(err => console.warn('refreshDashboard load error', err));
            } else if (!id && this.studentId) {
                // generic refresh
                this.loadTestResults(this.studentId).catch(err => console.warn('refreshDashboard load error', err));
            }
        });
    }

    /**
     * Initialize dashboard for a student
     * @param {string} studentId
     * @param {string} studentName
     * @param {string} username
     */
    async init(studentId, studentName = '', username = '') {
        try {
            if (!studentId) {
                console.warn('StudentDashboard.init called without studentId');
                return;
            }
            this.studentId = studentId;
            this.studentName = studentName;
            this.studentUsername = username;

            // show loading overlay if app has showLoading
            if (window.app && typeof window.app.showLoading === 'function') window.app.showLoading(true);

            // Ensure Firebase
            if (!window.firebaseInitialized) {
                if (typeof initFirebase === 'function') await initFirebase();
            }

            // Load profile (creates minimal profile if missing)
            await this.loadStudentProfile(studentId);

            // Load results
            await this.loadTestResults(studentId);

            // Show dashboard UI
            document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
            if (this.elements.dashboard) this.elements.dashboard.classList.remove('hidden');

            // Switch to overview by default
            this.switchTab('overview');

            if (window.app && typeof window.app.showLoading === 'function') window.app.showLoading(false);
        } catch (err) {
            console.error('Error initializing dashboard:', err);
            if (window.app && typeof window.app.showLoading === 'function') window.app.showLoading(false);
            this.showToast('Error loading dashboard. See console.', 'error');
        }
    }

    /**
     * Load or create student profile
     */
    async loadStudentProfile(studentId) {
        try {
            const db = firebase.firestore();
            const ref = db.collection('students').doc(studentId);
            const doc = await ref.get();

            if (!doc.exists) {
                // create a minimal profile
                await ref.set({
                    id: studentId,
                    name: this.studentName || '',
                    username: this.studentUsername || '',
                    testsTaken: 0,
                    typingTestsTaken: 0,
                    mcqTestsTaken: 0,
                    totalScore: 0,
                    averageScore: 0,
                    bestScore: 0,
                    bestMcqScore: 0,
                    bestTypingWpmEnglish: 0,
                    bestTypingWpmHindi: 0,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    lastTestDate: null
                });
                // no data to update UI yet
                this.updateStats({});
            } else {
                const data = doc.data() || {};
                this.updateStats(data);
            }

            // show welcome
            if (this.elements.welcomeUser) {
                const displayName = this.studentName || (doc && doc.data && doc.data().name) || 'Student';
                this.elements.welcomeUser.innerHTML = `<i class="fas fa-user mr-2"></i>Welcome, ${displayName}`;
            }
        } catch (err) {
            console.error('Error loading student profile:', err);
            throw err;
        }
    }

    /**
     * Load student's test results from Firestore
     * Attempts a where('studentId','==', studentId).orderBy('date','desc')
     * Falls back to client-side filter if Firestore requires composite index
     */
    async loadTestResults(studentId) {
        try {
            if (!studentId) return;

            const db = firebase.firestore();
            let snapshot;

            try {
                snapshot = await db.collection('test_results')
                    .where('studentId', '==', studentId)
                    .orderBy('date', 'desc')
                    .get();
            } catch (err) {
                // fallback - get recent results and filter client-side
                console.warn('Query fallback: fetching limited results and filtering client-side', err);
                snapshot = await db.collection('test_results').orderBy('date', 'desc').limit(1000).get();
            }

            const results = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                if (!data) return;
                // if we used fallback, ensure we only include this student's docs
                if (data.studentId && data.studentId === studentId) {
                    results.push({ id: doc.id, ...data });
                } else if (!data.studentId && data.student && data.student.id === studentId) {
                    // legacy format fallback
                    results.push({ id: doc.id, ...data });
                }
            });

            // sort by date desc (safety)
            results.sort((a, b) => new Date(b.date) - new Date(a.date));

            this.testResults = results;

            // Recompute best metrics from results (authoritative)
            await this.recomputeAndSyncBestMetrics();

            // Update recent / all results UI
            this.displayRecentResults();
            this.displayAllResults();

        } catch (err) {
            console.error('Error loading test results:', err);
            this.showToast('Error loading test results. See console.', 'error');
        }
    }

    /**
     * Recompute best MCQ %, best english/hindi WPM from testResults
     * If student doc is missing these keys or the recomputed value is better, update the student doc.
     */
    async recomputeAndSyncBestMetrics() {
        try {
            if (!this.studentId) return;

            let bestMcqScore = 0;
            let bestEnglishWpm = 0;
            let bestHindiWpm = 0;
            let totalScoreForAvg = 0;
            let testsCount = 0;
            let typingTestsCount = 0;
            let mcqTestsCount = 0;

            this.testResults.forEach(r => {
                // unify numeric fields
                const score = Number(r.score || 0);
                const accuracy = Number(r.accuracy || 0);
                const wpm = Number(r.wpm || 0);

                // general counters
                testsCount++;

                if ((r.testType || '').toLowerCase() === 'mcq' || r.testType === 'MCQ') {
                    mcqTestsCount++;
                    bestMcqScore = Math.max(bestMcqScore, score);
                    totalScoreForAvg += score;
                } else if ((r.testType || '').toLowerCase() === 'typing' || r.testType === 'Typing') {
                    typingTestsCount++;
                    // testCategory likely 'english' or 'hindi'
                    const cat = (r.testCategory || '').toLowerCase();
                    // use NET WPM stored in r.wpm (we expect tests to store NET WPM)
                    if (cat === 'english') bestEnglishWpm = Math.max(bestEnglishWpm, wpm);
                    else if (cat === 'hindi') bestHindiWpm = Math.max(bestHindiWpm, wpm);

                    // for averaging, treat typing score contribution as accuracy (0-100)
                    totalScoreForAvg += (accuracy || 0);
                } else {
                    // fallback: if r.score exists treat as MCQ; if accuracy exists treat as typing
                    if (r.score != null) {
                        mcqTestsCount++;
                        bestMcqScore = Math.max(bestMcqScore, score);
                        totalScoreForAvg += score;
                    } else if (r.accuracy != null) {
                        typingTestsCount++;
                        totalScoreForAvg += (accuracy || 0);
                    }
                }
            });

            // Safety: if no tests, leave values as 0
            const averageScore = testsCount > 0 ? Math.round(totalScoreForAvg / testsCount) : 0;

            // Update UI elements
            if (this.elements.totalMcqTests) this.elements.totalMcqTests.textContent = mcqTestsCount;
            if (this.elements.totalTypingTests) this.elements.totalTypingTests.textContent = typingTestsCount;
            if (this.elements.avgScore) this.elements.avgScore.textContent = `${averageScore}%`;
            if (this.elements.bestScore) this.elements.bestScore.textContent = `${bestMcqScore}%`;
            if (this.elements.bestEnglishWpm) this.elements.bestEnglishWpm.textContent = `${bestEnglishWpm} WPM`;
            if (this.elements.bestHindiWpm) this.elements.bestHindiWpm.textContent = `${bestHindiWpm} WPM`;

            // Now synchronize improved values back to student doc (if better)
            const db = firebase.firestore();
            const sref = db.collection('students').doc(this.studentId);
            const sdoc = await sref.get();
            const current = sdoc.exists ? (sdoc.data() || {}) : {};

            const updatePayload = {};

            // testsTaken, mcqTestsTaken, typingTestsTaken, totalScore, averageScore, bestScore etc.
            updatePayload.testsTaken = Math.max(current.testsTaken || 0, testsCount);
            updatePayload.mcqTestsTaken = Math.max(current.mcqTestsTaken || 0, mcqTestsCount);
            updatePayload.typingTestsTaken = Math.max(current.typingTestsTaken || 0, typingTestsCount);
            updatePayload.totalScore = Math.max(current.totalScore || 0, totalScoreForAvg);
            updatePayload.averageScore = Math.max(current.averageScore || 0, averageScore);
            updatePayload.bestScore = Math.max(current.bestScore || 0, bestMcqScore, current.bestScore || 0);
            // language-specific bests
            updatePayload.bestMcqScore = Math.max(current.bestMcqScore || 0, bestMcqScore);
            updatePayload.bestTypingWpmEnglish = Math.max(current.bestTypingWpmEnglish || 0, bestEnglishWpm);
            updatePayload.bestTypingWpmHindi = Math.max(current.bestTypingWpmHindi || 0, bestHindiWpm);

            // lastTestDate
            if (this.testResults.length > 0) {
                updatePayload.lastTestDate = firebase.firestore.FieldValue.serverTimestamp();
            }

            // Only update if there's a real change to avoid unnecessary writes
            let needUpdate = false;
            Object.keys(updatePayload).forEach(k => {
                const newVal = updatePayload[k];
                const oldVal = current[k];
                if (oldVal === undefined || oldVal === null) {
                    needUpdate = true;
                } else {
                    // numeric comparison
                    if (typeof newVal === 'number' && newVal > oldVal) needUpdate = true;
                    else if (typeof newVal !== 'number' && newVal !== oldVal) needUpdate = true;
                }
            });

            if (needUpdate) {
                try {
                    await sref.update(updatePayload);
                    console.log('Student stats synced with recomputed best metrics', updatePayload);
                } catch (err) {
                    console.warn('Failed to update student doc with recomputed metrics', err);
                }
            }

        } catch (err) {
            console.error('Error recomputing/syncing best metrics:', err);
        }
    }

    /**
     * Update stats UI using student doc (fallback)
     */
    updateStats(studentData = {}) {
        // If recomputed values exist they will be overwritten by recomputeAndSyncBestMetrics later,
        // but this gives a quick display while testResults load.
        const mcqTestsTaken = studentData.mcqTestsTaken || 0;
        const typingTestsTaken = studentData.typingTestsTaken || 0;
        const avgScore = studentData.averageScore || 0;
        const bestMcq = studentData.bestMcqScore || studentData.bestScore || 0;
        const bestEnglish = studentData.bestTypingWpmEnglish || 0;
        const bestHindi = studentData.bestTypingWpmHindi || 0;

        if (this.elements.totalMcqTests) this.elements.totalMcqTests.textContent = mcqTestsTaken;
        if (this.elements.totalTypingTests) this.elements.totalTypingTests.textContent = typingTestsTaken;
        if (this.elements.avgScore) this.elements.avgScore.textContent = `${avgScore}%`;
        if (this.elements.bestScore) this.elements.bestScore.textContent = `${bestMcq}%`;
        if (this.elements.bestEnglishWpm) this.elements.bestEnglishWpm.textContent = `${bestEnglish} WPM`;
        if (this.elements.bestHindiWpm) this.elements.bestHindiWpm.textContent = `${bestHindi} WPM`;
    }

    displayRecentResults() {
        if (!this.elements.recentResultsBody) return;

        const recent = (this.testResults && this.testResults.slice(0, 6)) || [];
        if (recent.length === 0) {
            this.elements.recentResultsBody.innerHTML = `<tr><td colspan="6" class="px-6 py-4 text-center text-gray-500">No recent activity</td></tr>`;
            return;
        }

        let html = '';
        recent.forEach(r => {
            const date = r.date ? new Date(r.date).toLocaleString() : '-';
            const type = r.testType || r.testType === 'MCQ' ? (r.testType) : (r.testCategory ? (r.testCategory + ' - Typing') : 'Test');
            const scoreText = r.testType === 'MCQ' ? `${r.score || 0}%` : `${r.wpm || 0} WPM (${r.accuracy || 0}%)`;

            html += `
                <tr>
                    <td class="px-6 py-3 text-sm font-medium text-gray-900">${r.testName || '-'}</td>
                    <td class="px-6 py-3 text-sm text-gray-500">${type}</td>
                    <td class="px-6 py-3 text-sm font-medium text-gray-900">${scoreText}</td>
                    <td class="px-6 py-3 text-sm text-gray-500">${r.testMode === 'main' ? 'Main' : 'Practice'}</td>
                    <td class="px-6 py-3 text-sm text-gray-500">${date}</td>
                </tr>
            `;
        });

        this.elements.recentResultsBody.innerHTML = html;
    }

    displayAllResults() {
        if (!this.elements.allResultsBody) return;

        const filter = (this.elements.resultFilter && this.elements.resultFilter.value) ? this.elements.resultFilter.value : 'all';

        let filtered = (this.testResults || []).slice();

        if (filter === 'mcq') filtered = filtered.filter(r => (r.testType || '').toLowerCase() === 'mcq' || r.score != null);
        else if (filter === 'typing') filtered = filtered.filter(r => (r.testType || '').toLowerCase() === 'typing' || r.accuracy != null);
        else if (filter === 'practice') filtered = filtered.filter(r => r.testMode === 'practice');
        else if (filter === 'main') filtered = filtered.filter(r => r.testMode === 'main');

        if (filtered.length === 0) {
            this.elements.allResultsBody.innerHTML = `<tr><td colspan="7" class="px-6 py-4 text-center text-gray-500">No results found</td></tr>`;
            return;
        }

        let html = '';
        filtered.forEach(r => {
            const date = r.date ? new Date(r.date).toLocaleString() : '-';
            const scoreText = r.testType === 'MCQ' ? `${r.score || 0}%` : `${r.wpm || 0} WPM (${r.accuracy || 0}%)`;

            html += `
                <tr>
                    <td class="px-6 py-3 text-sm font-medium text-gray-900">${r.testName || '-'}</td>
                    <td class="px-6 py-3 text-sm text-gray-500">${r.testType || (r.testCategory ? (r.testCategory + ' - Typing') : '-')}</td>
                    <td class="px-6 py-3 text-sm text-gray-500">${r.testMode === 'main' ? 'Main' : 'Practice'}</td>
                    <td class="px-6 py-3 text-sm font-medium text-gray-900">${scoreText}</td>
                    <td class="px-6 py-3 text-sm text-gray-500">${r.duration ? this._formatDuration(r.duration) : '-'}</td>
                    <td class="px-6 py-3 text-sm text-gray-500">${r.studentName || '-'}</td>
                    <td class="px-6 py-3 text-sm text-gray-500">${date}</td>
                </tr>
            `;
        });

        this.elements.allResultsBody.innerHTML = html;
    }

    _formatDuration(seconds) {
        if (!seconds && seconds !== 0) return '-';
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}m ${s}s`;
    }

    filterAndDisplayResults() {
        this.displayAllResults();
    }

    switchTab(tabName) {
        // hide all tab contents: any element with class 'tab-content'
        document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
        // show the requested tab content: element id = tabName + 'Tab' or element with id = tabName
        const el = document.getElementById(tabName + 'Tab') || document.getElementById(tabName);
        if (el) el.classList.remove('hidden');
    }

    logout() {
        try {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('studentId');
            localStorage.removeItem('studentName');
            localStorage.removeItem('studentUsername');
        } catch (err) {
            console.warn('Error clearing localStorage during logout', err);
        }
        document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
        const loginPage = document.getElementById('loginPage');
        if (loginPage) loginPage.classList.remove('hidden');
    }

    showToast(message, type = 'info') {
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

// expose globally
let studentDashboard;
document.addEventListener('DOMContentLoaded', () => {
    studentDashboard = new StudentDashboard();
    window.studentDashboard = studentDashboard;
    console.log('✅ StudentDashboard initialized (full)');
});
// ------- Safe attach for StudentDashboard / studentDashboard -------
if (typeof window.StudentDashboard === 'undefined' && typeof StudentDashboard === 'function') {
  window.StudentDashboard = StudentDashboard;
}
if (!window.studentDashboard && typeof window.StudentDashboard === 'function') {
  try { window.studentDashboard = new window.StudentDashboard(); console.log('studentDashboard auto-instantiated'); }
  catch (e) { console.warn('studentDashboard instantiation failed (safe):', e); }
}
