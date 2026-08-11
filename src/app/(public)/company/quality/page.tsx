import React from "react";
import Link from "next/link";

export default function QualityPage() {
  return (
    <main className="min-h-screen w-full bg-transparent">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[65vh] min-h-[500px]">
        <div 
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1580983546592-365287f32991?q=80&w=2070&auto=format&fit=crop')" }}
        ></div>
        <div 
          className="absolute top-0 left-0 w-full lg:w-10/12 h-full z-10 bg-white/90 lg:bg-transparent"
          style={{ backgroundImage: "linear-gradient(to right, #FFFFFF 0%, rgba(255,255,255,0.9) 58%, rgba(255,255,255,0) 80%)" }}
        ></div>

        <div className="relative z-20 w-full grid grid-cols-12 gap-[32px] px-6 lg:px-[80px] h-full pt-15">
          <div className="col-span-12 lg:col-start-2 lg:col-span-6 flex flex-col justify-center h-full pt-10">
            <p className="text-concentra-purple text-sm md:text-base font-semibold tracking-widest uppercase mb-2 drop-shadow-sm">
              Company / Quality Assurance
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-industrial-slate">
              Zero-Defect Verification.
            </h1>
            <p className="text-base md:text-lg mb-8 text-industrial-slate/80 font-medium leading-relaxed">
              Equipped with world-class metrology and validation technology to guarantee every dimension perfectly matches your blueprints.
            </p>
            <div className="flex gap-4">
              <Link href="/company/certifications">
                <button className="bg-concentra-green hover:bg-green-600 text-white font-semibold py-3 px-8 rounded transition duration-300 shadow-md text-sm">
                  View Certifications
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT & OVERVIEW */}
      <section className="w-full py-20 lg:py-28">
        <div className="w-full grid grid-cols-12 gap-[32px] px-6 lg:px-[80px]">
          <div className="col-span-12 lg:col-start-2 lg:col-span-10">
            
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-industrial-slate">Our Metrology Equipment</h2>
              <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
                We believe that reliable measurements are the foundation of quality assurance. Our dedicated QA lab features the most accurate diagnostic tools available.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-[#F8EBFF] rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-concentra-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-industrial-slate mb-3">ZEISS CMM</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Our advanced ZEISS CONTURA G2 Co-ordinate Measuring Machine ensures highly reliable 3D spatial measurements with an envelope of 1000x1600x600.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-[#e6f4ea] rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-concentra-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                </div>
                <h3 className="text-xl font-bold text-industrial-slate mb-3">2D Height Gauge</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  We utilize the Mitutoyo LH 600 system for absolute precision in 2D height measurement and verification directly on the shop floor.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-[#F8EBFF] rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-concentra-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
                </div>
                <h3 className="text-xl font-bold text-industrial-slate mb-3">Part Traceability</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Using Labenill Laser Engraving equipment, we provide deep, permanent marking to ensure 100% component traceability and QA tracking.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}