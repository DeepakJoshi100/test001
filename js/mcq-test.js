// js/mcq-test.js
class MCQTest {
    constructor() {
        this.currentTest = null;
        this.currentMode = null;
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.userAnswers = {};
        this.startTime = null;
        this.questionCount = 10;
        this.testId = null;
        this.studentId = null;
        this.studentName = null;
        this.isSubmitted = false; // <-- new: whether test is submitted (review mode)

        const getEl = id => document.getElementById(id) || null;
        this.elements = {
            testPage: getEl('mcqTestPage'),
            testNameHeader: getEl('testNameHeader'),
            testModeHeader: getEl('testModeHeader'),
            questionProgress: getEl('questionProgress'),
            answeredCount: getEl('answeredCount'),
            progressBar: getEl('progressBar'),
            questionNumber: getEl('questionNumber'),
            questionText: getEl('questionText'),
            optionsContainer: getEl('optionsContainer'),
            prevQuestionBtn: getEl('prevQuestionBtn'),
            nextQuestionBtn: getEl('nextQuestionBtn'),
            questionNavigator: getEl('questionNavigator'),
            submitTestBtn: getEl('submitTestBtn'),
            exitTestBtn: getEl('exitTestBtn'),
            resultModal: getEl('resultModal'),
            resultIcon: getEl('resultIcon'),
            resultTestName: getEl('resultTestName'),
            mcqResults: getEl('mcqResults'),
            typingResults: getEl('typingResults'),
            resultTotalQ: getEl('resultTotalQ'),
            resultCorrect: getEl('resultCorrect'),
            resultWrong: getEl('resultWrong'),
            resultScore: getEl('resultScore'),
            closeResultModal: getEl('closeResultModal')
        };

        this.bindEvents();
    }

    bindEvents() {
        if (this.elements.prevQuestionBtn) this.elements.prevQuestionBtn.addEventListener('click', () => this.navigateToQuestion(this.currentQuestionIndex - 1));
        if (this.elements.nextQuestionBtn) this.elements.nextQuestionBtn.addEventListener('click', () => this.navigateToQuestion(this.currentQuestionIndex + 1));
        if (this.elements.submitTestBtn) this.elements.submitTestBtn.addEventListener('click', () => this.submitTest());
        if (this.elements.exitTestBtn) this.elements.exitTestBtn.addEventListener('click', () => this.confirmExitTest());
        if (this.elements.closeResultModal) this.elements.closeResultModal.addEventListener('click', () => this.returnToDashboard());

        // practice question count buttons
        document.querySelectorAll('.question-count-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const cnt = parseInt(e.currentTarget.getAttribute('data-count'), 10);
                if (!isNaN(cnt) && cnt > 0) this.questionCount = cnt;
                else this.questionCount = 10;
                const modal = document.getElementById('practiceModal');
                if (modal) modal.classList.add('hidden');
                this.startTest();
            });
        });
        const closePractice = document.getElementById('closePracticeModal');
        if (closePractice) closePractice.addEventListener('click', () => {
            const modal = document.getElementById('practiceModal');
            if (modal) modal.classList.add('hidden');
        });

        // bind start buttons
        this.bindStartButtons();
    }

    bindStartButtons() {
        // remove duplicate listeners
        document.querySelectorAll('.start-test-btn').forEach(btn => {
            try { btn.replaceWith(btn.cloneNode(true)); } catch (e) { /* ignore */ }
        });

        document.querySelectorAll('.start-test-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const testCategory = btn.getAttribute('data-test');
                const mode = btn.getAttribute('data-mode') || 'practice';

                const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
                const studentId = localStorage.getItem('studentId') || null;
                const studentName = localStorage.getItem('studentName') || '';

                if (!isLoggedIn || !studentId) {
                    this.showToast('Please login as a student to start the test.', 'info');
                    document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
                    const loginPage = document.getElementById('loginPage');
                    if (loginPage) loginPage.classList.remove('hidden');
                    return;
                }

                this.start(testCategory, mode, studentId, studentName);
            });
        });
    }

    start(testCategory, mode = 'practice', studentId = null, studentName = '') {
        this.currentTest = testCategory;
        this.currentMode = mode;
        this.studentId = studentId;
        this.studentName = studentName;
        this.testId = `mcq_${testCategory}_${mode}_${Date.now()}_${Math.random().toString(36).slice(2,9)}`;
        this.isSubmitted = false; // reset on start

        if (mode === 'practice') {
            const modal = document.getElementById('practiceModal');
            if (modal) modal.classList.remove('hidden');
            else {
                this.questionCount = 10;
                this.startTest();
            }
        } else {
            this.questionCount = 100;
            this.startTest();
        }
    }

    startTest() {
        // load questions for category
        const allQuestions = (window.questionBank && window.questionBank[this.currentTest]) ? window.questionBank[this.currentTest] : [];
        if (!Array.isArray(allQuestions) || allQuestions.length === 0) {
            this.showToast('No questions available for this category.', 'error');
            return;
        }

        // random selection
        this.questions = this.getRandomQuestions(allQuestions, this.questionCount);
        if (!this.questions || this.questions.length === 0) {
            this.showToast('Not enough questions to start the test.', 'error');
            return;
        }

        this.currentQuestionIndex = 0;
        this.userAnswers = {};
        this.startTime = new Date();

        // init UI
        if (this.elements.testNameHeader) this.elements.testNameHeader.textContent = this.getTestDisplayName(this.currentTest);
        if (this.elements.testModeHeader) this.elements.testModeHeader.textContent = this.currentMode === 'practice' ? 'Practice' : 'Main Test';
        this.updateProgress();
        this.renderQuestionNavigator();
        this.loadQuestion(0);

        document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
        if (this.elements.testPage) this.elements.testPage.classList.remove('hidden');

        window.scrollTo(0,0);
    }

    getRandomQuestions(allQuestions, count) {
        const arr = Array.isArray(allQuestions) ? allQuestions.slice() : [];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr.slice(0, Math.min(count, arr.length)).map((q, idx) => ({ id: q.id || `q_${idx+1}`, ...q }));
    }

    loadQuestion(index) {
        if (!this.questions || index < 0 || index >= this.questions.length) return;
        this.currentQuestionIndex = index;
        const q = this.questions[index];

        if (this.elements.questionNumber) this.elements.questionNumber.textContent = `Question ${index + 1}`;
        if (this.elements.questionText) this.elements.questionText.innerHTML = q.question || '';

        if (!this.elements.optionsContainer) return;
        this.elements.optionsContainer.innerHTML = '';
        this.elements.optionsContainer.classList.add('options-container');

        const options = this.shuffleOptions(q.options || []);
        options.forEach((opt, i) => {
            const letter = String.fromCharCode(65 + i);
            const div = document.createElement('div');
            div.className = `p-3 border rounded cursor-pointer mb-2 option`;
            div.setAttribute('data-option', opt);
            div.setAttribute('role', 'button');
            div.innerHTML = `<strong style="margin-right:.6rem">${letter}.</strong> <span>${opt}</span> <span class="marker"></span>`;

            // mark selected if previously answered
            const userSel = this.userAnswers[q.id];
            if (userSel === opt) div.classList.add('selected');

            // If submitted (review mode) show correct/wrong markings
            if (this.isSubmitted) {
                // highlight correct answer
                if (opt === q.correctAnswer) {
                    div.classList.add('correct');
                    div.querySelector('.marker').textContent = '✔';
                }
                // highlight chosen wrong answer
                if (userSel && userSel === opt && opt !== q.correctAnswer) {
                    div.classList.add('wrong');
                    div.querySelector('.marker').textContent = '✖';
                }
                // if chosen and correct, keep both selected & correct visuals
                if (userSel && userSel === opt && opt === q.correctAnswer) {
                    div.classList.add('selected'); // keeps previously selected look
                    div.classList.add('correct');
                    div.querySelector('.marker').textContent = '✔';
                }
            }

            // click behavior: if test already submitted -> do not change answers (review-only)
            div.addEventListener('click', () => {
                if (this.isSubmitted) {
                    // In review mode, just ensure selected marker is visible for this option only
                    // remove .selected from siblings then add to this one (visual only)
                    this.elements.optionsContainer.querySelectorAll('.option').forEach(d => d.classList.remove('selected'));
                    div.classList.add('selected');
                    return;
                }

                // live test mode: set user's answer and update highlight/progress
                this.userAnswers[q.id] = opt;
                // highlight chosen
                this.elements.optionsContainer.querySelectorAll('.option').forEach(d => d.classList.remove('selected'));
                div.classList.add('selected');
                this.updateProgress();
            });

            this.elements.optionsContainer.appendChild(div);
        });

        if (this.elements.prevQuestionBtn) this.elements.prevQuestionBtn.disabled = index === 0;
        if (this.elements.nextQuestionBtn) this.elements.nextQuestionBtn.disabled = index === this.questions.length - 1;
    }

    shuffleOptions(options) {
        const arr = Array.isArray(options) ? options.slice() : [];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    updateProgress() {
        const answered = Object.keys(this.userAnswers).length;
        const total = (this.questions && this.questions.length) || 0;
        if (this.elements.answeredCount) this.elements.answeredCount.textContent = answered;
        if (this.elements.progressBar) {
            const pct = total > 0 ? Math.round((answered / total) * 100) : 0;
            this.elements.progressBar.style.width = `${pct}%`;
        }
        this.renderQuestionNavigator();
    }

    renderQuestionNavigator() {
        if (!this.elements.questionNavigator) return;
        this.elements.questionNavigator.innerHTML = '';
        const total = (this.questions && this.questions.length) || 0;
        for (let i = 0; i < total; i++) {
            const btn = document.createElement('button');
            btn.className = `px-3 py-2 mr-1 mb-1 rounded ${i === this.currentQuestionIndex ? 'active' : ''}`;
            // show small badge if answered (during review it stays)
            if (this.userAnswers[this.questions[i].id]) {
                btn.innerHTML = `${i + 1} <span style="margin-left:.4rem;font-size:.7rem">●</span>`;
            } else {
                btn.textContent = i + 1;
            }
            btn.addEventListener('click', () => this.navigateToQuestion(i));
            this.elements.questionNavigator.appendChild(btn);
        }
    }

    navigateToQuestion(index) {
        if (!this.questions || index < 0 || index >= this.questions.length) return;
        this.loadQuestion(index);
        window.scrollTo(0,0);
    }

    async submitTest() {
        if (!confirm('Submit MCQ test now?')) return;

        const total = (this.questions && this.questions.length) || 0;
        let correct = 0;
        let wrong = 0;
        for (let q of this.questions) {
            const userAns = this.userAnswers[q.id];
            if (!userAns) { wrong++; continue; }
            if (userAns === q.correctAnswer) correct++;
            else wrong++;
        }
        const score = total > 0 ? Math.round((correct / total) * 100) : 0;
        const durationSec = this.startTime ? Math.round((Date.now() - this.startTime.getTime()) / 1000) : 0;

        const results = {
            testId: this.testId,
            studentId: this.studentId,
            studentName: this.studentName,
            testName: this.getTestDisplayName(this.currentTest),
            testCategory: this.currentTest,
            testType: 'MCQ',
            testMode: this.currentMode,
            totalQuestions: total,
            correctAnswers: correct,
            wrongAnswers: wrong,
            score: score,
            duration: durationSec,
            date: new Date().toISOString()
        };

        try {
            if (!window.firebaseInitialized) {
                if (typeof initFirebase === 'function') await initFirebase();
            }
            const db = firebase.firestore();
            await db.collection('test_results').add(results);

            // update student stats (mcq-specific)
            if (results.studentId) {
                await this.updateStudentStats(results);
            }

            // mark submitted and show results + review mode
            this.isSubmitted = true;

            // show results modal (existing)
            this.showResultsModal(results);
// show FULL SUMMARY PAGE (all questions + answers)
this.showFullSummary(results); 
            // re-render current question as review (show correct/wrong)
            this.renderQuestionNavigator();
            this.loadQuestion(this.currentQuestionIndex);

            // dispatch refresh for dashboard
            document.dispatchEvent(new CustomEvent('refreshDashboard', { detail: { studentId: results.studentId } }));
        } catch (err) {
            console.error('Error saving MCQ test results:', err);
            this.showToast('Error saving results. See console.', 'error');
        }
    }

    async updateStudentStats(results) {
        try {
            if (!results || !results.studentId) return;
            if (!window.firebaseInitialized) {
                if (typeof initFirebase === 'function') await initFirebase();
            }
            const db = firebase.firestore();
            const ref = db.collection('students').doc(results.studentId);
            const doc = await ref.get();
            const data = doc.exists ? (doc.data() || {}) : {};

            // counters
            const testsTaken = (data.testsTaken || 0) + 1;
            const mcqTestsTaken = (data.mcqTestsTaken || 0) + 1;

            // total score and averages: incorporate MCQ score as percentage
            const totalScore = (data.totalScore || 0) + (results.score || 0);
            const averageScore = Math.round(totalScore / testsTaken);

            // best MCQ and overall
            const bestMcqScore = Math.max(data.bestMcqScore || 0, results.score || 0);
            const bestScore = Math.max(data.bestScore || 0, results.score || 0);

            const payload = {
                testsTaken,
                mcqTestsTaken,
                totalScore,
                averageScore,
                bestMcqScore,
                bestScore,
                lastTestDate: firebase.firestore.FieldValue.serverTimestamp()
            };

            await ref.update(payload);
        } catch (err) {
            console.error('Error updating student stats for MCQ:', err);
        }
    }

    showResultsModal(results) {
        if (!this.elements.resultModal) {
            alert(`Test finished. Score: ${results.score}%`);
            return;
        }

        // configure modal for MCQ
        if (this.elements.resultTestName) this.elements.resultTestName.textContent = `${results.testName} - ${results.testMode === 'practice' ? 'Practice' : 'Main'}`;
        if (this.elements.mcqResults) this.elements.mcqResults.classList.remove('hidden');
        if (this.elements.typingResults) this.elements.typingResults.classList.add('hidden');

        if (this.elements.resultTotalQ) this.elements.resultTotalQ.textContent = results.totalQuestions || 0;
        if (this.elements.resultCorrect) this.elements.resultCorrect.textContent = results.correctAnswers || 0;
        if (this.elements.resultWrong) this.elements.resultWrong.textContent = results.wrongAnswers || 0;
        if (this.elements.resultScore) this.elements.resultScore.textContent = `${results.score || 0}%`;

        if (this.elements.resultIcon) {
            if (results.score >= 85) {
                this.elements.resultIcon.innerHTML = '<i class="fas fa-trophy text-4xl"></i>';
                this.elements.resultIcon.className = 'w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center';
            } else if (results.score >= 70) {
                this.elements.resultIcon.innerHTML = '<i class="fas fa-check-circle text-4xl"></i>';
                this.elements.resultIcon.className = 'w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center';
            } else if (results.score >= 50) {
                this.elements.resultIcon.innerHTML = '<i class="fas fa-exclamation-circle text-4xl"></i>';
                this.elements.resultIcon.className = 'w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center';
            } else {
                this.elements.resultIcon.innerHTML = '<i class="fas fa-times-circle text-4xl"></i>';
                this.elements.resultIcon.className = 'w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center';
            }
        }

        this.elements.resultModal.classList.remove('hidden');
    }
  // call this after tests are submitted to open the full summary page
  showFullSummary(results) {
    // hide test page and result modal (if any)
    if (this.elements.testPage) this.elements.testPage.classList.add('hidden');
    if (this.elements.resultModal) this.elements.resultModal.classList.add('hidden');

    // create quick refs to summary DOM
    const summaryPage = document.getElementById('mcqSummaryPage');
    const summaryList = document.getElementById('summaryList');
    const summaryTotal = document.getElementById('summaryTotal');
    const summaryCorrect = document.getElementById('summaryCorrect');
    const summaryWrong = document.getElementById('summaryWrong');
    const summaryScore = document.getElementById('summaryScore');
    const summaryTitle = document.getElementById('summaryTitle');

    if (!summaryPage || !summaryList || !summaryTotal) {
      console.warn('Summary DOM elements missing.');
      return;
    }

    // totals
    const total = results.totalQuestions || (this.questions && this.questions.length) || 0;
    const correct = results.correctAnswers || 0;
    const wrong = results.wrongAnswers || 0;
    const score = results.score || 0;

    summaryTotal.textContent = total;
    summaryCorrect.textContent = correct;
    summaryWrong.textContent = wrong;
    summaryScore.textContent = `${score}%`;
    summaryTitle.textContent = `${results.testName || 'MCQ Test'} — Summary`;

    // build list
    summaryList.innerHTML = '';
    this.questions.forEach((q, idx) => {
      const userSel = this.userAnswers[q.id] || null;
      const qCard = document.createElement('div');
      qCard.className = 'question-card';

      // question header
      const qHtml = document.createElement('div');
      qHtml.innerHTML = `<div class="font-semibold">Q${idx+1}. ${q.question || ''}</div>`;
      qCard.appendChild(qHtml);

      // options
      const optsWrap = document.createElement('div');
      optsWrap.className = 'mt-2';

      const options = Array.isArray(q.options) ? q.options.slice() : [];
      // keep original order if you want; if options were shuffled during test you might want to show actual shown order.
      // If you stored the shown order, use that. Here we assume options in q.options are the original choices.
      options.forEach(opt => {
        const optDiv = document.createElement('div');
        optDiv.className = 'option';

        // markers
        const isCorrect = opt === q.correctAnswer;
        const isPicked = userSel && userSel === opt;

        if (isCorrect) optDiv.classList.add('correct');
        if (isPicked) optDiv.classList.add('picked');
        if (isPicked && !isCorrect) optDiv.classList.add('wrong');

        optDiv.innerHTML = `
          <div><strong>${opt}</strong></div>
          <div class="marker">${isCorrect ? '✔' : (isPicked ? '✖' : '')}</div>
        `;
        optsWrap.appendChild(optDiv);
      });

      qCard.appendChild(optsWrap);

      // meta line
      const meta = document.createElement('div');
      meta.className = 'question-meta';
      meta.textContent = `Marked: ${userSel || '—'}  ·  Correct: ${q.correctAnswer || '—'}`;
      qCard.appendChild(meta);

      summaryList.appendChild(qCard);
    });

    // show summary page
    summaryPage.classList.remove('hidden');

    // wire close button
    const closeBtn = document.getElementById('closeSummaryBtn');
    if (closeBtn) {
      closeBtn.onclick = () => {
        summaryPage.classList.add('hidden');
        // go to dashboard
        const dashboard = document.getElementById('studentDashboard');
        if (dashboard) dashboard.classList.remove('hidden');
        // notify dashboard to refresh
        document.dispatchEvent(new CustomEvent('refreshDashboard', { detail: { studentId: this.studentId } }));
      };
    }

    // scroll to top of summary
    window.scrollTo(0,0);
  }

    confirmExitTest() {
        if (confirm('Exit test? Your progress will be lost.')) {
            this.cancelTest();
        }
    }

    cancelTest() {
        // reset local state and show dashboard
        this.questions = [];
        this.userAnswers = {};
        this.currentQuestionIndex = 0;
        this.isSubmitted = false;
        if (this.elements.testPage) this.elements.testPage.classList.add('hidden');
        const dashboard = document.getElementById('studentDashboard');
        if (dashboard) dashboard.classList.remove('hidden');
    }

    returnToDashboard() {
        if (this.elements.resultModal) this.elements.resultModal.classList.add('hidden');
        if (this.elements.testPage) this.elements.testPage.classList.add('hidden');
        const dashboard = document.getElementById('studentDashboard');
        if (dashboard) dashboard.classList.remove('hidden');

        // notify dashboard to refresh
        document.dispatchEvent(new CustomEvent('refreshDashboard', { detail: { studentId: this.studentId } }));
    }

    getTestDisplayName(cat) {
        const names = { python: 'Python', cpp: 'C++', html: 'HTML', css: 'CSS', tally: 'Tally', ccc: 'CCC', dca: 'DCA', javascript: 'JavaScript' };
        return names[cat] || (cat || 'MCQ Test');
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

// expose
let mcqTest;
document.addEventListener('DOMContentLoaded', () => {
    mcqTest = new MCQTest();
    window.mcqTest = mcqTest;
    console.log('✅ MCQTest module initialized (full)');
});
// ------- Safe attach for MCQTest / mcqTest -------
if (typeof window.MCQTest === 'undefined' && typeof MCQTest === 'function') {
  window.MCQTest = MCQTest;
}
if (!window.mcqTest && typeof window.MCQTest === 'function') {
  try { window.mcqTest = new window.MCQTest(); console.log('mcqTest auto-instantiated'); }
  catch (e) { console.warn('mcqTest instantiation failed (safe):', e); }
}
