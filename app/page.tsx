import Link from "next/link";
import { getSession } from "@/lib/auth-utils";
import { UserMenu } from "@/components/user-menu";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await getSession();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between px-8">
          <Link href="/" className="font-bold text-xl">
            MyApp
          </Link>
          <nav className="flex items-center gap-4">
            {session?.user ? (
              <UserMenu user={session.user} />
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link href="/sign-in">Se connecter</Link>
                </Button>
                <Button asChild>
                  <Link href="/sign-up">S&apos;inscrire</Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center">
        <div className="container py-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Bienvenue !
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Commencez votre aventure avec notre application.
          </p>
          {!session && (
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" asChild>
                <Link href="/sign-up">Commencer</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/sign-in">Se connecter</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
