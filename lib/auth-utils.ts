// lib/auth-utils.ts
import { cookies, headers } from "next/headers"; // Add this import back
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server"; // Add this import back

export async function getSession() {
  try {
    const cookieStore = await cookies(); // Await the cookies() Promise

    const sessionCookie = cookieStore.get("better-auth.session_token"); // Get the specific session cookie

    if (!sessionCookie) {
      return null;
    }

    const cookieString = `${sessionCookie.name}=${sessionCookie.value}`;

    const dummyRequest = new NextRequest("http://localhost", {
      headers: {
        cookie: cookieString,
      },
    });

    const session = await auth.api.getSession({ headers: dummyRequest.headers });
    return session;
  } catch (error) {
    console.error("Error fetching session from API route:", error);
    return null;
  }
}

export async function signOut() {
  const headersList = await headers();
  await auth.api.signOut({
    headers: headersList,
  });
  redirect("/sign-in"); // Redirect after sign out
}
