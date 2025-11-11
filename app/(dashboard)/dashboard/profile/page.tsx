import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProfileForm } from "@/components/dashboard/profile-form";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth-utils";

export default async function DashboardProfilePage() {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  // Add a check for session.user
  if (!session.user) {
    return <div>Error: User data not found in session.</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          Manage your profile information.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ProfileForm user={session.user} />
      </CardContent>
    </Card>
  );
}
