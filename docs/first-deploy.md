# Optional AWS first deployment checklist

This runbook is only for the optional AWS learning path. It can create billable resources and is not needed for the zero-spend Render deployment. It does not run cloud commands for you. Review cost and resource changes, then explicitly approve AWS apply, destroy, or real-cluster commands when requested. For the free app host, connect the public GitHub repository in Render and create a Blueprint from `render.yaml`; do not add a payment method or upgrade the service.

## 1. AWS prerequisites

- Enable MFA on the AWS root account; use a non-root administrator for setup.
- Create an AWS Budget alert before creating resources. Check the live regional calculator and public IPv4 charges.
- Select an Availability Zone ID that is enabled for your account and region.
- The private k3s host is managed with Systems Manager Session Manager; no SSH or Kubernetes API ports are exposed.
- The optional stack uses a NAT gateway and CloudWatch flow logs. Both can incur charges; review current regional pricing first.

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

Copy `infra/terraform/terraform.tfvars.example` to an untracked `infra/terraform/terraform.tfvars`. Set the Availability Zone ID and bootstrap outputs. Copy `backend.hcl.example` to untracked `backend.hcl` and set the same bucket and table values.

```sh
terraform -chdir=infra/terraform init -backend-config=backend.hcl
terraform -chdir=infra/terraform fmt -check -recursive
terraform -chdir=infra/terraform validate
terraform -chdir=infra/terraform plan
```

Review the private subnet, NAT gateway, encrypted VPC flow logs, instance type, storage, and OIDC role before an approved apply. The host has no public IP or inbound management ports. The plan role is read-only apart from state-lock operations needed for planning.

## 4. Cluster access and image

After the approved apply, start a Systems Manager Session Manager session to the Terraform output `instance_id`. Retrieve kubeconfig inside that private session and keep it in a protected local file. The Kubernetes API remains private; use a Session Manager port-forward when operating the cluster remotely.

Protect `main`, configure the production environment, and verify GHCR package visibility. If GHCR is private, create the Kubernetes image pull secret as described in the Helm chart README. Configure GitHub Actions `KUBE_CONFIG` in the protected environment; never print it.

## 5. Domain, HTTPS, and deployment

Choose a real domain before requesting a production certificate. Install cert-manager, copy the staging issuer example, set its contact email, configure DNS, and validate an HTTP-01 challenge. Switch to the production issuer only after staging succeeds.

Build and scan an image from a reviewed commit. Use its 40-character commit SHA in the manually dispatched `deploy-portfolio` workflow. The production environment should require a reviewer. Verify `/health`, `/metrics`, rollout status, and the Grafana dashboard after deployment.

## 6. End a session

Review current costs, then inspect a Terraform destroy plan. Obtain explicit confirmation before any destroy. Preserve the state bucket and lock table until the main stack is gone and its state is no longer needed.
