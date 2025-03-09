"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import NavButton from "./components/NavButton";
import { navRoutes } from "@/routes";
import { Menu } from "lucide-react";
import AppMenu from "./games/components/AppMenu";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metadata: Metadata = {
  title: "Create Next App",
  description: "A Neiler's App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="fixed w-full z-40 p-4 shadow-md border-b border-white/20 bg-[#141414aa] backdrop-blur flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-black ">GameLibrary</h1>
          </Link>

          <nav className="flex gap-4">
            <div className="sm:flex gap-4 hidden ">
              {navRoutes.map((route) => (
                <NavButton key={route.path} href={route.path}>
                  {route.label}
                </NavButton>
              ))}
            </div>

            <button className="sm:hidden cursor-pointer" onClick={toggleMenu}>
              <Menu />
            </button>
          </nav>
        </header>
              <div className="h-15"></div>
        {children}
        <AppMenu open={isMenuOpen} onClose={() => setMenuOpen(false)}></AppMenu>
      </body>
    </html>
  );
}
