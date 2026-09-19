"use client";

import Link from "next/link";

// 1. Define the props interface
interface CtaBannerProps {
  heading?: string;
  button1Text?: string;
  button1Link?: string;
  button2Text?: string;
  button2Link?: string;
}

// 2. Pass the props into the component with fallback values
export default function CtaBanner({ 
  heading = "Ready to elevate your manufacturing capabilities?", 
  button1Text = "Request a Quote", 
  button1Link = "/request-quote",
  button2Text = "Contact Us",
  button2Link = "/contact-us"
}: CtaBannerProps) {
  return (
    <section className="w-full py-16 relative z-30 mb-10">
      {/* MASTER CONTAINER: Center-Locked Max Width replacing the 12-col grid */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="col-span-12 lg:col-start-2 lg:col-span-10 bg-concentra-green rounded-[20px] shadow-xl p-8 py-12 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-10">
          
          <div className="w-full lg:w-3/5 text-center lg:text-left">
            {/* 3. Inject dynamic heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white drop-shadow-sm">
              {heading}
            </h2>
          </div>

          <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-end shrink-0">
            {/* 4. Inject dynamic button text and Next.js links */}
            <Link 
              href={button1Link}
              className="bg-white text-concentra-green hover:bg-gray-100 font-bold py-4 px-8 md:py-3 md:px-8 rounded-xl transition duration-300 w-full sm:w-auto shadow-md text-lg md:text-base flex items-center justify-center text-center"
            >
              {button1Text}
            </Link>
            
            <Link 
              href={button2Link}
              className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-bold py-4 px-8 md:py-3 md:px-8 rounded-xl transition duration-300 w-full sm:w-auto text-lg md:text-base flex items-center justify-center text-center"
            >
              {button2Text}
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}