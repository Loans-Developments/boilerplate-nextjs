# GEMINI.md

## Project Overview

This is a Next.js project boilerplate set up with a comprehensive authentication system using the `better-auth` library. It includes pre-built sign-in and sign-up pages, a database schema managed by Prisma, and a modern UI built with Tailwind CSS and Radix UI.

**Main Technologies:**

*   **Framework:** Next.js
*   **Authentication:** `better-auth`
*   **Database ORM:** Prisma
*   **Styling:** Tailwind CSS, Shadcn UI (built on Radix UI primitives)
*   **Form Management:** `react-hook-form`
*   **Validation:** `zod`
*   **Language:** TypeScript

**Architecture:**

*   The application follows the standard Next.js `app` directory structure.
*   Authentication logic is handled by `better-auth`, with configuration in `lib/auth.ts` and client-side integration in `lib/auth-client.ts`.
*   The `better-auth` API routes are exposed via a catch-all route handler at `app/api/auth/[...all]/route.ts`.
*   The database schema is defined in `prisma/schema.prisma` and includes models for `User`, `Session`, `Account`, and `Verification`.
*   UI components are located in the `components/ui` directory and are based on Shadcn UI (built on Radix UI primitives).
*   Authentication pages (`sign-in` and `sign-up`) are in the `app/(auth)` directory.

## Building and Running

**1. Install Dependencies:**

```bash
npm install
```

**2. Set up Environment Variables:**

Create a `.env` file in the root of the project and add the following, replacing the placeholder with your actual database connection string:

```
DATABASE_URL="postgresql://user:password@host:port/database"
```

**3. Run Prisma Migrations:**

```bash
npx prisma migrate dev
```

**4. Run the Development Server:**

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

**Other Commands:**

*   **Build for Production:** `npm run build`
*   **Start Production Server:** `npm run start`
*   **Lint:** `npm run lint`

## Development Conventions

*   **Coding Style:** The project uses ESLint for code linting. The configuration can be found in `eslint.config.mjs`.
*   **Testing:** There are no testing frameworks configured in this project.
*   **Authentication:** The `better-auth` library is used for authentication. The server-side configuration is in `lib/auth.ts` and the client-side in `lib/auth-client.ts`. Social providers are currently disabled but can be enabled in `lib/auth.ts`.
*   **Database:** Prisma is used for database management. The schema is located at `prisma/schema.prisma`. After changing the schema, run `npx prisma generate` and `npx prisma migrate dev`.
