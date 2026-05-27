const https = require("https");

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const OPENROUTER_HOST = "openrouter.ai";
const OPENROUTER_PATH = "/api/v1/chat/completions";
const GEMINI_HOST = "generativelanguage.googleapis.com";
const GEMINI_PATH = "/v1beta/openai/chat/completions";

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

    const provider = (req.body?.provider || "").toLowerCase() === "gemini" ? "gemini" : "openrouter";
    const apiKey = provider === "gemini" ? GEMINI_API_KEY : OPENROUTER_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: { message: `${provider === "gemini" ? "GEMINI_API_KEY" : "OPENROUTER_API_KEY"} is not set on the server.` } });
    }

    // Don't forward our own routing field upstream.
    if (req.body && typeof req.body === "object") delete req.body.provider;

    const payload = Buffer.from(JSON.stringify(req.body));

    const options = {
        hostname: provider === "gemini" ? GEMINI_HOST : OPENROUTER_HOST,
        path: provider === "gemini" ? GEMINI_PATH : OPENROUTER_PATH,
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
