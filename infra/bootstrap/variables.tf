variable "aws_region" {
  description = "AWS region used for state storage."
  type        = string
  default     = "ap-south-1"
}
variable "state_bucket_name" {
  description = "Globally unique S3 bucket name for Terraform state."
  type        = string
}
variable "lock_table_name" {
  description = "DynamoDB table name used for Terraform state locking."
  type        = string
  default     = "devops-portfolio-tf-lock"
}
