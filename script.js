// ─── DATA ─────────────────────────────────────────────
function labana() {
    return {
        // ── mode ──
        mode: 'flash',

        // ── modal state ──
        modalOpen: false,
        imageZoomed: false,

        // ── quiz type ──
        quizType: 'name-to-code',
        quizTypeLabel: 'Wybierz kod tego wysiłku',

        // ── efforts ──
        efforts: [
            {
                name: 'Uderzający', code: 'SNB', ciezar: 'S', czas: 'N', prz: 'B',
                desc: 'Silny, nagły i bezpośredni. Zaangażuj mocny wydech wspierany mięśniami brzucha. Krtań krótkotrwale się zaciska. Dźwięk jest jak precyzyjne uderzenie.',
                example: 'Stanowczy rozkaz, gniewny okrzyk "Nie!", zdecydowane hasło.',
                audio: 'audio/uderzajacy.mp3'
            },
            {
                name: 'Trzepiący', code: 'DNP', ciezar: 'D', czas: 'N', prz: 'P',
                desc: 'Lekki, nagły i pośredni. Dźwięk jest "rzucany" lub "strzepywany" bez ciężaru. Powietrze ulatnia się swobodnie, prawie bez oporu w krtani.',
                example: 'Sarkastyczna uwaga rzucona w powietrze, nerwowy śmiech, lekceważący komentarz.',
                audio: 'audio/trzepiacy.mp3'
            },
            {
                name: 'Naciskający', code: 'STB', ciezar: 'S', czas: 'T', prz: 'B',
                desc: 'Silny, ciągły i bezpośredni. Utrzymuj stały nacisk na struny głosowe i kontrolowany wydech. Dźwięk jest gęsty, intensywny i uporczywie ukierunkowany.',
                example: 'Powolna groźba, dobitne czytanie wyroku, mówienie przez zaciśnięte zęby w gniewie.',
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
                name: 'Wykręcający', code: 'SNP', ciezar: 'S', czas: 'N', prz: 'P',
                desc: 'Silny, nagły i pośredni. Ostry, szarpiący wysiłek rozlewający się na boki. Intensywny, ale pozbawiony precyzyjnego skupienia.',
                example: 'Szyderczy śmiech, histeryczny krzyk, nagły wybuch frustracji.',
                audio: 'audio/wykrecajacy.mp3'
            },
            {
                name: 'Tnący', code: 'STP', ciezar: 'S', czas: 'T', prz: 'P',
                desc: 'Silny, ciągły i pośredni. Stałe napięcie z wewnętrznym oporem i "skręceniem". Dźwięk jest "wyżymany" z trudem, z poczuciem cierpienia.',
                example: 'Głos tłumiący płacz, mówienie przez ból, monolog pełen wewnętrznej agonii.',
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

        // ─── INIT ────────────────────────────────────
        init() {
            this.resetFlash();
            this.nextQuiz();
            this.rollGM();

            // Inicjalizacja własnego zoomu
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

            // Zapisz oryginalne źródło
            const originalSrc = img.src;

            img.style.cursor = 'zoom-in';
            img.style.transition = 'transform 0.3s ease';

            img.onclick = (e) => {
                e.stopPropagation();

                if (!isZoomed) {
                    // Włącz zoom
                    isZoomed = true;
                    img.style.cursor = 'grab';
                    img.style.transform = `scale(${scale}) translate(${posX}px, ${posY}px)`;
                    img.style.transformOrigin = 'center center';

                    // Dodaj overlay, żeby można było przeciągać poza obrazek
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

                    // Funkcja do zamykania zoomu po kliknięciu w overlay
                    overlay.onclick = (e) => {
                        if (e.target === overlay) {
                            closeZoom();
                        }
                    };

                    // Funkcje przeciągania
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

                    // Dodaj event listeners dla myszy
                    img.addEventListener('mousedown', startDrag);
                    overlay.addEventListener('mousedown', startDrag);
                    document.addEventListener('mousemove', doDrag);
                    document.addEventListener('mouseup', stopDrag);

                    // Dodaj event listeners dla touch
                    img.addEventListener('touchstart', startDrag);
                    overlay.addEventListener('touchstart', startDrag);
                    document.addEventListener('touchmove', doDrag);
                    document.addEventListener('touchend', stopDrag);

                    // Dodaj klawisz ESC
                    const keyHandler = (e) => {
                        if (e.key === 'Escape') {
                            closeZoom();
                        }
                    };
                    document.addEventListener('keydown', keyHandler);

                    // Zapisz funkcje do późniejszego usunięcia
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

                    // Usuń overlay
                    const overlay = document.getElementById('zoom-overlay');
                    if (overlay) overlay.remove();

                    // Usuń event listeners
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

            // Resetuj styl
            img.style.transform = 'scale(1)';
            img.style.cursor = 'zoom-in';

            // Usuń overlay jeśli istnieje
            const overlay = document.getElementById('zoom-overlay');
            if (overlay) overlay.remove();

            // Usuń event listeners
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

            // Update label based on quiz type
            switch (this.quizType) {
                case 'name-to-code': this.quizTypeLabel = 'Wybierz kombinację (kod) tego wysiłku'; break;
                case 'code-to-name': this.quizTypeLabel = 'Wybierz nazwę dla tej kombinacji'; break;
                case 'name-to-desc': this.quizTypeLabel = 'Wybierz opis tego wysiłku'; break;
                case 'desc-to-name': this.quizTypeLabel = 'Wybierz nazwę tego opisu'; break;
            }

            // pick a random correct effort
            this.quizQ = this.pick(this.efforts);

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
        },

        playAudio(effort) {
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
        }
    };
}