import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";

const UbuntuFont = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "YoGo",
  description: "Your personal healthcare website",
  icons: {
    icon: "/yogo-logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={cn(
          "min-h-screen bg-dark-300 font-sans antialiased",
          UbuntuFont.variable
        )}
        suppressHydrationWarning={true}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          // enableSystem
          // disableTransitionOnChange
        >
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              success: {
                style: {
                  background: "white",
                },
              },
              error: {
                style: {
                  background: "red",
                },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
