"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface Job {
  id: string;
  title: string;
  department: string;
  type: string;
  location: string;
  experience: string;
  description: string;
}

export default function CareersPage() {
  const [openPositions, setOpenPositions] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);
  const formRef = useRef<HTMLDivElement>(null);

  // 1. Fetch Jobs from Backend on Component Load
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/jobs");
        if (res.ok) {
          const data = await res.json();
          setOpenPositions(data);
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setIsLoadingJobs(false);
      }
    };
    fetchJobs();
  }, []);

  const handleApplyClick = (jobTitle: string) => {
    setSelectedJob(jobTitle);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  // 2. Submit Application to Backend
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("http://localhost:8000/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applied_position: data.appliedPosition,
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone,
          portfolio_url: data.portfolioUrl,
          resume_url: data.resumeUrl,
          cover_letter: data.coverLetter,
        }),
      });

      if (response.ok) {
        alert(`Application submitted successfully for: ${data.appliedPosition}!`);
        (e.target as HTMLFormElement).reset();
        setSelectedJob(null);
      } else {
        alert("There was an issue submitting your application. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error connecting to the server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-slate-50/50">
      
      {/* HERO SECTION */}
      <section className="relative w-full h-[60vh] min-h-[500px]">
        <div 
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=2070&auto=format&fit=crop')" }}
        ></div>
        <div 
          className="absolute top-0 left-0 w-full lg:w-10/12 h-full z-10 bg-white/90 lg:bg-transparent"
          style={{ backgroundImage: "linear-gradient(to right, #FFFFFF 0%, rgba(255,255,255,0.9) 58%, rgba(255,255,255,0) 80%)" }}
        ></div>

        <div className="relative z-20 w-full grid grid-cols-12 gap-[32px] px-6 lg:px-[80px] h-full">
          <div className="col-span-12 lg:col-start-2 lg:col-span-6 flex flex-col justify-center h-full pt-10">
            <p className="text-concentra-purple text-sm md:text-base font-semibold tracking-widest uppercase mb-2 drop-shadow-sm">
              Careers at Concentra
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-industrial-slate">
              Build the Future of Precision Engineering.
            </h1>
            <p className="text-base md:text-lg mb-8 text-industrial-slate/80 font-medium leading-relaxed">
              Join a team of highly experienced and motivated engineers and machinists. We are always looking for passionate talent to drive innovation on our shop floor.
            </p>
          </div>
        </div>
      </section>

      {/* WHY JOIN US */}
      <section className="w-full py-20 bg-white border-b border-slate-100">
        <div className="w-full grid grid-cols-12 gap-[32px] px-6 lg:px-[80px]">
          <div className="col-span-12 lg:col-start-2 lg:col-span-10">
            <div className="text-center mb-12">
              <p className="text-concentra-purple font-semibold tracking-widest uppercase mb-2">Life at Concentra</p>
              <h2 className="text-3xl font-bold text-industrial-slate">Why Build Your Career With Us?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
                <div className="w-12 h-12 bg-[#F8EBFF] rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-concentra-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-industrial-slate mb-3">State-of-the-Art Tech</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Work with world-class machinery, from Twin Pallet VMCs to advanced ZEISS CMMs, keeping your skills at the cutting edge of the industry.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
                <div className="w-12 h-12 bg-[#e6f4ea] rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-concentra-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-industrial-slate mb-3">Collaborative Team</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Join a tight-knit workforce of 60 skilled professionals who value knowledge-sharing, continuous improvement, and mutual support.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
                <div className="w-12 h-12 bg-[#F8EBFF] rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-concentra-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                </div>
                <h3 className="text-xl font-bold text-industrial-slate mb-3">Career Growth</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  We actively promote from within and provide extensive cross-training across various machining, programming, and design disciplines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OPEN POSITIONS (Fetched from Backend) */}
      <section className="w-full py-20 lg:py-24">
        <div className="w-full grid grid-cols-12 gap-[32px] px-6 lg:px-[80px]">
          <div className="col-span-12 lg:col-start-2 lg:col-span-10">
            
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold text-industrial-slate">Open Positions</h2>
                <p className="text-slate-600 mt-2">Find your fit in our 86,000 sq. ft. Bangalore facility.</p>
              </div>
              <div className="text-sm font-semibold text-concentra-green bg-[#e6f4ea] px-4 py-2 rounded-lg w-fit">
                {openPositions.length} Roles Available
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {isLoadingJobs ? (
                <div className="text-center py-10 text-slate-500 animate-pulse">Loading positions...</div>
              ) : openPositions.length === 0 ? (
                <div className="text-center py-10 text-slate-500 bg-white rounded-2xl border border-slate-100">No positions are currently open. Please check back later!</div>
              ) : (
                openPositions.map((job) => (
                  <div key={job.id} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-concentra-purple bg-[#F8EBFF] px-3 py-1 rounded-md">
                          {job.department}
                        </span>
                        <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                          {job.location}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-industrial-slate mb-2 group-hover:text-concentra-purple transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
                        {job.description}
                      </p>
                      <div className="mt-4 flex gap-4 text-sm text-slate-500 font-medium">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-concentra-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          {job.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-concentra-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                          {job.experience}
                        </span>
                      </div>
                    </div>
                    
                    <div className="shrink-0">
                      <button 
                        onClick={() => handleApplyClick(job.title)}
                        className="w-full md:w-auto bg-transparent hover:bg-concentra-green border-2 border-concentra-green text-concentra-green hover:text-white font-bold py-3 px-8 rounded-xl transition duration-300"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      </section>

      {/* DYNAMIC APPLICATION FORM */}
      <section ref={formRef} className="w-full pb-24 lg:pb-32 scroll-mt-24">
        <div className="w-full grid grid-cols-12 gap-[32px] px-6 lg:px-[80px]">
          <div className="col-span-12 lg:col-start-3 lg:col-span-8">
            
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100">
              <div className="mb-8 border-b border-slate-100 pb-8">
                <h2 className="text-3xl font-bold text-industrial-slate mb-2">Submit Your Application</h2>
                {selectedJob ? (
                  <p className="text-slate-600">
                    Applying for: <span className="font-bold text-concentra-purple">{selectedJob}</span>
                    <button 
                      type="button" 
                      onClick={() => setSelectedJob(null)}
                      className="ml-4 text-xs text-slate-400 underline hover:text-red-500"
                    >
                      Clear Selection
                    </button>
                  </p>
                ) : (
                  <p className="text-slate-600">Don't see a perfect fit? Submit a general application and we'll keep you in mind!</p>
                )}
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <input type="hidden" name="appliedPosition" value={selectedJob || "General Application"} />

                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-semibold text-industrial-slate">First Name *</label>
                  <input required name="firstName" type="text" placeholder="John" className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-concentra-purple/50 focus:border-concentra-purple transition-colors" />
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-semibold text-industrial-slate">Last Name *</label>
                  <input required name="lastName" type="text" placeholder="Doe" className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-concentra-purple/50 focus:border-concentra-purple transition-colors" />
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-semibold text-industrial-slate">Email Address *</label>
                  <input required name="email" type="email" placeholder="john@example.com" className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-concentra-purple/50 focus:border-concentra-purple transition-colors" />
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-semibold text-industrial-slate">Phone Number *</label>
                  <input required name="phone" type="tel" placeholder="+91 98765 43210" className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-concentra-purple/50 focus:border-concentra-purple transition-colors" />
                </div>

                <div className="flex flex-col space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-industrial-slate">Portfolio / LinkedIn URL</label>
                  <input name="portfolioUrl" type="url" placeholder="https://linkedin.com/in/johndoe" className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-concentra-purple/50 focus:border-concentra-purple transition-colors" />
                </div>

                <div className="flex flex-col space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-industrial-slate">Upload Resume (Drive/Dropbox Link) *</label>
                  <input required name="resumeUrl" type="url" placeholder="Paste link to your CV here" className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-concentra-purple/50 focus:border-concentra-purple transition-colors" />
                  <span className="text-xs text-slate-500">Please ensure link sharing permissions are set to "Anyone with the link".</span>
                </div>

                <div className="flex flex-col space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-industrial-slate">Cover Letter / Note</label>
                  <textarea name="coverLetter" rows={4} placeholder="Tell us why you'd be a great fit for Concentra..." className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-concentra-purple/50 focus:border-concentra-purple transition-colors resize-none"></textarea>
                </div>

                <div className="md:col-span-2 mt-4">
                  <button disabled={isSubmitting} type="submit" className="w-full bg-concentra-purple hover:bg-purple-900 text-white font-bold py-4 rounded-xl transition duration-300 shadow-md flex items-center justify-center gap-2">
                    {isSubmitting ? "Submitting Application..." : "Submit Application"}
                  </button>
                </div>

              </form>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}