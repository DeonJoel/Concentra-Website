"use client";

import { useState } from "react";
import { UploadCloud, CheckCircle, Settings, Cpu } from "lucide-react";

export default function EnquiryPortal() {
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [file, setFile] = useState<File | null>(null);
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  
  // State to highlight the box when a file is hovering over it
  const [isDragging, setIsDragging] = useState(false);

  // --- DRAG AND DROP HANDLERS ---
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); 
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]); 
    }
  };
  // ------------------------------

  const handleRealUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !companyName || !quantity || !file) return;

    setIsAnalyzing(true);
    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", email);
    formData.append("company_name", companyName);
    formData.append("quantity", quantity);

    try {
        // We will hit a new dedicated public endpoint for AI Enquiries
        const response = await fetch("http://localhost:8000/api/submit-ai-enquiry", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) throw new Error("Failed to analyze drawing");

        const data = await response.json();
        
        // This takes the JSON from Python and triggers the UI to flip to the Results screen
        setResult({
            partName: data.critical_data.part_name,
            material: data.critical_data.material,
            routing: data.manufacturing_processes
        });

    } catch (error) {
        console.error(error);
        alert("There was an error analyzing the drawing.");
    } finally {
        setIsAnalyzing(false);
    }
  };

  return (
    // UPDATED HERE: Changed py-12 to pt-32 pb-12 to clear the fixed navbar
    <div className="min-h-screen bg-slate-50 pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900">Instant Manufacturing Analysis</h1>
          <p className="mt-2 text-slate-600">Upload your drawing (PDF/PNG) for immediate feasibility routing.</p>
        </div>

        {!result ? (
          <form onSubmit={handleRealUpload} className="bg-white shadow-xl rounded-2xl p-8">
            
            {/* Form Inputs Grid */}
            <div className="mb-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Work Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="engineer@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Acme Corp"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Estimated Quantity</label>
                  <input
                    type="number"
                    required
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="500"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Drag & Drop Zone */}
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`mb-8 border-2 border-dashed rounded-xl p-10 text-center transition-colors
                ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:bg-slate-50'}`}
            >
              <UploadCloud className={`mx-auto h-12 w-12 mb-4 ${isDragging ? 'text-blue-500' : 'text-slate-400'}`} />
              <div className="text-sm text-slate-600">
                <label className="relative cursor-pointer font-medium text-blue-600 hover:text-blue-500">
                  <span>Upload a file</span>
                  <input type="file" className="sr-only" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                </label>
                <p className="pl-1 inline">or drag and drop here</p>
              </div>
              <p className="text-xs text-slate-500 mt-2">PDF, PNG, JPG up to 10MB</p>
              {file && <p className="mt-4 text-sm font-semibold text-green-600">📄 {file.name} ready</p>}
            </div>

            <button
              type="submit"
              disabled={isAnalyzing || !file}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {isAnalyzing ? (
                <> <Settings className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" /> AI is Analyzing Blueprint... </>
              ) : "Analyze Drawing"}
            </button>
          </form>
        ) : (
          
          /* --- THIS IS WHERE THE DATA IS DISPLAYED --- */
          <div className="bg-white shadow-xl rounded-2xl p-8 animate-in fade-in zoom-in duration-300">
            <div className="flex items-center space-x-3 mb-6 border-b pb-4">
              <CheckCircle className="text-green-500 w-8 h-8" />
              <h2 className="text-2xl font-bold text-slate-900">Analysis Complete</h2>
            </div>
            
            {/* Core Blueprint Data */}
            <div className="bg-slate-50 p-6 rounded-lg mb-6 border border-slate-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Part Name</p>
                  <p className="text-lg font-semibold text-slate-900">{result.partName}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Material</p>
                  <p className="text-lg font-semibold text-slate-900">{result.material}</p>
                </div>
              </div>
            </div>

            {/* Routing Data List */}
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <Cpu className="w-5 h-5 mr-2 text-blue-600" /> Proposed Manufacturing Routing
            </h3>
            
            <ul className="space-y-3">
              {result.routing.map((r: any) => (
                <li key={r.step} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
                  <div className="mb-2 sm:mb-0">
                    <span className="font-bold text-slate-800 mr-2">Step {r.step}:</span>
                    <span className="font-medium text-slate-700">{r.process}</span>
                    <p className="text-xs text-slate-500 mt-1">Machine: {r.machine_required}</p>
                  </div>
                  
                  <span className={`px-3 py-1 rounded-full text-xs font-bold w-fit ${r.status === 'In-house' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                    {r.status}
                  </span>
                </li>
              ))}
            </ul>
            
            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-center">
                <button onClick={() => window.location.reload()} className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                    Upload another drawing
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}