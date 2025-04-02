import TypingTest from "@/app/components/TypingTest";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-24">
      <div className="w-full max-w-5xl flex flex-col justify-center">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Typing Speed Test
        </h1>
        <TypingTest />
      </div>
    </main>
  );
}
