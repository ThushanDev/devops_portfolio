variable "project_name" { type = string }
variable "instance_type" { type = string }
variable "k3s_version" { type = string }
variable "subnet_id" { type = string }
variable "security_group" { type = string }
variable "public_key" {
  type      = string
  sensitive = true
}
