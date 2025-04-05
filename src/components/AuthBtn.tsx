import { signOut } from "@/lib/auth";
import { Button } from "./ui/button";
import Link from "next/link";
import { auth } from "@/lib/auth";

export default async function AuthBtn() {
  const session = await auth();

  if (session) {
    return (
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit" variant="outline">
          Sign Out
        </Button>
      </form>
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
