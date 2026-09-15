"use client";

import { useState, useEffect } from "react";
import { Loader2, Download, Zap, BrainCircuit, Factory, FileText, Building, Mail, Layers, Cpu } from "lucide-react";

export default function AIAnalyticsPage() {
  const [rfqs, setRfqs] = useState<any[]>([]);
  const [selectedRfq, setSelectedRfq] = useState<any | null>(null);
  
  // AI States
  const [aiData, setAiData] = useState<any | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGeneratingQA, setIsGeneratingQA] = useState(false);

  // 1. Fetch the list of AI Enquiries on load
  useEffect(() => {
    const fetchAiQueue = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/ai-queue`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setRfqs(data); 
        }
      } catch (error) {
        console.error("Failed to fetch AI Queue", error);
      }
    };
    fetchAiQueue();
  }, []);

  // Reset AI data when a new RFQ is selected
  const handleSelectRfq = async (rfq: any) => {
        setSelectedRfq(rfq);
        setAiData(null); // Clear previous data while loading

        // Check the new ai_analyses table in the database
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/ai-queue/${rfq.id}/analysis`, {
                credentials: "include",
            });
            if (response.ok) {
                const result = await response.json();
                if (result.exists) {
                    setAiData(result.data); // Load the existing AI data instantly!
                }
            }
        } catch (error) {
            console.error("Failed to check existing analysis", error);
        }
    };

  // 2. Trigger or Fetch AI Routing Analysis
  const handleAnalyze = async () => {
    if (!selectedRfq) return;
    setIsAnalyzing(true);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/ai-queue/${selectedRfq.id}/analyze`, {
        method: "POST",
        credentials: "include",
      });
      
      const result = await response.json();
      if (response.ok) {
        setAiData(result.data?.routing || result.data);
      } else {
        alert(`Analysis failed: ${result.detail}`);
      }
    } catch (error) {
      console.error("Error analyzing RFQ:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // 3. Trigger QA Excel Generation
  const handleGenerateQA = async () => {
    if (!selectedRfq) return;
    setIsGeneratingQA(true);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/ai-queue/${selectedRfq.id}/quality-sheet`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to generate QA Sheet");

      // Handle the file download directly in the browser
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `QA_Inspection_${selectedRfq.part_name?.replace(/ /g, "_") || "Part"}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      alert("Error generating QA Sheet. Check console.");
      console.error(error);
    } finally {
      setIsGeneratingQA(false);
    }
  };

  return (
    <div className="flex h-full gap-6">
      
      {/* LEFT PANE: RFQ List */}
      <div className="w-1/3 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50">
          <h2 className="font-bold text-slate-800 flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-concentra-purple" />
            AI Processing Queue
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {rfqs.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-8">No AI Enquiries available.</p>
          ) : (
            rfqs.map((rfq) => (
              <button
                key={rfq.id}
                onClick={() => handleSelectRfq(rfq)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  selectedRfq?.id === rfq.id
                    ? "border-concentra-purple bg-concentra-purple/5 ring-1 ring-concentra-purple/20"
                    : "border-slate-100 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold text-slate-800 truncate">{rfq.part_name || "Unknown Part"}</span>
                  <span className="text-xs text-slate-400">#{rfq.id}</span>
                </div>
                <div className="text-xs text-slate-500 truncate flex items-center gap-1">
                  <Building className="w-3 h-3"/> {rfq.company_name}
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* RIGHT PANE: AI Analytics Workspace */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
        {!selectedRfq ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 bg-slate-50/50">
            <Factory className="w-16 h-16 mb-4 opacity-20" />
            <p>Select an enquiry from the queue to review AI Analytics</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Header with New Data Fields */}
            <div className="flex justify-between items-start border-b border-slate-100 pb-5">
              <div>
                <h2 className="text-2xl font-black text-slate-800 mb-2">{selectedRfq.part_name || "Unknown Part"}</h2>
                <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                  <span className="flex items-center gap-1.5"><Building className="w-4 h-4 text-slate-400"/> {selectedRfq.company_name}</span>
                  <span className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-slate-400"/> <a href={`mailto:${selectedRfq.email}`} className="text-blue-600 hover:underline">{selectedRfq.email}</a></span>
                  <span className="flex items-center gap-1.5"><Layers className="w-4 h-4 text-slate-400"/> {selectedRfq.quantity} units</span>
                </div>
              </div>
            </div>

            {/* Split View: Blueprint & Actions */}
            <div className="grid grid-cols-2 gap-6">
              
              {/* Left Column: The Blueprint */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Source Blueprint
                </h3>
                <div className="bg-slate-100 rounded-lg border border-slate-200 h-[550px] overflow-hidden flex items-center justify-center shadow-inner">
                  <iframe
                    src={`${process.env.NEXT_PUBLIC_API_URL}/api/admin/ai-queue/${selectedRfq.id}/file`}
                    className="w-full h-full"
                    title="Blueprint Viewer"
                  />
                </div>
              </div>

              {/* Right Column: AI Analysis & Generation */}
              <div className="space-y-6">
                
                {/* 1. Manufacturing Routing Card */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
                    <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-blue-600"/> Routing Extraction
                    </h3>
                  </div>
                  
                  <div className="p-5">
                    {!aiData ? (
                      <div className="text-center py-6 space-y-4">
                        <p className="text-sm text-slate-500">Routing data has not been extracted yet.</p>
                        <button
                          onClick={handleAnalyze}
                          disabled={isAnalyzing}
                          className="px-6 py-2.5 bg-slate-800 text-white rounded-lg text-sm font-bold hover:bg-slate-700 transition disabled:opacity-50 flex items-center justify-center gap-2 mx-auto"
                        >
                          {isAnalyzing ? <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing...</> : "Run AI Routing Analysis"}
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {aiData.manufacturing_processes?.map((step: any, idx: number) => (
                          <div key={idx} className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm border-b border-slate-50 pb-3 last:border-0 last:pb-0 gap-2">
                            <div>
                              <span className="font-bold text-slate-800 mr-2">Step {step.step}:</span>
                              <span className="font-medium text-slate-700">{step.process}</span>
                              {step.machine_required && (
                                <p className="text-xs text-slate-500 mt-1">Machine: {step.machine_required}</p>
                              )}
                            </div>
                            <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded w-fit ${
                              step.status === 'In-house' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                            }`}>
                              {step.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. Isolated Quality Control Card */}
                <div className="bg-purple-50 rounded-xl border border-purple-100 p-6 text-center space-y-4 shadow-sm">
                  <div>
                    <h3 className="text-lg font-black text-concentra-purple mb-1">Quality Inspection</h3>
                    <p className="text-xs text-slate-600">Deep-scan blueprint to extract tolerances and generate an Excel FAI sheet.</p>
                  </div>
                  
                  <button
                    onClick={handleGenerateQA}
                    disabled={isGeneratingQA}
                    className="w-full flex items-center justify-center gap-2 bg-concentra-purple text-white py-3.5 rounded-lg font-bold shadow-md hover:bg-purple-900 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isGeneratingQA ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Extracting Balloon Data...</>
                    ) : (
                      <><Download className="w-5 h-5" /> Generate Excel Sheet</>
                    )}
                  </button>
                </div>

              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}