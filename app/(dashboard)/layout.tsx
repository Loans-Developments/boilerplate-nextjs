import { redirect } from "next/navigation";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import { Button } from "@/components/ui/button";
import { getSession, signOut } from "@/lib/auth-utils";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  const handleSignOut = async () => {
    "use server";
    await signOut();
  };

  return (
    <div className="container relative min-h-screen flex-col items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
        <div className="h-full py-6 pl-8 pr-6 lg:py-8">
          <SidebarNav />
        </div>
      </aside>
      <main className="flex w-full flex-col overflow-hidden py-6 lg:py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <form action={handleSignOut}>
            <Button type="submit" variant="outline">
              Sign Out
            </Button>
          </form>
        </div>
        <div className="mt-6">
          {children}
        </div>
      </main>
    </div>
  );
}
