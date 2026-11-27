import Link from "next/link";
import React from "react";
import { MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#211627] text-[#e4dce5] pt-[60px] relative z-30">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-[55px]">
          
          {/* COLUMN 1: Brand & Tagline (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col">
            <Link href="/" className="mb-5 block w-fit hover:opacity-80 transition-opacity">
              <img
                src="/Concentra_LOGO.png"
                alt="Concentra"
                className="w-[200px] h-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-[12px] leading-[1.8] text-[#c8bdca] max-w-[270px]">
              Precision components. Advanced machining.
              <br />
              Trusted engineering partnerships since 1995.
            </p>
          </div>

          {/* COLUMN 2: Explore (2 Cols) */}
          <div className="lg:col-span-2 flex flex-col">
            <h4 className="font-bold text-[13px] text-white mb-5">Explore</h4>
            <div className="flex flex-col gap-1">
              <Link
                href="/"
                className="text-[12px] leading-[2] text-[#c8bdca] hover:text-concentra-lime transition-colors w-fit"
              >
                Home
              </Link>
              <Link
                href="/solutions"
                className="text-[12px] leading-[2] text-[#c8bdca] hover:text-concentra-lime transition-colors w-fit"
              >
                Solutions
              </Link>
              <Link
                href="/services"
                className="text-[12px] leading-[2] text-[#c8bdca] hover:text-concentra-lime transition-colors w-fit"
              >
                Services
              </Link>
              <Link
                href="/company/about"
                className="text-[12px] leading-[2] text-[#c8bdca] hover:text-concentra-lime transition-colors w-fit"
              >
                About Concentra
              </Link>
            </div>
          </div>

          {/* COLUMN 3: Capabilities (2 Cols) */}
          <div className="lg:col-span-2 flex flex-col">
            <h4 className="font-bold text-[13px] text-white mb-5">Capabilities</h4>
            <div className="flex flex-col gap-1">
              <Link
                href="/services"
                className="text-[12px] leading-[2] text-[#c8bdca] hover:text-concentra-lime transition-colors w-fit"
              >
                Machining
              </Link>
              <Link
                href="/company/quality"
                className="text-[12px] leading-[2] text-[#c8bdca] hover:text-concentra-lime transition-colors w-fit"
              >
                Quality assurance
              </Link>
              <Link
                href="/solutions/spindles"
                className="text-[12px] leading-[2] text-[#c8bdca] hover:text-concentra-lime transition-colors w-fit"
              >
                Spindle systems
              </Link>
              <Link
                href="/request-quote"
                className="text-[12px] leading-[2] text-[#c8bdca] hover:text-concentra-lime transition-colors w-fit"
              >
                Request a quote
              </Link>
            </div>
          </div>

          {/* COLUMN 4: Get in touch & Location (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col">
            <h4 className="font-bold text-[13px] text-white mb-5">Get in touch</h4>
            
            <p className="text-[12px] font-bold text-white/90 mb-1.5">
              Concentra Precision Technologies Pvt. Ltd.
            </p>
            <address className="not-italic text-[12px] leading-[1.75] text-[#c8bdca] mb-4 max-w-[320px]">
              Plot No. 367-B, Road No. 4, Sompura 1st Stage,
              <br />
              KIADB Industrial Area, Nidavanda Post,
              <br />
              Dabaspet, Bengaluru, India – 562132
            </address>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-1">
              <a
                href="https://maps.app.goo.gl/SLPgqaRi6vd8NaGs8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[12px] font-bold text-concentra-lime hover:text-white transition-colors w-fit"
              >
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                Locate on Google Maps <span className="text-[14px] leading-none">↗</span>
              </a>

              <Link
                href="/contact-us"
                className="text-[12px] font-bold text-[#c8bdca] hover:text-concentra-lime transition-colors w-fit inline-flex items-center gap-1"
              >
                Contact us <span className="text-[14px] leading-none">↗</span>
              </Link>
            </div>
          </div>

        </div>

        {/* COPYRIGHT & BOTTOM BAR */}
        <div className="border-t border-[#ffffff22] flex flex-col sm:flex-row justify-between items-center py-[22px] text-[10px] text-[#afa2b1] gap-4 sm:gap-0">
          <span>
            &copy; {new Date().getFullYear()} Concentra Precision Technologies Pvt. Ltd. All rights
            reserved.
          </span>
          <span className="tracking-wider font-semibold">ENGINEERED WITH PRECISION</span>
        </div>
      </div>
    </footer>
  );
}