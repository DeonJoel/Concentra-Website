"use client";

// 1. Define the props interface
interface CtaBannerProps {
  heading: string;
  button1Text: string;
  button2Text: string;
}

// 2. Pass the props into the component
export default function CtaBanner({ heading, button1Text, button2Text }: CtaBannerProps) {
  return (
    <section className="w-full py-16 relative z-30 mb-10">
      <div className="w-full grid grid-cols-12 gap-[32px] px-6 lg:px-[80px]">
        <div className="col-span-12 lg:col-start-2 lg:col-span-10 bg-concentra-green rounded-[20px] shadow-xl p-8 py-12 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-10">
          
          <div className="w-full lg:w-3/5 text-center lg:text-left">
            {/* 3. Inject dynamic heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white drop-shadow-sm">
              {heading}
            </h2>
          </div>

          <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-end shrink-0">
            {/* 4. Inject dynamic button text */}
            <button className="bg-white text-concentra-green hover:bg-gray-100 font-bold py-4 px-8 md:py-3 md:px-8 rounded-xl transition duration-300 w-full sm:w-auto shadow-md text-lg md:text-base">
              {button1Text}
            </button>
            <button className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-bold py-4 px-8 md:py-3 md:px-8 rounded-xl transition duration-300 w-full sm:w-auto text-lg md:text-base">
              {button2Text}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}