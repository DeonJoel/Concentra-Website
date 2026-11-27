"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// --- Menu Data: Add new items anytime using just { title, href, description } ---
// Index numbers (01, 02, 03...) are generated automatically!
const products = [
  {
    title: "Precision Components",
    href: "/solutions/precision-components",
    description: "High-accuracy parts machined to exact specifications and tolerances.",
  },
  {
    title: "Spindles & Technology",
    href: "/solutions/spindles",
    description: "Advanced spindles for General and Special Purpose Machine (SPM) applications.",
  },
  {
    title: "Inspection Gauges & Mandrels",
    href: "/solutions/gauges",
    description: "Highly reliable measurement tools for strict quality assurance.",
  },
  // Example for future expansion — just uncomment or copy this format:
  // {
  //   title: "Cutting Tools & Tool Holders",
  //   href: "/solutions/tooling",
  //   description: "Special boring bars, HSK tool clamping components, collets and holders.",
  // },
];

const services = [
  {
    title: "CNC Vertical Machining",
    href: "/services/vertical-machining",
    description: "Twin pallet VMC handling milled components up to 1250 × 550 × 700 mm.",
  },
  {
    title: "CNC Horizontal Machining",
    href: "/services/horizontal-machining",
    description: "Heavy-duty HMCs capable of handling parts up to 2000 × 1250 × 1250 mm.",
  },
  {
    title: "CNC Turning",
    href: "/services/turning",
    description: "Precision turning centers handling parts up to dia 400 mm × 1500 mm.",
  },
  {
    title: "CNC Precision Grinding",
    href: "/services/grinding",
    description: "Temperature-controlled cylindrical, internal & thread grinding.",
  },
  {
    title: "Cast Iron Machining",
    href: "/services/cast-iron",
    description: "Specialized roughing and finishing operations for heavy cast-iron structures.",
  },
  {
    title: "Spindle Balancing & Testing",
    href: "/services/balancing",
    description: "In-house dynamic balancing, run-in, and vibration verification.",
  },
];

const company = [
  {
    title: "About Concentra",
    href: "/company/about",
    description: "Established in 1995 in Bengaluru—30+ years of precision engineering heritage.",
  },
  {
    title: "Plant & Facilities",
    href: "/company/facilities",
    description: "86,000 sq. ft. campus with 35,000 sq. ft. across 3 dedicated shops.",
  },
  {
    title: "Quality Assurance",
    href: "/company/quality",
    description: "Zeiss CONTURA G2 CMM and Mitutoyo dimensional inspection infrastructure.",
  },
  {
    title: "Certifications",
    href: "/company/certifications",
    description: "ISO 9001:2015 Quality Management System certified by TÜV India.",
  },
];

export default function NavDropdowns({
  isTransparent = false,
}: {
  isTransparent?: boolean;
}) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setActiveMenu(null);
  }, [pathname]);

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
    <div className="hidden lg:flex items-center gap-1 relative z-50" ref={navRef}>
      <NavItem
        title="Solutions"
        isTransparent={isTransparent}
        isActive={activeMenu === "solutions"}
        onMouseEnter={() => setActiveMenu("solutions")}
        onMouseLeave={() => setActiveMenu(null)}
        onClick={(e) => {
          e.preventDefault();
          handleToggle("solutions");
        }}
      >
        <DropdownGrid
          items={products}
          sectionLabel="SOLUTION"
          width="lg:w-[660px]"
          currentPath={pathname}
          overviewHref="/solutions"
          overviewLabel="View all solutions"
          onSelect={() => setActiveMenu(null)}
        />
      </NavItem>

      <NavItem
        title="Services"
        isTransparent={isTransparent}
        isActive={activeMenu === "services"}
        onMouseEnter={() => setActiveMenu("services")}
        onMouseLeave={() => setActiveMenu(null)}
        onClick={(e) => {
          e.preventDefault();
          handleToggle("services");
        }}
      >
        <DropdownGrid
          items={services}
          sectionLabel="SERVICE"
          width="lg:w-[660px]"
          currentPath={pathname}
          overviewHref="/services"
          overviewLabel="View all machining services"
          onSelect={() => setActiveMenu(null)}
        />
      </NavItem>

      <NavItem
        title="Company Details"
        isTransparent={isTransparent}
        isActive={activeMenu === "company"}
        onMouseEnter={() => setActiveMenu("company")}
        onMouseLeave={() => setActiveMenu(null)}
        onClick={(e) => {
          e.preventDefault();
          handleToggle("company");
        }}
      >
        <DropdownGrid
          items={company}
          sectionLabel="COMPANY"
          width="lg:w-[560px]"
          currentPath={pathname}
          overviewHref="/company"
          overviewLabel="Explore company overview"
          onSelect={() => setActiveMenu(null)}
        />
      </NavItem>
    </div>
  );
}

interface NavItemProps {
  title: string;
  isTransparent: boolean;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: (e: React.MouseEvent) => void;
  children: React.ReactNode;
}

function NavItem({
  title,
  isTransparent,
  isActive,
  onMouseEnter,
  onMouseLeave,
  onClick,
  children,
}: NavItemProps) {
  return (
    <div className="relative" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <button
        onClick={onClick}
        className={cn(
          "flex items-center gap-1.5 px-4 py-2 text-[13px] font-bold tracking-[0.2px] transition-colors duration-200 outline-none",
          isTransparent
            ? isActive
              ? "text-concentra-lime bg-white/10"
              : "text-white/90 hover:text-concentra-lime"
            : isActive
              ? "bg-surface-muted text-concentra-purple"
              : "bg-transparent text-industrial-slate hover:text-concentra-purple"
        )}
      >
        {title}
        <svg
          className={cn(
            "w-3.5 h-3.5 transition-transform duration-200",
            isActive ? "rotate-180" : ""
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isActive && <div className="absolute top-full left-0 pt-3">{children}</div>}
    </div>
  );
}

interface DropdownItem {
  title: string;
  href: string;
  description: string;
  tag?: string;
}

function DropdownGrid({
  items,
  sectionLabel,
  width,
  currentPath,
  overviewHref,
  overviewLabel,
  onSelect,
}: {
  items: DropdownItem[];
  sectionLabel: string;
  width: string;
  currentPath: string | null;
  overviewHref: string;
  overviewLabel: string;
  onSelect: () => void;
}) {
  const hasOddItems = items.length % 2 !== 0;

  return (
    <div
      className={cn(
        // Top border kept subtle; Left, Right, and Bottom given crisp dark definition + deeper shadow
        "bg-white border-t border-border-subtle border-x border-b border-[#2a1731]/25 shadow-[0_24px_48px_-8px_rgba(33,22,39,0.28)]",
        width
      )}
    >
      <ul className="grid md:grid-cols-2 gap-px bg-border-subtle border-b border-border-subtle">
        {items.map((item, index) => {
          const isCurrentPage = currentPath === item.href;
          // Auto-generate numbered pointer (01 / SOLUTION) unless a custom tag is explicitly passed
          const pointerTag =
            item.tag || `${String(index + 1).padStart(2, "0")} / ${sectionLabel}`;

          return (
            <li key={item.title} className="bg-white">
              <Link
                href={item.href}
                onClick={onSelect}
                className={cn(
                  "relative block h-full select-none p-4 transition-colors group",
                  isCurrentPage
                    ? "bg-[#eef7eb]/50 border-l-2 border-concentra-green"
                    : "hover:bg-surface-muted"
                )}
              >
                {isCurrentPage && (
                  <span className="absolute top-3.5 right-3.5 bg-white px-2 py-0.5 border border-concentra-green/40 text-[9px] font-extrabold uppercase tracking-widest text-concentra-green">
                    Active
                  </span>
                )}

                <span className="block text-[9px] font-extrabold tracking-[1.2px] text-concentra-purple uppercase mb-1">
                  {pointerTag}
                </span>

                <div
                  className={cn(
                    "text-[14px] font-extrabold leading-snug transition-colors",
                    isCurrentPage
                      ? "text-concentra-green pr-16"
                      : "text-industrial-slate group-hover:text-concentra-purple"
                  )}
                >
                  {item.title}
                </div>

                <p className="line-clamp-2 text-[12px] leading-[1.6] text-ink-muted mt-1">
                  {item.description}
                </p>
              </Link>
            </li>
          );
        })}

        {/* Clean filler cell when item count is odd (e.g., 3 items) so no grey gap shows */}
        {hasOddItems && <li className="hidden md:block bg-white" aria-hidden="true" />}
      </ul>

      {/* Overview Footer Bar */}
      <div className="px-4 py-2.5 bg-surface-muted flex items-center justify-between">
        <span className="text-[10px] font-extrabold tracking-[1.2px] text-ink-muted uppercase">
          Concentra Precision Technologies Pvt. Ltd.
        </span>
        <Link
          href={overviewHref}
          onClick={onSelect}
          className="text-[12px] font-extrabold text-concentra-purple hover:text-industrial-slate transition-colors flex items-center gap-1"
        >
          {overviewLabel} <span>↗</span>
        </Link>
      </div>
    </div>
  );
}