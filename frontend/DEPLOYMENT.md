# 🚀 ZenPark AWS Deployment Guide

This guide walks you through deploying the ZenPark full-stack application to **AWS ECS (Fargate)** with **RDS (PostgreSQL)** and **S3**.

---

## ✅ Prerequisites
1.  **AWS CLI** installed and configured (`aws configure`).
2.  **Docker** running locally.
3.  **jq** installed (optional, for easier JSON handling).

---

## 1️⃣ Database Setup (RDS)
*We need a PostgreSQL database accessible by our ECS container.*

1.  Go to **AWS RDS Console** -> **Create Database**.
2.  **Engine**: PostgreSQL (Version 15+).
3.  **Template**: Free Tier (or Dev/Test).
4.  **Settings**:
    *   **Identifier**: `zenpark-db`
    *   **Master Username**: `zenuser`
    *   **Password**: *Create a strong password*
5.  **Connectivity**:
    *   **Public Access**: **No** (Secure practice).
    *   **VPC Security Group**: Create new `zenpark-db-sg`. Allows inbound on port `5432` from your IP (for initial setup) and later from ECS.
6.  **Create Database**.

---

## 2️⃣ Secrets Management (AWS Secrets Manager)
*Store sensitive vars like DB URL and Auth Secrets securely.*

1.  Go to **Secrets Manager** -> **Store a new secret**.
2.  **Secret Type**: "Other type of secret".
3.  **Key-Value Pairs**:
    *   `DATABASE_URL`: `postgresql://zenuser:PASSWORD@ENDPOINT:5432/zenpark`
    *   `NEXTAUTH_SECRET`: *Your random string*
    *   `NEXTAUTH_URL`: `http://LOAD_BALANCER_DNS_OR_DOMAIN`
    *   `AWS_ACCESS_KEY_ID`: *Your S3 Access Key*
    *   `AWS_SECRET_ACCESS_KEY`: *Your S3 Secret Key*
    *   `AWS_BUCKET_NAME`: `zenpark-uploads`
4.  Click **Next**, name it `zenpark/prod/env`.

---

## 3️⃣ Container Registry (ECR)
*Where our Docker image will live.*

1.  Go to **ECR** -> **Create Repository**.
2.  **Name**: `zenpark-frontend`.
3.  **Create**.

### Build & Push Image
Run these commands in your project root:

```bash
# 1. Login to ECR
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin <YOUR_ACCOUNT_ID>.dkr.ecr.ap-south-1.amazonaws.com

# 2. Build Image
docker build -t zenpark-frontend .

# 3. Tag Image
docker tag zenpark-frontend:latest <YOUR_ACCOUNT_ID>.dkr.ecr.ap-south-1.amazonaws.com/zenpark-frontend:latest

# 4. Push
docker push <YOUR_ACCOUNT_ID>.dkr.ecr.ap-south-1.amazonaws.com/zenpark-frontend:latest
```

---

## 4️⃣ Deploy to ECS (Fargate)
*Serverless Container Runner.*

### A. Create Cluster
1.  **ECS** -> **Clusters** -> **Create Cluster**.
2.  **Name**: `zenpark-cluster`.
3.  **Infrastructure**: AWS Fargate (Serverless).

### B. Create Task Definition
1.  **Task Definitions** -> **Create new Task Definition**.
2.  **Name**: `zenpark-task`.
3.  **Infrastructure**: Fargate.
4.  **Container Details**:
    *   **Name**: `zenpark-web`
    *   **Image URI**: `<YOUR_ECR_URI>:latest`
    *   **Port Config**: 3000 (TCP)
5.  **Environment**: 
    *   Add environment variables individually OR use "ValueFrom" to pull from secrets manager (requires IAM `secretsmanager:GetSecretValue` permission).
6.  **Create**.

### C. Run Service
1.  Go to `zenpark-cluster` -> **Services** -> **Create**.
2.  **Compute Config**: Launch Type -> FARGATE.
3.  **Task Definition**: `zenpark-task` (LATEST).
4.  **Service Name**: `zenpark-service`.
5.  **Desired Tasks**: 1 (Auto-scale later).
6.  **Networking**:
    *   **VPC**: Default (or custom).
    *   **Security Group**: Allow Inbound Port 3000 (and 80 if utilizing ALB).
    *   **Public IP**: Enabled (if direct access) or Disabled (if using ALB).
7.  **Create Service**.

Your app is now deploying! 🚀
Check the **Logs** tab in your ECS Service to debug startup issues.
