# Evidence API Prototype v0.1 (synthetic-only)
Local test server: `AEGIS_API_AUTOSTART=1 node scripts/evidence-api-server.mjs` (binds loopback only; default port 8787).

Endpoints:
- GET `/health`
- POST `/v1/analyze` — graph structure/status analysis
- POST `/v1/report` — JSON evidence report

Request: `Content-Type: application/json` (optional parameters such as `charset=utf-8` are accepted; media type is checked exactly), body must include `synthetic:true`.

**Request-boundary limits**
- Body: 1 MiB maximum
- Nodes: 1,000 maximum
- Edges: 3,000 maximum
- Node ID: 128 chars; node type: 64 chars; node label: 2,000 chars
- Graph ID: 128 chars
- Edge endpoints: 128 chars
- Control characters are rejected in graph identifiers/text fields
- Relationship allowlist enforced at the API boundary

Responses: 400 malformed/missing body, 413 too large, 415 wrong media type, 422 non-synthetic or invalid graph, 404 unknown route.

Security response headers include `no-store`, `nosniff`, `DENY`, restrictive CSP, Referrer-Policy and Permissions-Policy. Error responses avoid exposing exception details.

No auth, TLS, persistence, production deployment, rate limiting, or real evidence support. This prototype binds to 127.0.0.1 and must not be exposed publicly. It does not determine truth/authenticity. The API prototype currently accepts evidence graphs; it does **not** implement full validation against the separate Evidence Record JSON Schema.
