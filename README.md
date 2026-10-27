# Thushan Gamage — DevOps Portfolio

An end-to-end delivery project for a personal portfolio app built with React and Vite, served locally and in containers by Express, and deployable as a static site on Vercel. The engineering showcase is the path from a reviewed change to a monitored Kubernetes release.

## Architecture

```mermaid
flowchart LR
  Dev[Developer] --> PR[GitHub Pull Request]
  PR --> CI[GitHub Actions: lint, tests, scans]
  CI --> Build[Docker image tagged by commit SHA]
  Build --> Scan[Trivy scan, SBOM, keyless signature]
  Scan --> GHCR[GitHub Container Registry]
  GHCR --> Render[Render free Docker web service]
  Render --> App[Portfolio app]
  App --> Metrics[/health and /metrics]
  TF[Optional Terraform learning stack] --> AWS[AWS resources; costed, not provisioned]
```

## Project layout

- `app/` — React/Vite portfolio, Express health and metrics endpoints, tests, and hardened multi-stage Dockerfile
- `infra/` — Terraform state bootstrap and AWS modules
- `k8s/helm/portfolio/` — Kubernetes chart with probes, resources, Ingress, PDB, and optional HPA
- `monitoring/` — Prometheus values, alert rules, and Grafana dashboard
- `.github/workflows/` — CI and infrastructure validation
- `docs/` — architecture decisions, cost notes, runbook, and interview notes

## Local development

Requirements: Node.js 24, npm, Docker, Terraform, Helm, and Make. The React portfolio and Express service only need Node.js and npm for local development.

```sh
make install
cd app
npm run dev
```

Vite serves the React site at `http://localhost:5173`. To run the production Express server locally, build the front end first with `npm run build`, then run `npm start` from `app/`; the app listens on `http://localhost:3000`. Check `/health` and `/metrics` there.

`npm test` builds the front end before running the Express tests. To deploy the portfolio to Vercel, import this repository with its root directory set to the repository root; `vercel.json` installs the `app/` dependencies, builds Vite, and publishes `app/dist`. The Vercel static deployment serves the portfolio and résumé. The `/health` and `/metrics` endpoints are provided by the Express deployment (local/Docker/Render).

### Windows and Docker Desktop

Docker Desktop uses WSL 2 for Linux containers. If Docker Desktop reports that WSL is missing or needs updating, open PowerShell as Administrator and run `wsl --install --no-distribution`, then restart Windows if prompted. After restart, open Docker Desktop and wait until its engine is running. Verify with `wsl --version` and `docker version`. See the [official Docker Desktop Windows setup guide](https://docs.docker.com/desktop/setup/install/windows-install/).

If `make` is unavailable in PowerShell, run the matching commands directly from the repository root:

```powershell
Set-Location app
npm ci
npm run dev
Set-Location ..
docker build -f app/Dockerfile -t devops-portfolio:local .
docker run --rm -p 3000:3000 devops-portfolio:local
```

## Image

The Docker image has dependency, test, production dependency, and runtime stages. Runtime runs as the unprivileged `node` user. Build locally with `make build`; image size should be measured with `docker image ls devops-portfolio:local` after building.

## Free cloud hosting

The zero-spend deployment target is Render's free Docker web service. `render.yaml` builds from `app/Dockerfile`, checks `/health`, and waits for linked GitHub checks before deploying. To launch it, connect the public GitHub repository in Render and create a Blueprint from this file. Do not add a payment method or upgrade the service. Free web services sleep after 15 minutes without traffic and can take about a minute to wake; free usage limits can suspend the service. Check Render's current [free service limits](https://render.com/docs/free) before launch. Follow [the free deployment guide](docs/free-deploy.md). This deploy does not provision AWS resources.

The AWS Terraform and Kubernetes files remain as an optional learning path. They can create billable resources and are not part of the zero-spend deployment. Do not apply them for this project while keeping the no-budget constraint.

## CI and image release

Pull requests run tests, lint, Hadolint, and the Docker test stage. A successful merge to `main` builds an image with the commit SHA, scans it, publishes an SBOM, and signs the digest using GitHub OIDC. Cluster deployment is a separate manually dispatched workflow that requires a protected `production` environment.

Required repo settings/actions:

1. Protect `main`: require PRs and the `verify` status check; disallow force pushes.
2. Confirm the GHCR package visibility is deliberate before allowing public image pulls. For private images, follow `k8s/helm/portfolio/README.md`.
3. For AWS CI, configure an OIDC trust policy for only this repository and a protected environment. Do not store long-lived AWS keys.
4. For deployment, configure the protected environment and cluster credentials using GitHub secrets. Never put a kubeconfig or webhook value in this repository.
5. See `.github/SETUP.md` for the account-side settings and secret names. Code changes do not create or deploy cloud resources automatically.

## Optional AWS infrastructure

Terraform is split into a state bootstrap and the main stack. The state bucket has versioning, server-side encryption, public-access blocking, and a policy that rejects insecure transport. These resources may incur charges, so this optional AWS path is not used for the free hosted app. If you later choose to use it, review regional pricing and the prerequisites in `docs/first-deploy.md` before any apply.

1. Review `docs/cost.md` and AWS regional pricing.
2. Generate an SSH key locally and use only its public key in `public_key`.
3. Review `infra/bootstrap` before running Terraform. State storage can incur charges and has `prevent_destroy` enabled.
4. Review the main Terraform plan and security group CIDR before any apply. Port 6443 is restricted to `my_ip_cidr`.
5. Install/verify k3s and retrieve kubeconfig through SSH. Keep kubeconfig private.
6. Build and publish an image through the protected GitHub workflow, then deploy the exact SHA tag with Helm.
7. Configure a real DNS name and TLS issuer before enabling public HTTPS; see `k8s/cert-manager/README.md`.

No AWS cloud resources are created automatically by this repository. Applying, destroying, or deploying the AWS stack requires explicit approval. Follow `docs/first-deploy.md` only if you later opt into that costed path.

## Monitoring

Prometheus and Grafana configuration is included as an optional Kubernetes learning path. It is not deployed to the free Render service. Install `kube-prometheus-stack` with `monitoring/values.yaml`, create the Grafana admin secret outside Git, enable the chart's ServiceMonitor, and apply `monitoring/portfolio-alerts.yaml` only on a separately provisioned cluster.

## Security and operations

See [SECURITY.md](SECURITY.md), [docs/runbook.md](docs/runbook.md), and [docs/cost.md](docs/cost.md). Never commit secrets, state, kubeconfigs, or private keys. No workflow applies infrastructure or destroys resources.

## License

MIT. See [LICENSE](LICENSE).
