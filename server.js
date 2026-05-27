/**
 * Local dev server for Job Answer Generator
 * - Reads OPENROUTER_API_KEY from .env (never exposes it to the browser)
 * - Serves index.html and config.js as static files
 * - Proxies POST /api/generate → OpenRouter chat completions
 *
 * Requirements: Node.js 14+  (no npm install needed)
 * Usage:        node server.js
 */

const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
const url = require("url");

// ── Load .env ────────────────────────────────────────────────────────────────
function loadEnv() {
  const envPath = path.join(__dirname, ".env");
  if (!fs.existsSync(envPath)) return;
  fs.readFileSync(envPath, "utf8")
    .split("\n")
    .forEach(line => {
      const m = line.match(/^\s*([^#\s][^=]*)=(.*)$/);
      if (m) {
        const key = m[1].trim();
        const val = m[2].trim().replace(/^["']|["']$/g, "");
        process.env[key] = val;
      }
    });
}

loadEnv();

const PORT = process.env.PORT || 3000;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!OPENROUTER_API_KEY) {
  console.warn("⚠️  Warning: OPENROUTER_API_KEY not set in .env — OpenRouter requests will fail.");
}
if (!GEMINI_API_KEY) {
  console.warn("⚠️  Warning: GEMINI_API_KEY not set in .env — Gemini requests will fail.");
}

// ── MIME types ───────────────────────────────────────────────────────────────
const MIME = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".ico": "image/x-icon",
};

// ── Static file helper ───────────────────────────────────────────────────────
function serveStatic(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { "Content-Type": MIME[ext] || "text/plain" });
    res.end(data);
  });
}

// ── LLM proxy (OpenRouter / Gemini) ──────────────────────────────────────────
function proxyToLLM(req, res) {
  let body = "";
  req.on("data", chunk => (body += chunk));
  req.on("end", () => {
    let json;
    try {
      json = JSON.parse(body || "{}");
    } catch (e) {
      res.writeHead(400, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" });
      res.end(JSON.stringify({ error: { message: "Invalid JSON body." } }));
      return;
    }

    const provider = (json.provider || "").toLowerCase() === "gemini" ? "gemini" : "openrouter";

    let hostname;
    let pathName;
    let apiKey;
    if (provider === "gemini") {
      hostname = "generativelanguage.googleapis.com";
      pathName = "/v1beta/openai/chat/completions";
      apiKey = GEMINI_API_KEY;
    } else {
      hostname = "openrouter.ai";
      pathName = "/api/v1/chat/completions";
      apiKey = OPENROUTER_API_KEY;
    }

    if (!apiKey) {
      res.writeHead(500, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" });
      res.end(JSON.stringify({ error: { message: `${provider.toUpperCase()}_API_KEY is not set on the server.` } }));
      return;
    }

    // Don't forward our own routing field upstream.
    delete json.provider;

    const payload = Buffer.from(JSON.stringify(json));

    const options = {
      hostname,
      path: pathName,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "Content-Length": payload.length,
      },
    };

    const proxyReq = https.request(options, proxyRes => {
      let chunks = [];
      proxyRes.on("data", chunk => chunks.push(chunk));
      proxyRes.on("end", () => {
        const body = Buffer.concat(chunks);
        console.log(`← ${provider === "gemini" ? "Gemini" : "OpenRouter"} ${proxyRes.statusCode} (${body.length} bytes)`);
        if (proxyRes.statusCode !== 200) {
          console.error("   Response:", body.toString().slice(0, 500));
        }
        res.writeHead(proxyRes.statusCode, {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        });
        res.end(body);
      });
    });

    proxyReq.on("error", err => {
      console.error("Proxy error:", err.message);
      res.writeHead(502);
      res.end(JSON.stringify({ error: { message: err.message } }));
    });

    proxyReq.write(payload);
    proxyReq.end();
  });
}

// ── HTTP server ───────────────────────────────────────────────────────────────
const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);

  // CORS preflight
  if (req.method === "OPTIONS") {
    res.writeHead(204, { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type" });
    res.end();
    return;
  }

  // API proxy
  if (req.method === "POST" && pathname === "/api/generate") {
    proxyToLLM(req, res);
    return;
  }

  // Static files
  let filePath = path.join(__dirname, pathname === "/" ? "index.html" : pathname);

  // Prevent directory traversal
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  serveStatic(res, filePath);
});

server.listen(PORT, () => {
  console.log(`✅  Job Answer Generator running at http://localhost:${PORT}`);
  console.log(`   OpenRouter key in .env: ${OPENROUTER_API_KEY ? "yes (" + OPENROUTER_API_KEY.slice(0, 10) + "...)" : "NO — add OPENROUTER_API_KEY"}`);
  console.log(`   Gemini key in .env:     ${GEMINI_API_KEY ? "yes (" + GEMINI_API_KEY.slice(0, 6) + "...)" : "NO — add GEMINI_API_KEY"}`);
});
