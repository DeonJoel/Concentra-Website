"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, Sparkles, UploadCloud, CheckCircle, X } from "lucide-react";

export default function RequestQuote() {
  // FEATURE FLAG: Set this to 'false' to completely hide the floating AI button before launch.
  const isAIFeatureEnabled = true;

  // State to manage form submission success
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // State for file handling
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

    // NEW: Drag and Drop Handlers
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
        setSelectedFile(e.dataTransfer.files[0]);
      }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        setSelectedFile(e.target.files[0]);
      }
    };

    const handleRemoveFile = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevents the drag-and-drop zone from reacting
    setSelectedFile(null);
  };

  // Handle the standard form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Create a FormData object directly from the form element
    const form = e.currentTarget;
    const formData = new FormData();
    
    // Append standard fields
    formData.append("full_name", (form.elements.namedItem("fullName") as HTMLInputElement).value);
    formData.append("company_name", (form.elements.namedItem("companyName") as HTMLInputElement).value);
    formData.append("email", (form.elements.namedItem("email") as HTMLInputElement).value);
    formData.append("phone", (form.elements.namedItem("phone") as HTMLInputElement).value);
    formData.append("part_name", (form.elements.namedItem("partName") as HTMLInputElement).value);
    formData.append("quantity", (form.elements.namedItem("quantity") as HTMLInputElement).value);
    formData.append("material", (form.elements.namedItem("material") as HTMLSelectElement).value);
    formData.append("comments", (form.elements.namedItem("comments") as HTMLTextAreaElement).value);
    
    // Append the file
    if (selectedFile) {
        formData.append("file", selectedFile);
    } else {
        alert("Please select or drag a drawing file before submitting.");
        return;
    }

    try {
        const response = await fetch("http://localhost:8000/api/submit-rfq", {
            method: "POST",
            body: formData, // Sending as FormData ensures secure multipart encoding
        });

        if (!response.ok) throw new Error("Secure transmission failed");

        setIsSubmitted(true);
        setSelectedFile(null); // Clear the file state on successful upload
    } catch (error) {
        console.error("Submission error:", error);
        alert("There was an error securely submitting your form. Please try again.");
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 relative ">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Request a Quote</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Please fill out the form below with your assembly details, material requirements, and expected batch volumes. Our engineering team will manually review your submission.
          </p>
        </div>

        {/* --- STANDARD RFQ FORM --- */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-8 sm:p-12">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Grid for standard inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                  <input required name="fullName" type="text" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Company Name *</label>
                  <input required name="companyName" type="text" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Acme Aerospace" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Work Email *</label>
                  <input required name="email" type="email" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="engineer@company.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                  <input name="phone" type="tel" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="+1 (555) 000-0000" />
                </div>
              </div>

              {/* Part Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Part Name / Number *</label>
                  <input required name="partName" type="text" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. Spindle Housing Rev B" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Estimated Quantity *</label>
                  <input required name="quantity" type="number" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. 500" />
                </div>
              </div>

              {/* Material Dropdown */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Material</label>
                <select name="material" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white">
                  <option>Select a material...</option>
                  <option>Aluminum (6061, 7075)</option>
                  <option>Stainless Steel (304, 316, 17-4)</option>
                  <option>Titanium</option>
                  <option>Carbon Steel / Alloy Steel</option>
                  <option>Other (Please specify in comments)</option>
                </select>
              </div>

              {/* File Upload Zone */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Upload Drawing / CAD File *</label>
                <div 
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                    isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <UploadCloud className={`mx-auto h-8 w-8 mb-3 ${isDragging ? 'text-blue-500' : 'text-slate-400'}`} />
                  <div className="text-sm text-slate-600">
                    <label className="relative cursor-pointer bg-transparent rounded-md font-medium text-blue-600 hover:text-blue-500">
                      <span>Browse files</span>
                      <input 
                        type="file" 
                        name="fileUpload" 
                        className="sr-only" 
                        onChange={handleFileSelect}
                      />
                    </label>
                    <p className="pl-1 inline">or drag and drop</p>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">PDF, STEP, IGES up to 20MB</p>
                  
                  {/* UPGRADED Visual Feedback: Show file name with a Remove button */}
                  {selectedFile && (
                    <div className="mt-4 flex items-center justify-center gap-2 bg-green-50 w-max mx-auto px-3 py-1.5 rounded-full border border-green-200">
                      <span className="text-sm font-semibold text-green-700">
                        📄 {selectedFile.name}
                      </span>
                      <button 
                        type="button" 
                        onClick={handleRemoveFile}
                        className="text-slate-400 hover:text-red-500 transition-colors p-0.5 rounded-full hover:bg-red-50"
                        title="Remove file"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Comments */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Additional Comments / Requirements</label>
                <textarea name="comments" rows={4} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Tell us about special tolerances, finishing requirements, or target lead times..."></textarea>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button type="submit" className="w-full bg-concentra-purple text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-slate-800 transition-colors shadow-lg">
                  Submit Request for Quote
                </button>
              </div>
            </form>
          ) : (
            
            /* --- SUCCESS STATE --- */
            <div className="text-center py-16 animate-in fade-in duration-500">
              <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-6" />
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Request Submitted Successfully!</h2>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                Thank you for reaching out to Concentra Precision Technologies. Our engineering team has received your drawing and will be in touch shortly with your comprehensive quote.
              </p>
              <button onClick={() => setIsSubmitted(false)} className="text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                Submit another request
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 
          FLOATING AI BUTTON
          This only renders if isAIFeatureEnabled is true.
          It sits fixed in the bottom right corner of the screen.
      */}
      {isAIFeatureEnabled && (
        <Link 
          href="/request-quote/enquiry"
          className="fixed bottom-8 right-8 group flex items-center justify-center bg-green-600 text-white p-4 rounded-full shadow-2xl hover:bg-green-700 hover:scale-105 transition-all duration-300 z-50 overflow-hidden"
          title="Try Instant AI Analysis"
        >
          <Zap className="w-6 h-6 flex-shrink-0" />
          <span className="font-bold max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-3 transition-all duration-500 ease-in-out whitespace-nowrap">
            Try AI Analysis
          </span>
          <Sparkles className="w-4 h-4 ml-2 max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out opacity-75" />
        </Link>
      )}
    </div>
  );
}