import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

export default function Navbar({
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://shadcnblocks.com/images/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "Typing App",
  },
  auth = {
    login: { title: "Login", url: "/sign-in" },
    signup: { title: "Sign up", url: "/sign-up" },
  },
}: Navbar1Props) {
  return (
    <section className="py-4 flex items-center justify-center px-5 md:px-0 bg-[#FFFFFF] dark:bg-[#000000] border-b">
      <div className="container">
        {/* Desktop Menu */}
        <nav className="justify-between flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={logo.src}
                className="max-h-9 bg-[#FFFFFF] dark:bg-[#FFFFFF] p-1 pr-1.5"
                alt={logo.alt}
                width={32}
                height={32}
              />
              <span className="text-lg font-semibold tracking-tighter text-[#000000] dark:text-[#FFFFFF]">
                {logo.title}
              </span>
            </Link>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href={auth.login.url}>{auth.login.title}</Link>
            </Button>
            <Button asChild size="sm">
              <Link href={auth.signup.url}>{auth.signup.title}</Link>
            </Button>
          </div>
        </nav>
      </div>
    </section>
  );
}
