# GitHub setup checklist

Complete these steps after the repository exists:

1. Protect `main`: require pull requests, require the `verify` check, dismiss stale approvals, and block force pushes/deletions.
2. Make the GHCR package public only if public image pulls are intended; otherwise create an image pull secret outside the repository.
3. Create a `production` environment with required reviewers before using the manual deploy workflow.
4. Store the base64-encoded kubeconfig as `KUBE_CONFIG` in the protected environment. Never print it in logs.
5. Create a `tf-plan` environment restricted to the protected `main` branch and require reviewer approval. Configure the environment variables `AWS_ROLE_ARN`, `AWS_REGION`, `TF_STATE_BUCKET`, `TF_LOCK_TABLE`, `OPERATOR_CIDR`, and `SSH_PUBLIC_KEY` only after reviewing the OIDC trust and read-only policy. Do not add access keys.
6. Add private Alertmanager receiver configuration outside Git if email/Slack alerts are wanted.

The repository currently has no automatic cluster deployment on push. Run the manually dispatched deployment only with an approved image SHA and a reviewed production environment.
