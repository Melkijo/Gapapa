import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import SessionProvider from "./SessionProvider";
import { Toaster } from "@/components/ui/toaster";
export const metadata: Metadata = {
  title: "GApapa | AI journaling feedback",
  description: "AI journaling feedback",
};

const satoshi = localFont({
  src: "../fonts/satoshi/Satoshi-Variable.woff2",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={satoshi.className}>
        <SessionProvider>{children}</SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
