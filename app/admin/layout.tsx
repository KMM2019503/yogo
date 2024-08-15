import Header from "./components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-dark-300 font-sans antialiased">
      <Header />
      {children}
      {/* Footer */}
    </div>
  );
}
