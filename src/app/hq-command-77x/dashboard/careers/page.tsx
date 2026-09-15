"use client";

import React, { useState, useEffect } from "react";
import { Briefcase, Users, PlusCircle, CheckCircle, Mail, Phone, FileText, Link as LinkIcon, Trash2, List } from "lucide-react";

interface Application {
  id: number;
  applied_position: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  portfolio_url?: string;
  resume_url: string;
  cover_letter?: string;
}

interface Job {
  id: number;
  title: string;
  department: string;
  type: string;
  location: string;
  experience: string;
}

export default function AdminCareersPage() {
  const [activeTab, setActiveTab] = useState<"applications" | "active" | "post">("applications");
  
  // States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [applications, setApplications] = useState<Application[]>([]);
  const [activeJobs, setActiveJobs] = useState<Job[]>([]);
  const [isLoadingApps, setIsLoadingApps] = useState(true);
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);

  // Fetch Data on load
  useEffect(() => {
    fetchApplications();
    fetchActiveJobs();
  }, []);

  const fetchApplications = async () => {
    setIsLoadingApps(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/applications`);
      if (res.ok) {
        const data = await res.json();
        setApplications(data);
      }
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    } finally {
      setIsLoadingApps(false);
    }
  };

  const fetchActiveJobs = async () => {
    setIsLoadingJobs(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`);
      if (res.ok) {
        const data = await res.json();
        setActiveJobs(data);
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setIsLoadingJobs(false);
    }
  };

  const handleJobSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMsg("");

    const formData = new FormData(e.currentTarget);
    const jobData = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      });

      if (response.ok) {
        setSuccessMsg("Job opening published successfully to the public website!");
        (e.target as HTMLFormElement).reset();
        fetchActiveJobs(); // Refresh the active jobs list
        setTimeout(() => setSuccessMsg(""), 5000);
      } else {
        alert("Failed to create job opening.");
      }
    } catch (error) {
      console.error("Error creating job:", error);
      alert("Error connecting to the backend.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteJob = async (id: number) => {
    if (!confirm("Are you sure you want to remove this job posting from the public website?")) return;
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setActiveJobs(activeJobs.filter(job => job.id !== id));
      } else {
        alert("Failed to delete the job posting.");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Error connecting to the backend.");
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto pb-12">
      
      {/* HEADER & TABS */}
      <div className="mb-8 flex flex-col xl:flex-row xl:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-industrial-slate tracking-tight">Careers Dashboard</h1>
          <p className="text-slate-500 mt-2 font-medium">Manage open positions and review incoming talent.</p>
        </div>

        <div className="flex flex-wrap bg-slate-100 p-1 rounded-xl w-fit border border-slate-200 shadow-inner gap-1">
          <button
            onClick={() => setActiveTab("applications")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 ${
              activeTab === "applications" 
                ? "bg-white text-concentra-purple shadow-sm" 
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Users className="w-4 h-4" />
            Applications
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activeTab === 'applications' ? 'bg-[#F8EBFF]' : 'bg-slate-200'}`}>
              {applications.length}
            </span>
          </button>
          
          <button
            onClick={() => setActiveTab("active")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 ${
              activeTab === "active" 
                ? "bg-white text-concentra-purple shadow-sm" 
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <List className="w-4 h-4" />
            Active Jobs
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activeTab === 'active' ? 'bg-[#F8EBFF]' : 'bg-slate-200'}`}>
              {activeJobs.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("post")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 ${
              activeTab === "post" 
                ? "bg-white text-concentra-purple shadow-sm" 
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            Post New Job
          </button>
        </div>
      </div>

      {/* ========================================= */}
      {/* VIEW APPLICATIONS TAB */}
      {/* ========================================= */}
      {activeTab === "applications" && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {isLoadingApps ? (
            <div className="w-full h-40 flex items-center justify-center bg-white rounded-3xl border border-slate-200">
              <span className="text-slate-400 font-medium animate-pulse">Loading candidates...</span>
            </div>
          ) : applications.length === 0 ? (
            <div className="w-full py-16 flex flex-col items-center justify-center bg-white rounded-3xl border border-dashed border-slate-300">
              <Users className="w-12 h-12 text-slate-300 mb-4" />
              <h3 className="text-lg font-bold text-slate-700">No applications yet</h3>
              <p className="text-slate-500 mt-1">When candidates apply on the website, they will appear here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {applications.map((app) => (
                <div key={app.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4 pb-4 border-b border-slate-100">
                    <div>
                      <h3 className="text-xl font-bold text-industrial-slate">
                        {app.first_name} {app.last_name}
                      </h3>
                      <p className="text-concentra-purple font-semibold text-sm mt-1 flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        Applied for: {app.applied_position}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <a href={`mailto:${app.email}`} className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-sm font-semibold transition border border-slate-200">
                        <Mail className="w-4 h-4" /> Email
                      </a>
                      <a href={app.resume_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-[#F8EBFF] hover:bg-purple-100 text-concentra-purple rounded-lg text-sm font-bold transition">
                        <FileText className="w-4 h-4" /> View Resume
                      </a>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                    <div className="flex items-center gap-3 text-slate-600">
                      <Phone className="w-4 h-4 text-slate-400" />
                      {app.phone}
                    </div>
                    {app.portfolio_url && (
                      <div className="flex items-center gap-3 text-slate-600">
                        <LinkIcon className="w-4 h-4 text-slate-400" />
                        <a href={app.portfolio_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate">
                          {app.portfolio_url}
                        </a>
                      </div>
                    )}
                    {app.cover_letter && (
                      <div className="md:col-span-2 mt-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Cover Letter / Note</p>
                        <p className="text-slate-700 whitespace-pre-wrap">{app.cover_letter}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================= */}
      {/* ACTIVE JOBS TAB */}
      {/* ========================================= */}
      {activeTab === "active" && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {isLoadingJobs ? (
            <div className="w-full h-40 flex items-center justify-center bg-white rounded-3xl border border-slate-200">
              <span className="text-slate-400 font-medium animate-pulse">Loading active jobs...</span>
            </div>
          ) : activeJobs.length === 0 ? (
            <div className="w-full py-16 flex flex-col items-center justify-center bg-white rounded-3xl border border-dashed border-slate-300">
              <Briefcase className="w-12 h-12 text-slate-300 mb-4" />
              <h3 className="text-lg font-bold text-slate-700">No active job postings</h3>
              <p className="text-slate-500 mt-1 mb-6">You currently have no open positions listed on the website.</p>
              <button onClick={() => setActiveTab("post")} className="px-6 py-2 bg-concentra-purple text-white font-bold rounded-lg hover:bg-purple-900 transition">
                Post a Job Now
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {activeJobs.map((job) => (
                <div key={job.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-concentra-purple transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-concentra-purple bg-[#F8EBFF] px-2 py-1 rounded">
                        {job.department}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        {job.location}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-industrial-slate">{job.title}</h3>
                    <div className="flex gap-4 mt-2 text-sm text-slate-500 font-medium">
                      <span>• {job.type}</span>
                      <span>• {job.experience}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleDeleteJob(job.id)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-bold transition border border-red-100 shrink-0"
                  >
                    <Trash2 className="w-4 h-4" /> Remove Posting
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================= */}
      {/* POST NEW JOB TAB */}
      {/* ========================================= */}
      {activeTab === "post" && (
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#F8EBFF] to-transparent opacity-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

          {successMsg && (
            <div className="mb-8 p-4 bg-[#e6f4ea] text-concentra-green border border-green-200 rounded-xl font-bold flex items-center gap-3">
              <CheckCircle className="w-5 h-5" />
              {successMsg}
            </div>
          )}

          <form onSubmit={handleJobSubmit} className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-bold text-industrial-slate">Job Title</label>
              <input required name="title" type="text" placeholder="e.g. Senior CNC Programmer" className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-concentra-purple/50 focus:border-concentra-purple transition-colors bg-slate-50 focus:bg-white" />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-bold text-industrial-slate">Department</label>
              <input required name="department" type="text" placeholder="e.g. Machining" className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-concentra-purple/50 focus:border-concentra-purple transition-colors bg-slate-50 focus:bg-white" />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-bold text-industrial-slate">Employment Type</label>
              <select required name="type" className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-concentra-purple/50 focus:border-concentra-purple transition-colors bg-slate-50 focus:bg-white appearance-none cursor-pointer">
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-bold text-industrial-slate">Location</label>
              <input required name="location" type="text" defaultValue="Bangalore, India" className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-concentra-purple/50 focus:border-concentra-purple transition-colors bg-slate-50 focus:bg-white" />
            </div>

            <div className="flex flex-col space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-industrial-slate">Experience Required</label>
              <input required name="experience" type="text" placeholder="e.g. 5+ Years" className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-concentra-purple/50 focus:border-concentra-purple transition-colors bg-slate-50 focus:bg-white" />
            </div>

            <div className="flex flex-col space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-industrial-slate">Job Description</label>
              <textarea required name="description" rows={5} placeholder="Describe the responsibilities and requirements..." className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-concentra-purple/50 focus:border-concentra-purple transition-colors bg-slate-50 focus:bg-white resize-none"></textarea>
            </div>

            <div className="md:col-span-2 mt-4 pt-6 border-t border-slate-100 flex justify-end">
              <button disabled={isSubmitting} type="submit" className="w-full md:w-auto bg-concentra-purple hover:bg-purple-900 text-white font-bold py-4 px-10 rounded-xl transition duration-300 shadow-lg shadow-purple-200 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <span className="animate-pulse">Publishing to Website...</span>
                ) : (
                  <>
                    <Briefcase className="w-5 h-5" /> Publish Job Opening
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}