data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }
  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}
resource "aws_key_pair" "this" {
  key_name   = "${var.project_name}-operator"
  public_key = var.public_key
}
resource "aws_instance" "this" {
  ami                         = data.aws_ami.ubuntu.id
  instance_type               = var.instance_type
  subnet_id                   = var.subnet_id
  vpc_security_group_ids      = [var.security_group]
  key_name                    = aws_key_pair.this.key_name
  associate_public_ip_address = true
  user_data_replace_on_change = true
  user_data                   = templatefile("${path.module}/user-data.sh", { k3s_version = var.k3s_version })
  root_block_device {
    encrypted   = true
    volume_type = "gp3"
    volume_size = 20
  }
  metadata_options { http_tokens = "required" }
  tags = { Name = "${var.project_name}-k3s" }
}
