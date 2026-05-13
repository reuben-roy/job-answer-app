# job-answer-app

> A single-page tool that uses Google Gemini to generate tailored job-application answers from your resume and writing rules.

## What It Does

Paste a job-application question, select a tone, and get a first-person answer crafted from your own resume context. The app proxies requests to Google Gemini so your API key never reaches the browser in server mode.

### Features

- **Resume-aware answers** — Injects your full professional profile into every prompt.
- **Tone selector** — Professional, casual, or enthusiastic voice.
- **Word-count control** — Adjustable target length.
- **Local-first mode** — Works as a standalone `file://` page with a front-end API key, or as a Node server that hides the key server-side.
- **Vercel-ready** — Ships with a serverless API route for instant deployment.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Vanilla HTML / CSS / JavaScript |
| Backend | Node.js `http` + `https` (zero dependencies) |
| Vercel API | Serverless function (`api/generate.js`) |
| LLM | Google Gemini (`gemini-2.5-flash` or `gemini-2.5-pro`) |

## Quick Start

### Option A: Node server (recommended)

```bash
# 1. Create an .env file
echo "GEMINI_API_KEY=your_actual_key" > .env

# 2. Start the server
node server.js

# 3. Open http://localhost:3000
```

### Option B: Open directly (no server)

1. Open `index.html` in a browser.
2. Paste your Gemini API key into `config.js` (field `apiKey`).
3. Edit `config.js` to include your own resume in the `context` field.
4. Adjust `rules` to match your voice.

### Option C: Vercel

```bash
vercel --prod
```

The `vercel.json` routes `/api/generate` to the serverless function. Add `GEMINI_API_KEY` to your Vercel environment variables.

## Configuration

All personal content lives in `config.js`:

| Field | What to put there |
|-------|-------------------|
| `apiKey` | Gemini API key (used only in `file://` mode) |
| `model` | `gemini-2.5-flash` (fast) or `gemini-2.5-pro` (stronger reasoning) |
| `context` | Your resume / professional overview |
| `exampleAnswers` | Real answers you’ve written (optional — improves voice matching) |
| `rules` | Writing constraints (tone, length, clichés to avoid) |

## Project Files

```
index.html          # Single-page UI (question input, tone picker, answer output)
config.js           # Personal resume, rules, and API key
server.js           # Zero-dependency Node dev server with Gemini proxy
api/generate.js     # Vercel serverless handler (same proxy logic)
vercel.json         # Vercel routing rules
```

## How It Works

1. The frontend collects your question, tone, and target word count.
2. The prompt is wrapped with your resume context and writing rules.
3. The request hits `/api/generate`, which forwards it to Gemini's OpenAI-compatible endpoint (`v1beta/openai/chat/completions`).
4. The generated answer streams back and is rendered in the UI.

## Security Notes

- In **Node / Vercel mode** the API key lives only server-side.
- In **file mode** the key is exposed in `config.js` — acceptable for local-only use, but do not commit a real key.

## License

No explicit LICENSE file. Assume all rights reserved unless otherwise stated.

---

Built for speed by [Reuben Roy](https://github.com/reuben-roy).
