// js/typing-test.js
/**
 * Typing Test Module (full, updated)
 * - NET WPM synced with accuracy: netWpm = grossWpm * (accuracy/100)
 * - Saves results to Firestore (collection: test_results)
 * - Updates student's language-wise best typing WPM (bestTypingWpmEnglish / bestTypingWpmHindi / bestTypingWpmKrutidev)
 * - Binds .start-typing-btn buttons (data-lang, data-mode)
 * - Supports Kruti Dev font for krutidev language
 * - Defensive & uses initFirebase() if present
 */

class TypingTest {
    constructor() {
        // state
        this.currentLanguage = null;
        this.currentMode = null;
        this.testParagraph = '';
        this.startTime = null;
        this.timer = null;
        this.duration = 300; // seconds, default 5 minutes
        this.elapsedTime = 0;
        this.totalCharacters = 0;
        this.correctCharacters = 0;
        this.errorCharacters = 0;
        this.isTestActive = false;
        this.testId = null;
        this.studentId = null;
        this.studentName = null;
        this.isComposing = false;

        // NEW: cache spans + render throttle
        this.textSpans = [];
        this._renderScheduled = false;

        // DOM references (safe)
        const getEl = id => document.getElementById(id) || null;
        this.elements = {
            typingPage: getEl('typingTestPage'),
            typingTestName: getEl('typingTestName'),
            typingTestMode: getEl('typingTestMode'),
            typingTimer: getEl('typingTimer'),
            liveWPM: getEl('liveWPM'),
            liveAccuracy: getEl('liveAccuracy'),
            totalChars: getEl('totalChars'),
            correctChars: getEl('correctChars'),
            errorChars: getEl('errorChars'),
            wordCount: getEl('wordCount'),
            typingProgress: getEl('typingProgress'),
            textDisplay: getEl('textDisplay'),
            typingInput: getEl('typingInput'),
            submitTypingBtn: getEl('submitTypingBtn'),
            exitTypingBtn: getEl('exitTypingBtn'),
            resultModal: getEl('resultModal'),
            resultIcon: getEl('resultIcon'),
            resultTestName: getEl('resultTestName'),
            mcqResults: getEl('mcqResults'),
            typingResults: getEl('typingResults'),
            resultWPM: getEl('resultWPM'),
            resultAccuracy: getEl('resultAccuracy'),
            resultChars: getEl('resultChars'),
            resultErrors: getEl('resultErrors'),
            closeResultModal: getEl('closeResultModal')
        };

        this.bindEvents();
    }

    bindEvents() {
        // Composition events for IME (Hindi input)
        if (this.elements.typingInput) {
            this.elements.typingInput.addEventListener('compositionstart', () => this.isComposing = true);
            this.elements.typingInput.addEventListener('compositionend', () => {
                this.isComposing = false;
                this.handleTyping();
            });
            this.elements.typingInput.addEventListener('input', () => {
                if (this.isComposing) return;
                this.handleTyping();
            });
        }

        if (this.elements.submitTypingBtn) {
            this.elements.submitTypingBtn.addEventListener('click', () => this.submitTest());
        }
        if (this.elements.exitTypingBtn) {
            this.elements.exitTypingBtn.addEventListener('click', () => this.confirmExitTest());
        }
        if (this.elements.closeResultModal) {
            this.elements.closeResultModal.addEventListener('click', () => this.returnToDashboard());
        }

        // duration selection buttons (in practice modal)
        document.querySelectorAll('.duration-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const durMin = parseInt(e.currentTarget.getAttribute('data-duration'), 10);
                if (!isNaN(durMin) && durMin > 0) {
                    this.duration = durMin * 60;
                } else {
                    this.duration = 300;
                }
                const modal = document.getElementById('typingPracticeModal');
                if (modal) modal.classList.add('hidden');
                this.startTest();
            });
        });

        const closeTypingModal = document.getElementById('closeTypingModal');
        if (closeTypingModal) {
            closeTypingModal.addEventListener('click', () => {
                const modal = document.getElementById('typingPracticeModal');
                if (modal) modal.classList.add('hidden');
            });
        }

        // bind start typing buttons (ensures these start tests)
        this.bindStartTypingButtons();
    }

    bindStartTypingButtons() {
        // Remove duplicate listeners by replacing nodes
        document.querySelectorAll('.start-typing-btn').forEach(btn => {
            try { btn.replaceWith(btn.cloneNode(true)); } catch (e) { /* ignore */ }
        });

        document.querySelectorAll('.start-typing-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang') || 'english';
                const mode = btn.getAttribute('data-mode') || 'practice';

                const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
                const studentId = localStorage.getItem('studentId') || null;
                const studentName = localStorage.getItem('studentName') || '';

                if (!isLoggedIn || !studentId) {
                    this.showToast('Please login as a student to start typing tests.', 'info');
                    document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
                    const loginPage = document.getElementById('loginPage');
                    if (loginPage) loginPage.classList.remove('hidden');
                    return;
                }

                this.start(lang, mode, studentId, studentName);
            });
        });
    }

    async start(language, mode = 'practice', studentId = null, studentName = '') {
        this.currentLanguage = language;
        this.currentMode = mode;
        this.studentId = studentId;
        this.studentName = studentName;
        this.testId = `typing_${language}_${mode}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

        if (mode === 'main') {
            // main test longer by default
            this.duration = 600;
            this.startTest();
        } else {
            const modal = document.getElementById('typingPracticeModal');
            if (modal) modal.classList.remove('hidden');
            else this.startTest();
        }
    }

    startTest() {
        // pick paragraph
        if (typeof window.getRandomTypingParagraph === 'function') {
            this.testParagraph = window.getRandomTypingParagraph(this.currentLanguage) || '';
        } else if (window.typingContent && Array.isArray(window.typingContent[this.currentLanguage])) {
            const arr = window.typingContent[this.currentLanguage];
            this.testParagraph = arr[Math.floor(Math.random() * arr.length)] || '';
        } else {
            this.testParagraph = '';
        }

        if (!this.testParagraph || this.testParagraph.trim() === '') {
            this.showToast('No typing content available for this language.', 'error');
            return;
        }

        // reset counters
        this.totalCharacters = 0;
        this.correctCharacters = 0;
        this.errorCharacters = 0;
        this.elapsedTime = 0;
        this.currentPosition = 0;
        this.isTestActive = true;

        // UI init
        if (this.elements.typingTestName) {
            this.elements.typingTestName.textContent = `${this.getLanguageDisplayName(this.currentLanguage)} Typing`;
        }
        if (this.elements.typingTestMode) {
            this.elements.typingTestMode.textContent = this.currentMode === 'practice' ? 'Practice' : 'Main Test';
        }

        // ⭐ NEW: Apply language-specific font (for Kruti Dev support)
        this.applyLanguageFont();

        // Build base spans once
        this.buildBaseTextSpans();

        // Initial highlighting (empty input)
        this.renderTextWithHighlighting();

        // enable input
        if (this.elements.typingInput) {
            this.elements.typingInput.value = '';
            this.elements.typingInput.disabled = false;
            this.elements.typingInput.placeholder = this.getPlaceholderText(); // ⭐ NEW: Language-specific placeholder
            this.elements.typingInput.focus();
        }

        // show page
        document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
        if (this.elements.typingPage) this.elements.typingPage.classList.remove('hidden');

        // start timer
        this.startTimer();
        window.scrollTo(0, 0);
    }

    // ⭐ NEW: Apply language-specific font
    applyLanguageFont() {
        const textDisplay = this.elements.textDisplay;
        const typingInput = this.elements.typingInput;

        // Remove all language-specific classes first
        const fontClasses = ['krutidev-text', 'hindi-text', 'english-text', 'krutidev-input', 'hindi-input', 'english-input'];
        
        if (textDisplay) {
            fontClasses.forEach(cls => textDisplay.classList.remove(cls));
            textDisplay.style.fontFamily = '';
            textDisplay.style.fontSize = '';
            textDisplay.style.lineHeight = '';
            textDisplay.style.letterSpacing = '';
        }
        if (typingInput) {
            fontClasses.forEach(cls => typingInput.classList.remove(cls));
            typingInput.style.fontFamily = '';
            typingInput.style.fontSize = '';
            typingInput.style.lineHeight = '';
        }

        // Apply appropriate font based on language
        const lang = (this.currentLanguage || '').toLowerCase();

        if (lang === 'krutidev') {
            // Apply Kruti Dev font
            const krutiDevFont = "'Kruti Dev 010', 'Kruti Dev', 'K010', serif";
            
            if (textDisplay) {
                textDisplay.classList.add('krutidev-text');
                textDisplay.style.fontFamily = krutiDevFont;
                textDisplay.style.fontSize = '1.4rem';
                textDisplay.style.lineHeight = '2.2';
                textDisplay.style.letterSpacing = '0.5px';
            }
            if (typingInput) {
                typingInput.classList.add('krutidev-input');
                typingInput.style.fontFamily = krutiDevFont;
                typingInput.style.fontSize = '1.3rem';
                typingInput.style.lineHeight = '1.8';
            }
            console.log('✅ Kruti Dev font applied');
            
        } else if (lang === 'hindi') {
            // Apply Hindi/Devanagari font
            const hindiFont = "'Noto Sans Devanagari', 'Mangal', 'Arial Unicode MS', sans-serif";
            
            if (textDisplay) {
                textDisplay.classList.add('hindi-text');
                textDisplay.style.fontFamily = hindiFont;
                textDisplay.style.fontSize = '1.3rem';
                textDisplay.style.lineHeight = '2';
            }
            if (typingInput) {
                typingInput.classList.add('hindi-input');
                typingInput.style.fontFamily = hindiFont;
                typingInput.style.fontSize = '1.2rem';
                typingInput.style.lineHeight = '1.8';
            }
            console.log('✅ Hindi (Devanagari) font applied');
            
        } else {
            // English - default font
            const englishFont = "'Inter', 'Segoe UI', 'Roboto', sans-serif";
            
            if (textDisplay) {
                textDisplay.classList.add('english-text');
                textDisplay.style.fontFamily = englishFont;
                textDisplay.style.fontSize = '1.1rem';
                textDisplay.style.lineHeight = '2';
            }
            if (typingInput) {
                typingInput.classList.add('english-input');
                typingInput.style.fontFamily = englishFont;
                typingInput.style.fontSize = '1.1rem';
                typingInput.style.lineHeight = '1.6';
            }
            console.log('✅ English font applied');
        }
    }

    // ⭐ NEW: Reset font styles when leaving test
    resetFontStyles() {
        const fontClasses = ['krutidev-text', 'hindi-text', 'english-text', 'krutidev-input', 'hindi-input', 'english-input'];
        
        if (this.elements.textDisplay) {
            fontClasses.forEach(cls => this.elements.textDisplay.classList.remove(cls));
            this.elements.textDisplay.style.fontFamily = '';
            this.elements.textDisplay.style.fontSize = '';
            this.elements.textDisplay.style.lineHeight = '';
            this.elements.textDisplay.style.letterSpacing = '';
        }
        if (this.elements.typingInput) {
            fontClasses.forEach(cls => this.elements.typingInput.classList.remove(cls));
            this.elements.typingInput.style.fontFamily = '';
            this.elements.typingInput.style.fontSize = '';
            this.elements.typingInput.style.lineHeight = '';
        }
    }

    // ⭐ NEW: Get placeholder text based on language
    getPlaceholderText() {
        const lang = (this.currentLanguage || '').toLowerCase();
        if (lang === 'krutidev') {
            return 'टाइप करना शुरू करें'; // "टाइप करना शुरू करें" in Kruti Dev encoding
        } else if (lang === 'hindi') {
            return 'यहाँ टाइप करना शुरू करें...';
        }
        return 'Start typing here...';
    }

    getLanguageDisplayName(lang) {
        const names = { 
            english: 'English', 
            hindi: 'Hindi (हिंदी)', 
            krutidev: 'Kruti Dev (कृति देव)' 
        };
        return names[lang] || lang || 'Typing';
    }

    startTimer() {
        if (this.timer) clearInterval(this.timer);
        this.startTime = new Date();
        this.elapsedTime = 0;
        this.timer = setInterval(() => {
            this.elapsedTime++;
            this.updateTimerDisplay();
            this.updateLiveStats();
            if (this.elapsedTime >= this.duration) this.autoSubmitTest();
        }, 1000);
    }

    updateTimerDisplay() {
        const remaining = Math.max(0, this.duration - this.elapsedTime);
        const m = Math.floor(remaining / 60);
        const s = remaining % 60;
        if (this.elements.typingTimer) {
            this.elements.typingTimer.textContent =
                `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        }
    }

    handleTyping() {
        if (!this.isTestActive || !this.elements.typingInput) return;

        const userInput = this.elements.typingInput.value;
        if (userInput.length > this.testParagraph.length) {
            this.elements.typingInput.value = userInput.slice(0, this.testParagraph.length);
            return;
        }

        // compute correct/error
        let correct = 0;
        let error = 0;
        for (let i = 0; i < userInput.length; i++) {
            if (userInput[i] === this.testParagraph[i]) correct++;
            else error++;
        }

        this.correctCharacters = correct;
        this.errorCharacters = error;
        this.totalCharacters = correct + error;
        this.currentPosition = userInput.length;

        this.renderTextWithHighlighting();
        this.updateLiveStats();
    }

    // NEW: build base spans only once for the current paragraph
    buildBaseTextSpans() {
        const container = this.elements.textDisplay;
        if (!container) return;

        container.innerHTML = '';
        this.textSpans = [];

        const frag = document.createDocumentFragment();
        const len = this.testParagraph.length;

        for (let i = 0; i < len; i++) {
            const ch = this.testParagraph[i];
            const span = document.createElement('span');
            span.textContent = ch; // preserve spaces/newlines (use CSS white-space: pre-wrap)
            span.dataset.index = String(i);
            frag.appendChild(span);
            this.textSpans.push(span);
        }

        container.appendChild(frag);
    }

    // UPDATED: fast, non-laggy highlighting
    renderTextWithHighlighting() {
        if (!this.elements.textDisplay) return;

        const container = this.elements.textDisplay;
        const userInput = (this.elements.typingInput && this.elements.typingInput.value) || '';

        // If spans not built or length changed (new paragraph), rebuild once
        if (!this.textSpans || this.textSpans.length !== this.testParagraph.length) {
            this.buildBaseTextSpans();
        }

        // Simple throttle so we don't schedule too many re-renders
        if (this._renderScheduled) return;
        this._renderScheduled = true;

        requestAnimationFrame(() => {
            this._renderScheduled = false;

            let currentSpan = null;
            const len = this.testParagraph.length;
            const inputLen = userInput.length;

            for (let i = 0; i < len; i++) {
                const span = this.textSpans[i];
                const ch = this.testParagraph[i];

                let cls = '';
                if (i < inputLen) {
                    cls = (userInput[i] === ch) ? 'correct-char' : 'error-char';
                } else if (i === inputLen) {
                    cls = 'current-pos';
                    currentSpan = span;
                }

                if (span.className !== cls) {
                    span.className = cls;
                }
            }

            // If user finished all chars, keep last char as "current" for scrolling
            if (!currentSpan && inputLen >= len && len > 0) {
                currentSpan = this.textSpans[len - 1];
            }

            // Progress %
            if (this.elements.typingProgress) {
                const pct = Math.round((inputLen / len) * 100) || 0;
                this.elements.typingProgress.textContent = `${pct}%`;
            }

            // Auto-scroll to keep current char in view
            try {
                if (currentSpan) {
                    currentSpan.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'nearest'
                    });
                } else if (this.currentPosition >= len) {
                    // if test finished, scroll to bottom
                    container.scrollTop = container.scrollHeight;
                }
            } catch (e) {
                console.warn('scrollIntoView failed', e);
            }
        });
    }

    updateLiveStats() {
        // update counts
        if (this.elements.totalChars) this.elements.totalChars.textContent = this.totalCharacters;
        if (this.elements.correctChars) this.elements.correctChars.textContent = this.correctCharacters;
        if (this.elements.errorChars) this.elements.errorChars.textContent = this.errorCharacters;

        // words estimate (5 chars = 1 word)
        const words = Math.floor(this.totalCharacters / 5);
        if (this.elements.wordCount) this.elements.wordCount.textContent = words;

        // accuracy
        const accuracy = this.totalCharacters > 0
            ? Math.round((this.correctCharacters / this.totalCharacters) * 100)
            : 100;
        if (this.elements.liveAccuracy) this.elements.liveAccuracy.textContent = `${accuracy}%`;

        // gross WPM (raw), minutes elapsed
        const minutesElapsed = this.elapsedTime > 0 ? (this.elapsedTime / 60) : 0;
        const grossWpm = minutesElapsed > 0 ? (words / minutesElapsed) : 0;

        // net WPM synced with accuracy
        const netWpm = Math.round(grossWpm * (accuracy / 100));

        if (this.elements.liveWPM) this.elements.liveWPM.textContent = netWpm;
    }

    async autoSubmitTest() {
        this.isTestActive = false;
        if (this.timer) clearInterval(this.timer);
        if (this.elements.typingInput) this.elements.typingInput.disabled = true;
        this.showToast('Time is up! Submitting your typing test...', 'info');

        // small delay to allow UI update
        setTimeout(async () => {
            const results = this.calculateResults();
            await this.saveResults(results);
            this.showResultsModal(results);
        }, 600);
    }

    async submitTest() {
        if (!this.isTestActive) return;
        if (!confirm('Submit typing test now?')) return;
        this.isTestActive = false;
        if (this.timer) clearInterval(this.timer);
        if (this.elements.typingInput) this.elements.typingInput.disabled = true;

        const results = this.calculateResults();
        await this.saveResults(results);
        this.showResultsModal(results);
    }

    calculateResults() {
        const minutesElapsed = this.elapsedTime > 0 ? (this.elapsedTime / 60) : 0;
        const words = Math.floor(this.totalCharacters / 5);
        const grossWpm = minutesElapsed > 0 ? (words / minutesElapsed) : 0;
        const accuracy = this.totalCharacters > 0
            ? Math.round((this.correctCharacters / this.totalCharacters) * 100)
            : 100;
        const netWpm = Math.round(grossWpm * (accuracy / 100));

        return {
            testId: this.testId,
            studentId: this.studentId,
            studentName: this.studentName,
            testName: `${this.getLanguageDisplayName(this.currentLanguage)} Typing`,
            testCategory: this.currentLanguage, // english / hindi / krutidev
            testType: 'Typing',
            testMode: this.currentMode,
            wpm: netWpm,              // NET WPM (accuracy-adjusted)
            rawWpm: Math.round(grossWpm),
            accuracy: accuracy,
            totalCharacters: this.totalCharacters,
            correctCharacters: this.correctCharacters,
            errorCharacters: this.errorCharacters,
            duration: this.elapsedTime, // seconds
            date: new Date().toISOString()
        };
    }

    async saveResults(results) {
        try {
            // ensure firebase
            if (!window.firebaseInitialized) {
                if (typeof initFirebase === 'function') await initFirebase();
            }
            const db = firebase.firestore();

            // save to test_results
            await db.collection('test_results').add(results);

            // update student doc language-wise
            if (results.studentId) {
                await this.updateStudentStats(results);
            }

            // dispatch dashboard refresh so UI updates
            document.dispatchEvent(new CustomEvent('refreshDashboard', {
                detail: { studentId: results.studentId }
            }));

            console.log('Typing test saved:', results);
        } catch (err) {
            console.error('Error saving typing results:', err);
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
            const typingTestsTaken = (data.typingTestsTaken || 0) + 1;

            // totalScore uses accuracy contribution from typing
            const totalScore = (data.totalScore || 0) + (results.accuracy || 0);
            const averageScore = Math.round(totalScore / testsTaken);
            const bestScore = Math.max(data.bestScore || 0, results.accuracy || 0);

            // ⭐ UPDATED: language-wise best WPM (including Kruti Dev)
            let bestEnglish = data.bestTypingWpmEnglish || 0;
            let bestHindi = data.bestTypingWpmHindi || 0;
            let bestKrutidev = data.bestTypingWpmKrutidev || 0;
            
            const cat = (results.testCategory || '').toLowerCase();
            if (cat === 'english') {
                bestEnglish = Math.max(bestEnglish, results.wpm || 0);
            } else if (cat === 'hindi') {
                bestHindi = Math.max(bestHindi, results.wpm || 0);
            } else if (cat === 'krutidev') {
                bestKrutidev = Math.max(bestKrutidev, results.wpm || 0);
            }

            // update payload
            const payload = {
                testsTaken,
                typingTestsTaken,
                totalScore,
                averageScore,
                bestScore,
                bestTypingWpmEnglish: bestEnglish,
                bestTypingWpmHindi: bestHindi,
                bestTypingWpmKrutidev: bestKrutidev, // ⭐ NEW: Track Kruti Dev WPM
                lastTestDate: firebase.firestore.FieldValue.serverTimestamp()
            };

            await ref.update(payload);
        } catch (err) {
            console.error('Error updating student stats for typing:', err);
        }
    }

    showResultsModal(results) {
        if (!this.elements.resultModal) {
            alert(`Typing complete — WPM: ${results.wpm}, Accuracy: ${results.accuracy}%`);
            return;
        }

        // configure modal for typing
        if (this.elements.resultTestName) {
            this.elements.resultTestName.textContent =
                `${results.testName} - ${results.testMode === 'practice' ? 'Practice' : 'Main'}`;
        }
        if (this.elements.mcqResults) this.elements.mcqResults.classList.add('hidden');
        if (this.elements.typingResults) this.elements.typingResults.classList.remove('hidden');

        if (this.elements.resultWPM) this.elements.resultWPM.textContent = results.wpm;
        if (this.elements.resultAccuracy) this.elements.resultAccuracy.textContent = `${results.accuracy}%`;
        if (this.elements.resultChars) this.elements.resultChars.textContent = results.totalCharacters || 0;
        if (this.elements.resultErrors) this.elements.resultErrors.textContent = results.errorCharacters || 0;

        if (this.elements.resultIcon) {
            if (results.accuracy >= 85) {
                this.elements.resultIcon.innerHTML = '<i class="fas fa-trophy text-4xl"></i>';
                this.elements.resultIcon.className = 'w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center bg-yellow-100 text-yellow-600';
            } else if (results.accuracy >= 70) {
                this.elements.resultIcon.innerHTML = '<i class="fas fa-check-circle text-4xl"></i>';
                this.elements.resultIcon.className = 'w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center bg-green-100 text-green-600';
            } else if (results.accuracy >= 50) {
                this.elements.resultIcon.innerHTML = '<i class="fas fa-exclamation-circle text-4xl"></i>';
                this.elements.resultIcon.className = 'w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center bg-orange-100 text-orange-600';
            } else {
                this.elements.resultIcon.innerHTML = '<i class="fas fa-times-circle text-4xl"></i>';
                this.elements.resultIcon.className = 'w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center bg-red-100 text-red-600';
            }
        }

        this.elements.resultModal.classList.remove('hidden');
    }

    confirmExitTest() {
        if (confirm('Exit typing test? Progress will be lost.')) {
            this.cancelTest();
        }
    }

    cancelTest() {
        this.isTestActive = false;
        if (this.timer) clearInterval(this.timer);
        if (this.elements.typingInput) this.elements.typingInput.disabled = false;
        
        // ⭐ NEW: Reset font styles when canceling
        this.resetFontStyles();
        
        // show dashboard
        document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
        const dashboard = document.getElementById('studentDashboard');
        if (dashboard) dashboard.classList.remove('hidden');
    }

    returnToDashboard() {
        if (this.elements.resultModal) this.elements.resultModal.classList.add('hidden');
        
        // ⭐ NEW: Reset font styles when returning to dashboard
        this.resetFontStyles();
        
        document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
        const dashboard = document.getElementById('studentDashboard');
        if (dashboard) dashboard.classList.remove('hidden');

        // notify dashboard to refresh
        document.dispatchEvent(new CustomEvent('refreshDashboard', {
            detail: { studentId: this.studentId }
        }));
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

// export
let typingTest;
document.addEventListener('DOMContentLoaded', () => {
    typingTest = new TypingTest();
    window.typingTest = typingTest;
    console.log('✅ TypingTest module initialized (with Kruti Dev support)');
});

// ------- Safe attach for TypingTest / typingTest -------
if (typeof window.TypingTest === 'undefined' && typeof TypingTest === 'function') {
    window.TypingTest = TypingTest;
}
if (!window.typingTest && typeof window.TypingTest === 'function') {
    try {
        window.typingTest = new window.TypingTest();
        console.log('typingTest auto-instantiated');
    } catch (e) {
        console.warn('typingTest instantiation failed (safe):', e);
    }
}