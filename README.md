# DirtyNinja Company Tracker

DirtyNinja Company Tracker is a browser-based Torn company dashboard for tracking profit, employees, live API data, extra companies, and saved history snapshots.

Live app:

```text
https://jcarroll122009-dev.github.io/torn-company-tracker/torn-company-tracker.html
```

## What It Does

- Shows daily profit, company value/readout panels, employee stats, company health, alerts, and action items.
- Lets you click an employee name to expand a full worker record.
- Pulls live Torn company data from your API key.
- Supports Torn API v2 with v1 fallback.
- Tracks profit chart data automatically from API syncs.
- Saves company snapshots so you can compare old data later.
- Adds daily snapshots into a weekly profit summary.
- Compares profit across your main company and saved extra companies.
- Lets you save up to 50 extra company API keys.
- Lets you edit saved company names/API keys without deleting and remaking them.
- Includes a recommended custom-key setup link for company tracking.
- Lets you decide whether the main API key is remembered on the current device.
- Auto-syncs extra companies after you press Sync All Companies.
- Exports employee, profit, and company history CSV files.
- Stores keys and tracker data in the current browser only.

## How To Use

1. Open the live app link.
2. In the Live Torn API panel, use Create recommended custom key if you need a company-tracker key.
3. Paste your main Torn API key.
4. Choose whether to remember that key on this device.
5. Pick the API mode:
   - Best live data: v2 then v1 fallback
   - API v2 only
   - API v1 only
6. Pick an auto-sync interval or turn auto-sync off.
7. Press Sync to load your main company data.
8. Use the profit chart, employee table, alerts, and Company Readout panel to review performance.
9. Click an employee name to open the drop-down record for that worker.

## Extra Companies

Use the More Companies panel to track other companies.

1. Enter a company name or owner label.
2. Enter that company's Torn API key.
3. Press Add.
4. Repeat for up to 50 companies.
5. Press Sync All Companies.

After Sync All Companies finishes, the extra-company live timer starts. The app refreshes due companies on your selected interval and syncs one company at a time so it runs smoother with many saved companies. Sync All Companies also spaces requests out to reduce API-limit risk.

Use Edit next to a saved company if the name or API key changes.

## Profit And History

- The profit chart records live API sync points automatically.
- Company Profit History stores snapshots for the main company and extra companies.
- Stock cost is included in profit when Torn returns a daily stock/order cost field.
- Current stock inventory value is not counted as daily stock cost.
- Weekly Profit Summary adds one saved snapshot per company per day for the current week.
- If Torn does not return an exact daily stock cost for a company/day, that row is marked as partial because profit may be too high.
- Exact weekly profit means every saved company-day included exact sales, wages, and daily stock cost.
- Snapshots let you look back at older profit, sales, wages, stock cost, employees, and confidence data.
- Use Export Profit CSV or Export Company History CSV if you want to save the data outside the browser. Company history export includes stock status and stock source.

## Sharing The App

You can share the normal GitHub Pages link with other people:

```text
https://jcarroll122009-dev.github.io/torn-company-tracker/torn-company-tracker.html
```

When the app is updated, the same link updates for everyone. A link with `?v=...` is only used to force a fresh copy when browsers or GitHub Pages cache the old version.

Each person has their own saved API keys and data in their own browser. Your saved keys do not transfer to other people.

## API Key Notes

- API keys are saved in browser local storage.
- If Remember this key on this device is turned off, the main key is only kept for the current browser session.
- GitHub Pages does not store your keys on a server.
- Anyone using the app needs their own Torn API key with the needed company access.
- Only add keys you own or keys the owner has clearly allowed you to use.
- The app uses Torn API endpoints only; it does not scrape Torn pages or perform account actions.
- If direct Torn API calls are blocked by the browser, enable Use backend proxy and enter a proxy URL.

## Optional Backend Proxy

The `backend` folder contains a small Node proxy for Torn API requests. It is optional and is mainly useful if direct browser API requests fail.

See [backend/README.md](backend/README.md) for proxy setup.

## Files

- `torn-company-tracker.html`: main static app.
- `index.html`: redirects to the main app.
- `backend/`: optional API proxy.
- `tracker-preview.png`: preview image.
