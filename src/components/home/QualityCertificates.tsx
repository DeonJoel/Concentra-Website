"use client";

// 1. Define the props interface for the CMS data
interface QualityCertificatesProps {
  heading?: string;
  subHeading?: string;
  buttonText?: string;
  mainImage?: string;
  certificates?: any[]; // The array of certificate logos/text
}

export default function QualityCertificates({
  heading = "Uncompromising Quality",
  subHeading = "Engineered for Exacting Standards",
  buttonText = "View Manufacturing Facility",
  mainImage = "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?q=80&w=2070&auto=format&fit=crop", // Default fallback image
  certificates = []
}: QualityCertificatesProps) {
  
  // 2. Safety fallback just in case the CMS is empty
  const displayCertificates = certificates && certificates.length > 0 ? certificates : [
    { id: 'mock1', content_type: 'text', content_value: "UKAS Management" },
    { id: 'mock2', content_type: 'text', content_value: "ANAB Accredited" },
    { id: 'mock3', content_type: 'text', content_value: "Perry Johnson" },
  ];

  // Helper to format the image URL for the main background
  const getBgImageUrl = (url: string) => {
    if (!url) return '';
    return url.startsWith('http') ? url : `http://localhost:8000/${url}`;
  };

  return (
    <section className="w-full py-16 relative z-30">
      
      {/* 12-Column Grid Alignment */}
      <div className="w-full grid grid-cols-12 gap-[32px] px-6 lg:px-[80px]">
        
        {/* The White Card: Spans Column 2 to 11 */}
        <div className="col-span-12 lg:col-start-2 lg:col-span-10 bg-white rounded-[15px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 overflow-hidden flex flex-col lg:flex-row">
          
          {/* LEFT HALF: Dynamic Main Image */}
          <div 
            className="w-full lg:w-1/2 min-h-[300px] lg:min-h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${getBgImageUrl(mainImage)}')` }}
          ></div>

          {/* RIGHT HALF: Content & Dynamic Certificates */}
          <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center items-center lg:items-center text-center">
            
            <h2 className="text-concentra-purple font-bold tracking-widest text-sm md:text-base uppercase mb-4 drop-shadow-sm">
              {heading}
            </h2>
            
            <h3 className="text-industrial-slate font-bold text-4xl md:text-5xl leading-tight mb-10">
              {subHeading}
            </h3>

            {/* DYNAMIC CERTIFICATES ROW */}
            <div className="flex flex-wrap justify-center items-center gap-6 mb-10">
              {displayCertificates.map((cert) => (
                <div 
                  key={cert.id} 
                  className="w-20 h-24 md:w-24 md:h-28 bg-gray-50 border border-gray-200 rounded flex flex-col items-center justify-center p-2 shadow-sm transition hover:shadow-md overflow-hidden"
                >
                  {/* DYNAMIC RENDER: Image vs Text */}
                  {cert.content_type === "image" ? (
                    <img 
                      src={cert.content_value.startsWith('http') ? cert.content_value : `http://localhost:8000/${cert.content_value}`} 
                      alt="Certificate Logo" 
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="text-[10px] text-gray-400 font-medium text-center leading-tight break-words">
                      {cert.content_value} <br /> Logo
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Dynamic Button Text */}
            <button className="bg-transparent hover:bg-concentra-green border-2 border-concentra-green text-concentra-green hover:text-white font-semibold py-3 px-8 rounded transition duration-300 shadow-sm">
              {buttonText}
            </button>
            
          </div>

        </div>
      </div>
    </section>
  );
}