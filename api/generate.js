const https = require("https");

const API_KEY = process.env.GEMINI_API_KEY;

module.exports = function handler(req, res) {
  // CORS preflight
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: { message: "Method not allowed" } });
  }

  if (!API_KEY) {
    return res.status(500).json({ error: { message: "GEMINI_API_KEY is not set on the server." } });
  }

  const payload = Buffer.from(JSON.stringify(req.body));

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
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(proxyRes.statusCode).send(body);
    });
  });

  proxyReq.on("error", err => {
    console.error("Proxy error:", err.message);
    res.status(502).json({ error: { message: err.message } });
  });

  proxyReq.write(payload);
  proxyReq.end();
};
