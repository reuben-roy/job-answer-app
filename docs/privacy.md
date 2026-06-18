# Privacy guide

This app handles sensitive career data: resumes, work history, examples of writing, and generated answers. Treat those as private by default.

## API keys

| Mode | Risk |
| --- | --- |
| File mode | Keys in `config.js` are visible to the browser and should never be committed if real |
| Node server | Keys stay server-side in environment variables |
| Vercel | Keys stay in Vercel environment variables |

Use file mode only for local, private testing. Use server or Vercel mode for anything shared.

## Resume data

`CONFIG.context` currently contains the resume and project history used in every generation. In a reusable version, this should not be committed as app code. Prefer:

- local private profile files ignored by Git
- encrypted browser storage for local-only use
- account-backed profile storage with delete/export controls
- generated `config.local.js` files that are ignored by Git

## Provider data flow

Generated requests are sent to the selected provider through `/api/generate` in server/Vercel mode. The provider receives the user's question, resume context, examples, rules, and model settings. Do not claim the app is local-only unless it is actually running without remote LLM calls.

## Hosted deployment checklist

- Set provider API keys only in environment variables.
- Remove real keys from `config.js`.
- Replace personal resume context before sharing the URL.
- Add rate limiting before public launch.
- Restrict CORS if the API should only serve the hosted frontend.
- Avoid logging full prompts or generated answers.
- Document what provider receives the data.

## Safe defaults

For public demos, ship a synthetic profile and clearly label it as demo data. Users should have to opt in before adding real resume content.
