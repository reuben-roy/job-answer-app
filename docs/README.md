# job-answer-app developer docs

`job-answer-app` is a zero-dependency single-page tool for generating job-application answers from a resume context and writing rules. It can run as a local `file://` page, a local Node proxy server, or a Vercel serverless deployment.

## Docs map

| Document | Use it for |
| --- | --- |
| [Developer guide](developer-guide.md) | Local modes, provider flow, deployment, and verification |
| [Customization guide](customization.md) | Replacing the resume, rules, prompts, providers, and UI defaults for another user |
| [Privacy guide](privacy.md) | API key handling, resume handling, and deployment safety |

## Main files

| Path | Responsibility |
| --- | --- |
| `index.html` | Single-page UI and client-side request flow |
| `config.js` | Personal resume context, writing rules, provider/model defaults, and file-mode keys |
| `server.js` | Local Node HTTP server and provider proxy |
| `api/generate.js` | Vercel serverless provider proxy |
| `vercel.json` | Vercel routing |

## Development rule

Treat `config.js` as personal data. For a reusable deployment, replace it with a private local file, generated user profile, or server-side profile store before accepting other users' resumes.
