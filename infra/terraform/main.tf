module "network" {
  source               = "./modules/network"
  project_name         = var.project_name
  vpc_cidr             = "10.42.0.0/16"
  public_subnet_cidr   = "10.42.1.0/24"
  private_subnet_cidr  = "10.42.2.0/24"
  availability_zone_id = var.availability_zone_id
  aws_region           = var.aws_region
}

module "compute" {
  source        = "./modules/compute"
  project_name  = var.project_name
  instance_type = var.instance_type
  k3s_version   = var.k3s_version
  subnet_id     = module.network.private_subnet_id
  vpc_id        = module.network.vpc_id
  vpc_cidr      = "10.42.0.0/16"
  aws_region    = var.aws_region
}

module "github_oidc" {
  source            = "./modules/github-oidc"
  repository        = "ThushanDev/devops_portfolio"
  state_bucket_name = var.terraform_state_bucket
  lock_table_name   = var.terraform_lock_table
  aws_region        = var.aws_region
}

output "instance_id" {
  description = "Private k3s host ID. Manage it through AWS Systems Manager Session Manager."
  value       = module.compute.instance_id
}

output "private_ip" {
  description = "Private address of the single-node k3s host."
  value       = module.compute.private_ip
}

output "github_terraform_role_arn" {
  description = "Read-only role ARN for protected GitHub Actions Terraform plans."
  value       = module.github_oidc.role_arn
}
