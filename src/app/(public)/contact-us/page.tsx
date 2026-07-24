"use client";

import React, { useState } from "react";
import { CheckCircle } from "lucide-react";

export default function ContactUsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMsg("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("http://localhost:8000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          company_name: data.companyName,
          phone: data.phone,
          message: data.message,
        }),
      });

      if (response.ok) {
        setSuccessMsg("Thank you! Your message has been sent to our team.");
        (e.target as HTMLFormElement).reset();
      } else {
        alert("There was an issue sending your message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Error connecting to the server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-slate-50/50">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[50vh] min-h-[400px]">
        <div 
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=2071&auto=format&fit=crop')" }}
        ></div>
        
        <div 
          className="absolute top-0 left-0 w-full lg:w-10/12 h-full z-10 bg-white/90 lg:bg-transparent"
          style={{ backgroundImage: "linear-gradient(to right, #FFFFFF 0%, rgba(255,255,255,0.9) 58%, rgba(255,255,255,0) 80%)" }}
        ></div>

        <div className="relative z-20 w-full grid grid-cols-12 gap-[32px] px-6 lg:px-[80px] h-full">
          <div className="col-span-12 lg:col-start-2 lg:col-span-6 flex flex-col justify-center h-full pt-10">
            <p className="text-concentra-purple text-sm md:text-base font-semibold tracking-widest uppercase mb-2 drop-shadow-sm">
              Get in Touch
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-industrial-slate">
              Let's Discuss Your Manufacturing Needs.
            </h1>
            <p className="text-base md:text-lg text-industrial-slate/80 font-medium leading-relaxed">
              Our engineering experts are ready to provide custom machining solutions, rapid re-manufacturing, and reliable support for your production lines.
            </p>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTACT SECTION */}
      <section className="w-full py-20 lg:py-28">
        <div className="w-full grid grid-cols-12 gap-[32px] px-6 lg:px-[80px]">
          <div className="col-span-12 lg:col-start-2 lg:col-span-10">
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-12 lg:gap-16">
              
              {/* LEFT SIDE: Contact Information */}
              <div className="lg:col-span-4 flex flex-col space-y-10">
                <div>
                  <h2 className="text-3xl font-bold text-industrial-slate mb-4">Contact Information</h2>
                  <p className="text-slate-600 leading-relaxed">
                    Whether you need a quote for specialized components or want to visit our facility, our team is here to assist you.
                  </p>
                </div>

                <div className="space-y-8">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#F8EBFF] rounded-xl flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-concentra-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-industrial-slate mb-1">Headquarters & Facility</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        86,000 sq. ft. Facility<br/>
                        Peenya Industrial Area,<br/>
                        Bangalore, Karnataka, India
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#e6f4ea] rounded-xl flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-concentra-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-industrial-slate mb-1">Call Us</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        Sales: +91 98765 43210<br/>
                        Support: +91 98765 43211
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#F8EBFF] rounded-xl flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-concentra-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-industrial-slate mb-1">Email Us</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        sales@concentra.com<br/>
                        info@concentra.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE: Contact Form */}
              <div className="lg:col-span-6 bg-white p-8 lg:p-12 rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#e6f4ea] to-transparent opacity-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

                {successMsg && (
                  <div className="mb-8 p-4 bg-[#e6f4ea] text-concentra-green border border-green-200 rounded-xl font-bold flex items-center gap-3 animate-in fade-in">
                    <CheckCircle className="w-5 h-5" />
                    {successMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-semibold text-industrial-slate">First Name *</label>
                    <input required name="firstName" type="text" placeholder="John" className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-concentra-green/50 focus:border-concentra-green transition-colors" />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-semibold text-industrial-slate">Last Name *</label>
                    <input required name="lastName" type="text" placeholder="Doe" className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-concentra-green/50 focus:border-concentra-green transition-colors" />
                  </div>

                  <div className="flex flex-col space-y-2 md:col-span-2">
                    <label className="text-sm font-semibold text-industrial-slate">Email Address *</label>
                    <input required name="email" type="email" placeholder="john@company.com" className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-concentra-green/50 focus:border-concentra-green transition-colors" />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-semibold text-industrial-slate">Company Name</label>
                    <input name="companyName" type="text" placeholder="Your Company Ltd." className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-concentra-green/50 focus:border-concentra-green transition-colors" />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-semibold text-industrial-slate">Phone Number</label>
                    <input name="phone" type="tel" placeholder="+91 98765 43210" className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-concentra-green/50 focus:border-concentra-green transition-colors" />
                  </div>

                  <div className="flex flex-col space-y-2 md:col-span-2">
                    <label className="text-sm font-semibold text-industrial-slate">Message *</label>
                    <textarea required name="message" rows={5} placeholder="How can we help you?" className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-concentra-green/50 focus:border-concentra-green transition-colors resize-none"></textarea>
                  </div>

                  <div className="md:col-span-2 mt-2">
                    <button disabled={isSubmitting} type="submit" className="w-full bg-concentra-green hover:bg-green-600 text-white font-bold py-4 rounded-xl transition duration-300 shadow-md flex items-center justify-center gap-2">
                      {isSubmitting ? "Sending..." : "Send Message"}
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}