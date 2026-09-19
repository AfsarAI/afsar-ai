# Environment Variables Reference

## 1. Overview
All secrets and provider configurations are loaded securely via environment variables.

| Variable | Purpose | Required? | Where to Obtain | Free Tier? | Sensitivity |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `AI_PROVIDER` | Selects active provider (`groq`, `gemini`, `openrouter`, `mock`) | No (defaults to `mock` if no key found) | Local choice | Yes | Non-sensitive |
| `GROQ_API_KEY` | Powers high-speed Groq inference (`llama-3.3-70b-versatile`) | Optional (recommended) | [console.groq.com](https://console.groq.com) | Yes (100% free) | Secret |
| `GROQ_MODEL` | Custom Groq model name (default: `llama-3.3-70b-versatile`) | No | [Groq Models](https://console.groq.com/docs/models) | Yes | Non-sensitive |
| `GEMINI_API_KEY` | Powers Google Gemini 2.5/2.0 Flash fallback | Optional | [aistudio.google.com](https://aistudio.google.com) | Yes (100% free) | Secret |
| `GEMINI_MODEL` | Custom Gemini model (default: `gemini-2.5-flash`) | No | Google AI Studio | Yes | Non-sensitive |
| `OPENROUTER_API_KEY` | Powers OpenRouter routing | Optional | [openrouter.ai](https://openrouter.ai) | Yes | Secret |
| `NEXT_PUBLIC_SITE_URL`| Canonical site URL for metadata & OG cards | No (default: `http://localhost:3000`) | Deployment dashboard | Yes | Non-sensitive |

---

## 2. Setting Up Locally
Create a `.env.local` file in the project root:
```bash
cp .env.example .env.local
```
Add your preferred key (e.g. `GROQ_API_KEY=gsk_...`). If left blank, the application will default to `AI_PROVIDER=mock`, allowing full offline development and testing.
