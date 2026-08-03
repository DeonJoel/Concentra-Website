"use client";

import { useEffect, useState } from "react";

export default function OurExpertise() {
  const [cmsData, setCmsData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Automatically fetch from the backend on load
  useEffect(() => {
    async function fetchExpertiseData() {
      try {
        const response = await fetch("http://localhost:8000/api/content/home");
        if (!response.ok) throw new Error("Failed to fetch CMS data");
        
        const data = await response.json();
        
        // Filter ONLY the items designated for the 'our_expertise' section
        const expertiseData = data.filter((item: any) => item.section === "our_expertise");
        
        setCmsData(expertiseData);
      } catch (error) {
        console.error("Error fetching Expertise data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchExpertiseData();
  }, []);

  // Helper function to extract text/images safely from the CMS array
  const getValue = (key: string, fallback: string) => {
    const block = cmsData.find(c => c.content_key === key);
    return block?.content_value || fallback;
  };

  // 1. Get Top Headings
  const heading = getValue("expertise_heading", "Our Expertise");
  const subHeading = getValue("expertise_subheading", "Precision Manufacturing & Re-manufacturing");

  // 2. Helper function to extract specific card data from the CMS array
  const getCardData = (num: number) => {
    const defaultTitles = ["Spindle Remanufacturing", "Component Manufacturing", "HSK Tool Clamping Sets"];
    
    return {
      id: num,
      title: getValue(`card_${num}_title`, defaultTitles[num - 1]),
      description: getValue(`card_${num}_desc`, "Placeholder description coming from CMS. Add a text block for this card."),
      image: getValue(`card_${num}_image`, "")
    };
  };

  // Generate the 3 cards using our helper
  const cards = [getCardData(1), getCardData(2), getCardData(3)];

  return (
    <section className="w-full py-16 relative z-30">
      
      {/* MASTER GRID: 12-Column Alignment */}
      <div className="w-full grid grid-cols-12 gap-[32px] px-6 lg:px-[80px]">
        
        {/* HEADER: Starts at Column 2, spans 10 columns */}
        <div className="col-span-12 lg:col-start-2 lg:col-span-10 text-center mb-12">
          <h2 className="text-concentra-purple font-bold tracking-widest text-sm md:text-base uppercase mb-2 drop-shadow-sm">
            {heading}
          </h2>
          <p className="text-industrial-slate font-bold text-xl md:text-2xl">
            {subHeading}
          </p>
        </div>

        {/* CARDS CONTAINER */}
        <div className="col-span-12 lg:col-start-2 lg:col-span-10">
          
          {/* INNER GRID: 1 column on mobile, 3 columns on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[32px]">
            
            {/* Map through our dynamically generated cards */}
            {cards.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-[15px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 flex flex-col p-8 transition-transform duration-300 hover:-translate-y-2 cursor-pointer h-[400px] md:h-[500px]"
              >
                <h3 className="text-industrial-slate font-bold text-center text-lg mb-4">
                  {item.title}
                </h3>
                
                {/* 2-3 Line Description Area */}
                <p className="text-sm text-gray-600 text-center mb-6 line-clamp-3 leading-relaxed min-h-[60px]">
                  {item.description}
                </p>
                
                {/* Dynamic Image Area */}
                <div className="flex-grow w-full rounded-lg overflow-hidden flex items-center justify-center bg-gray-50/50 border border-gray-100 relative">
                  {item.image ? (
                    <img 
                      src={item.image.startsWith('http') ? item.image : `http://localhost:8000/${item.image}`} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-xs text-center px-4">
                      [ Image Placeholder ]<br/><br/>
                      Add an image block in the CMS with key:<br/> 
                      <span className="font-bold text-concentra-purple">card_{item.id}_image</span>
                    </span>
                  )}
                </div>

              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}