"use client";

// 1. Define the props interface for the CMS data
interface OurExpertiseProps {
  heading?: string;
  subHeading?: string;
  contentBlocks?: any[]; // We will pass the whole array of expertise blocks here
}

export default function OurExpertise({ 
  heading = "Our Expertise", 
  subHeading = "Precision Manufacturing & Re-manufacturing", 
  contentBlocks = [] 
}: OurExpertiseProps) {

  // 2. Helper function to extract specific card data from the CMS array
  const getCardData = (num: number) => {
    const titleBlock = contentBlocks.find(c => c.content_key === `card_${num}_title`);
    const descBlock = contentBlocks.find(c => c.content_key === `card_${num}_desc`);
    const imgBlock = contentBlocks.find(c => c.content_key === `card_${num}_image`);
    
    // Default fallback text if the CMS blocks haven't been created yet
    const defaultTitles = ["Spindle Remanufacturing", "Component Manufacturing", "HSK Tool Clamping Sets"];
    
    return {
      id: num,
      title: titleBlock?.content_value || defaultTitles[num - 1],
      description: descBlock?.content_value || "Placeholder description coming from CMS. Add a text block for this card.",
      image: imgBlock?.content_value || null
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