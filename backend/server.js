import http from "node:http";

const PORT = Number(process.env.PORT || 3000);
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "*";
const STORED_TORN_KEY = process.env.TORN_API_KEY || "";

const server = http.createServer(async (req, res) => {
  setCors(res);

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === "/health") {
    sendJson(res, 200, { ok: true });
    return;
  }

  if (url.pathname !== "/api/torn") {
    sendJson(res, 404, { error: "Not found" });
    return;
  }

  const path = url.searchParams.get("path") || "";
  if (!isAllowedTornPath(path)) {
    sendJson(res, 400, { error: "Unsupported Torn API path" });
    return;
  }

  const key = req.headers["x-torn-key"] || STORED_TORN_KEY;
  if (!key) {
    sendJson(res, 401, { error: "Missing Torn API key" });
    return;
  }

  try {
    const separator = path.includes("?") ? "&" : "?";
    const tornUrl = `https://api.torn.com/${path}${separator}key=${encodeURIComponent(key)}`;
    const upstream = await fetch(tornUrl, { headers: { "User-Agent": "torn-company-tracker-proxy" } });
    const body = await upstream.text();
    res.writeHead(upstream.status, {
      "content-type": upstream.headers.get("content-type") || "application/json",
      "cache-control": "no-store"
    });
    res.end(body);
  } catch (error) {
    sendJson(res, 502, { error: "Torn API request failed", detail: error.message });
  }
});

function isAllowedTornPath(path) {
  const cleanPath = stripAllowedQueryNoise(path);
  return [
    "v2/key/info",
    "v2/company/profile",
    "v2/company/employees",
    "v2/company/stock",
    "v2/company/timestamp",
    "company/?selections=employees,detailed,profile,stock"
  ].includes(cleanPath);
}

function stripAllowedQueryNoise(path) {
  const [base, query = ""] = path.split("?");
  if (!query) return base;
  const params = new URLSearchParams(query);
  params.delete("timestamp");
  const cleanQuery = params.toString();
  return cleanQuery ? `${base}?${cleanQuery}` : base;
}

function setCors(res) {
  res.setHeader("access-control-allow-origin", ALLOWED_ORIGIN);
  res.setHeader("access-control-allow-methods", "GET,OPTIONS");
  res.setHeader("access-control-allow-headers", "X-Torn-Key,Content-Type");
}

function sendJson(res, status, payload) {
  res.writeHead(status, {
    "content-type": "application/json",
    "cache-control": "no-store"
  });
  res.end(JSON.stringify(payload));
}

server.listen(PORT, () => {
  console.log(`Torn tracker proxy listening on ${PORT}`);
});
