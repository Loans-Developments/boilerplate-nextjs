import { redirect } from "next/navigation";

export default function SettingsPage() {
  // This page will redirect to the profile page by default.
  redirect("/settings/profile");
}
