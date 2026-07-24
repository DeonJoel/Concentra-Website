import React from "react";
import Link from "next/link";

const companyLinks = [
  { title: "About Us", href: "/company/about", description: "Established in 1995, over 25 years of manufacturing excellence in Bangalore." },
  { title: "Plant & Facilities", href: "/company/facilities", description: "86,000 sq. ft. facility with state-of-the-art shop floors and equipment." },
  { title: "Quality Assurance", href: "/company/quality", description: "Equipped with advanced Zeiss CMM and Mitutoyo testing instruments." },
  { title: "Certifications", href: "/company/certifications", description: "Proudly ISO 9001:2015 Certified by TUV NORD." },
];

export default function CompanyOverviewPage() {
  return (
    <main className="min-h-screen w-full bg-slate-50/50 py-20">
      <div className="w-full grid grid-cols-12 gap-[32px] px-6 lg:px-[80px]">
        <div className="col-span-12 lg:col-start-2 lg:col-span-10">
          
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-industrial-slate mb-4">
              Company Details
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
              Discover the heritage, infrastructure, and uncompromising quality standards that make Concentra a trusted partner in precision manufacturing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {companyLinks.map((item) => (
              <Link 
                key={item.title} 
                href={item.href}
                className="group block bg-white p-8 lg:p-10 rounded-3xl shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-xl hover:border-purple-200 hover:bg-[#F8EBFF]/30"
              >
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-concentra-purple mb-3 transition-colors group-hover:text-purple-900">
                      {item.title}
                    </h2>
                    <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center text-concentra-green font-semibold text-sm opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                    Explore 
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </main>
  );
}