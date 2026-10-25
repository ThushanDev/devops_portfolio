# Project checklist

## App and local workflow

- [x] Express portfolio page and build metadata
- [x] `/health`, `/metrics`, styled 404, security headers
- [x] Jest/Supertest checks, ESLint and Prettier configuration
- [x] Non-root multi-stage Docker image and health check
- [x] Makefile, ignore rules, and pre-commit hooks

## CI and image supply chain

- [x] Pull request validation and Docker test stage
- [x] GHCR SHA-tagged image workflow
- [x] Zero-spend Render Docker deployment blueprint with health check and CI-gated deploy
- [x] Trivy scan, SBOM artifact, and keyless signing
- [x] Dependabot configuration
- [ ] Confirm GitHub repository, branch protection, package visibility, and protected environment
- [ ] Connect the public repository to a Render free service and verify live health endpoint (no payment method)
- [ ] Keep AWS stack optional; do not provision while zero-spend constraint applies

## Infrastructure and runtime

- [x] Terraform state bootstrap with encryption, versioning, public access block, and lock table
- [x] Terraform network and compute modules with restricted management ports
- [x] k3s user data and operator-only kubeconfig path
- [x] Helm chart with probes, resource limits, rolling updates, Ingress, PDB, and optional HPA
- [x] Verify Terraform formatting and validation with the selected provider versions (main stack and bootstrap)
- [ ] Review regional cost, budget alert, domain, IP CIDR, and account prerequisites before apply
- [ ] Configure TLS and execute the first deployment after explicit approval

## Monitoring and handoff

- [x] Prometheus/Grafana starter values, dashboard, alert rules, and k6 script
- [x] Architecture decisions, cost notes, runbook, interview notes, security policy
- [x] Render and lint Helm chart; validate Terraform configuration
- [x] Parse monitoring values and alert-rule YAML with Helm
- [ ] Run tests, lint, Docker build and local smoke check
- [ ] Verify Lighthouse, accessibility, and responsive layout in a browser
- [ ] Complete clean-room README walkthrough and capture demonstration evidence

## Current validation status

- JavaScript syntax checks, JSON parsing, portfolio local-asset reference checks, Terraform fmt/validate, Helm lint/template rendering, and YAML syntax parsing for `render.yaml` pass; a basic scan found no hardcoded AWS access key or private-key markers.
- Jest, ESLint, Prettier, and Docker build remain unrun: npm access to `registry.npmjs.org` fails with `EACCES`, so `package-lock.json` and dependencies are unavailable.
- Docker Desktop is installed, but its Linux engine cannot start because WSL is not installed; WSL setup needs an administrator and may require a restart. The image build and local smoke check remain unrun.
- Terraform formatting/validation passed for both the main stack and bootstrap, and Helm lint/template rendering passed using verified temporary CLI downloads. Helm also parsed the monitoring values and PrometheusRule YAML. GitHub repository protections and free Render account connection/first deployment still need account-side setup; AWS remains optional and out of scope under the no-budget constraint.
