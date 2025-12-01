// js/dashboard.js
/**
 * Student Dashboard (Full, corrected + solid charts)
 * - Loads student profile & results from Firestore
 * - Updates overview cards
 * - Renders solid Typing (WPM & Accuracy) and MCQ (Marks) trend charts
 *
 * Requirements:
 * - Chart.js must be loaded before this file
 * - Firebase should be initialized elsewhere (initFirebase / firebase global)
 *
 * DOM IDs used:
 * - logoutBtn, welcomeUser
 * - totalMcqTests, avgScore, totalTypingTests, bestScore, bestEnglishWpm, bestHindiWpm
 * - recentResultsBody, allResultsBody, resultFilter
 * - typingTrendChart, mcqTrendChart
 */

function _$(id) { return document.getElementById(id) || null; }

class StudentDashboard {
    constructor() {
        this.studentId = null;
        this.studentName = null;
        this.studentUsername = null;
        this.testResults = [];
        this._charts = {};

        const getEl = id => document.getElementById(id) || null;

        this.elements = {
            dashboard: getEl('studentDashboard'),
            welcomeUser: getEl('welcomeUser'),
            logoutBtn: getEl('logoutBtn'),

            dashboardTabs: document.querySelectorAll('.dashboard-tab') || [],
            overviewTab: getEl('overviewTab'),
            testsTab: getEl('testsTab'),
            typingTab: getEl('typingTab'),
            resultsTab: getEl('resultsTab'),

            totalMcqTests: getEl('totalMcqTests'),
            avgScore: getEl('avgScore'),
            totalTypingTests: getEl('totalTypingTests'),
            bestScore: getEl('bestScore'),
            bestEnglishWpm: getEl('bestEnglishWpm'),
            bestHindiWpm: getEl('bestHindiWpm'),

            recentResultsBody: getEl('recentResultsBody'),
            allResultsBody: getEl('allResultsBody'),
            resultFilter: getEl('resultFilter')
        };

        this.bindEvents();
    }

    bindEvents() {
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

        document.addEventListener('refreshDashboard', (e) => {
            const id = e && e.detail && e.detail.studentId ? e.detail.studentId : null;
            if (id && id === this.studentId) {
                this.loadTestResults(id).catch(err => console.warn('refreshDashboard load error', err));
            } else if (!id && this.studentId) {
                this.loadTestResults(this.studentId).catch(err => console.warn('refreshDashboard load error', err));
            }
        });
    }

    async init(studentId, studentName = '', username = '') {
        try {
            if (!studentId) {
                console.warn('StudentDashboard.init called without studentId');
                return;
            }
            this.studentId = studentId;
            this.studentName = studentName;
            this.studentUsername = username;

            if (window.app && typeof window.app.showLoading === 'function') window.app.showLoading(true);

            if (!window.firebaseInitialized) {
                if (typeof initFirebase === 'function') await initFirebase();
            }

            await this.loadStudentProfile(studentId);
            await this.loadTestResults(studentId);

            document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
            if (this.elements.dashboard) this.elements.dashboard.classList.remove('hidden');

            this.switchTab('overview');

            if (window.app && typeof window.app.showLoading === 'function') window.app.showLoading(false);
        } catch (err) {
            console.error('Error initializing dashboard:', err);
            if (window.app && typeof window.app.showLoading === 'function') window.app.showLoading(false);
            this.showToast('Error loading dashboard. See console.', 'error');
        }
    }

    async loadStudentProfile(studentId) {
        try {
            if (!window.firebase || !firebase.firestore) {
                // If Firebase not available, still allow the UI to show defaults
                console.warn('Firebase not available – profile load skipped');
                this.updateStats({});
                return;
            }

            const db = firebase.firestore();
            const ref = db.collection('students').doc(studentId);
            const doc = await ref.get();

            if (!doc.exists) {
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
                this.updateStats({});
            } else {
                const data = doc.data() || {};
                this.updateStats(data);
            }

            if (this.elements.welcomeUser) {
                const displayName = this.studentName || (doc && doc.data && doc.data().name) || 'Student';
                this.elements.welcomeUser.innerHTML = `<i class="fas fa-user mr-2"></i>Welcome, ${displayName}`;
            }
        } catch (err) {
            console.error('Error loading student profile:', err);
            throw err;
        }
    }

    updateStats(data = {}) {
        try {
            const totalMcqTests = data.mcqTestsTaken ?? data.totalMcqTests ?? data.testsTaken ?? 0;
            const totalTypingTests = data.typingTestsTaken ?? data.totalTypingTests ?? 0;
            const avgScore = (data.averageScore ?? data.avgScore ?? data.average ?? 0);
            const bestScore = data.bestScore ?? data.bestMcqScore ?? data.best ?? 0;
            const bestEnglishWpm = data.bestTypingWpmEnglish ?? data.bestTypingWpm ?? 0;
            const bestHindiWpm = data.bestTypingWpmHindi ?? 0;

            if (this.elements.totalMcqTests) this.elements.totalMcqTests.textContent = totalMcqTests;
            if (this.elements.avgScore) this.elements.avgScore.textContent = (avgScore !== null ? (avgScore + '%') : '-');
            if (this.elements.totalTypingTests) this.elements.totalTypingTests.textContent = totalTypingTests;
            if (this.elements.bestScore) this.elements.bestScore.textContent = (bestScore !== null ? (bestScore + '%') : '-');
            if (this.elements.bestEnglishWpm) this.elements.bestEnglishWpm.textContent = (bestEnglishWpm || '-');
            if (this.elements.bestHindiWpm) this.elements.bestHindiWpm.textContent = (bestHindiWpm || '-');

            const displayName = data.name || this.studentName || this.studentUsername || 'Student';
            if (this.elements.welcomeUser) this.elements.welcomeUser.innerHTML = `<i class="fas fa-user mr-2"></i>Welcome, ${displayName}`;

        } catch (e) {
            console.warn('updateStats error', e);
        }
    }

    async loadTestResults(studentId) {
        try {
            if (!studentId) throw new Error('studentId required');

            if (!window.firebase || !firebase.firestore) {
                console.warn('Firebase not available – test results load skipped');
                this.testResults = [];
                this.recomputeSummaryStats();
                this.displayRecentResults();
                this.displayAllResults();
                this.initTrendCharts();
                return this.testResults;
            }

            const db = firebase.firestore();
            const col = db.collection('test_results');
            const q = col.where('studentId', '==', studentId).orderBy('date', 'asc');
            const snap = await q.get();

            const results = [];
            snap.forEach(doc => {
                const d = doc.data() || {};
                d.id = doc.id;
                if (d.date && d.date.toDate && typeof d.date.toDate === 'function') d.date = d.date.toDate();
                else if (!d.date) d.date = new Date();
                results.push(d);
            });

            this.testResults = results || [];
            this.recomputeSummaryStats();

            this.displayRecentResults();
            this.displayAllResults();

            this.initTrendCharts();

            return this.testResults;
        } catch (err) {
            console.error('Error loading test results:', err);
            throw err;
        }
    }

    recomputeSummaryStats() {
        const all = this.testResults || [];
        const mcqTests = all.filter(r => r.testType && r.testType.toLowerCase().includes('mcq'));
        const typingTests = all.filter(r => r.testType && r.testType.toLowerCase().includes('typing'));

        const totalMcqTests = mcqTests.length;
        const totalTypingTests = typingTests.length;

        const avgScore = mcqTests.length ? Math.round((mcqTests.reduce((s, r) => s + (Number(r.score || 0)), 0) / mcqTests.length) * 100) / 100 : 0;
        const bestScore = mcqTests.length ? Math.max(...mcqTests.map(r => Number(r.score || 0))) : 0;

        let bestEnglishWpm = 0, bestHindiWpm = 0;
        typingTests.forEach(t => {
            const lang = (t.language || t.lang || '').toString().toLowerCase();
            const w = Number(t.wpm || 0);
            if (lang.includes('hindi')) bestHindiWpm = Math.max(bestHindiWpm, w);
            else bestEnglishWpm = Math.max(bestEnglishWpm, w);
        });

        if (this.elements.totalMcqTests) this.elements.totalMcqTests.textContent = totalMcqTests;
        if (this.elements.avgScore) this.elements.avgScore.textContent = (avgScore !== null ? (avgScore + '%') : '-');
        if (this.elements.totalTypingTests) this.elements.totalTypingTests.textContent = totalTypingTests;
        if (this.elements.bestScore) this.elements.bestScore.textContent = (bestScore !== null ? (bestScore + '%') : '-');
        if (this.elements.bestEnglishWpm) this.elements.bestEnglishWpm.textContent = (bestEnglishWpm || '-');
        if (this.elements.bestHindiWpm) this.elements.bestHindiWpm.textContent = (bestHindiWpm || '-');

        try {
            if (window.firebase && firebase.firestore && this.studentId) {
                const stuRef = firebase.firestore().collection('students').doc(this.studentId);
                stuRef.get().then(doc => {
                    if (doc && doc.exists) {
                        const data = doc.data() || {};
                        const upd = {};
                        if ((data.bestTypingWpmEnglish || 0) < bestEnglishWpm) upd.bestTypingWpmEnglish = bestEnglishWpm;
                        if ((data.bestTypingWpmHindi || 0) < bestHindiWpm) upd.bestTypingWpmHindi = bestHindiWpm;
                        if ((data.bestMcqScore || 0) < bestScore) upd.bestMcqScore = bestScore;
                        if (Object.keys(upd).length) stuRef.update(upd).catch(e=>console.warn('update student bests failed', e));
                    }
                }).catch(e=>{/* ignore */});
            }
        } catch(e){ /* ignore */ }
    }

    displayRecentResults(limit = 5) {
        const rows = (this.testResults || []).slice(-limit).reverse();
        if (!this.elements.recentResultsBody) return;
        let html = '';
        rows.forEach(r => {
            const date = (r.date && r.date.toLocaleString) ? r.date.toLocaleString() : (r.date || '-');
            const testName = r.testName || r.testCategory || (r.testType ? r.testType : 'Test');
            const scoreText = r.score != null ? (r.score + '%') : (r.wpm ? (r.wpm + ' WPM') : '-');
            html += `
                <tr class="border-b">
                    <td class="px-6 py-3 text-sm text-gray-600">${testName}</td>
                    <td class="px-6 py-3 text-sm text-gray-600">${r.testType || '-'}</td>
                    <td class="px-6 py-3 text-sm text-gray-600">${r.testMode === 'main' ? 'Main' : 'Practice'}</td>
                    <td class="px-6 py-3 text-sm font-medium text-gray-900">${scoreText}</td>
                    <td class="px-6 py-3 text-sm text-gray-500">${r.studentName || '-'}</td>
                    <td class="px-6 py-3 text-sm text-gray-500">${date}</td>
                </tr>
            `;
        });
        this.elements.recentResultsBody.innerHTML = html;
    }

    displayAllResults() {
        if (!this.elements.allResultsBody) return;
        const filter = (this.elements.resultFilter && this.elements.resultFilter.value) ? this.elements.resultFilter.value : 'all';
        const items = (this.testResults || []).slice().reverse();
        let html = '';
        items.forEach(r => {
            if (filter !== 'all') {
                if (filter === 'typing' && !(r.testType && r.testType.toLowerCase().includes('typing'))) return;
                if (filter === 'mcq' && !(r.testType && r.testType.toLowerCase().includes('mcq'))) return;
            }
            const date = (r.date && r.date.toLocaleString) ? r.date.toLocaleString() : (r.date || '-');
            const testName = r.testName || r.testCategory || (r.testType ? r.testType : 'Test');
            const scoreText = r.score != null ? (r.score + '%') : (r.wpm ? (r.wpm + ' WPM / ' + (r.accuracy ? r.accuracy + '%' : '-')) : '-');

            html += `
                <tr class="border-b hover:bg-gray-50">
                    <td class="px-6 py-3 text-sm text-gray-800 font-medium">${testName}</td>
                    <td class="px-6 py-3 text-sm text-gray-500">${r.testType || '-'}</td>
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
        document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
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

    /* ---------- Trend charts (Chart.js) ---------- */
    initTrendCharts() {
        if (typeof Chart === 'undefined') {
            console.warn('Chart.js not loaded. Include Chart.js before dashboard.js to see trend charts.');
            return;
        }
        this.renderTypingTrend();
        this.renderMcqTrend();
    }

    _prepareTimeSeries() {
        const items = (this.testResults || []).slice().map(r => {
            return {
                date: r.date ? new Date(r.date) : new Date(),
                mode: (r.testMode === 'main' ? 'main' : 'practice'),
                type: (r.testType || (r.testCategory && r.wpm ? 'Typing' : (r.score != null ? 'MCQ' : 'Unknown'))),
                score: Number(r.score || 0),
                wpm: Number(r.wpm || 0),
                accuracy: Number(r.accuracy || 0),
                label: r.testName || (r.testCategory ? r.testCategory : 'Test')
            };
        }).sort((a,b) => a.date - b.date);
        return items;
    }

    _renderChart(canvasId, config) {
        try {
            const el = document.getElementById(canvasId);
            if (!el) return null;
            if (this._charts && this._charts[canvasId]) {
                try { this._charts[canvasId].destroy(); } catch(e){/* ignore */ }
                this._charts[canvasId] = null;
            }
            const ctx = el.getContext('2d');
            this._charts = this._charts || {};
            this._charts[canvasId] = new Chart(ctx, config);
            return this._charts[canvasId];
        } catch (e) {
            console.error('Chart render error', e);
            return null;
        }
    }

    // --- Solid charts: plot only relevant points to avoid nulls / weird scaling ---
    renderTypingTrend() {
        const all = this._prepareTimeSeries();
        const typingItems = all.filter(it => it.type && it.type.toString().toLowerCase().includes('typing'));
        if (!typingItems.length) {
            if (this._charts && this._charts['typingTrendChart']) {
                try { this._charts['typingTrendChart'].destroy(); } catch(e) {}
                this._charts['typingTrendChart'] = null;
            }
            return;
        }

        const labels = typingItems.map(it => it.date.toLocaleString());
        const practicePoints = typingItems.filter(it => it.mode === 'practice');
        const mainPoints     = typingItems.filter(it => it.mode === 'main');

        const practiceData = practicePoints.map(it => ({ x: it.date.toLocaleString(), y: it.wpm }));
        const mainData     = mainPoints.map(it => ({ x: it.date.toLocaleString(), y: it.wpm }));
        const practiceAcc  = practicePoints.map(it => ({ x: it.date.toLocaleString(), y: it.accuracy }));
        const mainAcc      = mainPoints.map(it => ({ x: it.date.toLocaleString(), y: it.accuracy }));

        const config = {
            type: 'line',
            data: {
                labels,
                datasets: [
                    {
                        label: 'Practice WPM',
                        data: practiceData,
                        borderColor: 'rgba(37,99,235,1)',
                        backgroundColor: 'rgba(37,99,235,0.08)',
                        tension: 0.2,
                        fill: false,
                        spanGaps: false,
                        yAxisID: 'yWpm',
                        pointRadius: 3,
                        pointHoverRadius: 6
                    },
                    {
                        label: 'Main WPM',
                        data: mainData,
                        borderColor: 'rgba(16,185,129,1)',
                        backgroundColor: 'rgba(16,185,129,0.08)',
                        tension: 0.2,
                        fill: false,
                        spanGaps: false,
                        yAxisID: 'yWpm',
                        pointRadius: 3,
                        pointHoverRadius: 6
                    },
                    {
                        label: 'Practice Accuracy %',
                        data: practiceAcc,
                        borderDash: [6,4],
                        borderColor: 'rgba(37,99,235,0.95)',
                        backgroundColor: 'transparent',
                        tension: 0.2,
                        fill: false,
                        spanGaps: false,
                        yAxisID: 'yAcc',
                        pointRadius: 2,
                        pointHoverRadius: 5
                    },
                    {
                        label: 'Main Accuracy %',
                        data: mainAcc,
                        borderDash: [6,4],
                        borderColor: 'rgba(16,185,129,0.95)',
                        backgroundColor: 'transparent',
                        tension: 0.2,
                        fill: false,
                        spanGaps: false,
                        yAxisID: 'yAcc',
                        pointRadius: 2,
                        pointHoverRadius: 5
                    }
                ]
            },
            options: {
                parsing: { xAxisKey: 'x', yAxisKey: 'y' },
                normalized: true,
                responsive: true,
                maintainAspectRatio: false,
                interaction: { mode: 'nearest', intersect: false },
                scales: {
                    yWpm: {
                        type: 'linear',
                        position: 'left',
                        min: 0,
                        suggestedMin: 0,
                        title: { display: true, text: 'WPM' }
                    },
                    yAcc: {
                        type: 'linear',
                        position: 'right',
                        min: 0,
                        suggestedMin: 0,
                        max: 100,
                        title: { display: true, text: 'Accuracy (%)' },
                        grid: { drawOnChartArea: false }
                    },
                    x: {
                        type: 'category',
                        ticks: { autoSkip: true, maxRotation: 30, minRotation: 10 }
                    }
                },
                plugins: {
                    legend: { position: 'top' },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const datasetLabel = context.dataset.label || '';
                                const y = context.parsed.y;
                                if (datasetLabel.toLowerCase().includes('accuracy')) return datasetLabel + ': ' + (y != null ? y + '%' : '-');
                                return datasetLabel + ': ' + (y != null ? y : '-');
                            }
                        }
                    }
                }
            }
        };

        this._renderChart('typingTrendChart', config);
    }

    renderMcqTrend() {
        const all = this._prepareTimeSeries();
        const mcqItems = all.filter(it => it.type && it.type.toString().toLowerCase().includes('mcq'));
        if (!mcqItems.length) {
            if (this._charts && this._charts['mcqTrendChart']) {
                try { this._charts['mcqTrendChart'].destroy(); } catch(e) {}
                this._charts['mcqTrendChart'] = null;
            }
            return;
        }

        const labels = mcqItems.map(it => it.date.toLocaleString());
        const practicePoints = mcqItems.filter(it => it.mode === 'practice').map(it => ({ x: it.date.toLocaleString(), y: it.score }));
        const mainPoints     = mcqItems.filter(it => it.mode === 'main').map(it => ({ x: it.date.toLocaleString(), y: it.score }));

        const config = {
            type: 'line',
            data: {
                labels,
                datasets: [
                    {
                        label: 'Practice Marks (%)',
                        data: practicePoints,
                        borderColor: 'rgba(37,99,235,1)',
                        backgroundColor: 'rgba(37,99,235,0.06)',
                        tension: 0.2,
                        fill: false,
                        spanGaps: false,
                        pointRadius: 3,
                        pointHoverRadius: 6
                    },
                    {
                        label: 'Main Marks (%)',
                        data: mainPoints,
                        borderColor: 'rgba(16,185,129,1)',
                        backgroundColor: 'rgba(16,185,129,0.06)',
                        tension: 0.2,
                        fill: false,
                        spanGaps: false,
                        pointRadius: 3,
                        pointHoverRadius: 6
                    }
                ]
            },
            options: {
                parsing: { xAxisKey: 'x', yAxisKey: 'y' },
                normalized: true,
                responsive: true,
                maintainAspectRatio: false,
                interaction: { mode: 'nearest', intersect: false },
                scales: {
                    x: {
                        type: 'category',
                        ticks: { autoSkip: true, maxRotation: 30, minRotation: 10 }
                    },
                    y: {
                        min: 0,
                        suggestedMin: 0,
                        max: 100,
                        title: { display: true, text: 'Marks (%)' },
                        ticks: { stepSize: 10 }
                    }
                },
                plugins: {
                    legend: { position: 'top' },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const y = context.parsed.y;
                                return (context.dataset.label || '') + ': ' + (y != null ? y + '%' : '-');
                            }
                        }
                    }
                }
            }
        };

        this._renderChart('mcqTrendChart', config);
    }
}

// expose globally
let studentDashboard;
document.addEventListener('DOMContentLoaded', () => {
    studentDashboard = new StudentDashboard();
    window.studentDashboard = studentDashboard;
    console.log('✅ StudentDashboard initialized (full, solid charts)');
});

if (typeof window.StudentDashboard === 'undefined' && typeof StudentDashboard === 'function') {
  window.StudentDashboard = StudentDashboard;
}
if (!window.studentDashboard && typeof window.StudentDashboard === 'function') {
  try { window.studentDashboard = new window.StudentDashboard(); console.log('studentDashboard auto-instantiated'); }
  catch (e) { console.warn('studentDashboard instantiation failed (safe):', e); }
}
