# Interview notes

- **CI before release:** run tests, lint, container checks, and vulnerability scanning before publishing an image.
- **Immutable tags:** deploy by commit SHA so a running release can be traced to its source.
- **Multi-stage Docker:** keep test tooling out of the production runtime image.
- **Non-root containers:** reduce the impact of a container compromise.
- **OIDC:** exchange a short-lived workflow identity for narrowly scoped AWS access instead of keeping long-lived keys.
- **Terraform:** make infrastructure reviewable, repeatable, and removable.
- **k3s:** demonstrate Kubernetes on a small host; it trades availability and capacity for lower complexity and cost.
- **Probes and rolling updates:** let Kubernetes detect unhealthy pods and replace them gradually.
- **Metrics:** expose application and runtime signals so dashboards and alerts have observable data.
