"use client";

// 🚀 CMS PREPARATION: 
// This array mimics how your Supabase database will send data to the frontend.
// Later, you can add 'imageUrl' or 'link' properties to this array without changing the UI layout!
const mockExpertiseData = [
  { 
    id: 1, 
    title: "Spindle Remanufacturing", 
    description: "Placeholder for description or image coming from CMS." 
  },
  { 
    id: 2, 
    title: "Component Manufacturing", 
    description: "Placeholder for description or image coming from CMS." 
  },
  { 
    id: 3, 
    title: "HSK Tool Clamping Sets", 
    description: "Placeholder for description or image coming from CMS." 
  },
];

export default function OurExpertise() {
  return (
    <section className="w-full py-16 relative z-30">
      
      {/* MASTER GRID: 12-Column Alignment matching your Figma 80px margin / 32px gap */}
      <div className="w-full grid grid-cols-12 gap-[32px] px-6 lg:px-[80px]">
        
        {/* HEADER: Starts at Column 2, spans 10 columns */}
        <div className="col-span-12 lg:col-start-2 lg:col-span-10 text-center mb-12">
          <h2 className="text-concentra-purple font-bold tracking-widest text-sm md:text-base uppercase mb-2 drop-shadow-sm">
            Our Expertise
          </h2>
          <p className="text-industrial-slate font-bold text-xl md:text-2xl">
            Precision Manufacturing & Re-manufacturing
          </p>
        </div>

        {/* CARDS CONTAINER: Also bounded within the 10-column safe zone */}
        <div className="col-span-12 lg:col-start-2 lg:col-span-10">
          
          {/* INNER GRID: 1 column on mobile, 3 columns on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[32px]">
            
            {/* Map through the mock CMS data to generate the cards dynamically */}
            {mockExpertiseData.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-[15px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 flex flex-col p-8 transition-transform duration-300 hover:-translate-y-2 cursor-pointer h-[400px] md:h-[500px]"
              >
                <h3 className="text-industrial-slate font-bold text-center text-lg mb-6">
                  {item.title}
                </h3>
                
                {/* Placeholder area for where your images/icons/lists will go */}
                <div className="flex-grow flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg bg-gray-50/50">
                  <span className="text-gray-400 text-sm text-center px-4">
                    {item.description}
                  </span>
                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}