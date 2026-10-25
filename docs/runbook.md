# Runbook

## App is unavailable

1. Check the Kubernetes pod and recent events with `kubectl -n portfolio get pods` and `kubectl -n portfolio describe pod <pod>`.
2. Check readiness, liveness, resource limits, and app logs with `kubectl -n portfolio logs deploy/portfolio-portfolio --previous`.
3. Confirm the `/health` route locally or through the Service port-forward.

## Bad deployment

1. Inspect `kubectl -n portfolio rollout status deploy/portfolio-portfolio`.
2. If the previous ReplicaSet is healthy, ask for approval before running `kubectl -n portfolio rollout undo deploy/portfolio-portfolio`.
3. Keep the failed image digest and logs for diagnosis; do not turn off security checks.

## TLS or DNS issue

Check the Ingress host, DNS record, cert-manager Certificate and Challenge resources. Use the Let's Encrypt staging issuer while debugging. Do not expose port 6443 publicly.

## Cluster unreachable

Check EC2 state and security group source CIDR. Refresh the operator's IP variable if it changed. Do not widen SSH or Kubernetes API access to the world.

## Tear down

Review the Terraform destroy plan, identify state/bootstrap resources, and obtain explicit confirmation in the current turn before destroying anything. Preserve state until removal is verified.
