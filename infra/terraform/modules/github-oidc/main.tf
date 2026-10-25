data "aws_caller_identity" "current" {}

resource "aws_iam_openid_connect_provider" "github" {
  url            = "https://token.actions.githubusercontent.com"
  client_id_list = ["sts.amazonaws.com"]
}

data "aws_iam_policy_document" "trust" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRoleWithWebIdentity"]
    principals {
      type        = "Federated"
      identifiers = [aws_iam_openid_connect_provider.github.arn]
    }
    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }
    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:sub"
      values   = ["repo:${var.repository}:environment:tf-plan"]
    }
  }
}
resource "aws_iam_role" "terraform_plan" {
  name               = "${replace(var.repository, "/", "-")}-terraform-plan"
  assume_role_policy = data.aws_iam_policy_document.trust.json
  description        = "Read-only Terraform plan role for the protected main branch."
}
data "aws_iam_policy_document" "plan" {
  statement {
    sid       = "DescribeInfrastructure"
    effect    = "Allow"
    actions   = ["ec2:Describe*", "iam:Get*", "iam:List*"]
    resources = ["*"]
  }
  statement {
    sid       = "ListTerraformStateBucket"
    effect    = "Allow"
    actions   = ["s3:ListBucket"]
    resources = ["arn:aws:s3:::${var.state_bucket_name}"]
  }
  statement {
    sid       = "ReadTerraformStateObject"
    effect    = "Allow"
    actions   = ["s3:GetObject"]
    resources = ["arn:aws:s3:::${var.state_bucket_name}/*"]
  }
  statement {
    sid       = "ManageTerraformPlanLock"
    effect    = "Allow"
    actions   = ["dynamodb:DescribeTable", "dynamodb:GetItem", "dynamodb:PutItem", "dynamodb:DeleteItem", "dynamodb:UpdateItem"]
    resources = ["arn:aws:dynamodb:*:${data.aws_caller_identity.current.account_id}:table/${var.lock_table_name}"]
  }
}
resource "aws_iam_role_policy" "plan" {
  name   = "terraform-plan-read-only"
  role   = aws_iam_role.terraform_plan.id
  policy = data.aws_iam_policy_document.plan.json
}
