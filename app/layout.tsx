import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "gapapa | Bantuan AI untuk mental",
  description: "Bantuan AI untuk mental",
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
      <body className={satoshi.className}>{children}</body>
    </html>
  );
}
