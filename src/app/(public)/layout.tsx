import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/shared/Navbar"; // 1. Import the Navbar
import GridOverlay from "@/components/shared/GridOverlay"; // 2. Import the Grid
import Footer from "@/components/shared/Footer"; // 3. Import the Footer
import Breadcrumb from "@/components/shared/Breadcrumb";

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

        {/* 1. Global Navbar at the top of every page */}
        <Navbar />
        {/* The Dynamic Breadcrumb*/}
        <Breadcrumb />
        
        {/* 2. Inject the GridOverlay here */}
        <GridOverlay />
        {children}

        {/* 3. Global Footer at the bottom of every page */}
        <Footer />
      </body>
    </html>
  );
}