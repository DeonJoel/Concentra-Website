"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // <-- 1. Import usePathname
import { cn } from "@/lib/utils";

// --- Menu Data based on Concentra Profile ---
const products = [
  { title: "Precision Components", href: "/products/precision-components", description: "High-accuracy parts machined to exact specifications and tolerances." },
  { title: "Spindles & Technology", href: "/products/spindles", description: "Advanced spindles for General and Special Purpose Machine (SPM) applications." },
  { title: "Special Purpose Machines", href: "/products/special-purpose-machines", description: "Custom-engineered equipment designed for specialized manufacturing tasks." },
  { title: "Cutting Tools", href: "/products/cutting-tools", description: "Durable and precise tools engineered for complex machining." },
  { title: "Inspection Gauges & Mandrels", href: "/products/gauges", description: "Highly reliable measurement tools for strict quality assurance." },
  { title: "Tool Holding Systems", href: "/products/tool-holding", description: "Includes HSK Tool Clamping, Special Boring Bars, Collets, and Holders." },
];

const services = [
  { title: "CNC Vertical Machining", href: "/services/vertical-machining", description: "Twin pallet VMC handling milled components up to 1250x550x700mm." },
  { title: "CNC Horizontal Machining", href: "/services/horizontal-machining", description: "Heavy-duty HMCs capable of handling parts up to 2000x1250x1250mm." },
  { title: "CNC Turning", href: "/services/turning", description: "Precision turning centers handling parts up to dia 400mm x 1500mm." },
  { title: "CNC Precision Grinding", href: "/services/grinding", description: "Temperature-controlled outer, internal & thread grinding." },
  { title: "Cast Iron Machining", href: "/services/cast-iron", description: "Specialized roughing and finishing operations for heavy cast iron blocks." },
  { title: "Spindle Balancing & Testing", href: "/services/balancing", description: "In-house rigorous balancing and testing facilities." },
];

const company = [
  { title: "About Us", href: "/company/about", description: "Established in 1995, over 25 years of manufacturing excellence in Bangalore." },
  { title: "Plant & Facilities", href: "/company/facilities", description: "86,000 sq. ft. facility with state-of-the-art shop floors and equipment." },
  { title: "Quality Assurance", href: "/company/quality", description: "Equipped with advanced Zeiss CMM and Mitutoyo testing instruments." },
  { title: "Certifications", href: "/company/certifications", description: "Proudly ISO 9001:2015 Certified by TUV NORD." },
];

export default function NavDropdowns() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  
  // 2. Get the current URL path
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = (menuName: string) => {
    setActiveMenu((prev) => (prev === menuName ? null : menuName));
  };

  return (
    <div className="hidden lg:flex items-center gap-2 relative z-50" ref={navRef}>
      
      {/* PRODUCTS */}
      <NavItem
        title="Products"
        isActive={activeMenu === "products"}
        onMouseEnter={() => setActiveMenu("products")}
        onMouseLeave={() => setActiveMenu(null)}
        onClick={(e) => {
          e.preventDefault();
          handleToggle("products");
        }}
      >
        {/* Pass the pathname down to the grid */}
        <DropdownGrid items={products} width="lg:w-[650px]" currentPath={pathname} />
      </NavItem>

      {/* SERVICES */}
      <NavItem
        title="Services"
        isActive={activeMenu === "services"}
        onMouseEnter={() => setActiveMenu("services")}
        onMouseLeave={() => setActiveMenu(null)}
        onClick={(e) => {
          e.preventDefault();
          handleToggle("services");
        }}
      >
        <DropdownGrid items={services} width="lg:w-[650px]" currentPath={pathname} />
      </NavItem>

      {/* COMPANY DETAILS */}
      <NavItem
        title="Company Details"
        isActive={activeMenu === "company"}
        onMouseEnter={() => setActiveMenu("company")}
        onMouseLeave={() => setActiveMenu(null)}
        onClick={(e) => {
          e.preventDefault();
          handleToggle("company");
        }}
      >
        <DropdownGrid items={company} width="lg:w-[500px]" currentPath={pathname} />
      </NavItem>

    </div>
  );
}

// --- Reusable Navigation Trigger Component ---
interface NavItemProps {
  title: string;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: (e: React.MouseEvent) => void;
  children: React.ReactNode;
}

function NavItem({ title, isActive, onMouseEnter, onMouseLeave, onClick, children }: NavItemProps) {
  return (
    <div 
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button
        onClick={onClick}
        className={cn(
          "flex items-center gap-1 px-4 py-2 rounded-xl text-[15px] font-semibold transition-colors duration-200 outline-none",
          isActive 
            ? "bg-[#F8EBFF] text-concentra-purple" 
            : "bg-transparent text-industrial-slate"
        )}
      >
        {title}
        <svg 
          className={cn("w-4 h-4 transition-transform duration-200", isActive ? "rotate-180" : "")} 
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Kept your padding fix here! (pt-3 instead of mt-3) */}
      {isActive && (
        <div className="absolute top-full left-0 pt-3">
          {children}
        </div>
      )}
    </div>
  );
}

// --- Reusable Dropdown Grid Component ---
function DropdownGrid({ items, width, currentPath }: { items: any[], width: string, currentPath: string | null }) {
  return (
    <ul className={cn("grid gap-x-2 gap-y-2 p-4 md:grid-cols-2 bg-white rounded-3xl shadow-xl border border-slate-100", width)}>
      {items.map((item) => {
        
        // 3. Check if this specific item matches the URL we are currently on
        const isCurrentPage = currentPath === item.href;

        return (
          <li key={item.title}>
            <Link
              href={item.href}
              className={cn(
                "relative block select-none space-y-1.5 rounded-2xl p-4 leading-none no-underline transition-colors group",
                isCurrentPage 
                  ? "ring-1 ring-concentra-green bg-concentra-green/5" // Green outline for current page
                  : "hover:bg-[#F8EBFF]/60" // Purple hover for standard pages
              )}
            >
              
              {/* 4. Small Green Text at Top Right if it's the current page */}
              {isCurrentPage && (
                <div className="absolute top-4 right-4 bg-white px-2 py-0.5 rounded-md border border-concentra-green/30 text-[9px] font-bold uppercase tracking-widest text-concentra-green">
                  Current Page
                </div>
              )}

              {/* Title color switches to green if active, otherwise stays purple */}
              <div className={cn(
                "text-[15px] font-semibold leading-none transition-colors",
                isCurrentPage 
                  ? "text-concentra-green pr-24" // Added padding so it doesn't hit the badge
                  : "text-concentra-purple group-hover:text-purple-900"
              )}>
                {item.title}
              </div>
              
              <p className={cn(
                "line-clamp-2 text-[13px] leading-relaxed mt-1.5",
                isCurrentPage ? "text-slate-600 pr-16" : "text-slate-500"
              )}>
                {item.description}
              </p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}