# Boilerplate - NextJS 

**Production-ready Next.js boilerplate**  
A robust foundation for building modern, scalable web applications. This boilerplate is equipped with secure authentication, and a full-stack architecture optimized for performance and maintainability.

### Key Features:
- **Next.js 15**: The latest framework version for server-side rendering and client-side interactivity.
- **Secure Authentication with Better Auth**: Pre-configured authentication for enhanced security.
- **PostgreSQL & Prisma ORM**: Powerful database management with a modern ORM for seamless data handling.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Optimized Full-Stack Design**: Designed for scalability, best practices, and rapid development.

## Getting Started

### Database Setup

**Start PostgreSQL with Docker:**
Using Docker Compose (recommended)
```bash
docker-compose up -d

# Or using Docker directly

docker run --name postgres-db
-e POSTGRES_USER=postgres
-e POSTGRES_PASSWORD=postgres
-e POSTGRES_DB=myapp
-p 5432:5432
-d postgres:latest
```

**Run Prisma migrations:**
```bash
npx prisma db push
# or
npx prisma db push
```

### Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Perfect for:
Whether you’re building a startup, scaling an existing project, or experimenting with new ideas, this boilerplate gets you up and running quickly while adhering to industry standards.
