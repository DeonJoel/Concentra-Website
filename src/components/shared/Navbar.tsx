"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // This watches the scroll position to trigger the 3D shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-md" 
          : "bg-white shadow-none"
      }`}
    >
      
      {/* Figma Grid matching exactly (12 cols, 32px gap, 80px margin on desktop) */}
      <div className="w-full grid grid-cols-12 gap-[32px] px-6 lg:px-[80px]">
        
        {/* Starts at column 2, and spans exactly 10 columns */}
        <div className="col-start-1 lg:col-start-2 col-span-12 lg:col-span-10 flex items-center justify-between h-20">
          
          {/* 1. LOGO SECTION */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition duration-300">
            <svg width="40" height="40" viewBox="0 0 100 100" className="w-10 h-10">
              <circle cx="40" cy="50" r="30" fill="var(--color-concentra-purple)" />
              <circle cx="60" cy="50" r="30" fill="var(--color-concentra-green)" opacity="0.8" />
            </svg>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-concentra-purple leading-tight">
                Concentra
              </span>
              <span className="text-[10px] font-semibold text-concentra-green uppercase tracking-wider">
                Precision Technologies
              </span>
            </div>
          </Link>

          {/* 2. DESKTOP CENTER LINKS */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-industrial-slate">
            <div className="flex items-center gap-1 hover:text-concentra-purple cursor-pointer transition">
              Products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
            <div className="flex items-center gap-1 hover:text-concentra-purple cursor-pointer transition">
              Services
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
            <div className="flex items-center gap-1 hover:text-concentra-purple cursor-pointer transition">
              Company Details
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>

          {/* 3. DESKTOP RIGHT LINKS & CTA */}
          <div className="hidden lg:flex items-center gap-4 text-xs font-bold text-industrial-slate">
            <Link href="/careers" className="hover:text-concentra-purple transition">Careers</Link>
            <span className="text-gray-300">|</span>
            <Link href="/request-quote" className="hover:text-concentra-purple transition">Request Quote</Link>
            <span className="text-gray-300">|</span>
            <button className="bg-concentra-green hover:bg-green-600 text-white px-5 py-2 rounded-md transition duration-300 ml-2 shadow-md">
              Contact Us
            </button>
          </div>

          {/* 4. MOBILE HAMBURGER ICON */}
          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-concentra-green focus:outline-none"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white shadow-xl border-t border-gray-100 p-6 flex flex-col gap-4">
          <Link href="/" className="text-industrial-slate font-semibold hover:text-concentra-purple">Products</Link>
          <Link href="/" className="text-industrial-slate font-semibold hover:text-concentra-purple">Services</Link>
          <Link href="/" className="text-industrial-slate font-semibold hover:text-concentra-purple">Company Details</Link>
          <hr className="my-2" />
          <Link href="/" className="text-industrial-slate font-semibold hover:text-concentra-purple">Careers</Link>
          <Link href="/request-quote" className="text-industrial-slate font-semibold hover:text-concentra-purple">Request Quote</Link>
          <button className="bg-concentra-green text-white font-bold py-3 mt-2 rounded-md w-full">
            Contact Us
          </button>
        </div>
      )}
    </nav>
  );
}