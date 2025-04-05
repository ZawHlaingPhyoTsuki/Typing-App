"use client"; // Ensure this is a client component

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function AuthBtn() {
  const { data: session, status } = useSession();
  // console.log(session)

  const handleSignOut = async () => {
    try {
      await signOut({
        redirect: false,
        callbackUrl: "/",
      });
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  if (status === "loading") {
    return <div className="h-10 w-20 animate-pulse rounded-md bg-muted" />;
  }

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">
          {session.user?.name || session.user?.email}
        </span>
        <Button onClick={handleSignOut} variant="outline" className="flex justify-center items-center" size="sm">
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <Button asChild variant="outline" size="sm">
        <Link href="/sign-in">Sign In</Link>
      </Button>
      <Button asChild size="sm">
        <Link href="/sign-up">Sign Up</Link>
      </Button>
    </div>
  );
}
