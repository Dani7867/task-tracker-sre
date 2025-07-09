provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "app_server" {
  ami                         = "ami-0c02fb55956c7d316" # Ubuntu 22.04
  instance_type               = "t2.micro"
  key_name                    = var.key_name
  associate_public_ip_address = true
  vpc_security_group_ids      = [aws_security_group.allow_http.id]

  user_data = <<-EOF
              #!/bin/bash
              apt update -y
              apt install docker.io git -y
              git clone https://github.com/danish2114/task-tracker-sre.git /opt/app
              cd /opt/app
              docker build -t local-task-tracker .
              docker run -d -p 3000:3000 local-task-tracker
              EOF

  tags = {
    Name = "task-tracker-sre"
  }
}
