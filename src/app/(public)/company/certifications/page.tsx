import React from "react";
import Link from "next/link";

export default function CertificationsPage() {
  return (
    <main className="min-h-screen w-full bg-transparent">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[65vh] min-h-[500px]">
        <div 
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop')" }}
        ></div>
        <div 
          className="absolute top-0 left-0 w-full lg:w-10/12 h-full z-10 bg-white/90 lg:bg-transparent"
          style={{ backgroundImage: "linear-gradient(to right, #FFFFFF 0%, rgba(255,255,255,0.9) 58%, rgba(255,255,255,0) 80%)" }}
        ></div>

        <div className="relative z-20 w-full grid grid-cols-12 gap-[32px] px-6 lg:px-[80px] h-full pt-15">
          <div className="col-span-12 lg:col-start-2 lg:col-span-6 flex flex-col justify-center h-full pt-10">
            <p className="text-concentra-purple text-sm md:text-base font-semibold tracking-widest uppercase mb-2 drop-shadow-sm">
              Company / Certifications
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-industrial-slate">
              Globally Recognized Standards.
            </h1>
            <p className="text-base md:text-lg mb-8 text-industrial-slate/80 font-medium leading-relaxed">
              We operate under strict international management systems to guarantee reliability and customer satisfaction across all production cycles.
            </p>
            <div className="flex gap-4">
              <Link href="/contact-us">
                <button className="bg-concentra-green hover:bg-green-600 text-white font-semibold py-3 px-8 rounded transition duration-300 shadow-md text-sm">
                  Contact Quality Team
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
                  ISO 9001:2015 Certified.
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Concentra Precision Technologies Private Limited has been thoroughly audited and officially certified by TUV INDIA PVT. LTD. (TUV NORD GROUP).
                </p>
                <p className="text-slate-600 leading-relaxed mb-8">
                  This certification formally acknowledges that our management system operates in strict accordance with the requirements of ISO 9001:2015, specifically under the scope of "Manufacture and Supply of Precision Machined Components & Assemblies".
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-industrial-slate font-medium">
                    <svg className="w-5 h-5 text-concentra-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    Certified by TUV NORD (TUV INDIA PVT. LTD.)
                  </li>
                  <li className="flex items-center gap-3 text-industrial-slate font-medium">
                    <svg className="w-5 h-5 text-concentra-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    Certificate Registration No. QM 08 02081
                  </li>
                  <li className="flex items-center gap-3 text-industrial-slate font-medium">
                    <svg className="w-5 h-5 text-concentra-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    Scope: Manufacture of Precision Assemblies
                  </li>
                </ul>
              </div>
              <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl border border-slate-100 flex items-center justify-center bg-white p-8">
                {/* Generic placeholder to represent a certificate */}
                <div className="text-center">
                  <svg className="w-32 h-32 text-concentra-purple mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                  <h3 className="text-2xl font-bold text-industrial-slate">ISO 9001:2015</h3>
                  <p className="text-slate-500 mt-2">Quality Management System</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}