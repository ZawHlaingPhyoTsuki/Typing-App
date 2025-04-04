import { GridBackgroundDemo } from "@/components/GridBackground";
import { ModeToggle } from "@/components/ModeToggle";
import TypingTest from "@/components/TypingTest";

export default function Home() {
  return (
    <main className="">
      <GridBackgroundDemo>
        <div className="relative flex min-h-screen flex-col items-center p-8 md:p-24">
          <div className="absolute top-0 right-0 pt-4 pr-4 ">
            <ModeToggle />
          </div>
          <div className="w-full max-w-5xl flex flex-col justify-center ">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-[#FAFAFA]">
              Typing Speed Test
            </h1>
            <TypingTest />
          </div>
        </div>
      </GridBackgroundDemo>
    </main>
  );
}
