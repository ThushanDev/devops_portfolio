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
- [x] Keep AWS stack optional; do not provision while zero-spend constraint applies

## Infrastructure and runtime

- [x] Terraform state bootstrap with encryption, versioning, public access block, and lock table
- [x] Terraform network and compute modules with restricted management ports
- [x] k3s user data and operator-only kubeconfig path
- [x] Helm chart with probes, resource limits, rolling updates, Ingress, PDB, and optional HPA
- [x] Verify Terraform formatting and validation with the selected provider versions (main stack and bootstrap)
- [ ] Optional AWS path only: review regional cost, budget alert, domain, IP CIDR, and account prerequisites before apply
- [ ] Optional AWS path only: configure TLS and execute the first deployment after explicit approval

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
- A static HTML accessibility sanity check found one `h1`, a viewport declaration, no images missing `alt`, no unlabeled buttons, and no broken in-page fragment links; browser Lighthouse/contrast checks remain pending.
- Core zero-budget checklist progress: 20/25 complete (80%); the two unchecked AWS apply/deploy items are optional and excluded from this count.
- WSL 3.0.3 is installed and Docker Desktop's Linux engine responds. The Docker build starts but fails at `npm ci` because no `package-lock.json` exists.
- Jest, ESLint, Prettier, and package-lock generation remain blocked: access to `registry.npmjs.org` resets from both the Windows host (`EACCES`/`ECONNRESET`) and a Docker container. Dependencies, full image build, and local smoke check remain pending.
- Terraform formatting/validation passed for both the main stack and bootstrap, and Helm lint/template rendering passed using verified temporary CLI downloads. Helm also parsed the monitoring values and PrometheusRule YAML. GitHub repository protections and free Render account connection/first deployment still need account-side setup; AWS remains optional and out of scope under the no-budget constraint.
