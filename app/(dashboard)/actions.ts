"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import * as bcrypt from "bcryptjs";
import { getSession, signOut } from "@/lib/auth-utils";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

export async function updateProfile(values: z.infer<typeof profileFormSchema>) {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const validatedFields = profileFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
    };
  }

  try {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: validatedFields.data.name,
      },
    });

    revalidatePath("/dashboard/profile");

    return {
      success: "Profile updated successfully.",
    };
  } catch (error) {
    return {
      error: "Something went wrong.",
    };
  }
}

const passwordFormSchema = z.object({
  currentPassword: z.string().min(1, { message: "Current password is required." }),
  newPassword: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"],
});

export async function updatePassword(values: z.infer<typeof passwordFormSchema>) {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const validatedFields = passwordFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
    };
  }

  const { currentPassword, newPassword } = validatedFields.data;

  try {
    const headersList = await headers();
    await auth.api.changePassword({
      body: {
        currentPassword,
        newPassword,
        revokeOtherSessions: true,
      },
      headers: headersList,
    });

    return {
      success: "Password updated successfully.",
    };
  } catch (error: any) {
    // Handle Better Auth errors
    if (error.body?.message) {
       if (error.body.message === "Invalid password") { // Adjust based on actual error message from better-auth
           return { error: "Incorrect current password." };
       }
       return { error: error.body.message };
    }
    // Fallback for other errors
    return {
      error: "Incorrect current password.", // better-auth throws if password doesn't match
    };
  }
}

export async function deleteAccount() {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    await prisma.user.delete({
      where: {
        id: session.user.id,
      },
    });

    await signOut();

    return {
      success: "Account deleted successfully.",
    };
  } catch (error) {
    return {
      error: "Something went wrong.",
    };
  }
}
