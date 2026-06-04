# Build a ChatGPT Connector (Custom MCP App) — Step by Step

A reproducible guide for turning a small knowledge base into a custom ChatGPT
connector ("App"), testing it locally, and exposing it to ChatGPT. This is the
exact path we used to build the **Om Sacred Space Healing** connector.

> A "connector" / "App" in ChatGPT is an **MCP server** (Model Context Protocol)
> that ChatGPT calls over HTTPS. You define tools; ChatGPT's model decides when
> to call them.

---

## 0. Prerequisites

- **Node.js 18+** (`node --version`)
- A **paid ChatGPT plan** — Plus, Pro, Team, Enterprise, or Edu. Custom
  connectors and Developer Mode are **not** on Free.
- On Team/Enterprise/Edu, a **workspace admin** must allow custom connectors.
- A way to expose `localhost` over HTTPS for testing (a tunnel). We used
  `localtunnel`; `ngrok` or `cloudflared` also work if your network allows them.

---

## 1. Project layout

```
chatgpt-connector/
├─ package.json        # deps: @modelcontextprotocol/sdk, express, zod
├─ knowledge.js        # your Q&A content (the easy part to expand)
├─ server.js           # the MCP server + tools
├─ test-client.js      # smoke test — calls every tool without ChatGPT
└─ README.md
```

Install:

```bash
cd chatgpt-connector
npm install
```

---

## 2. Define your content (`knowledge.js`)

Keep content separate from server logic so anyone can expand it. Each topic is
a plain object:

```js
{
  id: "stress-anxiety",                 // stable id (used by fetch)
  question: "Can sound healing help with stress or anxiety?",
  answer: "Yes. Sound healing works by ...",
  tags: ["stress", "anxiety", "calm"],  // keywords for matching
  url: "https://yoursite.com/page#faq"  // canonical source for citations
}
```

To grow the assistant later, just add more objects and restart the server.

---

## 3. Build the MCP server (`server.js`)

Three tools cover most needs. Two of them (`search` + `fetch`) use the **exact
shape ChatGPT expects**, which also makes the app eligible for Deep Research and
Company Knowledge:

| Tool | Purpose |
|------|---------|
| `ask_healing` | Direct natural-language Q&A (simplest for chat) |
| `search` | Returns matching topics `{id, title, url}` |
| `fetch` | Returns the full answer for a topic `id` |

Critical implementation details we learned:

1. **Make every tool read-only and annotate it:**
   ```js
   annotations: { readOnlyHint: true, openWorldHint: false, destructiveHint: false }
   ```
   These hints are required and must match real behavior, or review rejects you.

2. **Run the HTTP transport in STATELESS mode.** This was the bug that first
   broke our handshake. With a session-id generator, the multi-request MCP
   handshake fails with `Bad Request: Server not initialized`. Fix:
   ```js
   const transport = new StreamableHTTPServerTransport({
     sessionIdGenerator: undefined, // stateless — no session tracking
   });
   ```
   Create a fresh server + transport per POST to `/mcp`.

3. **Return both `structuredContent` and a `content` text block** from each tool.
   The model reads `structuredContent`; the text block is the narration.

4. **Add a `/health` route** so you can sanity-check the server independently of
   the tunnel.

---

## 4. Test locally (before any tunnel)

Start the server:

```bash
npm start          # -> http://localhost:8787/mcp
```

Health check in another terminal:

```bash
curl -s http://localhost:8787/health
# {"ok":true,"service":"..."}
```

Run the smoke test (connects as an MCP client, calls every tool):

```bash
node test-client.js
```

You should see each sample question routed to the right topic. **Fix routing
here**, not in ChatGPT — it's a thousand times faster. (We bumped a couple of
`tags` to fix "online sessions" and "vs reiki" misrouting.)

---

## 5. Expose it over HTTPS (tunnel)

ChatGPT only talks to HTTPS endpoints. For local testing, tunnel it:

```bash
npx --yes localtunnel --port 8787
# your url is: https://<random>.loca.lt
```

**Verify the tunnel with the real MCP handshake before touching ChatGPT.** This
is the step that saved us — a stale tunnel returns `502` and ChatGPT's "Create"
silently fails:

```bash
curl -s -m 20 -o /dev/null -w "HTTP:%{http_code}\n" \
  -X POST https://<random>.loca.lt/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"chatgpt","version":"1.0"}}}'
```

- `HTTP:200` → good, proceed.
- `HTTP:502` → the tunnel went stale. **Restart the tunnel**, get the new URL,
  and test again. (This was our actual "Error creating connector" cause.)

> Networks behind a corporate proxy may block some tunnel providers. In our case
> Cloudflare's quick-tunnel API was blocked (`cloudflared` failed), but
> `localtunnel` worked. If one provider fails, try another.

---

## 6. Add it in ChatGPT (Developer Mode)

1. **Settings → Apps** (older UIs call this "Connectors").
2. Open **Advanced settings** and enable **Developer mode**.
3. Click **Create** and fill in:
   - **Name**: e.g. `Om Sacred Space Healing`
   - **Server URL**: `https://<random>.loca.lt/mcp`  *(must end in `/mcp`)*
   - **Authentication**: **No Auth** (for testing)
   - Check **"I understand and want to continue"**, then **Create**.
4. If it errors: re-run the curl handshake from step 5. A `200` there means the
   problem is ChatGPT-side (retry); a `502` means restart the tunnel.
5. Start a chat, attach the connector, and ask a real question:
   - *"Can sound healing help with my anxiety?"*
   - *"How is sound healing different from Reiki?"*

---

## 7. Going public (the marketplace path)

Testing via a tunnel is fine, but a temporary `.loca.lt` URL changes on every
restart and has no uptime guarantee. To make it permanently available and
submit it to the **ChatGPT Apps Directory**:

1. **Deploy to a stable HTTPS host** — Vercel (native ChatGPT Apps support),
   Fly.io, Render, or Railway. Point a subdomain like `mcp.yoursite.com` at it.
2. **Define a Content Security Policy (CSP)** on the server — required to submit.
3. **Complete identity/business verification** in the OpenAI Platform Dashboard
   (platform.openai.com) under the name you'll publish as.
4. **Prepare submission assets**: logo, description, privacy policy URL,
   screenshots, and test prompts + expected responses (must pass on web *and*
   mobile).
5. **Submit for review** from the dashboard, then **Publish** once approved.
   Publishing also auto-creates a Codex plugin.

> Note: directory *listing* requires review; but anyone on a paid plan can use
> your connector immediately just by pasting the HTTPS `/mcp` URL in Developer
> Mode — no review needed for that.

---

## Troubleshooting cheat sheet

| Symptom | Cause | Fix |
|---------|-------|-----|
| `Bad Request: Server not initialized` | Transport using session ids | `sessionIdGenerator: undefined` |
| `Error creating connector` in ChatGPT | Tunnel returned `502` at validate time | Restart tunnel, re-verify `200`, retry |
| `502 Bad Gateway` from tunnel | localtunnel link went stale | Restart the tunnel process |
| Browser shows a warning page | localtunnel interstitial | Open the base URL once in a browser to clear it |
| Tunnel provider won't start | Corporate proxy blocks its API | Try a different provider |
| Wrong answer returned | Keyword routing | Add/adjust `tags` in `knowledge.js`, restart |
