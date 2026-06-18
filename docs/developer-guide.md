# Developer guide

## Runtime modes

| Mode | Command/path | API key location | Best use |
| --- | --- | --- | --- |
| File mode | Open `index.html` directly | `config.js` in the browser | Private local experimentation only |
| Node server | `node server.js` | `.env` / process env | Local development with hidden server-side keys |
| Vercel | `vercel --prod` | Vercel env vars | Hosted single-user or controlled deployment |

## Local server setup

Create `.env` or export environment variables before starting the server:

```ini
OPENROUTER_API_KEY=your_openrouter_key
GEMINI_API_KEY=your_gemini_key
```

Start the local proxy:

```bash
node server.js
```

Then open:

```text
http://localhost:3000
```

## Provider flow

The frontend builds a chat-completion payload from:

- the job-application question
- selected tone
- target word count
- `CONFIG.context`
- `CONFIG.exampleAnswers`
- `CONFIG.rules`
- selected provider/model

The request goes to `/api/generate` in server/Vercel mode. The proxy chooses OpenRouter or Gemini from the `provider` field and forwards the request to the corresponding chat-completions endpoint with the server-side API key.

## Vercel deployment

1. Set environment variables in Vercel:

```ini
OPENROUTER_API_KEY=...
GEMINI_API_KEY=...
```

2. Deploy:

```bash
vercel --prod
```

3. Confirm `vercel.json` routes `/api/generate` to `api/generate.js`.

## Verification checklist

Manual checks are enough for the current zero-dependency app:

- File mode renders with no server.
- Node server loads `index.html`.
- `POST /api/generate` returns a provider response when env vars are set.
- Missing env vars produce a clear error.
- Switching providers changes the upstream endpoint.
- No real API key is committed to `config.js`.

## Adding tests later

If the app grows, start with small integration tests around:

- prompt payload construction
- provider selection
- missing API key responses
- serverless handler CORS behavior
- model defaults and UI state
