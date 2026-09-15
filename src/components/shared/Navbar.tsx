"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import NavDropdowns from "./NavDropdowns";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Watches the scroll position to trigger the solid background and shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      // Changed to 'fixed' so it overlays the hero slider perfectly. 
      // Dynamic classes handle the transition from transparent to solid white.
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-md py-0" 
          : "bg-transparent py-2"
      }`}
    >
      
      {/* Figma Grid matching exactly (12 cols, 32px gap, 80px margin on desktop) */}
      <div className="w-full grid grid-cols-12 gap-[32px] px-6 lg:px-[80px]">
        
        {/* Starts at column 2, and spans exactly 10 columns */}
        <div className="col-start-1 lg:col-start-2 col-span-12 lg:col-span-10 flex items-center justify-between h-20">
          
          {/* 1. LOGO SECTION */}
          {/* FIXED: Added 'shrink-0' to both the Link and img so it never gets crushed on mobile */}
          <Link href="/" className="flex shrink-0 items-center pr-2 lg:pr-2 cursor-pointer hover:opacity-80 transition duration-300">
            <img
              src="/Concentra_LOGO.png"
              alt="Concentra"
              // CONTROL THE HEIGHT HERE:
              // isScrolled ? "h-12" -> Height when scrolling down (48px)
              // : "h-14" -> Initial height at the very top (56px)
              className={`w-auto shrink-0 object-contain transition-all duration-300 ${
                isScrolled ? "h-12" : "h-14"
              }`}
            />
          </Link>

          {/* 2. DESKTOP CENTER LINKS */}
          {/* Added a dynamic glass-morphism pill effect around the center links */}
          <div className={`hidden lg:flex items-center transition-all duration-300 ${
            !isScrolled 
              ? "bg-white/80 backdrop-blur-md px-6 py-2 rounded-full shadow-sm border border-white/50" 
              : ""
          }`}>
            <NavDropdowns />
          </div>

          {/* 3. DESKTOP RIGHT LINKS & CTA */}
          {/* Added a dynamic glass-morphism pill effect around the right-side actions */}
          <div className={`hidden lg:flex shrink-0 items-center gap-4 text-xs font-bold transition-all duration-300 ${
            !isScrolled 
              ? "bg-white/80 backdrop-blur-md pl-6 pr-2 py-1.5 rounded-full shadow-sm border border-white/50 text-industrial-slate" 
              : "text-industrial-slate"
          }`}>
            <Link href="/careers" className="hover:text-concentra-purple transition">Careers</Link>
            <span className="text-gray-300">|</span>
            <Link href="/request-quote" className="hover:text-concentra-purple transition">Request Quote</Link>
            <Link href="/contact-us">
              <button className="bg-concentra-green hover:bg-green-600 text-white px-5 py-2.5 rounded-full transition duration-300 shadow-md whitespace-nowrap">
                Contact Us
              </button>
            </Link>
          </div>

          {/* 4. MOBILE HAMBURGER ICON */}
          <div className="lg:hidden flex shrink-0 items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`text-concentra-green focus:outline-none transition-all duration-300 ${
                !isScrolled ? "bg-white/80 backdrop-blur-md p-2 rounded-full shadow-sm" : "p-2"
              }`}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-[88px] left-0 w-full bg-white shadow-xl border-t border-gray-100 p-6 flex flex-col gap-4 animate-in slide-in-from-top-2">
          <Link href="/" className="text-industrial-slate font-semibold hover:text-concentra-purple">Products</Link>
          <Link href="/" className="text-industrial-slate font-semibold hover:text-concentra-purple">Services</Link>
          <Link href="/company" className="text-industrial-slate font-semibold hover:text-concentra-purple">Company Details</Link>
          <hr className="my-2 border-slate-100" />
          <Link href="/careers" className="text-industrial-slate font-semibold hover:text-concentra-purple">Careers</Link>
          <Link href="/request-quote" className="text-industrial-slate font-semibold hover:text-concentra-purple">Request Quote</Link>
          <Link href="/contact-us" className="w-full">
            <button className="bg-concentra-green text-white font-bold py-3 mt-2 rounded-xl w-full shadow-md">
              Contact Us
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}