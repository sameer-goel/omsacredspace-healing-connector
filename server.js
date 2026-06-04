// Om Sacred Space — ChatGPT connector (MCP server).
//
// Exposes a healing Q&A knowledge base to ChatGPT via the Model Context
// Protocol over streamable HTTP. Implements the three tools ChatGPT looks for:
//   - search       : find relevant healing topics (ChatGPT/Deep Research shape)
//   - fetch        : return the full answer for a topic id
//   - ask_healing  : direct natural-language Q&A about healing
//
// Run locally:  npm install && npm start
// Then tunnel with `ngrok http 8787` and paste the https URL + /mcp into
// ChatGPT > Settings > Connectors (Developer Mode).

import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";
import { HEALING_QA, FALLBACK, DISCLAIMER, SITE_URL } from "./knowledge.js";

const PORT = process.env.PORT || 8787;

// ---------- simple keyword scoring over the knowledge base ----------
function scoreEntry(entry, query) {
  const q = query.toLowerCase();
  const words = q.split(/\W+/).filter((w) => w.length > 2);
  let score = 0;
  const haystack = `${entry.question} ${entry.answer} ${entry.tags.join(" ")}`.toLowerCase();
  for (const w of words) {
    if (entry.tags.some((t) => t.includes(w))) score += 3;
    if (entry.question.toLowerCase().includes(w)) score += 2;
    if (haystack.includes(w)) score += 1;
  }
  return score;
}

function rank(query, limit = 5) {
  return HEALING_QA
    .map((entry) => ({ entry, score: scoreEntry(entry, query) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.entry);
}

function findById(id) {
  return HEALING_QA.find((e) => e.id === id) || (id === FALLBACK.id ? FALLBACK : null);
}

// ---------- build the MCP server with its tools ----------
function buildServer() {
  const server = new McpServer(
    { name: "om-sacred-space-healing", version: "1.0.0" },
    {
      instructions:
        "Answers questions about sound healing, energy work, self-healing, and Om Sacred Space's offerings. " +
        "Use ask_healing for direct questions. Use search to find topics, then fetch to read full answers. " +
        "All tools are read-only. Always treat content as complementary wellness guidance, not medical advice.",
    }
  );

  // search — ChatGPT/Deep Research compatible input/output shape.
  server.registerTool(
    "search",
    {
      title: "Search healing topics",
      description:
        "Search Om Sacred Space's healing knowledge base. Returns a list of matching topics with ids you can pass to fetch.",
      inputSchema: { query: z.string().describe("What the user wants to know about healing") },
      outputSchema: {
        results: z.array(
          z.object({ id: z.string(), title: z.string(), url: z.string() })
        ),
      },
      annotations: { readOnlyHint: true, openWorldHint: false, destructiveHint: false },
    },
    async ({ query }) => {
      const matches = rank(query);
      const list = matches.length ? matches : [FALLBACK];
      const structuredContent = {
        results: list.map((e) => ({ id: e.id, title: e.question, url: e.url })),
      };
      return {
        structuredContent,
        content: [{ type: "text", text: JSON.stringify(structuredContent) }],
      };
    }
  );

  // fetch — return the full answer document for a topic id.
  server.registerTool(
    "fetch",
    {
      title: "Fetch healing answer",
      description: "Fetch the full answer for a healing topic id returned by search.",
      inputSchema: { id: z.string().describe("Topic id from a search result") },
      outputSchema: {
        id: z.string(),
        title: z.string(),
        text: z.string(),
        url: z.string(),
        metadata: z.record(z.string(), z.string()).optional(),
      },
      annotations: { readOnlyHint: true, openWorldHint: false, destructiveHint: false },
    },
    async ({ id }) => {
      const entry = findById(id);
      if (!entry) {
        const structuredContent = {
          id,
          title: "Not found",
          text: `No healing topic with id "${id}". Try the search tool first.`,
          url: SITE_URL,
        };
        return {
          structuredContent,
          content: [{ type: "text", text: JSON.stringify(structuredContent) }],
        };
      }
      const structuredContent = {
        id: entry.id,
        title: entry.question,
        text: `${entry.answer}\n\n${DISCLAIMER}`,
        url: entry.url,
        metadata: { source: "Om Sacred Space" },
      };
      return {
        structuredContent,
        content: [{ type: "text", text: JSON.stringify(structuredContent) }],
      };
    }
  );

  // ask_healing — direct Q&A; the simplest path for a chat user.
  server.registerTool(
    "ask_healing",
    {
      title: "Ask a healing question",
      description:
        "Answer a question about sound healing, self-healing, energy work, or Om Sacred Space's services and sessions.",
      inputSchema: {
        question: z.string().describe("The user's healing-related question"),
      },
      outputSchema: {
        answer: z.string(),
        topic: z.string(),
        related: z.array(z.object({ id: z.string(), title: z.string() })),
        url: z.string(),
      },
      annotations: { readOnlyHint: true, openWorldHint: false, destructiveHint: false },
    },
    async ({ question }) => {
      const matches = rank(question);
      const best = matches[0] || FALLBACK;
      const related = matches.slice(1, 4).map((e) => ({ id: e.id, title: e.question }));
      const structuredContent = {
        answer: `${best.answer}\n\n${DISCLAIMER}`,
        topic: best.question,
        related,
        url: best.url,
      };
      return {
        structuredContent,
        content: [{ type: "text", text: structuredContent.answer }],
      };
    }
  );

  return server;
}

// ---------- HTTP layer (stateless streamable HTTP) ----------
const app = express();
app.use(express.json());

// Basic security + CSP headers. A defined CSP is required to submit the app
// for review, and these are harmless for the JSON API surface.
app.use((_req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'none'; connect-src 'self' https://omsacredspace.com; frame-ancestors 'none'"
  );
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "no-referrer");
  next();
});

app.get("/", (_req, res) =>
  res.type("text/plain").send("Om Sacred Space healing connector — MCP endpoint at /mcp")
);

app.get("/health", (_req, res) => res.json({ ok: true, service: "om-sacred-space-healing" }));

app.post("/mcp", async (req, res) => {
  // Stateless: a fresh server + transport per request keeps things simple and
  // horizontally scalable. Good enough for a read-only Q&A connector.
  try {
    const server = buildServer();
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined, // stateless: no session tracking
    });
    res.on("close", () => {
      transport.close();
      server.close();
    });
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (err) {
    console.error("MCP request error:", err);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: "2.0",
        error: { code: -32603, message: "Internal server error" },
        id: null,
      });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Om Sacred Space healing connector listening on http://localhost:${PORT}/mcp`);
});
