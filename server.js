/**
 * Local dev server for Job Answer Generator
 * - Reads GEMINI_API_KEY from .env (never exposes it to the browser)
 * - Serves index.html and config.js as static files
 * - Proxies POST /api/generate → Google Gemini chat completions
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
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY || API_KEY.startsWith("AIzaSy_YOUR_API_KEY")) {
  console.warn("⚠️  Warning: GEMINI_API_KEY not set in .env — requests will fail.");
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

// ── Gemini proxy ─────────────────────────────────────────────────────────────
function proxyToGemini(req, res) {
  let body = "";
  req.on("data", chunk => (body += chunk));
  req.on("end", () => {
    const payload = Buffer.from(body);

    const options = {
      hostname: "generativelanguage.googleapis.com",
      path: "/v1beta/openai/chat/completions",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Length": payload.length,
      },
    };

    const proxyReq = https.request(options, proxyRes => {
      let chunks = [];
      proxyRes.on("data", chunk => chunks.push(chunk));
      proxyRes.on("end", () => {
        const body = Buffer.concat(chunks);
        console.log(`← Gemini ${proxyRes.statusCode} (${body.length} bytes)`);
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
    proxyToGemini(req, res);
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
  console.log(`   API key loaded from .env: ${API_KEY ? "yes (" + API_KEY.slice(0, 8) + "...)" : "NO — add GEMINI_API_KEY to .env"}`);
});
