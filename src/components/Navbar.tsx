import Image from "next/image";
import Link from "next/link";
import AuthBtn from "./(auth)/AuthBtn";

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
}

export default async function Navbar({
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://shadcnblocks.com/images/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "Typing App",
  },
}: Navbar1Props) {

  // const session = await 

  return (
    <section className="py-4 flex items-center justify-center px-5 md:px-0 bg-[#FFFFFF] dark:bg-[#000000] border-b z-10">
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
          <AuthBtn />
        </nav>
      </div>
    </section>
  );
}
