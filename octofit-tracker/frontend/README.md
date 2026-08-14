# OctoFit Tracker Frontend

## Environment variables

Define `VITE_CODESPACE_NAME` so the frontend can build a Codespaces API URL:

```bash
# octofit-tracker/frontend/.env.local
VITE_CODESPACE_NAME=your-codespace-name
```

The app builds API URLs as:

`https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/`

If `VITE_CODESPACE_NAME` is missing or empty, the app safely falls back to `http://localhost:8000` to avoid `https://undefined-8000...` URLs.

## Run frontend

```bash
npm run dev --prefix octofit-tracker/frontend
```
