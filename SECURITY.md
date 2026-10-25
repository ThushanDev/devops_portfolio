# Security policy

## Supported version

The current `main` branch is the supported version.

## Reporting a vulnerability

Do not open a public issue with exploit details or credentials. Use GitHub's private vulnerability reporting for this repository, or contact the maintainer through a private channel.

## Project safeguards

- Keep GitHub Actions permissions narrow and use short-lived OIDC for AWS.
- Pin runtime versions; scan images and dependencies; fix findings rather than disabling checks.
- Do not commit `.env`, credentials, private keys, kubeconfigs, or Terraform state.
- Restrict SSH and the Kubernetes API to the operator's IP. Never expose port 6443 to `0.0.0.0/0`.
- Review Terraform plans, costs, and destructive actions before approval.
