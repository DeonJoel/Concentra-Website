import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // 1. Import your new Navbar
import GridOverlay from "@/components/GridOverlay"; // 2. Import the Grid

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 2. Updated to Concentra Branding
export const metadata: Metadata = {
  title: "Concentra Precision Technologies",
  description: "Next-Generation Spindle Technology & Precision Machining.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        
        {/* 2. Inject the GridOverlay here */}
        <GridOverlay />
        {children}
      </body>
    </html>
  );
}