import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Strength Signals",
  description: "A focused workout progress dashboard",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
