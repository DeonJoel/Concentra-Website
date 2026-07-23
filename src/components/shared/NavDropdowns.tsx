"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// --- Menu Data based on Concentra Profile ---
const products = [
  { title: "Precision Components", href: "/products/precision-components", description: "High-accuracy parts machined to exact specifications and tolerances." },
  { title: "Spindles & Technology", href: "/products/spindles", description: "Advanced spindles for General and Special Purpose Machine (SPM) applications." },
  { title: "Special Purpose Machines", href: "/products/spm", description: "Custom-engineered equipment designed for specialized manufacturing tasks." },
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

  // Close the menu if the user clicks anywhere outside the navigation area
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggles the menu on click. If it's already open, it closes it. If closed, it opens it.
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
        <DropdownGrid items={products} width="lg:w-[650px]" />
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
        <DropdownGrid items={services} width="lg:w-[650px]" />
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
        <DropdownGrid items={company} width="lg:w-[500px]" />
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
          // The color is STRICTLY controlled by whether the menu is open (isActive)
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

      {/* Dropdown Content - Positioned absolutely below the trigger */}
      {isActive && (
        <div className="absolute top-full left-0 pt-3">
          {children}
        </div>
      )}
    </div>
  );
}

// --- Reusable Dropdown Grid Component ---
function DropdownGrid({ items, width }: { items: any[], width: string }) {
  return (
    <ul className={cn("grid gap-x-2 gap-y-2 p-4 md:grid-cols-2 bg-white rounded-3xl shadow-xl border border-slate-100", width)}>
      {items.map((item) => (
        <li key={item.title}>
          <Link
            href={item.href}
            className="block select-none space-y-1.5 rounded-2xl p-4 leading-none no-underline transition-colors hover:bg-[#F8EBFF]/60 group"
          >
            <div className="text-[15px] font-semibold leading-none text-concentra-purple group-hover:text-purple-900 transition-colors">
              {item.title}
            </div>
            <p className="line-clamp-2 text-[13px] leading-relaxed text-slate-500 mt-1.5">
              {item.description}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}