# Evidence API Prototype v0.1 (synthetic-only)
Local test server: `AEGIS_API_AUTOSTART=1 node scripts/evidence-api-server.mjs` (binds loopback only; default port 8787).
Endpoints:
- GET `/health`
- POST `/v1/analyze` — graph structure/status analysis
- POST `/v1/report` — JSON evidence report
Request: `Content-Type: application/json`, body must include `synthetic:true`.
Body limit: 1 MiB. Responses: 400 malformed/missing body, 413 too large, 415 wrong media type, 422 non-synthetic or invalid graph, 404 unknown route.
No auth, TLS, persistence, production deployment, rate limiting, or real evidence support. This prototype binds to 127.0.0.1 and must not be exposed publicly. It does not determine truth/authenticity.
