---

```markdown
# 🧩 Task Tracker SRE

A production-ready task tracker web app with built-in Prometheus metrics, Dockerized for deployment on AWS EC2 using Terraform. Ideal for showcasing DevOps and SRE skills with real infrastructure automation.

---

## 🚀 Features

- ✅ REST API for basic task management
- 📊 `/metrics` endpoint for Prometheus monitoring
- ⚙️ Dockerized (multi-platform)
- ☁️ Deployed using **Terraform** on **AWS EC2**
- 🔐 Open HTTP port (3000) + SSH (22)
- 🧪 Includes simulated failure endpoints for testing

---

## 📁 Project Structure

```

task-tracker-sre/
├── Dockerfile
├── index.js
├── package.json
├── terraform/
│   ├── main.tf
│   ├── security.tf
│   ├── variables.tf
│   └── outputs.tf

````

---

## 🔧 Tech Stack

- **Node.js**
- **Docker**
- **Prometheus (custom metrics endpoint)**
- **Terraform**
- **AWS EC2 (Free Tier)**

---

## 🧪 API Endpoints

| Method | Route        | Description                    |
|--------|--------------|--------------------------------|
| GET    | `/`          | Health check (`API Running`)   |
| GET    | `/tasks`     | List all tasks                 |
| POST   | `/tasks`     | Add a task (`{ "title": "" }`) |
| GET    | `/metrics`   | Prometheus metrics             |
| GET    | `/error`     | Simulate 500 error             |
| GET    | `/cpu`       | Simulate CPU load              |

---

## ⚙️ How to Run Locally

```bash
# Build Docker image
docker build -t task-tracker-sre .

# Run the container
docker run -p 3000:3000 task-tracker-sre

# Access: http://localhost:3000
````

---

## ☁️ Deploy to AWS (EC2 + Terraform)

1. Clone the repo
2. Go to the `terraform/` directory
3. Replace AWS credentials and SSH key name in `main.tf` or via `aws configure`
4. Deploy:

```bash
terraform init
terraform apply
```

5. Visit: `http://<public-ip>:3000`

6. ✅ To destroy:

```bash
terraform destroy
```

---

## 📌 Use Cases

* DevOps/SRE Resume Projects
* CI/CD & Monitoring Demo
* Terraform + EC2 Practice
* Prometheus Metrics Integration

---

## 👨‍💻 Author

**Danish Sheikh**

---

