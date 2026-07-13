import Link from "next/link";

export default function Footer() {
  // OUTER WRAPPER: Full width, dark background, rounded top
  return (
    <footer className="w-full bg-industrial-slate rounded-t-[30px] text-white pt-16 pb-6 mt-10 relative z-30">
      
      {/* INNER GRID: Locks content to your 12 columns & safe margins */}
      <div className="w-full grid grid-cols-12 gap-[32px] px-6 lg:px-[80px]">
        
        <div className="col-span-12">
          
          {/* Main Links Container with a bottom border to separate the copyright */}
          <div className="flex flex-col lg:flex-row lg:justify-between gap-10 lg:gap-8 border-b border-white/10 pb-12">
            
            {/* COLUMN 1: Brand & Contact Info */}
            <div className="w-full lg:w-1/3 flex flex-col pr-0 lg:pr-6 border-b lg:border-b-0 border-white/20 pb-8 lg:pb-0">
              <Link href="/" className="flex items-center gap-2 mb-6 hover:opacity-80 transition duration-300 w-fit">
                <svg width="40" height="40" viewBox="0 0 100 100" className="w-10 h-10">
                  <circle cx="40" cy="50" r="30" fill="var(--color-concentra-purple)" />
                  <circle cx="60" cy="50" r="30" fill="var(--color-concentra-green)" opacity="0.8" />
                </svg>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-concentra-purple leading-tight drop-shadow-sm">
                    Concentra
                  </span>
                  <span className="text-[10px] font-semibold text-concentra-green uppercase tracking-wider">
                    Precision Technologies
                  </span>
                </div>
              </Link>

              <h4 className="font-bold text-sm tracking-wide mb-2 uppercase">
                Concentra Precision Technologies Pvt. Ltd.
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed mb-4 max-w-[300px]">
                Plot No. 367-B, Road No.4, Sompura 1st Stage, KIADB Industrial Area, Nidavanda Post, Dabaspet, Bangalore - 562132
              </p>
              <p className="text-xs text-gray-300">
                <span className="font-semibold text-white">Ph:</span> 080-29913853
              </p>
            </div>

            {/* COLUMN 2: Services */}
            <div className="w-full lg:w-1/5 flex flex-col lg:border-l border-white/20 lg:pl-8 border-b lg:border-b-0 pb-8 lg:pb-0">
              <h4 className="font-bold text-sm mb-4 border-b border-white/40 pb-1 w-fit">Services</h4>
              <ul className="flex flex-col gap-3 text-xs text-gray-300 font-medium">
                <li><Link href="/" className="hover:text-concentra-green transition">Spindle Remanufacturing</Link></li>
                <li><Link href="/" className="hover:text-concentra-green transition">Component Manufacturing</Link></li>
                <li><Link href="/" className="hover:text-concentra-green transition">HSK Tool Clamping</Link></li>
              </ul>
            </div>

            {/* COLUMN 3: Company */}
            <div className="w-full lg:w-1/5 flex flex-col lg:border-l border-white/20 lg:pl-8 border-b lg:border-b-0 pb-8 lg:pb-0">
              <h4 className="font-bold text-sm mb-4 border-b border-white/40 pb-1 w-fit">Company</h4>
              <ul className="flex flex-col gap-3 text-xs text-gray-300 font-medium">
                <li><Link href="/" className="hover:text-concentra-green transition">About Us</Link></li>
                <li><Link href="/" className="hover:text-concentra-green transition">Our Facility</Link></li>
                <li><Link href="/" className="hover:text-concentra-green transition">Quality Standards</Link></li>
              </ul>
            </div>

            {/* COLUMN 4: Action */}
            <div className="w-full lg:w-1/5 flex flex-col lg:border-l border-white/20 lg:pl-8">
              <h4 className="font-bold text-sm mb-4 border-b border-white/40 pb-1 w-fit">Action</h4>
              <ul className="flex flex-col gap-3 text-xs text-gray-300 font-medium">
                <li><Link href="/" className="hover:text-concentra-green transition">Request a Quote</Link></li>
                <li><Link href="/" className="hover:text-concentra-green transition">Contact Engineering</Link></li>
                <li><Link href="/" className="hover:text-concentra-green transition">Privacy Policy</Link></li>
              </ul>
            </div>

          </div>

          {/* COPYRIGHT SECTION */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400">
            <p>&copy; {new Date().getFullYear()} Concentra Precision Technologies Pvt. Ltd. All rights reserved.</p>
            <p className="mt-2 sm:mt-0 hover:text-white transition cursor-pointer">
              Terms & Conditions
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}