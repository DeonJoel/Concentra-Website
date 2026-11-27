"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavDropdowns from "./NavDropdowns";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const tapLock = useRef(false);

  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 15);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer automatically on route navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Transparent only on Home at the very top (and when mobile menu is closed)
  const isTransparent = isHome && !isScrolled && !isMobileMenuOpen;

  const handleMenuToggle = () => {
    if (tapLock.current) return;
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMenuToggleInstant = (e: React.PointerEvent) => {
    e.preventDefault();
    tapLock.current = true;
    setIsMobileMenuOpen((prev) => !prev);
    setTimeout(() => {
      tapLock.current = false;
    }, 300);
  };

  const handleBackdropClose = () => {
    if (tapLock.current) return;
    setIsMobileMenuOpen(false);
  };

  const handleBackdropCloseInstant = (e: React.PointerEvent) => {
    e.preventDefault();
    tapLock.current = true;
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      tapLock.current = false;
    }, 300);
  };

  return (
    <>
      {/* MOBILE BACKDROP */}
      <div
        className={`
          lg:hidden fixed inset-0 h-[100dvh] w-full z-40 bg-[#170f1d]/60 backdrop-blur-xs transition-opacity duration-300
          ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={handleBackdropClose}
        onPointerDown={handleBackdropCloseInstant}
        aria-hidden="true"
      />

      <header
        className={`
          z-50 w-full h-[68px] lg:h-[80px] transition-all duration-300 border-b
          ${isHome ? "fixed top-0 left-0 right-0" : "sticky top-0"}
          ${
            isTransparent
              ? "bg-transparent border-transparent shadow-none"
              : "bg-white/95 backdrop-blur-md border-border-subtle shadow-[0_2px_15px_rgba(32,17,34,0.05)]"
          }
        `}
      >
        <div className="w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-full w-full">
            {/* 1. LOGO */}
            <Link
              href="/"
              className="flex shrink-0 items-center pr-2 hover:opacity-85 transition-opacity"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <img
                src="/Concentra_LOGO.png"
                alt="Concentra Precision Technologies"
                className={`w-auto shrink-0 object-contain h-9 lg:h-12 transition-all duration-300 ${
                  isTransparent ? "brightness-0 invert" : ""
                }`}
              />
            </Link>

            {/* 2. DESKTOP CENTER DROPDOWNS */}
            <div className="hidden lg:flex items-center">
              <NavDropdowns isTransparent={isTransparent} />
            </div>

            {/* 3. DESKTOP RIGHT LINKS & ARCHITECTURAL CTA */}
            <div className="hidden lg:flex shrink-0 items-center gap-6 text-[12px] font-bold tracking-[0.3px]">
              <Link
                href="/careers"
                className={`transition-colors ${
                  isTransparent
                    ? "text-white/90 hover:text-concentra-lime"
                    : "text-industrial-slate hover:text-concentra-purple"
                }`}
              >
                Careers
              </Link>
              <Link
                href="/request-quote"
                className={`transition-colors ${
                  isTransparent
                    ? "text-white/90 hover:text-concentra-lime"
                    : "text-industrial-slate hover:text-concentra-purple"
                }`}
              >
                Request Quote
              </Link>
              <Link
                href="/contact-us"
                className={`inline-flex items-center gap-3 px-5 py-3 text-[12px] font-extrabold transition-all hover:-translate-y-0.5 ${
                  isTransparent
                    ? "bg-concentra-lime text-[#1b2c1b]"
                    : "bg-concentra-purple hover:bg-[#632056] text-white"
                }`}
              >
                Contact Us <span className="text-[14px] leading-none">↗</span>
              </Link>
            </div>

            {/* 4. MOBILE HAMBURGER */}
            <div className="lg:hidden flex shrink-0 items-center pl-2">
              <button
                onPointerDown={handleMenuToggleInstant}
                onClick={handleMenuToggle}
                aria-label="Toggle navigation menu"
                className={`p-1.5 focus:outline-none transition-colors touch-none ${
                  isTransparent ? "text-white" : "text-industrial-slate"
                }`}
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.2}
                    d={
                      isMobileMenuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 7h16M10 12h10M4 17h16"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE ARCHITECTURAL DRAWER */}
        <div
          className={`
            lg:hidden absolute left-0 w-full bg-white border-b border-border-subtle shadow-2xl px-6 py-6 flex flex-col gap-1
            transition-all duration-300 ease-in-out z-40
            ${
              isMobileMenuOpen
                ? "top-full opacity-100 translate-y-0 pointer-events-auto visible"
                : "top-full opacity-0 -translate-y-3 pointer-events-none invisible"
            }
          `}
        >
          <span className="text-[10px] font-extrabold tracking-[2px] text-concentra-purple uppercase mb-1">
            Navigation
          </span>
          <Link
            href="/solutions"
            className="py-2.5 text-[15px] font-bold text-industrial-slate border-b border-border-subtle/60 hover:text-concentra-purple flex justify-between items-center"
          >
            Solutions <span className="text-xs text-ink-muted">↗</span>
          </Link>
          <Link
            href="/services"
            className="py-2.5 text-[15px] font-bold text-industrial-slate border-b border-border-subtle/60 hover:text-concentra-purple flex justify-between items-center"
          >
            Services <span className="text-xs text-ink-muted">↗</span>
          </Link>
          <Link
            href="/company"
            className="py-2.5 text-[15px] font-bold text-industrial-slate border-b border-border-subtle/60 hover:text-concentra-purple flex justify-between items-center"
          >
            Company Details <span className="text-xs text-ink-muted">↗</span>
          </Link>
          <Link
            href="/careers"
            className="py-2.5 text-[15px] font-bold text-industrial-slate border-b border-border-subtle/60 hover:text-concentra-purple flex justify-between items-center"
          >
            Careers <span className="text-xs text-ink-muted">↗</span>
          </Link>
          <Link
            href="/request-quote"
            className="py-2.5 text-[15px] font-bold text-industrial-slate hover:text-concentra-purple flex justify-between items-center"
          >
            Request Quote <span className="text-xs text-ink-muted">↗</span>
          </Link>

          <Link
            href="/contact-us"
            className="mt-4 bg-concentra-purple text-white font-extrabold text-[13px] py-3.5 px-5 w-full flex items-center justify-between active:scale-[0.99] transition-transform"
          >
            Contact Us <span>↗</span>
          </Link>
        </div>
      </header>
    </>
  );
}