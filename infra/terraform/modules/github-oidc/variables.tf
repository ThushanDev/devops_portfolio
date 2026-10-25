variable "repository" {
  description = "GitHub owner/repository trusted to assume this role."
  type        = string
  default     = "ThushanDev/devops_portfolio"
}
variable "state_bucket_name" {
  description = "Terraform state bucket used by the main stack."
  type        = string
}
variable "lock_table_name" {
  description = "Terraform state lock table used by the main stack."
  type        = string
}
