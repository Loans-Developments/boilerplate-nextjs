"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import * as bcrypt from "bcryptjs";
import { getSession, signOut } from "@/lib/auth-utils";

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
    const account = await prisma.account.findFirst({
      where: {
        userId: session.user.id,
        password: {
          not: null,
        },
      },
    });

    if (!account || !account.password) {
      return {
        error: "No password set for this account.",
      };
    }

    const isPasswordCorrect = await bcrypt.compare(currentPassword, account.password);

    if (!isPasswordCorrect) {
      return {
        error: "Incorrect current password.",
      };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.account.update({
      where: {
        id: account.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return {
      success: "Password updated successfully.",
    };
  } catch (error) {
    return {
      error: "Something went wrong.",
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
