# Demonstration evidence

Checked on 2026-10-25 from the `feature/portfolio-pr` branch.

## Local production-image smoke check

- Image: `devops-portfolio:smoke`
- Image ID: `sha256:2e16dc941c0084909a7d840f8231cc8d76e4ba9d63412f1cdc66a17874749e11`
- Started temporarily with the host binding `127.0.0.1:3000:3000`.
- `GET /health`: HTTP 200
- `GET /`: HTTP 200; expected portfolio heading was present
- `GET /metrics`: HTTP 200
- The temporary container was stopped and removed after the check.

## Clean-room install status

The README's dependency-install step could not be completed in this environment. `npm ci` could not fetch all locked packages from `registry.npmjs.org`; requests failed with `ECONNRESET` even when retried outside the filesystem sandbox. The clean-room walkthrough therefore remains incomplete until `npm ci`, lint, and Jest can run with registry access.

The open GitHub PR #8 showed all three checks passing for its current head when reviewed. That hosted CI result is separate from the blocked local clean-room install.
