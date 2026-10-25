# Project instructions

This repository is a DevOps portfolio demonstration. Keep the app small; prioritize secure, explainable delivery and infrastructure.

## Workflow

- Work from the project plan and keep changes focused.
- Use a feature branch and pull request; do not work directly on `main`.
- Keep secrets out of chat and Git. Use GitHub secrets and short-lived OIDC for AWS.
- Explain the reason for non-obvious design choices so the maintainer can discuss them in interviews.
- Keep the Makefile as the documented command entry point.

## Hard safety rules

1. Never run `terraform apply`, `terraform destroy`, `kubectl delete`, `git push`, or cloud resource creation/deletion without explicit confirmation in the current turn.
2. Never commit AWS keys, `.env` files, kubeconfigs, private keys, or `*.tfstate` files.
3. Never expose SSH or the k3s API port 6443 to `0.0.0.0/0`.
4. Stay within free-tier resources unless the user approves costs first; verify current pricing before provisioning.
5. Do not disable security checks to make a pipeline pass.

## Conventions

- Pin runtime and container versions; run as a non-root user.
- Tag images by commit SHA; do not deploy `latest`.
- Include Kubernetes readiness/liveness probes, resource requests/limits, and rolling updates.
- Keep GitHub Actions permissions minimal and pin action versions.
- For uncertainty involving cost, security, or AWS account state, ask before proceeding.
