export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full h-[calc(100vh-64px)] bg-black flex flex-col items-center justify-center">
      <div className="w-full flex flex-col items-center justify-center">
        {children}
      </div>
    </main>
  );
}
