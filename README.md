# Wysiłki Labana — Trening Głosu (Laban Voice Efforts)

**🎭 [Try it live →](https://dudematthew.smallhost.pl/laban/)**

A single-page web app for **voice and character training** based on **Laban's Eight Efforts** (wysiłki Labana). Learn the efforts, quiz yourself, and generate random character voice descriptions for acting or tabletop RPGs.

The UI is in **Polish**; the app runs entirely in the browser (no backend).

---

## What Are Laban's Efforts?

In Laban Movement Analysis, **effort** describes *how* we move (or speak). Each effort is a combination of three binary axes:

| Axis | Polish | Pole 1 | Pole 2 | Code |
|------|--------|--------|--------|------|
| **Weight** | Ciężar | Stanowczy (Strong) | Delikatny (Light) | S / D |
| **Time** | Czas | Nagły (Sudden) | Trwały (Sustained) | N / T |
| **Space** | Przestrzeń | Bezpośredni (Direct) | Pośredni (Indirect) | B / P |

Each of the **8 efforts** is a unique 3-letter code (e.g. **SNB** = Strong, Sudden, Direct). The app uses these Polish names and codes:

| Code | Name (PL) | Brief idea |
|------|-----------|------------|
| SNB | Uderzający | Strong, sudden, direct — punch-like |
| DNP | Trzepiący | Light, sudden, indirect — flicking |
| STB | Naciskający | Strong, sustained, direct — pressing |
| DNB | Dotykający | Light, sudden, direct — dabbing |
| DTB | Sunący | Light, sustained, direct — gliding |
| DTP | Unoszący | Light, sustained, indirect — floating |
| STP | Wykręcający | Strong, sustained, indirect — wringing |
| SNP | Tnący | Strong, sudden, indirect — slashing |

Each effort has a short description, an example use, and an **audio demo** so you can hear the quality of the voice.

---

## Features

### 1. **Nauka (Learn)** — Flashcards

- Front: effort name, 3-letter code (colour-coded by axis), and a small "cube" showing which pole of each axis is active.
- Back: axis labels (Stanowczy/Delikatny, Nagły/Trwały, Bezpośredni/Pośredni), description, example, **play audio**, and **Znam** / **Nie znam** (know / don't know).
- Progress bar and scores: Znam, Nie znam, Seria (streak). Cards you mark "Nie znam" are re-queued so you see them again.

### 2. **Quiz**

Four question types:

- **Nazwa → Kombinacja** — Given the effort name, choose the correct code.
- **Kombinacja → Nazwa** — Given the code (and axis hint), choose the correct name.
- **Nazwa → Opis** — Given the name, choose the correct description.
- **Opis → Nazwa** — Given the description, choose the correct effort name.

Multiple choice (A–D), correct/wrong feedback with short explanation, optional **play audio** for the correct effort, and scores (Poprawne, Błędne, Seria).

### 3. **Generuj Postać (Generate Character)**

- Picks a **random effort** and a **random set of modifiers** (e.g. Tekstura, Położenie, Tempo, Głośność, Ton, Akcent, Problemy, Wiek, Płeć, Wielkość).
- Always includes Płeć, Wiek, and Wielkość; adds a few more from the rest.
- Builds a short **"Opis głosu"** (voice description) in prose: base effort description + persona (e.g. "Drobna kobieta młoda") + extra traits (e.g. "Głos suchy", "mówi powoli", "z wyraźnym akcentem").
- Useful for GMs or actors who want a quick, consistent way to define a character's voice.

### Other

- **Axis demos**: Click the chips in the top strip (Ciężar, Czas, Przestrzeń) to hear a short audio comparing the two poles of that axis.
- **Tutorial**: Link to a YouTube tutorial in the footer.
- **Cheat sheet**: In "Generuj Postać", a collapsible "Ściąga" lists all 8 efforts with name, axis words, description, and play button.

---

## Tech Stack

- **HTML** — Single `index.html` with semantic structure and Open Graph / Twitter Card meta.
- **CSS** — Custom `style.css` (dark theme, CSS variables) plus [Pico CSS](https://picocss.com/) and Google Fonts (Cinzel, Inter).
- **JS** — Vanilla logic in `script.js`, UI reactivity with [Alpine.js](https://alpinejs.dev/) (CDN).
- **Assets** — `audio/` (MP3s per effort + 3 axis demos), `favicon/`, `thumbnail.png` for social preview.

No build step, no backend. Open `index.html` in a browser or serve the folder with any static server.

---

## How to Run

1. **Open locally**  
   Double-click `index.html` or open it from your file manager.  
   *(If you use `file://`, some browsers may restrict audio; prefer a local server if needed.)*

2. **Local server (recommended for audio)**  
   From the project root, for example:
   - **Node**: `npx serve .` or `npx http-server .`
   - **Python**: `python -m http.server 8000`
   - Then open `http://localhost:8000` (or the port shown).

---

## Project Structure

```
laban-voice-efforts/
├── index.html      # Single page, Alpine.js app
├── script.js       # Data (efforts, modifiers), flashcard/quiz/GM logic, audio
├── style.css       # Theming, layout, components
├── audio/          # MP3s: 8 efforts + ciezar.mp3, czas.mp3, przestrzen.mp3
├── favicon/        # Icons and manifest
├── thumbnail.png   # OG/Twitter image
└── README.md       # This file
```

---

## License

MIT. See [LICENSE](LICENSE).

---

<sub>Found a bug or have a suggestion? [Open an issue](https://github.com/dudematthew/laban-voice-efforts/issues)</sub>