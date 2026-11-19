"use client";

import React, { useState } from "react";
import Link from "next/link";

// --- Product Data matching the HTML structure ---
const products = [
  { 
    id: 1,
    title: "Precision Machined Components", 
    href: "/solutions/precision-components", 
    description: "Complex, close-tolerance components and assemblies for demanding industrial applications.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=2070&auto=format&fit=crop",
    category: "components",
    tag: "01 / COMPONENTS"
  },
  { 
    id: 2,
    title: "Spindles & Spindle Assemblies", 
    href: "/solutions/spindles", 
    description: "General-purpose and special-purpose machine spindles, with assembly, balancing and testing.",
    image: "https://images.unsplash.com/photo-1589254066007-898d52d910d3?q=80&w=2070&auto=format&fit=crop",
    category: "spindles",
    tag: "02 / SPINDLES"
  },
  { 
    id: 3,
    title: "Cutting Tools & Tool Holders", 
    href: "/solutions/tooling", 
    description: "Special boring bars, HSK tool clamping components, collets and holders.",
    image: "https://images.unsplash.com/photo-1572621489679-ce6fae963bc9?q=80&w=2070&auto=format&fit=crop",
    category: "tooling",
    tag: "03 / TOOLING"
  },
  { 
    id: 4,
    title: "Inspection Gauges & Mandrels", 
    href: "/solutions/gauges", 
    description: "Precision inspection tooling and mandrels supporting accurate manufacturing verification.",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop",
    category: "tooling",
    tag: "04 / INSPECTION"
  },
  { 
    id: 5,
    title: "Special Purpose Equipment", 
    href: "/solutions/equipment", 
    description: "Application-specific equipment and engineered spindle systems, including high-speed designs.",
    image: "https://images.unsplash.com/photo-1533422902779-facfac161439?q=80&w=2070&auto=format&fit=crop",
    category: "equipment",
    tag: "05 / EQUIPMENT"
  },
  { 
    id: 6,
    title: "Cast Iron & Machine Tool Parts", 
    href: "/solutions/machining", 
    description: "Machining of cast-iron structures and precision machine tool components.",
    image: "https://images.unsplash.com/photo-1622322384777-a8dfc8888b56?q=80&w=2070&auto=format&fit=crop",
    category: "components",
    tag: "06 / MACHINING"
  },
];

// --- Filter Categories ---
const filters = [
  { label: "All solutions", value: "all" },
  { label: "Precision components", value: "components" },
  { label: "Spindles", value: "spindles" },
  { label: "Tooling & gauges", value: "tooling" },
  { label: "Special equipment", value: "equipment" },
];

export default function ProductsOverviewPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  // Filter the products based on the active selection
  const filteredProducts = activeFilter === "all" 
    ? products 
    : products.filter(product => product.category === activeFilter);

  return (
    <main className="w-full bg-[#faf9fb] py-16 md:py-[105px]">
      
      {/* MASTER CONTAINER: Center-Locked Max Width */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- SECTION HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-[30px] md:gap-[60px] mb-[38px]">
          
          {/* Left: Eyebrow & Title */}
          <div>
            <div className="flex items-center gap-3 text-concentra-purple text-[11px] font-extrabold tracking-[2px] uppercase mb-5">
              <span className="w-[27px] h-[2px] bg-concentra-green inline-block"></span>
              OUR SOLUTIONS
            </div>
            <h2 className="text-[clamp(31px,3.4vw,45px)] leading-[1.23] font-extrabold text-industrial-slate tracking-[-1px] mb-0">
              Engineered for your<br />
              <em className="text-concentra-purple not-italic">most demanding challenges.</em>
            </h2>
          </div>

          {/* Right: Description */}
          <p className="max-w-[340px] text-[14px] leading-[1.9] text-[#716b77] m-0 mb-1">
            Explore our core product families, from intricate machined parts to engineered spindle systems and specialized tooling.
          </p>
        </div>

        {/* --- FILTER BAR --- */}
        <div className="flex gap-[10px] flex-wrap mb-[26px]" role="group" aria-label="Filter solutions">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-[17px] py-[11px] text-[11px] font-extrabold transition-colors border ${
                activeFilter === filter.value
                  ? "bg-concentra-purple border-concentra-purple text-white"
                  : "bg-white border-[#e2dce3] text-[#6f6873] hover:bg-concentra-purple hover:border-concentra-purple hover:text-white"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* --- SOLUTION GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[22px]">
          {filteredProducts.map((product) => (
            <Link 
              key={product.id} 
              href={product.href}
              className="group bg-white border border-[#e8e4e9] flex flex-col transition-all duration-200 hover:-translate-y-[5px] hover:shadow-[0_14px_30px_#29172c12]"
            >
              
              {/* Image & Floating Tag */}
              <div className="relative h-[205px] w-full overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-[15px] bottom-[15px] bg-white px-[10px] py-[8px] text-[9px] font-extrabold tracking-[1px] text-concentra-purple uppercase z-10 shadow-sm">
                  {product.tag}
                </span>
              </div>
              
              {/* Card Content */}
              <div className="p-[24px] flex flex-col flex-grow">
                <h3 className="font-extrabold text-[17px] font-sans text-industrial-slate mb-[11px]">
                  {product.title}
                </h3>
                
                <p className="text-[12px] text-[#77727e] leading-[1.8] min-h-[66px] mb-4 flex-grow">
                  {product.description}
                </p>
                
                <div className="inline-flex items-center gap-1.5 text-concentra-purple font-extrabold text-[12px] py-[10px] w-fit">
                  Explore solution <span className="text-[14px] leading-none">↗</span>
                </div>
              </div>

            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}