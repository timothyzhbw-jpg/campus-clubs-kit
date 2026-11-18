import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Campus Clubs Kit",
  description: "A small open-source kit for browsing campus clubs.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link href="/" className="brand">
            Campus Clubs Kit
          </Link>
          <span className="demo-note">Demo with made-up clubs</span>
        </header>
        <main className="page">{children}</main>
      </body>
    </html>
  );
}
