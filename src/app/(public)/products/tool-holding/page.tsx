import React from "react";
import Link from "next/link";

export default function ToolHoldingPage() {
  return (
    <main className="min-h-screen w-full bg-transparent">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[70vh] min-h-[500px]">
        {/* Background Image (CNC Tool Holder/Spindle focus) */}
        <div 
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581092162384-8987c1d64718?q=80&w=2070&auto=format&fit=crop')" }}
        ></div>
        
        {/* Figma Gradient Overlay */}
        <div 
          className="absolute top-0 left-0 w-full lg:w-10/12 h-full z-10 bg-white/90 lg:bg-transparent"
          style={{ 
            backgroundImage: "linear-gradient(to right, #FFFFFF 0%, rgba(255,255,255,0.9) 58%, rgba(255,255,255,0) 80%)" 
          }}
        ></div>

        {/* Hero Content aligned to Grid */}
        <div className="relative z-20 w-full grid grid-cols-12 gap-[32px] px-6 lg:px-[80px] h-full pt-15">
          {/* Text constrained: Starts at column 2, spans 6 columns */}
          <div className="col-span-12 lg:col-start-2 lg:col-span-6 flex flex-col justify-center h-full pt-10">
            <p className="text-concentra-purple text-sm md:text-base font-semibold tracking-widest uppercase mb-2 drop-shadow-sm">
              Products / Tool Holding Systems
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-industrial-slate">
              Advanced Clamping Solutions for Maximum Rigidity.
            </h1>
            <p className="text-base md:text-lg mb-8 text-industrial-slate/80 font-medium leading-relaxed">
              We manufacture complex and high precision components[cite: 1], including robust tool holding systems engineered to minimize vibration and maximize accuracy during high-speed machining.
            </p>
            <div className="flex gap-4">
              <Link href="/request-quote">
                <button className="bg-concentra-green hover:bg-green-600 text-white font-semibold py-3 px-8 rounded transition duration-300 shadow-md text-sm">
                  Request a Quote
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT & OVERVIEW */}
      <section className="w-full py-20 lg:py-28">
        <div className="w-full grid grid-cols-12 gap-[32px] px-6 lg:px-[80px]">
          
          {/* Main Container: Starts at Col 2, Spans exactly 10 Columns */}
          <div className="col-span-12 lg:col-start-2 lg:col-span-10">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Text Side */}
              <div className="flex flex-col">
                <h2 className="text-3xl lg:text-4xl font-bold text-industrial-slate mb-6">
                  Secure Connections for Demanding Operations.
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  A machine is only as accurate as its tool holder. Drawing on over 25 years of manufacturing excellence[cite: 1], Concentra produces premium tool holding systems that guarantee a seamless, rigid interface between your machine spindle and the cutting tool.
                </p>
                <p className="text-slate-600 leading-relaxed mb-8">
                  Our comprehensive lineup includes HSK Tool Clamping units, Special Boring Bars, and highly durable Collets and Holders[cite: 1]. Each component is machined to exact micron-level tolerances and thoroughly tested using our advanced in-house metrology equipment[cite: 1].
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-industrial-slate font-medium">
                    <svg className="w-5 h-5 text-concentra-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    HSK Tool Clamping Interfaces[cite: 1]
                  </li>
                  <li className="flex items-center gap-3 text-industrial-slate font-medium">
                    <svg className="w-5 h-5 text-concentra-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    Special Boring Bars[cite: 1]
                  </li>
                  <li className="flex items-center gap-3 text-industrial-slate font-medium">
                    <svg className="w-5 h-5 text-concentra-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    Precision Collets & Holders[cite: 1]
                  </li>
                  <li className="flex items-center gap-3 text-industrial-slate font-medium">
                    <svg className="w-5 h-5 text-concentra-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    Dynamically Balanced for High-Speed RPM
                  </li>
                </ul>
              </div>

              {/* Image Side */}
              <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
                <img 
                  src="https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=2070&auto=format&fit=crop" 
                  alt="Precision tool holding and CNC machining" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. CAPABILITIES GRID (Bento Box Style) */}
      <section className="w-full pb-24 lg:pb-32">
        <div className="w-full grid grid-cols-12 gap-[32px] px-6 lg:px-[80px]">
          
          {/* Main Container: Starts at Col 2, Spans exactly 10 Columns */}
          <div className="col-span-12 lg:col-start-2 lg:col-span-10">
            
            <div className="text-center mb-12">
              <p className="text-concentra-purple font-semibold tracking-widest uppercase mb-2">Our Portfolio</p>
              <h2 className="text-3xl font-bold text-industrial-slate">Tool Holding Categories</h2>
            </div>

            {/* Inner Grid for the cards (3 columns) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Card 1 */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-[#F8EBFF] rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-concentra-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                </div>
                <h3 className="text-xl font-bold text-industrial-slate mb-3">HSK Tool Clamping</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  We manufacture advanced HSK (Hollow Shank Tooling) clamping systems[cite: 1] designed to deliver superior radial and axial stiffness, making them ideal for high-speed machining environments.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-[#e6f4ea] rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-concentra-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" /></svg>
                </div>
                <h3 className="text-xl font-bold text-industrial-slate mb-3">Special Boring Bars</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Engineered to eliminate chatter in deep-hole operations. Our custom-machined Special Boring Bars[cite: 1] ensure superior surface finishes and prolonged insert life.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-[#F8EBFF] rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-concentra-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-industrial-slate mb-3">Collets & Holders</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Extremely accurate Collets and Holders[cite: 1] built for heavy-duty gripping force and concentricity, preventing tool pull-out under heavy chip loads and aggressive feed rates.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

    </main>
  );
}