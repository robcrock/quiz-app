import type { Metadata } from "next";
import { Rubik as FontSans } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  title: "Frontend Mentor | Frontend quiz app",
  description: "Frontend quiz app solution by Robert Crocker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background bg-fem-translucent-blue font-rubik antialiased",
          fontSans.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
}
