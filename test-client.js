// Quick smoke test for the Om Sacred Space healing connector.
// Spins up an MCP client over streamable HTTP and calls each tool.
//
// Usage: start the server (npm start) in one terminal, then run:
//   node test-client.js

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const MCP_URL = process.env.MCP_URL || "http://localhost:8787/mcp";

const QUESTIONS = [
  "Can sound healing help with my anxiety?",
  "What instruments do you use?",
  "How is sound healing different from reiki?",
  "Can I do this at home myself?",
  "Is it safe if I'm pregnant?",
  "Do you offer online sessions?",
];

function line() {
  console.log("─".repeat(70));
}

async function main() {
  const client = new Client({ name: "oss-test-client", version: "1.0.0" });
  const transport = new StreamableHTTPClientTransport(new URL(MCP_URL));
  await client.connect(transport);

  console.log("Connected to:", MCP_URL);
  const { tools } = await client.listTools();
  console.log("Tools available:", tools.map((t) => t.name).join(", "));
  line();

  // 1) ask_healing for each sample question
  for (const q of QUESTIONS) {
    const r = await client.callTool({
      name: "ask_healing",
      arguments: { question: q },
    });
    const data = r.structuredContent;
    console.log(`Q: ${q}`);
    console.log(`Topic: ${data.topic}`);
    console.log(`A: ${data.answer.split("\n")[0]}`);
    if (data.related?.length) {
      console.log(`Related: ${data.related.map((x) => x.title).join(" | ")}`);
    }
    line();
  }

  // 2) search + fetch round trip
  const s = await client.callTool({
    name: "search",
    arguments: { query: "self healing daily practice" },
  });
  console.log("search('self healing daily practice') ->");
  console.log(s.structuredContent.results.map((x) => `  ${x.id} — ${x.title}`).join("\n"));

  const firstId = s.structuredContent.results[0]?.id;
  if (firstId) {
    const f = await client.callTool({ name: "fetch", arguments: { id: firstId } });
    console.log(`\nfetch('${firstId}') ->`);
    console.log(`  ${f.structuredContent.text.split("\n")[0]}`);
  }
  line();
  console.log("All calls completed.");

  await client.close();
}

main().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
