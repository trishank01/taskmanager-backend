# Task Manager Backend

This repository contains the backend service for the Task Manager application.
It is built with Node.js, Express, and MongoDB, and it is designed to run in a Docker container and deploy via GitHub Actions + GitOps.

---

## 🚀 What this backend does

- Provides REST API endpoints for tasks, users, authentication, and reports
- Handles user signup/login with JWT authentication
- Connects to MongoDB using Mongoose
- Supports task creation, assignment, status updates, attachments, and reporting
- Exposes the API for use by the frontend React app

---

## 🛠️ Technology stack

- Node.js
- Express
- MongoDB / Mongoose
- JWT authentication
- Docker
- GitHub Actions
- Docker Hub
- Kubernetes + Argo CD (GitOps)

---

## 📁 Backend folder structure

```
backend/
├── config/
│   └── db.js              # MongoDB connection logic
├── controllers/
│   ├── authController.js
│   ├── reportController.js
│   ├── taskController.js
│   └── userController.js
├── middleware/
│   └── authMiddleware.js  # JWT auth guard
├── models/
│   ├── Task.js
│   └── User.js
├── routes/
│   ├── authRoutes.js
│   ├── reportRoutes.js
│   ├── taskRoutes.js
│   └── userRoutes.js
├── .github/
│   └── workflows/
│       └── backend-dev.yml
├── Dockerfile
├── package.json
└── server.js
```

---

## 🧪 Available scripts

```bash
npm install
npm run dev
npm start
```

- `npm run dev` - runs backend locally with `nodemon`
- `npm start` - runs production backend with `node server.js`

---

## 🐳 Docker image

`backend/Dockerfile` builds the backend container:

- Base image: `node:22-alpine`
- Copies `package*.json`
- Installs production dependencies with `npm ci --only=production`
- Copies application source files
- Exposes port `5000`
- Starts the app using: `CMD ["node", "server.js"]`

> Note: the Dockerfile exposes port `5000`, while the Kubernetes manifest uses port `8000` from the secret. In practice, the app listens on the configured runtime port.

---

## ☁️ Deployment architecture

This backend repo is part of a GitHub Actions + GitOps pipeline.

### Pipeline flow

1. A push to `develop` triggers `backend/.github/workflows/backend-dev.yml`.
2. GitHub Actions checks out the repo.
3. It logs in to Docker Hub using `DOCKER_USERNAME` and `DOCKER_PASSWORD` secrets.
4. It builds the backend Docker image:
   - `trishank01/taskmanager-backend:${{ github.sha }}`
5. It scans the image with Trivy for high and critical issues.
6. It pushes the image to Docker Hub.
7. It clones the separate manifest repository:
   - `github.com/trishank01/task-manager-k8s`
8. It updates `dev/backend/deployment.yaml` with the new image tag.
9. It commits and pushes the manifest update.

### GitOps deployment

- Argo CD watches the `task-manager-k8s` repository.
- It deploys the `dev` and `prod` paths from that repo into Kubernetes.
- The backend service is deployed into the `taskmanager` namespace.

---

## 📦 Kubernetes manifest details

The deployed backend manifest is stored in the separate manifest repo, not necessarily in this repo.

In the local `k8s/dev/backend/deployment.yaml` example:

- `replicas: 2`
- `image: trishank01/taskmanager-backend:v1` (updated by workflow to SHA tag)
- `containerPort: 8000`
- `envFrom: secretRef: backend-secret`
- `imagePullSecrets: dockerhub-secret`

The service is exposed as a `LoadBalancer` on port `8000`.

The backend secret (`backend-secret`) contains values such as:
- `MONGO_URI`
- `JWT_SECRET`
- `ADMIN_INVITE_TOKEN`
- `PORT`

---

## 🔗 Repo relationship

This backend repo is one part of the full app architecture:

- `frontend/` repo contains the React app and its own GitHub Actions workflow
- `backend/` repo contains the API service and its workflow
- `task-manager-k8s` repo contains Kubernetes manifests for `dev` and `prod`
- Argo CD syncs the manifests from `task-manager-k8s` into the cluster
- Docker Hub stores the built frontend and backend container images

---

## 📡 How frontend and backend work together

- The frontend calls the backend API using `VITE_API_URL` configured at build time.
- The backend serves API routes for authentication, tasks, users, and reports.
- Both services are deployed independently, but the frontend depends on the backend API endpoint.

---

## 📌 Why this is a strong DevOps architecture

- Builds are automated on every push to `develop`
- Image tagging uses immutable Git SHA values
- Security scan is integrated into the workflow
- Deployment configuration is separated into a GitOps manifest repo
- Argo CD provides automated, declarative cluster deployment
- Monitoring and cluster status can be observed through Grafana/Prometheus in the target environment

---

## 💡 Notes for improvement

- Move secrets out of repository-managed manifests and into a secure secrets provider or Kubernetes external secret storage.
- Add readiness/liveness probes and resource requests/limits to Kubernetes manifests.
- Align runtime port configuration across Dockerfile, app config, and manifests.
- Consider a more structured manifest templating or helm-based deployment workflow.
