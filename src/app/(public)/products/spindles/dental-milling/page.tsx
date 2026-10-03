"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Settings, Gauge, Zap } from "lucide-react";

// 1. Mock Data for Sub-Categories (Purpose of Use)
const categories = [
  "All Series",
  "Zirconia Milling",
  "Titanium & Wet Milling",
  "Glass Ceramic Milling",
  "Compact Desktop Systems"
];

// 2. Mock Data for the Spindle Variants
const spindleVariants = [
  {
    id: "dm-zr-60000",
    name: "DM-ZR 60,000 Dry",
    category: "Zirconia Milling",
    taper: "Collet 4mm",
    rpm: "60,000",
    power: "0.5 kW",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2070&auto=format&fit=crop",
    link: "/products/spindles/dental-milling/dm-zr-60000"
  },
  {
    id: "dm-ti-80000",
    name: "DM-TI 80,000 Wet",
    category: "Titanium & Wet Milling",
    taper: "Collet 6mm",
    rpm: "80,000",
    power: "1.2 kW",
    image: "https://images.unsplash.com/photo-1584308666744-24d5e4b1a457?q=80&w=2070&auto=format&fit=crop",
    link: "/products/spindles/dental-milling/dm-ti-80000"
  },
  {
    id: "dm-gc-100000",
    name: "DM-GC 100,000 Ultra",
    category: "Glass Ceramic Milling",
    taper: "Collet 3mm",
    rpm: "100,000",
    power: "0.8 kW",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=2070&auto=format&fit=crop",
    link: "/products/spindles/dental-milling/dm-gc-100000"
  },
  {
    id: "dm-ds-40000",
    name: "DM-DS 40,000 Compact",
    category: "Compact Desktop Systems",
    taper: "Collet 3mm",
    rpm: "40,000",
    power: "0.4 kW",
    image: "https://images.unsplash.com/photo-1579567761406-4684ee0c75b6?q=80&w=2070&auto=format&fit=crop",
    link: "/products/spindles/dental-milling/dm-ds-40000"
  }
];

export default function DentalMillingPage() {
  const [activeCategory, setActiveCategory] = useState("All Series");

  // Filter logic based on active selection
  const filteredProducts = activeCategory === "All Series" 
    ? spindleVariants 
    : spindleVariants.filter(product => product.category === activeCategory);

  return (
    <main className="min-h-screen w-full bg-stone-50/50 pb-20">
      
      {/* 1. HEADER BANNER */}
      {/* pt-[140px] and lg:pt-[100px] ensures it clears the floating Navbar & Breadcrumbs */}
      <section className="w-full bg-industrial-slate pt-[140px] lg:pt-[100px] pb-12 lg:pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Link href="/products/spindles" className="text-concentra-green hover:text-white transition-colors text-sm font-semibold flex items-center gap-1 mb-4 w-fit">
              <ChevronRight className="w-4 h-4 rotate-180" /> Back to Spindles
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Dental Milling Spindles
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Ultra-precise, low-vibration motorized spindles engineered exclusively for dental CAD/CAM systems. Optimized for milling zirconia, titanium, and glass ceramics with sub-micron accuracy.
            </p>
          </div>
        </div>
        {/* Subtle Background Pattern/Gradient */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-concentra-purple/20 to-transparent z-0 blur-3xl"></div>
      </section>

      {/* 2. MAIN LAYOUT: Sidebar + Content Grid */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 lg:mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* ========================================= */}
          {/* LEFT SIDEBAR: FILTER MENU                 */}
          {/* ========================================= */}
          <div className="col-span-1 lg:col-span-3">
            <div className="lg:sticky lg:top-[120px]">
              
              <h3 className="hidden lg:block text-lg font-bold text-industrial-slate mb-4 pb-4 border-b border-gray-200">
                Filter by Material / System
              </h3>

              {/* MOBILE: Horizontal Scrollable Pills */}
              <div className="lg:hidden flex overflow-x-auto scrollbar-hide space-x-3 pb-2 -mx-4 px-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${
                      activeCategory === category
                        ? "bg-concentra-green border-concentra-green text-white shadow-md"
                        : "bg-white border-gray-200 text-slate-600 hover:bg-gray-50"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* DESKTOP: Vertical Stacked Menu */}
              <div className="hidden lg:flex flex-col space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`text-left w-full px-5 py-3.5 rounded-xl font-bold transition-all duration-300 flex items-center justify-between group ${
                      activeCategory === category
                        ? "bg-concentra-green text-white shadow-md"
                        : "bg-transparent text-slate-600 hover:bg-white hover:shadow-sm hover:text-concentra-green border border-transparent hover:border-gray-100"
                    }`}
                  >
                    {category}
                    <ChevronRight className={`w-4 h-4 transition-transform ${activeCategory === category ? "translate-x-1" : "opacity-0 group-hover:opacity-100 group-hover:translate-x-1"}`} />
                  </button>
                ))}
              </div>

            </div>
          </div>

          {/* ========================================= */}
          {/* RIGHT CONTENT: PRODUCT GRID               */}
          {/* ========================================= */}
          <div className="col-span-1 lg:col-span-9">
            
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-industrial-slate">
                {activeCategory === "All Series" ? "All Dental Spindles" : activeCategory}
              </h2>
              <span className="text-sm font-medium text-slate-400 bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm">
                {filteredProducts.length} Results
              </span>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Link 
                  href={product.link} 
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 flex flex-col group"
                >
                  {/* Product Image */}
                  <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Category Pill Over Image */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-concentra-purple uppercase tracking-wider shadow-sm">
                      {product.category}
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-industrial-slate mb-4 group-hover:text-concentra-green transition-colors">
                      {product.name}
                    </h3>
                    
                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-6 flex-grow">
                      
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400 font-semibold mb-1 flex items-center gap-1.5">
                          <Settings className="w-3.5 h-3.5" /> Taper
                        </span>
                        <span className="text-sm font-bold text-slate-700">{product.taper}</span>
                      </div>
                      
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400 font-semibold mb-1 flex items-center gap-1.5">
                          <Gauge className="w-3.5 h-3.5" /> Max RPM
                        </span>
                        <span className="text-sm font-bold text-slate-700">{product.rpm}</span>
                      </div>
                      
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400 font-semibold mb-1 flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5" /> Power
                        </span>
                        <span className="text-sm font-bold text-slate-700">{product.power}</span>
                      </div>

                    </div>
                    
                    {/* Fake Button */}
                    <div className="w-full py-2.5 rounded-lg border-2 border-slate-100 text-industrial-slate font-bold text-sm text-center group-hover:border-concentra-green group-hover:text-concentra-green transition-colors mt-auto">
                      View Specifications
                    </div>
                  </div>

                </Link>
              ))}
            </div>

            {/* Empty State (Just in case a filter has no products) */}
            {filteredProducts.length === 0 && (
              <div className="w-full py-20 flex flex-col items-center justify-center bg-white rounded-2xl border border-dashed border-gray-200">
                <span className="text-gray-400 font-medium text-lg">No spindles found in this category.</span>
                <button onClick={() => setActiveCategory("All Series")} className="mt-4 text-concentra-purple font-bold hover:underline">
                  Clear Filters
                </button>
              </div>
            )}

          </div>
        </div>
      </section>

    </main>
  );
}