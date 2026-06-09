# Torn Company Tracker Proxy

Optional backend proxy for the static GitHub Pages tracker.

## Run locally

```bash
npm start
```

Then set the app's backend URL to:

```text
http://localhost:3000
```

## Deploy

Deploy this `backend` folder to a Node host such as Render, Railway, Fly.io, or any server that supports Node 20+.

Useful environment variables:

- `PORT`: server port, usually set by the host.
- `ALLOWED_ORIGIN`: your GitHub Pages URL, or `*` for testing.
- `TORN_API_KEY`: optional server-side Torn API key. If omitted, the app sends `X-Torn-Key` to the proxy.

The proxy only allows the Torn endpoints used by this tracker.
