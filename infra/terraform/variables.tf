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
variable "availability_zone_id" {
  description = "Pinned AWS Availability Zone ID for the single-node, single-AZ AWS demo stack."
  type        = string
  validation {
    condition     = can(regex("^[a-z]{3,4}[0-9]-az[0-9]+$", var.availability_zone_id))
    error_message = "Provide a valid Availability Zone ID such as aps1-az1 for your account and region."
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
