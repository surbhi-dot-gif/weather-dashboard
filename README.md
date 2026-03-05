# Weather Dashboard 

## Overview
A full‑stack weather dashboard with city search, favorites, AI agent recommendations, and custom weather alerts.

## Tech Stack
- **Frontend:** React + Vite → fast dev, modern tooling.
- **Backend:** Node.js + Express → lightweight API server.
- **Database:** MongoDB → flexible storage for favorites.
- **AI Agent:** Integrated via OpenRouter/Cohere → contextual weather advice.

## Setup Instructions
1. Clone repo.
2. `cd weather-dashboard-frontend && npm install`
3. `cd weather-dashboard-backend && npm install`
4. Add `.env` files with API keys.
5. Run backend: `npm run dev`
6. Run frontend: `npm run dev`

## Architecture Diagram
Frontend (React) → Backend (Express) → Weather API (OpenWeather) → AI Agent → MongoDB.

## Auth Approach
JWT‑based login/register with hashed passwords.

## AI Agent Design
Weather data is passed into AI agent prompt. The agent generates contextual recommendations (e.g., carry umbrella, wear jacket).

## Custom Feature
**Weather Alerts:** Users set thresholds (e.g., temp < 10°C). Dashboard highlights alerts to help prepare for extreme conditions.

## Known Limitations
- Free tier APIs may have rate limits.
- AI agent responses depend on provider availability.
- Basic UI, not mobile‑optimized yet.

## Live Deployment
- Frontend (Netlify): [https://comfy-lollipop-22b4f4.netlify.app/](https://comfy-lollipop-22b4f4.netlify.app/)
- Backend (Render): [https://weather-dashboard-1-8vlp.onrender.com](https://weather-dashboard-1-8vlp.onrender.com)
