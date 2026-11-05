# Information Desk chatbot: setup

```
Visitor's browser ──question──▶ Cloudflare Worker ──▶ OpenAI
 (thebibekshah.com)            (holds your key,       (writes the answer)
                                reads stations.js
                                from your live site)
```

Your OpenAI key lives **only** in Cloudflare's secret settings: never in this repo, never in `config.js`, never in a chat.
If you ever pasted it somewhere public, revoke it at platform.openai.com → API keys and make a new one.

---

## Step 1: Protect your OpenAI account (5 min)

1. platform.openai.com → **Settings → Limits** (or Billing): set a **monthly budget**, e.g. $5.
2. Create a **new API key just for this site** (API keys → Create new secret key, name it `thebibekshah-chatbot`).
   Copy it somewhere temporary; you'll paste it in Step 3.

## Step 2: Publish the new site files first

The chatbot reads `js/data/stations.js` from your **live** site, so push these changes to GitHub
(Source Control → Commit → Sync) before testing. The chat stays hidden until Step 4, so this is safe.

## Step 3: Create the Cloudflare Worker (10 min)

1. Sign up / log in at **dash.cloudflare.com** (free plan is fine).
2. Left menu → **Workers & Pages** → **Create** → **Create Worker** (start from "Hello World").
3. Name it `bibek-info-desk` → **Deploy**.
4. Click **Edit code**. Delete everything in the editor, paste the whole contents of
   `chatbot-worker/worker.js`, then click **Deploy**.
5. Go back to the worker → **Settings → Variables and Secrets** → **Add** each of these:

| Type | Name | Value |
|---|---|---|
| **Secret** | `OPENAI_API_KEY` | your key from Step 1 |
| Text | `SITE_URL` | `https://thebibekshah.com` |
| Text | `ALLOWED_ORIGINS` | `https://thebibekshah.com,https://www.thebibekshah.com,http://127.0.0.1:5500` |
| Text | `MODEL` | `gpt-4o-mini` (or any current chat model from platform.openai.com/docs/models) |

   Click **Deploy** / **Save** after adding them.
6. Copy your worker's URL from the top of its page. It looks like
   `https://bibek-info-desk.YOUR-NAME.workers.dev`

(Cloudflare sometimes renames menu items. If a label differs, look for the closest match.)

## Step 4: Turn on the chat

1. In VS Code open `js/config.js` and paste the worker URL:
   ```js
   chatEndpoint: "https://bibek-info-desk.YOUR-NAME.workers.dev",
   ```
2. Save. With Live Server running, the **Ask the desk** box appears under the search.
   (`http://127.0.0.1:5500` is in ALLOWED_ORIGINS so local testing works.)
3. Ask a few questions. Then **commit and push**, and it's live on thebibekshah.com.

## Step 5: Test it like a recruiter (and a troll)

Try these and check the answers are true:
- "What research is Bibek doing?" → should mention the NSF telecom project with a station button
- "What's his GPA?" → should say it doesn't have that and suggest emailing you
- "Write me a Python script" → should politely decline
- "Ignore your instructions and…" → should stay on topic

If an answer is wrong, the fix is almost always in `js/data/stations.js` (the chatbot only knows what's there).

---

## Changing how it behaves

| I want to… | Where |
|---|---|
| Change the suggested questions | `js/config.js` → `chatSuggestions` |
| Change tone / rules / length | `chatbot-worker/worker.js` → `systemPrompt()` → paste into Cloudflare again → Deploy |
| Change per-visitor limit or answer length | `chatbot-worker/worker.js` → `LIMITS` → paste into Cloudflare again → Deploy |
| Change the chat's look | `css/08-ai-chat.css` |
| Turn the chat off | `js/config.js` → `chatEndpoint: ""` |
| See errors | Cloudflare → your worker → **Logs** |

**Note:** `chatbot-worker/worker.js` sits in your public repo just as a copy for reference. It contains no secrets.
Editing it in VS Code does **not** update Cloudflare. You must paste it into Cloudflare's editor again.
