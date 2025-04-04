import TypingTest from "@/components/TypingTest";

export default function Home() {
  return (
    <main className="bg-[#FAFAFA] dark:bg-black flex flex-col items-center justify-center">
      <div className="w-full min-h-screen max-w-5xl flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-[#FAFAFA]">
          Typing Speed Test
        </h1>
        <TypingTest />
      </div>
    </main>
  );
}
