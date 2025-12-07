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

### Prerequisites
- Docker and Docker Compose installed on your machine
- Node.js 18+ installed

### Installation

**1. Clone the repository:**
```bash
git clone https://github.com/LoanDeveloper/boilerplate-nextjs.git
cd boilerplate-nextjs
```

**2. Install dependencies:**
```bash
npm install
# or
yarn install
# or
pnpm install
```

**3. Configure environment variables:**
```bash
cp .env.example .env
```
Edit the `.env` file with your configuration.

**4. Start the database with Docker:**
Build and start the containers (first time)
```bash
docker-compose up --build -d
# Or if using just PostgreSQL without custom Dockerfile:
docker-compose up -d
```

**5. Run Prisma migrations:**
```bash
npx prisma generate
npx prisma migrate dev
# or
npx prisma db push
```

**6. Start the development server:**
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

### Docker Commands

**Stop the containers:**
```bash
docker-compose down
```

**Restart the containers:**
```bash
docker-compose restart
```

**View logs:**
```bash
docker-compose logs -f
```

**Rebuild after changes:**
```bash
docker-compose up --build -d
```

### Perfect for:
Whether you’re building a startup, scaling an existing project, or experimenting with new ideas, this boilerplate gets you up and running quickly while adhering to industry standards.
