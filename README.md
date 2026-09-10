# 🇮🇳 My Assembly Speech (Class 1–5)

> **Live Application URL:** [https://ais-pre-qhf33mtxw7jbc6narr7ztf-279333895425.asia-southeast1.run.app](https://ais-pre-qhf33mtxw7jbc6narr7ztf-279333895425.asia-southeast1.run.app)  
> **Development Preview URL:** [https://ais-dev-qhf33mtxw7jbc6narr7ztf-279333895425.asia-southeast1.run.app](https://ais-dev-qhf33mtxw7jbc6narr7ztf-279333895425.asia-southeast1.run.app)  
> **Developer:** Pawan Paji  

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
![React 19](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?logo=tailwindcss&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Google%20Gemini-Flash%203.8-4285F4?logo=google&logoColor=white)

---

## 🌟 Overview

**My Assembly Speech** is a dedicated web application designed to help young Indian primary school students (Classes 1 to 5) and their parents prepare confident, engaging, and culturally grounded morning assembly speeches.

The app automatically syncs with real-time Indian Standard Time (IST) via live network time services, tracks the countdown to the next school morning assembly, and recommends the best upcoming speech topic—covering national days, lunar festivals (Diwali, Eid, Holi, Ganesh Chaturthi), scientific milestones (National Science Day, National Space Day), and inspiring historical figures.

---

## 🚀 Live App Links

- **Production Live App:** [https://ais-pre-qhf33mtxw7jbc6narr7ztf-279333895425.asia-southeast1.run.app](https://ais-pre-qhf33mtxw7jbc6narr7ztf-279333895425.asia-southeast1.run.app)
- **Dev Sandbox App:** [https://ais-dev-qhf33mtxw7jbc6narr7ztf-279333895425.asia-southeast1.run.app](https://ais-dev-qhf33mtxw7jbc6narr7ztf-279333895425.asia-southeast1.run.app)

---

## ✨ Key Features

1. **Live Internet Date & Time Sync (IST)**:
   - Queries `timeapi.io` and `worldtimeapi.org` with automatic fallback to system clocks.
   - Calculates the exact countdown to the upcoming weekend or morning school assembly.
   - Proximity scoring ranks the most timely Indian events.

2. **Tailored for Primary School (Classes 1–5)**:
   - Age-appropriate vocabulary and sentence lengths (6–12 words for Classes 1–2; up to 16 words for Classes 3–5).
   - Natural spoken pacing (~110–120 words/minute).
   - In-line delivery markers (`[Smile]`, `[Pause]`, `[Speak slowly]`, `[Look at audience]`).
   - 3 Key Takeaways to remember.
   - Word Pronunciation Guide with phonetic breakdown and simple definitions.
   - Potential Teacher Questions & Answers for stage confidence.
   - Multi-language support: English, Hindi, Hinglish, Punjabi, Marathi, Telugu, Bengali, Tamil, Kannada, Malayalam, Gujarati.

3. **Interactive Practice Room & Teleprompter**:
   - **Audio Read-Aloud (TTS)**: Built-in speech synthesis with speed control (0.75x, 1x, 1.25x).
   - **Sentence-by-Sentence Teleprompter**: Step-by-step recitation with voice recognition support and encouraging completion scoring.
   - **Help Me Memorize (Fill-in-the-Blanks)**: Dynamic masking with Easy, Medium, and Hard difficulty levels.
   - **Flashcards**: Interactive flip cards covering the core facts and pronunciation.

4. **Printable Cue Card View**:
   - Clean, high-contrast, printer-friendly layout designed for speech cards.
   - Includes verified developer stamp: **Pawan Paji**.

5. **Parent & Teacher Mode**:
   - One-click toggle to inspect curriculum alignment, source citations, moral lessons, and pedagogical speech advice.

---

## 🛠️ Deploying to Vercel

This repository is pre-configured with `vercel.json` for seamless 1-click deployment on Vercel:

### Method 1: Connect via GitHub (Recommended)

1. Push or export this repository to your GitHub account (see instructions below).
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import your GitHub repository.
4. Set the following in the Vercel Project Settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `vite build`
   - **Output Directory**: `dist`
5. In **Environment Variables**, add:
   - `GEMINI_API_KEY`: Your Google Gemini API Key from [Google AI Studio](https://aistudio.google.com/).
6. Click **Deploy**. Vercel will build the frontend and serve both the static Vite assets and the `/api` serverless functions.

### Method 2: Deploy via Vercel CLI

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy to preview
vercel

# 4. Deploy to production
vercel --prod
```

---

## 📦 How to Publish to your GitHub Repository

### Option A: Via Google AI Studio UI (Easiest)
1. In Google AI Studio Build, click the **Settings / Menu** icon in the top header.
2. Select **Export to GitHub**.
3. Authorize your GitHub account and choose or create your repository name (e.g., `my-assembly-speech`).
4. Click **Export**. Your entire project, including all commits and files, will be uploaded to your GitHub repository!

### Option B: Via Git Command Line
Run the following commands in your local terminal:

```bash
# 1. Initialize git (if not already done)
git init
git branch -M main

# 2. Stage all files
git add .

# 3. Commit
git commit -m "feat: complete My Assembly Speech app with Vercel configuration"

# 4. Link to your GitHub repository
# Replace <YOUR_USERNAME> and <REPO_NAME> with your GitHub details
git remote add origin https://github.com/<YOUR_USERNAME>/<REPO_NAME>.git

# 5. Push to GitHub
git push -u origin main
```

---

## 💻 Local Development

```bash
# 1. Clone repository
git clone https://github.com/<YOUR_USERNAME>/<REPO_NAME>.git
cd <REPO_NAME>

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env and insert your GEMINI_API_KEY

# 4. Start local development server (binds on port 3000)
npm run dev

# 5. Open browser
# Navigate to http://localhost:3000
```

---

## 📜 Build and Production Scripts

- `npm run dev`: Runs the full-stack app with live Vite middleware via `tsx server.ts`.
- `npm run build`: Builds the client-side production bundle into `dist/` and bundles `server.ts` with `esbuild`.
- `npm run start`: Launches the compiled production server (`node dist/server.cjs`).
- `npm run lint`: Runs TypeScript validation without emitting files.

---

## 🛡️ License

Apache-2.0 License. Designed with care for school students across India by **Pawan Paji**.
