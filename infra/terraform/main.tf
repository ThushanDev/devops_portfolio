data "aws_availability_zones" "available" { state = "available" }

module "network" {
  source       = "./modules/network"
  project_name = var.project_name
  my_ip_cidr   = var.my_ip_cidr
  vpc_cidr     = "10.42.0.0/16"
  subnet_cidr  = "10.42.1.0/24"
  az           = data.aws_availability_zones.available.names[0]
}
module "compute" {
  source         = "./modules/compute"
  project_name   = var.project_name
  instance_type  = var.instance_type
  k3s_version    = var.k3s_version
  subnet_id      = module.network.public_subnet_id
  security_group = module.network.security_group_id
  public_key     = var.public_key
}
module "github_oidc" {
  source            = "./modules/github-oidc"
  repository        = "ThushanDev/devops_portfolio"
  state_bucket_name = var.terraform_state_bucket
  lock_table_name   = var.terraform_lock_table
}
output "public_ip" {
  description = "EC2 public IPv4 address."
  value       = module.compute.public_ip
}
output "ssh_command" {
  description = "SSH command for the k3s host; set the private key path locally."
  value       = "ssh -i <private-key-path> ubuntu@${module.compute.public_ip}"
}
output "github_terraform_role_arn" {
  description = "Read-only role ARN for protected GitHub Actions Terraform plans."
  value       = module.github_oidc.role_arn
}
