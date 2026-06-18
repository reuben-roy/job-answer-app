# Customization guide

The app becomes useful for other people when personal data is separated from app code. Today, `config.js` is the main customization surface.

## User profile fields

| Field | Purpose |
| --- | --- |
| `context` | Resume, professional overview, projects, skills, and education |
| `exampleAnswers` | Optional examples that teach the model the user's natural voice |
| `rules` | Writing constraints, banned phrases, tone rules, structure rules |
| `provider` | Default provider: `openrouter` or `gemini` |
| `models` | Model IDs per provider |

For another user, replace `context`, `exampleAnswers`, and `rules` first. Provider/model defaults can stay until cost, quality, or latency needs change.

## Recommended reusable profile shape

For multi-user or forkable use, move personal content into a separate profile object:

```js
const PROFILE = {
  name: '',
  headline: '',
  resume: '',
  projects: [],
  writingRules: [],
  exampleAnswers: []
}
```

Then generate the prompt from that profile instead of hand-maintaining one long string.

## Prompt customization

Good prompt controls to expose:

- answer type: short answer, cover-letter paragraph, recruiter message, essay response
- tone: professional, casual, enthusiastic, concise
- target word count
- company and role context
- must-mention skills
- phrases to avoid
- first-person vs third-person

Avoid putting all behavior into one large prompt. Keep reusable prompt assembly code separate from personal profile data.

## Provider customization

The serverless handler currently supports OpenRouter and Gemini-style chat-completion endpoints. To add another provider:

1. Add an API key env var.
2. Add hostname/path constants.
3. Map the frontend `provider` value to the key and endpoint.
4. Normalize error responses so the UI does not need provider-specific branches.
5. Document any model-specific limits.

## Multi-user roadmap

Before opening the app to general users:

- Move resume/profile content out of committed `config.js`.
- Add per-user local storage or account-backed profile storage.
- Add a clear delete/export flow for profile data.
- Rate-limit `/api/generate`.
- Restrict CORS for hosted deployments.
- Add request size limits so resumes cannot create oversized payloads.
- Add a visible "profile in use" indicator so users know which resume is driving answers.
