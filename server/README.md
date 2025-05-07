# 🛠️ Brev.ly Server – Backend API

This is the backend service for the **Brev.ly** URL shortener challenge.

It provides a RESTful API built with **Fastify**, **Drizzle ORM**, and **PostgreSQL**, and is fully containerized using **Docker Compose**.

---

## ⚙️ Tech Stack

- **[Fastify](https://www.fastify.io)** – high-performance Node.js web framework  
- **[Drizzle ORM](https://orm.drizzle.team)** – lightweight TypeScript SQL ORM  
- **[PostgreSQL](https://www.postgresql.org)** – relational database  
- **[Docker](https://docs.docker.com)** – containerization and orchestration  
- **[Cloudflare R2](https://developers.cloudflare.com/r2)** – object storage used for exporting CSVs  
- **[AWS ECR](https://aws.amazon.com/ecr)** – Docker container registry for backend deployment  

---

## 🐳 Docker

This project includes a `Dockerfile` and `docker-compose.yml` to simplify development and deployment.

You can build and run everything using Docker without needing to install dependencies locally.

---

## 🚀 Getting Started

Follow the steps below to run the backend locally using Docker:

### 1. 🐳 Start the containers

This will spin up both the PostgreSQL database and the backend API server:

```bash
docker-compose up -d
```

### 2. 🧱 Apply database migrations

Once the containers are running, execute the migration inside the backend container to create the necessary tables:

```bash
docker exec -it brevly-api npm run db:migrate
```

> Make sure your `.env` file is properly configured before running migrations.

### 3. 📡 Access the server

The backend should now be running and accessible at:

```bash
http://localhost:3333
```

You can test it by visiting that URL or checking the `/docs` route if Swagger is enabled.

Feel free to adjust these steps according to your workflow or environment setup.

---

## 📂 Available Scripts

This project provides the following common scripts:

| Command                     | Description                          |
|-----------------------------|--------------------------------------|
| `npm run dev`               | Start the development server         |
| `npm run build`             | Build the application                |
| `npm run start`             | Start the production server          |
| `npm run db:generate`       | Generate a new migration             |
| `npm run db:migrate`        | Apply database migrations            |
| `npm run db:studio`         | Open the Drizzle Studio GUI          |

You can run them either inside or outside the container depending on your setup.

---

## 📄 Environment Variables

Create a `.env` file in the `server/` directory. Here's an example of what it should contain:

```env
# PostgreSQL
POSTGRESQL_USERNAME=docker
POSTGRESQL_PASSWORD=docker
POSTGRESQL_DATABASE=brevly
POSTGRESQL_PORT=5432
DATABASE_URL=postgresql://docker:docker@pg:5432/brevly

# Server
PORT=3333

# Cloudflare R2 (for CSV export)
CLOUDFLARE_ACCESS_KEY_ID=your_key
CLOUDFLARE_SECRET_ACCESS_KEY=your_secret
CLOUDFLARE_BUCKET=your_bucket
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_PUBLIC_URL=https://your_bucket.r2.cloudflarestorage.com/
```
