output "role_arn" {
  description = "Use this role ARN as the GitHub Actions AWS_ROLE_ARN variable."
  value       = aws_iam_role.terraform_plan.arn
}
