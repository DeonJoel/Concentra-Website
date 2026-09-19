"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavDropdowns from "./NavDropdowns";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // The Tap Lock prevents the browser from firing onClick immediately after onPointerDown
  const tapLock = useRef(false);
  
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const isTransparent = isHome && !isScrolled;

  // Optimized Handlers
  const handleMenuToggle = () => {
    if (tapLock.current) return;
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMenuToggleInstant = (e: React.PointerEvent) => {
    e.preventDefault();
    tapLock.current = true;
    setIsMobileMenuOpen((prev) => !prev);
    setTimeout(() => { tapLock.current = false; }, 300);
  };

  const handleBackdropClose = () => {
    if (tapLock.current) return;
    setIsMobileMenuOpen(false);
  };

  const handleBackdropCloseInstant = (e: React.PointerEvent) => {
    e.preventDefault();
    tapLock.current = true;
    setIsMobileMenuOpen(false);
    setTimeout(() => { tapLock.current = false; }, 300);
  };

  return (
    <>
      {/* BLURRED BACKDROP */}
      <div 
        className={`
          lg:hidden fixed inset-0 h-[100dvh] w-full z-40 bg-slate-900/20 backdrop-blur-sm transition-opacity duration-300
          ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={handleBackdropClose}
        onPointerDown={handleBackdropCloseInstant}
        aria-hidden="true"
      />

      <nav 
        className={`
          z-50 transition-all duration-500 
          fixed top-4 left-4 right-4 h-14 rounded-full bg-white shadow-xl
          lg:left-0 lg:right-0 lg:w-full lg:h-20 lg:rounded-none
          ${isHome ? "lg:fixed lg:top-0" : "lg:sticky lg:top-0"}
          ${isTransparent ? "lg:bg-transparent lg:shadow-none" : "lg:bg-white/95 lg:backdrop-blur-md lg:shadow-md"}
        `}
      >
        
        <div className="w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-full w-full">
            
            {/* 1. LOGO SECTION */}
            <Link href="/" className="flex shrink-0 items-center pr-2 cursor-pointer hover:opacity-80 transition duration-300" onClick={() => setIsMobileMenuOpen(false)}>
              <img
                src="/Concentra_LOGO.png"
                alt="Concentra"
                className="w-auto shrink-0 object-contain h-8 lg:h-12"
              />
            </Link>

            {/* 2. DESKTOP CENTER LINKS */}
            <div className={`hidden lg:flex items-center transition-all duration-300 ${
              isTransparent ? "bg-white/80 backdrop-blur-md px-6 py-2 rounded-full shadow-sm border border-white/50" : ""
            }`}>
              <NavDropdowns />
            </div>

            {/* 3. DESKTOP RIGHT LINKS & CTA */}
            <div className={`hidden lg:flex shrink-0 items-center gap-4 text-xs font-bold transition-all duration-300 ${
              isTransparent ? "bg-white/80 backdrop-blur-md pl-6 pr-2 py-1.5 rounded-full shadow-sm border border-white/50 text-industrial-slate" : "text-industrial-slate"
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
            <div className="lg:hidden flex shrink-0 items-center pl-2">
              <button 
                onPointerDown={handleMenuToggleInstant}
                onClick={handleMenuToggle}
                className="text-concentra-green focus:outline-none transition-transform duration-300 active:scale-95 touch-none"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2.5} 
                    d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 7h16M10 12h10M4 17h16"} 
                  />
                </svg>
              </button>
            </div>

          </div>
        </div>

        {/* MOBILE DROPDOWN MENU */}
        <div 
          className={`
            lg:hidden absolute left-0 w-full bg-white shadow-2xl rounded-2xl border border-gray-100 p-6 flex flex-col gap-4
            transition-all duration-300 ease-in-out z-40
            ${isMobileMenuOpen ? "top-[calc(100%+12px)] opacity-100 translate-y-0 pointer-events-auto visible" : "top-[100%] opacity-0 -translate-y-4 pointer-events-none invisible"}
          `}
        >
          <Link href="/products" className="text-industrial-slate font-semibold hover:text-concentra-purple" onClick={() => setIsMobileMenuOpen(false)}>Products</Link>
          <Link href="/services" className="text-industrial-slate font-semibold hover:text-concentra-purple" onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
          <Link href="/company" className="text-industrial-slate font-semibold hover:text-concentra-purple" onClick={() => setIsMobileMenuOpen(false)}>Company Details</Link>
          <hr className="my-2 border-slate-100" />
          <Link href="/careers" className="text-industrial-slate font-semibold hover:text-concentra-purple" onClick={() => setIsMobileMenuOpen(false)}>Careers</Link>
          <Link href="/request-quote" className="text-industrial-slate font-semibold hover:text-concentra-purple" onClick={() => setIsMobileMenuOpen(false)}>Request Quote</Link>
          <Link href="/contact-us" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
            <button className="bg-concentra-green text-white font-bold py-3 mt-2 rounded-xl w-full shadow-md active:scale-95 transition-transform">
              Contact Us
            </button>
          </Link>
        </div>
        
      </nav>
    </>
  );
}