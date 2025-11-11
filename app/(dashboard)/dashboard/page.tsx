import { redirect } from "next/navigation";

export default function DashboardPage() {
  // This page will redirect to the profile page by default.
  redirect("/dashboard/profile");
}
