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
              sudo yum update -y
              sudo amazon-linux-extras install docker -y
              sudo service docker start
              sudo usermod -a -G docker ec2-user

              # Git clone  repo
              cd /home/ec2-user
              git clone https://github.com/Dani7867/task-tracker-sre.git
              cd task-tracker-sre

              # Build Docker image locally
              sudo docker build -t task-tracker-sre .

              # Run container
              sudo docker run -d -p 3000:3000 task-tracker-sre

              EOF

  tags = {
    Name = "task-tracker-sre"
  }
}
