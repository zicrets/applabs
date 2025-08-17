# Secret Scanner – Deliberately Insecure 3‑Tier Demo

> **Purpose:** As an application security consultant, you can use this repo to validate whether a secret‑scanning tool correctly detects diverse secret types embedded across a realistic front‑end, middle‑tier API, and back‑end service.
>
> **IMPORTANT:** All “secrets” below are **synthetic** and **not connected** to any real accounts. They exist solely to trigger scanners. **Never** reuse these patterns in real systems.

## Architecture
- **frontend/** – Minimal React app that calls the API.
- **api/** – Node.js/Express API that talks to Postgres and the Python service.
- **python_service/** – FastAPI service simulating back‑end processing.
- **db/** – Postgres init script.
- **docker-compose.yml** – Local orchestration (optional; not required for scanning).

## Where Secrets Are Planted (for scanner validation)
| Location | Example Types | Notes |
|---|---|---|
| `api/.env` | `JWT_SECRET`, `DB_PASSWORD`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `SLACK_BOT_TOKEN` | Classic `.env` leakage |
| `api/config.js` | GitHub PAT (`ghp_…`), Twilio SID/AUTH, hardcoded DB URL with password | Hardcoded in source |
| `python_service/secret_config.py` | AWS creds, fake service API keys | Python constants |
| `python_service/id_rsa` | **Fake** private key (PEM) | PEM block to test detectors |
| `frontend/src/App.jsx` | “Client secret” pattern (should be flagged as risky even on client side) | Intentional anti‑pattern |



## Quick Start (optional)
This project is primarily for **static secret scanning**. Running is optional.

```bash
# 1) (Optional) bring up services with Docker
docker compose up --build

# 2) Run your secret scanner from the repo root, e.g.:

```

## Notes (general guidance)
- Include all file types: source, `.env`, `*.pem`, config, and Dockerfiles.
- Scan Git history if evaluating pre‑commit leakage scenarios.
- Verify policy suppressions don’t hide **high‑risk** types (AWS, PAT, PEM, DB URLs).

---

## Disclaimer
All included secrets are **fictitious** and intended solely for **tool testing**. No systems or accounts can be accessed with these values.
