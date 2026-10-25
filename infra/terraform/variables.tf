variable "aws_region" {
  description = "AWS region for the project resources."
  type        = string
  default     = "ap-south-1"
}
variable "project_name" {
  description = "Short project name used for resource naming."
  type        = string
  default     = "devops-portfolio"
}
variable "my_ip_cidr" {
  description = "Your public IPv4 address in CIDR notation, used for SSH and Kubernetes API access."
  type        = string
  validation {
    condition     = can(cidrnetmask(var.my_ip_cidr)) && !contains(["0.0.0.0/0"], var.my_ip_cidr)
    error_message = "Provide a restricted IPv4 CIDR; 0.0.0.0/0 is not allowed."
  }
}
variable "instance_type" {
  description = "EC2 instance type. Check current free-tier eligibility and capacity before apply."
  type        = string
  default     = "t3.micro"
}
variable "k3s_version" {
  description = "Pinned k3s release installed on the EC2 host."
  type        = string
  default     = "v1.37.1+k3s1"
}
variable "public_key" {
  description = "Public SSH key material. Never provide or store a private key here."
  type        = string
  sensitive   = true
}
variable "tags" {
  description = "Tags applied to all resources."
  type        = map(string)
  default     = { Project = "devops-portfolio", ManagedBy = "terraform" }
}
variable "terraform_state_bucket" {
  description = "S3 bucket created by infra/bootstrap for the Terraform state backend."
  type        = string
}
variable "terraform_lock_table" {
  description = "DynamoDB lock table created by infra/bootstrap."
  type        = string
  default     = "devops-portfolio-tf-lock"
}
