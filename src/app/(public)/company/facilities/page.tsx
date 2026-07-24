import React from "react";
import Link from "next/link";

export default function FacilitiesPage() {
  return (
    <main className="min-h-screen w-full bg-transparent">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[60vh] min-h-[500px]">
        <div 
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop')" }}
        ></div>
        <div 
          className="absolute top-0 left-0 w-full lg:w-10/12 h-full z-10 bg-white/90 lg:bg-transparent"
          style={{ backgroundImage: "linear-gradient(to right, #FFFFFF 0%, rgba(255,255,255,0.9) 58%, rgba(255,255,255,0) 80%)" }}
        ></div>

        <div className="relative z-20 w-full grid grid-cols-12 gap-[32px] px-6 lg:px-[80px] h-full">
          <div className="col-span-12 lg:col-start-2 lg:col-span-6 flex flex-col justify-center h-full pt-10">
            <p className="text-concentra-purple text-sm md:text-base font-semibold tracking-widest uppercase mb-2 drop-shadow-sm">
              Company / Plant & Facilities
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-industrial-slate">
              State-of-the-Art Infrastructure.
            </h1>
            <p className="text-base md:text-lg mb-8 text-industrial-slate/80 font-medium leading-relaxed">
              Our expansive 86,000 sq. ft. campus in Bangalore houses comprehensive, end-to-end manufacturing capabilities under one roof.
            </p>
            <div className="flex gap-4">
              <Link href="/contact-us">
                <button className="bg-concentra-green hover:bg-green-600 text-white font-semibold py-3 px-8 rounded transition duration-300 shadow-md text-sm">
                  Schedule a Visit
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="flex flex-col">
                <h2 className="text-3xl lg:text-4xl font-bold text-industrial-slate mb-6">
                  Built for Scale and Precision.
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Strategically located in the Dabaspet Industrial Area in Bangalore, our facility is optimized for seamless logistical access, sitting just 58 km from the airport and 350 km from the nearest sea port.
                </p>
                <p className="text-slate-600 leading-relaxed mb-8">
                  The campus features a dedicated 35,000 sq. ft. shop floor, operated by 60 skilled employees. We maintain distinct, specialized operational zones for vertical machining, turning, grinding, and CMM inspection.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-industrial-slate font-medium">
                    <svg className="w-5 h-5 text-concentra-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    Land Area: 86,000 sq. ft.
                  </li>
                  <li className="flex items-center gap-3 text-industrial-slate font-medium">
                    <svg className="w-5 h-5 text-concentra-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    Shop Floor Area: 35,000 sq. ft.
                  </li>
                  <li className="flex items-center gap-3 text-industrial-slate font-medium">
                    <svg className="w-5 h-5 text-concentra-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    Workforce: 60 skilled employees
                  </li>
                </ul>
              </div>
              <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
                <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop" alt="Factory layout and machinery" className="w-full h-full object-cover" />
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}