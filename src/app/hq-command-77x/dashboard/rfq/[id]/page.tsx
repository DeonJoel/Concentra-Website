"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import {
    ArrowLeft, Building, User, Mail, Package, Layers,
    CheckCircle, XCircle, FileText, Send, MessageSquare
} from "lucide-react";

// Dynamically import the viewer and completely disable Server-Side Rendering (SSR)
const CADViewer = dynamic(() => import("@/components/shared/CADViewer"), { 
    ssr: false,
});

export default function RFQDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id;

    const [rfq, setRfq] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Rejection State
    const [showRejectInput, setShowRejectInput] = useState(false);
    const [rejectReason, setRejectReason] = useState("");

    useEffect(() => {
        const fetchSingleRfq = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/admin/rfqs/${id}`, {
                    credentials: "include",
                });
                if (response.ok) {
                    const data = await response.json();
                    setRfq(data);
                } else {
                    // MOCK DATA FALLBACK for UI design purposes
                    setRfq({
                        id: id,
                        submitted_at: new Date().toISOString(),
                        full_name: "Mock Client Name",
                        company_name: "Mock Company Ltd.",
                        email: "client@mockcompany.com",
                        part_name: "Precision Machined Housing",
                        quantity: 500,
                        material: "Titanium Grade 5",
                        comments: "Please ensure all threading matches metric standard ISO 261. The surface finish needs to be extremely smooth. We are looking for a turnaround time of 3 weeks if possible.",
                        file_path: "mock_drawing_v2.pdf"
                    });
                }
            } catch (error) {
                console.error("Failed to fetch RFQ", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSingleRfq();
    }, [id]);

    const handleApprove = () => {
        // TODO: Future ERPNext API integration goes here
        
        // 1. Show simulated success message
        alert(`Success! RFQ #${id} Approved. Data has been prepped for ERPNext.`);
        
        // 2. Return to dashboard
        router.push("/hq-command-77x/dashboard");
    };

    const handleReject = () => {
        if (!rejectReason.trim()) {
            alert("Please provide a reason for rejection before sending the email.");
            return;
        }
        
        // TODO: Future Email API integration goes here
        
        // 1. Show simulated success message
        alert(`Success! Rejection email queued for ${rfq.email} with reason:\n"${rejectReason}"`);
        
        // 2. Clear state and return to dashboard
        setShowRejectInput(false);
        setRejectReason("");
        router.push("/hq-command-77x/dashboard");
    };

    if (isLoading) {
        return <div className="p-8 text-slate-500 font-medium">Decrypting record #{id}...</div>;
    }

    if (!rfq) {
        return <div className="p-8 text-red-500 font-medium">Error: Record not found.</div>;
    }

    return (
        <div className="max-w-7xl mx-auto">

            {/* HEADER SECTION */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => router.push("/hq-command-77x/dashboard")}
                    className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition shadow-sm text-slate-600"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-3">
                        RFQ Review: #{rfq.id}
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full font-bold border border-yellow-200 uppercase tracking-widest">
                            Pending
                        </span>
                    </h1>
                    <p className="text-slate-500 text-sm">Submitted on {new Date(rfq.submitted_at).toLocaleString()}</p>
                </div>
            </div>

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT COLUMN: CAD Drawing Viewer & Instructions (Takes up 2/3 of the screen) */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    
                    {/* CAD Viewer Card */}
                    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden flex flex-col h-[700px]">
                        <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
                            <h2 className="font-bold text-slate-800 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-concentra-purple" />
                                Attached Technical Document
                            </h2>
                            <span className="text-xs font-mono text-slate-500 bg-slate-200 px-2 py-1 rounded">
                                {rfq.file_path.split('\\').pop() || rfq.file_path.split('/').pop()}
                            </span>
                        </div>

                        {/* Live PDF Viewer Component */}
                        <div className="flex-1 relative overflow-hidden bg-slate-100 border-t border-slate-200 rounded-b-xl">
                            <CADViewer fileUrl={`http://localhost:8000/api/admin/rfqs/${rfq.id}/file`} />
                        </div>
                    </div>

                    {/* Client Instructions / Comments Card */}
                    {rfq.comments && (
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 border-l-4 border-l-concentra-purple">
                            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-concentra-purple" />
                                Client Instructions & Comments
                            </h3>
                            <p className="text-slate-700 text-sm whitespace-pre-wrap bg-slate-50 p-4 rounded-lg border border-slate-100 leading-relaxed">
                                {rfq.comments}
                            </p>
                        </div>
                    )}
                </div>

                {/* RIGHT COLUMN: Client Details & Approval Workflow */}
                <div className="flex flex-col gap-6">

                    {/* Client Info Card */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Client Details</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Building className="w-5 h-5 text-slate-400 mt-0.5" />
                                <div>
                                    <p className="text-xs text-slate-500">Company</p>
                                    <p className="font-bold text-slate-900">{rfq.company_name}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <User className="w-5 h-5 text-slate-400 mt-0.5" />
                                <div>
                                    <p className="text-xs text-slate-500">Contact Person</p>
                                    <p className="font-bold text-slate-900">{rfq.full_name}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-slate-400 mt-0.5" />
                                <div>
                                    <p className="text-xs text-slate-500">Email Address</p>
                                    <a href={`mailto:${rfq.email}`} className="font-medium text-blue-600 hover:underline">{rfq.email}</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Part Info Card */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Part Specifications</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Package className="w-5 h-5 text-slate-400 mt-0.5" />
                                <div>
                                    <p className="text-xs text-slate-500">Part Name / Number</p>
                                    <p className="font-bold text-slate-900">{rfq.part_name}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-start gap-3">
                                    <Layers className="w-5 h-5 text-slate-400 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-slate-500">Volume</p>
                                        <p className="font-bold text-slate-900">{rfq.quantity} units</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">Material</p>
                                    <p className="font-bold text-slate-900">{rfq.material || "N/A"}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Card: Approve & Reject */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 border-t-4 border-t-concentra-purple">
                        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Workflow Actions</h3>

                        {!showRejectInput ? (
                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={handleApprove}
                                    className="w-full flex justify-center items-center gap-2 bg-[#2A9D40] text-white hover:bg-green-700 py-3 rounded-lg font-bold shadow-md transition-all active:scale-95"
                                >
                                    <CheckCircle className="w-5 h-5" /> Approve & Send to ERPNext
                                </button>
                                <button
                                    onClick={() => setShowRejectInput(true)}
                                    className="w-full flex justify-center items-center gap-2 bg-white text-red-600 border-2 border-red-100 hover:bg-red-50 py-3 rounded-lg font-bold transition-all"
                                >
                                    <XCircle className="w-5 h-5" /> Reject Enquiry
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-top-2">
                                <label className="text-xs font-bold text-red-600">Reason for Rejection (Visible to Client)</label>
                                <textarea
                                    rows={4}
                                    placeholder="e.g., We currently do not machine Titanium in-house..."
                                    value={rejectReason}
                                    onChange={(e) => setRejectReason(e.target.value)}
                                    className="w-full border border-red-200 rounded-lg p-3 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 resize-none"
                                />
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setShowRejectInput(false)}
                                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-sm transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleReject}
                                        className="flex-1 flex justify-center items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-sm shadow-md transition-all active:scale-95"
                                    >
                                        <Send className="w-4 h-4" /> Send Email
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>

            </div>
        </div>
    );
}