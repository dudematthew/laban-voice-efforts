// ─── DATA ─────────────────────────────────────────────
function labana() {
    return {
        // ── mode ──
        mode: 'flash',

        // ── modal state ──
        modalOpen: false,
        imageZoomed: false,
        welcomeModalOpen: false,

        // ── quiz type ──
        quizType: 'name-to-code',
        quizTypeLabel: 'Wybierz kod tego wysiłku',

        // ── efforts ──
        efforts: [
            {
                name: 'Uderzający', code: 'SNB', ciezar: 'S', czas: 'N', prz: 'B',
                desc: 'Silny, nagły i bezpośredni. Mocny, eksplozywny wydech wspierany przeponą. Dźwięk jest ostry, precyzyjny i celowany - jak fizyczne uderzenie pięścią.',
                example: 'Stanowczy rozkaz, gniewny okrzyk "Nie!", zdecydowane hasło.',
                audio: 'audio/uderzajacy.mp3'
            },
            {
                name: 'Trzepiący', code: 'DNP', ciezar: 'D', czas: 'N', prz: 'P',
                desc: 'Lekki, nagły i pośredni. Dźwięk jest "rzucany" lub "strzepywany" bez ciężaru. Głos jest wszędzie dookoła, lekki ale bez konkretnego kierunku.',
                example: 'Szybka, lekceważąca uwaga rzucona przez ramię, nerwowy chichot, ironiczny komentarz.',
                audio: 'audio/trzepiacy.mp3'
            },
            {
                name: 'Naciskający', code: 'STB', ciezar: 'S', czas: 'T', prz: 'B',
                desc: 'Silny, ciągły i bezpośredni. Utrzymuj stały, kontrolowany nacisk głosowy z silnym wsparciem oddechu. Dźwięk jest gęsty, intensywny i nieprzerwanie ukierunkowany naprzód.',
                example: 'Powolna groźba, dobitne czytanie wyroku, uporczywe argumentowanie, wolne ale stanowcze oświadczenie.',
                audio: 'audio/naciskajacy.mp3'
            },
            {
                name: 'Dotykający', code: 'DNB', ciezar: 'D', czas: 'N', prz: 'B',
                desc: 'Lekki, nagły i bezpośredni. Krótkie, precyzyjne "pchnięcia" dźwiękiem. Każda sylaba jest oddzielona i wyraźna, jak punktowy dotyk.',
                example: 'Szeptane wyznanie, dyktowanie numeru telefonu.',
                audio: 'audio/dotykajacy.mp3'
            },
            {
                name: 'Sunący', code: 'DTB', ciezar: 'D', czas: 'T', prz: 'B',
                desc: 'Lekki, ciągły i bezpośredni. Płynny, nieprzerwany strumień dźwięku łagodnie prowadzony do przodu. Oddech spokojny, krtań rozluźniona.',
                example: 'Spokojny narrator audiobooka, łagodne pocieszanie, melodyjne opowiadanie historii.',
                audio: 'audio/sunacy.mp3'
            },
            {
                name: 'Unoszący', code: 'DTP', ciezar: 'D', czas: 'T', prz: 'P',
                desc: 'Lekki, ciągły i pośredni. Dźwięk "unosi się" lub "dryfuje" bez wyraźnego kierunku. Minimalne napięcie strun, barwa eteryczna i rozmyta.',
                example: 'Marzycielskie mówienie do siebie, głos w transie, delikatne nucenie.',
                audio: 'audio/unoszacy.mp3'
            },
            {
                name: 'Wykręcający', code: 'STP', ciezar: 'S', czas: 'T', prz: 'P',
                desc: 'Silny, ciągły i pośredni. Napięty, skręcający wysiłek z wewnętrznym oporem. Dźwięk jakby \'wykręcany\' pod presją, z trudem - jak mówienie przez zaciśnięte mięśnie.',
                example: 'Głos pełen stłumionego gniewu, mówienie przez ściśnięte gardło, wypowiadanie trudnych słów przez wewnętrzny opór.',
                audio: 'audio/wykrecajacy.mp3'
            },
            {
                name: 'Tnący', code: 'SNP', ciezar: 'S', czas: 'N', prz: 'P',
                desc: 'Silny, nagły i pośredni. Eksplozywny, szeroki wysiłek rozlewający się na wszystkie strony. Dźwięk jak szybkie, agresywne cięcie mieczem - gwałtowny, ale bez precyzyjnego celu.',
                example: 'Sarkastyczny wybuch śmiechu, gwałtowne machnięcie ręką w złości, histeryczny atak śmiechu.',
                audio: 'audio/tnacy.mp3'
            },
        ],

        // ── modifiers pool ──
        modPool: {
            'Tekstura': ['Sucha', 'Oddychająca'],
            'Położenie': ['Normalne', 'Nosowe', 'Gardłowe'],
            'Tempo': ['Średnie', 'Powolne', 'Szybkie'],
            'Głośność': ['Średni', 'Cichy', 'Głośny'],
            'Ton': ['Bezstronny', 'Przyjazny', 'Agresywny'],
            'Akcent': ['Brak', 'Obecny'],
            'Problemy': ['Brak', 'Seplenienie', 'Reranie', 'Jąkanie'],
            'Wiek': ['Średni', 'Młody', 'Stary'],
            'Płeć': ['Mężczyzna', 'Kobieta'],
            'Wielkość': ['Średni', 'Mały', 'Wielki'],
        },

        // ── flashcard state ──
        flashQueue: [],
        flashIndex: 0,
        flashTotal: 8,  // fixed: number of efforts (progress denominator)
        flashFlipped: false,
        flashScore: { know: 0, dontknow: 0, streak: 0, bestStreak: 0 },

        // ── quiz state ──
        quizQueue: [],
        quizQ: {},
        quizOptions: [],
        quizAnswered: false,
        quizPicked: -1,
        quizCorrect: false,
        quizScore: { correct: 0, wrong: 0, streak: 0, bestStreak: 0 },

        // ── GM state ──
        gmCombo: { effort: {}, mods: [] },
        gmRevealed: false,
        gmAnswer: '',

        // ── audio state ──
        currentAudio: null,
        currentAudioEffort: null,  // effort.code of the audio in currentAudio (for pause/resume)
        playingAudio: null,
        playingAxis: null,  // 'ciezar' | 'czas' | 'prz' when playing axis demo
        axisDemos: { ciezar: 'audio/ciezar.mp3', czas: 'audio/czas.mp3', prz: 'audio/przestrzen.mp3' },

        // ─── INIT ────────────────────────────────────
        init() {
            this.resetFlash();
            this.nextQuiz();
            this.rollGM();

            // Check if user has seen welcome modal
            if (!localStorage.getItem('labana-welcome-seen')) {
                this.welcomeModalOpen = true;
                localStorage.setItem('labana-welcome-seen', 'true');
            }

            // Block scroll when any modal is open
            this.$watch('welcomeModalOpen', (isOpen) => {
                if (isOpen) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });

            // Initialization of custom zoom
            this.$watch('modalOpen', (isOpen) => {
                if (isOpen) {
                    this.$nextTick(() => {
                        this.setupCustomZoom();
                    });
                } else {
                    this.cleanupCustomZoom();
                }
            });
        },

        setupCustomZoom() {
            const img = document.getElementById('cheatsheet-img');
            if (!img) return;

            let isZoomed = false;
            let scale = 2;
            let posX = 0;
            let posY = 0;
            let isDragging = false;
            let startX, startY;

            // Save the original source
            const originalSrc = img.src;

            img.style.cursor = 'zoom-in';
            img.style.transition = 'transform 0.3s ease';

            img.onclick = (e) => {
                e.stopPropagation();

                if (!isZoomed) {
                    // Turn on zoom
                    isZoomed = true;
                    img.style.cursor = 'grab';
                    img.style.transform = `scale(${scale}) translate(${posX}px, ${posY}px)`;
                    img.style.transformOrigin = 'center center';

                    // Add overlay so it can be dragged out of the picture
                    const overlay = document.createElement('div');
                    overlay.style.position = 'fixed';
                    overlay.style.top = '0';
                    overlay.style.left = '0';
                    overlay.style.right = '0';
                    overlay.style.bottom = '0';
                    overlay.style.zIndex = '10000';
                    overlay.style.cursor = 'grab';
                    overlay.id = 'zoom-overlay';
                    document.body.appendChild(overlay);

                    // Close zoom after clicking the overlay
                    overlay.onclick = (e) => {
                        if (e.target === overlay) {
                            closeZoom();
                        }
                    };

                    // Dragging functions
                    const startDrag = (e) => {
                        isDragging = true;
                        img.style.cursor = 'grabbing';
                        overlay.style.cursor = 'grabbing';

                        const clientX = e.clientX || e.touches[0].clientX;
                        const clientY = e.clientY || e.touches[0].clientY;
                        startX = clientX - posX;
                        startY = clientY - posY;

                        e.preventDefault();
                    };

                    const doDrag = (e) => {
                        if (!isDragging) return;

                        const clientX = e.clientX || e.touches[0].clientX;
                        const clientY = e.clientY || e.touches[0].clientY;

                        posX = clientX - startX;
                        posY = clientY - startY;

                        img.style.transform = `scale(${scale}) translate(${posX}px, ${posY}px)`;
                        img.style.transition = 'none';
                    };

                    const stopDrag = () => {
                        isDragging = false;
                        img.style.cursor = 'grab';
                        if (overlay) overlay.style.cursor = 'grab';
                        img.style.transition = 'transform 0.3s ease';
                    };

                    // Add event listener for mouse 
                    img.addEventListener('mousedown', startDrag);
                    overlay.addEventListener('mousedown', startDrag);
                    document.addEventListener('mousemove', doDrag);
                    document.addEventListener('mouseup', stopDrag);

                    // Add event listener for touch
                    img.addEventListener('touchstart', startDrag);
                    overlay.addEventListener('touchstart', startDrag);
                    document.addEventListener('touchmove', doDrag);
                    document.addEventListener('touchend', stopDrag);

                    // Add ESC key
                    const keyHandler = (e) => {
                        if (e.key === 'Escape') {
                            closeZoom();
                        }
                    };
                    document.addEventListener('keydown', keyHandler);

                    // Save the function for later removall
                    img._zoomHandlers = { startDrag, doDrag, stopDrag, keyHandler, closeZoom };
                } else {
                    closeZoom();
                }

                function closeZoom() {
                    isZoomed = false;
                    img.style.transform = 'scale(1)';
                    img.style.cursor = 'zoom-in';
                    img.style.transition = 'transform 0.3s ease';

                    posX = 0;
                    posY = 0;

                    // Remove overlay
                    const overlay = document.getElementById('zoom-overlay');
                    if (overlay) overlay.remove();

                    // Remove event listeners
                    if (img._zoomHandlers) {
                        img.removeEventListener('mousedown', img._zoomHandlers.startDrag);
                        document.removeEventListener('mousemove', img._zoomHandlers.doDrag);
                        document.removeEventListener('mouseup', img._zoomHandlers.stopDrag);
                        img.removeEventListener('touchstart', img._zoomHandlers.startDrag);
                        document.removeEventListener('touchmove', img._zoomHandlers.doDrag);
                        document.removeEventListener('touchend', img._zoomHandlers.stopDrag);
                        document.removeEventListener('keydown', img._zoomHandlers.keyHandler);

                        delete img._zoomHandlers;
                    }
                }
            };
        },

        cleanupCustomZoom() {
            const img = document.getElementById('cheatsheet-img');
            if (!img) return;

            // Reset the style
            img.style.transform = 'scale(1)';
            img.style.cursor = 'zoom-in';

            // Remove the overlay if exists
            const overlay = document.getElementById('zoom-overlay');
            if (overlay) overlay.remove();

            // Remove event listeners
            if (img._zoomHandlers) {
                img.removeEventListener('mousedown', img._zoomHandlers.startDrag);
                document.removeEventListener('mousemove', img._zoomHandlers.doDrag);
                document.removeEventListener('mouseup', img._zoomHandlers.stopDrag);
                img.removeEventListener('touchstart', img._zoomHandlers.startDrag);
                document.removeEventListener('touchmove', img._zoomHandlers.doDrag);
                document.removeEventListener('touchend', img._zoomHandlers.stopDrag);
                document.removeEventListener('keydown', img._zoomHandlers.keyHandler);

                delete img._zoomHandlers;
            }

            img.onclick = null;
        },

        switchMode(m) {
            // Stop any playing audio when switching modes
            this.stopAudio();
            this.mode = m;
        },

        // ═══════════════════════════════════════════════
        // FLASHCARDS
        // ═══════════════════════════════════════════════
        resetFlash() {
            this.flashQueue = this.shuffle([...this.efforts]);
            this.flashIndex = 0;
            this.flashTotal = this.efforts.length;
            this.flashFlipped = false;
            this.flashScore = { know: 0, dontknow: 0, streak: 0, bestStreak: 0 };
        },

        currentFlash() {
            return this.flashQueue[this.flashIndex] || this.efforts[0];
        },

        rateFlash(knows) {
            if (knows) {
                this.flashScore.know++;
                this.flashScore.streak++;
                if (this.flashScore.streak > this.flashScore.bestStreak)
                    this.flashScore.bestStreak = this.flashScore.streak;
            } else {
                this.flashScore.dontknow++;
                this.flashScore.streak = 0;
                // put it back in queue (near end) so it repeats
                const card = this.flashQueue[this.flashIndex];
                const remaining = this.flashQueue.slice(this.flashIndex + 1);
                const insertAt = Math.max(0, remaining.length - 2);
                remaining.splice(insertAt, 0, card);
                this.flashQueue = [...this.flashQueue.slice(0, this.flashIndex + 1), ...remaining];
            }
            this.flashIndex++;
            this.flashFlipped = false;
            // End round when we've rated past the last card in the queue
            if (this.flashIndex >= this.flashQueue.length) {
                this.flashQueue = [];
            }
        },

        // ═══════════════════════════════════════════════
        // QUIZ
        // ═══════════════════════════════════════════════
        nextQuiz() {
            this.quizAnswered = false;
            this.quizPicked = -1;
            this.quizCorrect = false;

            // Initialize or refill queue when empty
            if (this.quizQueue.length === 0) {
                this.quizQueue = this.shuffle([...this.efforts]);

                // Avoid same question twice in a row across rounds
                if (this.quizQ && this.quizQueue[0].code === this.quizQ.code && this.quizQueue.length > 1) {
                    // Swap first with second
                    [this.quizQueue[0], this.quizQueue[1]] = [this.quizQueue[1], this.quizQueue[0]];
                }
            }

            // Update label based on quiz type
            switch (this.quizType) {
                case 'name-to-code': this.quizTypeLabel = 'Wybierz kombinację (kod) tego wysiłku'; break;
                case 'code-to-name': this.quizTypeLabel = 'Wybierz nazwę dla tej kombinacji'; break;
                case 'name-to-desc': this.quizTypeLabel = 'Wybierz opis tego wysiłku'; break;
                case 'desc-to-name': this.quizTypeLabel = 'Wybierz nazwę tego opisu'; break;
            }

            // Pick from queue
            this.quizQ = this.quizQueue.shift();

            // build options based on quiz type
            const wrong = this.efforts.filter(e => e.code !== this.quizQ.code);
            const chosen = this.shuffle(wrong).slice(0, 3);

            let options = [];
            if (this.quizType === 'name-to-code') {
                options = this.shuffle([
                    { ...this.quizQ, isCorrect: true },
                    ...chosen.map(e => ({ ...e, isCorrect: false }))
                ]);
            } else if (this.quizType === 'code-to-name') {
                options = this.shuffle([
                    { ...this.quizQ, isCorrect: true },
                    ...chosen.map(e => ({ ...e, isCorrect: false }))
                ]);
            } else if (this.quizType === 'name-to-desc') {
                options = this.shuffle([
                    { ...this.quizQ, isCorrect: true },
                    ...chosen.map(e => ({ ...e, isCorrect: false }))
                ]);
            } else if (this.quizType === 'desc-to-name') {
                options = this.shuffle([
                    { ...this.quizQ, isCorrect: true },
                    ...chosen.map(e => ({ ...e, isCorrect: false }))
                ]);
            }

            this.quizOptions = options;
        },

        answerQuiz(idx) {
            if (this.quizAnswered) return;
            this.quizAnswered = true;
            this.quizPicked = idx;
            this.quizCorrect = this.quizOptions[idx].isCorrect;
            if (this.quizCorrect) {
                this.quizScore.correct++;
                this.quizScore.streak++;
                if (this.quizScore.streak > this.quizScore.bestStreak)
                    this.quizScore.bestStreak = this.quizScore.streak;
            } else {
                this.quizScore.wrong++;
                this.quizScore.streak = 0;
            }
        },

        // ═══════════════════════════════════════════════
        // GM MODE
        // ═══════════════════════════════════════════════
        rollGM() {
            this.gmRevealed = false;
            this.gmAnswer = '';

            const effort = this.pick(this.efforts);

            // pick a random subset of modifiers (3-6 mods), always include Płeć + Wiek
            const cats = Object.keys(this.modPool);
            const forced = ['Płeć', 'Wiek', 'Wielkość'];
            const optional = cats.filter(c => !forced.includes(c));
            const extraCount = 2 + Math.floor(Math.random() * 3); // 2-4 extra
            const extraCats = this.shuffle(optional).slice(0, extraCount);
            const allCats = [...forced, ...extraCats];

            const mods = allCats.map(cat => ({
                cat: cat,
                val: this.pick(this.modPool[cat])
            }));

            this.gmCombo = { effort, mods };

            // build answer text
            this.gmAnswer = this.buildGMAnswer(effort, mods);
        },

        buildGMAnswer(effort, mods) {
            const modMap = {};
            mods.forEach(m => { modMap[m.cat] = m.val; });

            let parts = [];

            // Start from effort base
            parts.push(effort.desc);

            // layer modifiers into description
            const plyc = modMap['Płeć'] || 'Mężczyzna';
            const wiek = modMap['Wiek'] || 'Średni';
            const wielkość = modMap['Wielkość'] || 'Średni';
            const tekstura = modMap['Tekstura'];
            const położenie = modMap['Położenie'];
            const tempo = modMap['Tempo'];
            const głośność = modMap['Głośność'];
            const ton = modMap['Ton'];
            const akcent = modMap['Akcent'];
            const problemy = modMap['Problemy'];

            let persona = '';
            if (wielkość === 'Mały') persona = (plyc === 'Kobieta' ? 'Drobna kobieta' : 'Drobny mężczyzna');
            else if (wielkość === 'Wielki') persona = (plyc === 'Kobieta' ? 'Solidna kobieta' : 'Solidny mężczyzna');
            else persona = (plyc === 'Kobieta' ? 'Kobieta' : 'Mężczyzna');

            if (wiek === 'Młody') persona += ' młoda';
            else if (wiek === 'Stary') persona += ' stara';

            parts.push(persona + '.');

            let extra = [];
            if (tekstura === 'Sucha') extra.push('Głos suchy, bez wilgoci');
            if (tekstura === 'Oddychająca') extra.push('Głos oddychający, ciepły');
            if (położenie === 'Nosowe') extra.push('z rezonansem nosowym');
            if (położenie === 'Gardłowe') extra.push('głębokim, gardłowym');
            if (tempo === 'Powolne') extra.push('mówi powoli');
            if (tempo === 'Szybkie') extra.push('mówi szybko');
            if (głośność === 'Cichy') extra.push('bardzo cicho');
            if (głośność === 'Głośny') extra.push('głośno i wyraźnie');
            if (ton === 'Przyjazny') extra.push('w przyjaznym tonie');
            if (ton === 'Agresywny') extra.push('w agresywnym, ostrym tonie');
            if (akcent === 'Obecny') extra.push('z wyraźnym akcentem');
            if (problemy === 'Seplenienie') extra.push('sepleni');
            if (problemy === 'Reranie') extra.push('rere');
            if (problemy === 'Jąkanie') extra.push('jąka się');

            if (extra.length) parts.push(extra.join(', ') + '.');

            return parts.join(' ');
        },

        // ═══════════════════════════════════════════════
        // HELPERS
        // ═══════════════════════════════════════════════
        axisLabel(effort) {
            if (!effort || !effort.code) return '';
            const c = { S: 'Stanowczy', D: 'Delikatny' };
            const t = { N: 'Nagły', T: 'Trwały' };
            const p = { B: 'Bezpośredni', P: 'Pośredni' };
            return [c[effort.ciezar], t[effort.czas], p[effort.prz]].filter(Boolean).join('  ');
        },

        // Returns [ciężar word, czas word, przestrzeń word] for coloured display
        axisWords(effort) {
            if (!effort) return ['', '', ''];
            const c = { S: 'Stanowczy', D: 'Delikatny' };
            const t = { N: 'Nagły', T: 'Trwały' };
            const p = { B: 'Bezpośredni', P: 'Pośredni' };
            return [c[effort.ciezar] || '', t[effort.czas] || '', p[effort.prz] || ''];
        },

        shuffle(arr) {
            const a = [...arr];
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        },

        pick(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        },

        // ═══════════════════════════════════════════════
        // AUDIO PLAYBACK
        // ═══════════════════════════════════════════════
        stopAudio() {
            if (this.currentAudio) {
                this.currentAudio.pause();
                this.currentAudio.currentTime = 0;
                this.currentAudio = null;
            }
            this.currentAudioEffort = null;
            this.playingAudio = null;
            this.playingAxis = null;
        },

        playAudio(effort) {
            if (this.playingAxis) this.stopAudio();
            // Same effort: toggle pause / resume
            if (this.currentAudioEffort === effort.code) {
                if (this.currentAudio.paused) {
                    this.currentAudio.play().catch(() => { });
                    this.playingAudio = effort.code;
                } else {
                    this.currentAudio.pause();
                    this.playingAudio = null;
                }
                return;
            }

            // Different effort or none: stop current and start this one
            this.stopAudio();

            const audio = new Audio(effort.audio);
            this.currentAudio = audio;
            this.currentAudioEffort = effort.code;
            this.playingAudio = effort.code;

            audio.onended = () => {
                this.playingAudio = null;
                this.currentAudio = null;
                this.currentAudioEffort = null;
            };

            audio.onerror = () => {
                console.warn(`Audio file not found: ${effort.audio}`);
                this.playingAudio = null;
                this.currentAudio = null;
                this.currentAudioEffort = null;
            };

            audio.play().catch(err => {
                console.warn('Audio playback failed:', err);
                this.playingAudio = null;
                this.currentAudio = null;
                this.currentAudioEffort = null;
            });
        },

        isPlaying(effortCode) {
            return this.playingAudio === effortCode;
        },

        playAxisDemo(axisKey) {
            if (this.playingAxis === axisKey && this.currentAudio) {
                if (this.currentAudio.paused) {
                    this.currentAudio.play().catch(() => { });
                    this.playingAxis = axisKey;
                } else {
                    this.currentAudio.pause();
                    this.playingAxis = null;
                }
                return;
            }
            this.stopAudio();
            const src = this.axisDemos[axisKey];
            if (!src) return;
            const audio = new Audio(src);
            this.currentAudio = audio;
            this.playingAxis = axisKey;

            audio.onended = () => {
                this.playingAxis = null;
                this.currentAudio = null;
            };
            audio.onerror = () => {
                console.warn(`Axis demo not found: ${src}`);
                this.playingAxis = null;
                this.currentAudio = null;
            };
            audio.play().catch(err => {
                console.warn('Axis demo playback failed:', err);
                this.playingAxis = null;
                this.currentAudio = null;
            });
        },

        isPlayingAxis(axisKey) {
            return this.playingAxis === axisKey;
        }
    };
}
