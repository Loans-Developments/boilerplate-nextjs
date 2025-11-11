import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  secret: process.env.BETTER_AUTH_SECRET, // Change this line
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    // google: {
    //   enabled: true,
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // },
    // github: {
    //   enabled: true,
    //   clientId: process.env.GITHUB_CLIENT_ID!,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    // },
  },
  trustedOrigins: ["http://localhost:3000"],
  baseURL: "http://localhost:3000", // Add this line
});
