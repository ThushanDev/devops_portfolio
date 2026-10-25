# Free cloud deployment

The portfolio's free hosted path runs the Docker image on Render's free web service. It does not use AWS. The service definition is in `render.yaml` and builds from the repository root with `app/Dockerfile`.

## Before launch

- The public GitHub repository must contain the merged deployment files on `main`.
- The CI workflow must pass on the commit that Render will deploy.
- Use the Render Free plan only. Do not add a payment method or upgrade the service. If Render asks for billing details or a paid plan, stop and do not continue.
- Review Render's current [free service limits](https://render.com/docs/free). Keep in mind that free web services sleep after 15 minutes without traffic and can take about a minute to wake. Free usage limits can suspend service or builds.

## Create the service

1. Sign in to Render and connect the GitHub account that owns `ThushanDev/devops_portfolio`.
2. Create a new Blueprint and select the repository's `render.yaml` from the `main` branch.
3. Review the pending resource: it must be one web service on the `free` plan, in Singapore, with no database, disk, or other paid add-on.
4. Start the initial deploy only after the CI check is green.
5. Open the assigned `onrender.com` URL and verify the portfolio page, `/health`, and `/metrics`.

The blueprint waits for GitHub checks to pass before deploying future commits. Render uses the port specified by the blueprint and checks `/health` before routing traffic.

## Limits and operations

Free hosting is suitable for an internship demo, not a production availability promise. The service may sleep while idle, restart, or become unavailable after monthly free limits are reached. The filesystem is ephemeral, so the app must not store uploads or durable user data. Keep the app stateless and check the provider's usage dashboard. Do not upgrade or attach billing to recover from a free limit while the no-budget constraint applies.

The Terraform and Kubernetes configuration is retained as an optional infrastructure-learning example. Applying it provisions AWS resources and is outside the zero-spend deployment.
