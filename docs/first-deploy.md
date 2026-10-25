# Optional AWS first deployment checklist

This runbook is only for the optional AWS learning path. It can create billable resources and is not needed for the zero-spend Render deployment. It does not run cloud commands for you. Review cost and resource changes, then explicitly approve AWS apply, destroy, or real-cluster commands when requested. For the free app host, connect the public GitHub repository in Render and create a Blueprint from `render.yaml`; do not add a payment method or upgrade the service.

## 1. AWS prerequisites

- Enable MFA on the AWS root account; use a non-root administrator for setup.
- Create an AWS Budget alert before creating resources. Check the live regional calculator and public IPv4 charges.
- Generate an SSH key locally; Terraform needs only the public key. Keep the private key outside the repo.
- Record your current public IPv4 CIDR as `/32`; never use `0.0.0.0/0` for ports 22 or 6443.

## 2. Terraform state bootstrap

Copy `infra/bootstrap/terraform.tfvars.example` to an untracked `infra/bootstrap/terraform.tfvars` and choose a globally unique bucket name. From the repository root:

```sh
terraform -chdir=infra/bootstrap init
terraform -chdir=infra/bootstrap plan
```

Review every resource and cost. Only after approval, run:

```sh
terraform -chdir=infra/bootstrap apply
```

Record the bucket and lock table outputs. The bucket uses versioning, encryption, public-access blocking, TLS-only access, and a destroy guard.

## 3. Main AWS stack

Copy `infra/terraform/terraform.tfvars.example` to an untracked `infra/terraform/terraform.tfvars`. Set your CIDR, public key, and bootstrap outputs. Copy `backend.hcl.example` to untracked `backend.hcl` and set the same bucket and table values.

```sh
terraform -chdir=infra/terraform init -backend-config=backend.hcl
terraform -chdir=infra/terraform fmt -check -recursive
terraform -chdir=infra/terraform validate
terraform -chdir=infra/terraform plan
```

Review the plan, instance type, storage, public IP, and OIDC role before an approved apply. Do not expose 6443 publicly. The plan role is read-only apart from the state-lock operations needed for planning.

## 4. Cluster access and image

After the approved apply, use the Terraform output `ssh_command` and the private key on your machine. Retrieve kubeconfig over SSH, protect it locally, and replace its `127.0.0.1` server address with the EC2 public IP. Test `kubectl get nodes` from your machine or through an SSH tunnel.

Protect `main`, configure the production environment, and verify GHCR package visibility. If GHCR is private, create the Kubernetes image pull secret as described in the Helm chart README. Configure GitHub Actions `KUBE_CONFIG` in the protected environment; never print it.

## 5. Domain, HTTPS, and deployment

Choose a real domain before requesting a production certificate. Install cert-manager, copy the staging issuer example, set its contact email, configure DNS, and validate an HTTP-01 challenge. Switch to the production issuer only after staging succeeds.

Build and scan an image from a reviewed commit. Use its 40-character commit SHA in the manually dispatched `deploy-portfolio` workflow. The production environment should require a reviewer. Verify `/health`, `/metrics`, rollout status, and the Grafana dashboard after deployment.

## 6. End a session

Review current costs, then inspect a Terraform destroy plan. Obtain explicit confirmation before any destroy. Preserve the state bucket and lock table until the main stack is gone and its state is no longer needed.
