# Om Sacred Space — ChatGPT Healing Connector

A minimal [MCP](https://modelcontextprotocol.io) server that lets ChatGPT answer
questions about sound healing, self-healing, energy work, and Om Sacred Space's
offerings. This is the fast Q&A prototype — content lives in `knowledge.js` and
can be expanded any time.

## What's inside

| File | Purpose |
|------|---------|
| `server.js` | MCP server over streamable HTTP, exposes 3 tools |
| `knowledge.js` | The healing Q&A knowledge base (~10 topics from the live site) |
| `test-client.js` | Smoke test that calls every tool without needing ChatGPT |

### Tools

- **`ask_healing`** — direct natural-language Q&A (the main one).
- **`search`** — find matching topics (ChatGPT / Deep Research compatible shape).
- **`fetch`** — return the full answer for a topic id from `search`.

All tools are **read-only**. Every answer carries a wellness disclaimer.

## Run locally

```bash
cd chatgpt-connector
npm install
npm start            # serves http://localhost:8787/mcp
```

In another terminal, smoke-test it:

```bash
node test-client.js
```

## Try it in ChatGPT (Developer Mode)

1. Tunnel the local server:
   ```bash
   ngrok http 8787
   ```
2. In ChatGPT: **Settings → Connectors → Advanced → enable Developer mode**
   (requires a paid plan).
3. **Create** a connector and paste the tunnel URL with `/mcp`, e.g.
   `https://<subdomain>.ngrok.app/mcp`. Auth: **None** for testing.
4. Start a chat, attach the connector, and ask a healing question.

## Deploy for real (public availability)

For submission to the ChatGPT Apps Directory the endpoint must be a public
HTTPS host (no localhost/ngrok). Good options: Vercel, Fly.io, Render, Railway.
Set a Content Security Policy, store any secrets in env vars, and point a
subdomain such as `mcp.omsacredspace.com` at it.

## Expand the knowledge base

Add objects to the `HEALING_QA` array in `knowledge.js` — each needs `id`,
`question`, `answer`, `tags` (keywords for matching), and `url`. Restart the
server to pick up changes.
