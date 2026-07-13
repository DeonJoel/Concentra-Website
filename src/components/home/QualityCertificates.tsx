"use client";

// 🚀 CMS PREPARATION: 
// This array handles your certificates dynamically. 
// When you add or remove certificates in Supabase, this array will grow/shrink, 
// and the UI will automatically wrap and adjust them without breaking.
const mockCertificates = [
  { id: 1, name: "UKAS Management", logoUrl: "" },
  { id: 2, name: "ANAB Accredited", logoUrl: "" },
  { id: 3, name: "Perry Johnson", logoUrl: "" },
];

export default function QualitySection() {
  return (
    <section className="w-full py-16 relative z-30">
      
      {/* 12-Column Grid Alignment */}
      <div className="w-full grid grid-cols-12 gap-[32px] px-6 lg:px-[80px]">
        
        {/* The White Card: Spans Column 2 to 11 */}
        <div className="col-span-12 lg:col-start-2 lg:col-span-10 bg-white rounded-[15px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 overflow-hidden flex flex-col lg:flex-row">
          
          {/* LEFT HALF: The Zeiss Machine Image */}
          <div 
            className="w-full lg:w-1/2 min-h-[300px] lg:min-h-full bg-cover bg-center"
            // Replace with your actual Zeiss machine image from the public folder
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?q=80&w=2070&auto=format&fit=crop')" }}
          ></div>

          {/* RIGHT HALF: Content & Dynamic Certificates */}
          <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center items-center lg:items-center text-center">
            
            <h2 className="text-concentra-purple font-bold tracking-widest text-sm md:text-base uppercase mb-4 drop-shadow-sm">
              Uncompromising Quality
            </h2>
            
            <h3 className="text-industrial-slate font-bold text-4xl md:text-5xl leading-tight mb-10">
              Engineered for Exacting Standards
            </h3>

            {/* DYNAMIC CERTIFICATES ROW */}
            {/* flex-wrap ensures that whether there is 1 certificate or 10, they flow perfectly */}
            <div className="flex flex-wrap justify-center items-center gap-6 mb-10">
              {mockCertificates.map((cert) => (
                <div 
                  key={cert.id} 
                  className="w-20 h-24 md:w-24 md:h-28 bg-gray-50 border border-gray-200 rounded flex flex-col items-center justify-center p-2 shadow-sm transition hover:shadow-md"
                >
                  {/* Placeholder for the actual logo image */}
                  <div className="text-[10px] text-gray-400 font-medium text-center leading-tight">
                    {cert.name} <br /> Logo
                  </div>
                </div>
              ))}
            </div>

            {/* Green Outline Button matching your Figma design */}
            <button className="bg-transparent hover:bg-concentra-green border-2 border-concentra-green text-concentra-green hover:text-white font-semibold py-3 px-8 rounded transition duration-300 shadow-sm">
              View Manufacturing Facility
            </button>
            
          </div>

        </div>
      </div>
    </section>
  );
}