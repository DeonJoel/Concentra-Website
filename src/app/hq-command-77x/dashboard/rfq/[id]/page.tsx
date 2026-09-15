"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import {
    ArrowLeft, Building, User, Mail, Package, Layers,
    CheckCircle, XCircle, FileText, Send, MessageSquare, AlertCircle
} from "lucide-react";

const CADViewer = dynamic(() => import("@/components/shared/CADViewer"), { 
    ssr: false,
});

export default function RFQDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id;

    const [rfq, setRfq] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);

    // Rejection State
    const [showRejectInput, setShowRejectInput] = useState(false);
    const [rejectReason, setRejectReason] = useState("");
    const [openEmailClient, setOpenEmailClient] = useState(true); // New Toggle

    const fetchSingleRfq = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/rfqs/${id}`, {
                credentials: "include",
            });
            if (response.ok) {
                const data = await response.json();
                setRfq(data);
            }
        } catch (error) {
            console.error("Failed to fetch RFQ", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSingleRfq();
    }, [id]);

    const handleApprove = async () => {
        setIsUpdating(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/rfqs/${id}/status`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "Approved" }),
                credentials: "include",
            });

            if (response.ok) {
                alert("RFQ Approved successfully.");
                fetchSingleRfq();
            }
        } catch (error) {
            alert("Error connecting to server.");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleReject = async () => {
        if (!rejectReason.trim()) {
            alert("Please provide a reason for rejection.");
            return;
        }

        setIsUpdating(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/rfqs/${id}/status`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "Rejected", reason: rejectReason }),
                credentials: "include",
            });

            if (response.ok) {
                // 1. Trigger the email client first
                if (openEmailClient) {
                    const subject = encodeURIComponent(`Update on your RFQ: ${rfq.part_name}`);
                    const body = encodeURIComponent(
                        `Dear ${rfq.full_name},\n\nThank you for reaching out to Concentra Precision Technologies regarding the '${rfq.part_name}'.\n\nUnfortunately, we are unable to process this RFQ at this time.\n\nReason: ${rejectReason}\n\nBest regards,\nThe Concentra Engineering Team`
                    );
                    
                    // Create a hidden link and click it (more reliable across browsers)
                    const mailtoLink = `mailto:${rfq.email}?subject=${subject}&body=${body}`;
                    const link = document.createElement('a');
                    link.href = mailtoLink;
                    link.target = '_blank';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }

                // 2. Delay the alert by 500ms so it doesn't freeze the browser popup
                setTimeout(() => {
                    alert("RFQ marked as rejected in the database.");
                    setShowRejectInput(false);
                    fetchSingleRfq(); 
                }, 500);
            }
        } catch (error) {
            alert("Error connecting to server.");
        } finally {
            setIsUpdating(false);
        }
    };

    const getStatusTag = (status: string) => {
        switch (status) {
          case "Approved": return "bg-green-100 text-green-800 border-green-200";
          case "Rejected": return "bg-red-100 text-red-800 border-red-200";
          default: return "bg-purple-100 text-purple-800 border-purple-200"; 
        }
    };

    if (isLoading) return <div className="p-8 text-slate-500 font-medium">Decrypting record #{id}...</div>;
    if (!rfq) return <div className="p-8 text-red-500 font-medium">Error: Record not found.</div>;

    const currentStatus = rfq.status || "Pending";

    return (
        <div className="max-w-7xl mx-auto">
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
                        <span className={`text-xs px-3 py-1 rounded-full font-bold border uppercase tracking-widest ${getStatusTag(currentStatus)}`}>
                            {currentStatus}
                        </span>
                    </h1>
                    <p className="text-slate-500 text-sm">Submitted on {new Date(rfq.submitted_at).toLocaleString()}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden flex flex-col h-[700px]">
                        <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
                            <h2 className="font-bold text-slate-800 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-concentra-purple" />
                                Attached Technical Document
                            </h2>
                            <span className="text-xs font-mono text-slate-500 bg-slate-200 px-2 py-1 rounded">
                                {rfq.file_path?.split('\\').pop() || rfq.file_path?.split('/').pop() || "No file"}
                            </span>
                        </div>
                        <div className="flex-1 relative overflow-hidden bg-slate-100 border-t border-slate-200 rounded-b-xl">
                            <CADViewer fileUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/admin/rfqs/${rfq.id}/file`} />
                        </div>
                    </div>

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

                <div className="flex flex-col gap-6">
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

                    {currentStatus === "Pending" ? (
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 border-t-4 border-t-concentra-purple">
                            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Workflow Actions</h3>

                            {!showRejectInput ? (
                                <div className="flex flex-col gap-3">
                                    <button
                                        disabled={isUpdating}
                                        onClick={handleApprove}
                                        className="w-full flex justify-center items-center gap-2 bg-[#2A9D40] text-white hover:bg-green-700 py-3 rounded-lg font-bold shadow-md transition-all active:scale-95 disabled:opacity-50"
                                    >
                                        <CheckCircle className="w-5 h-5" /> {isUpdating ? "Updating..." : "Approve & Mark Ready"}
                                    </button>
                                    <button
                                        disabled={isUpdating}
                                        onClick={() => setShowRejectInput(true)}
                                        className="w-full flex justify-center items-center gap-2 bg-white text-red-600 border-2 border-red-100 hover:bg-red-50 py-3 rounded-lg font-bold transition-all disabled:opacity-50"
                                    >
                                        <XCircle className="w-5 h-5" /> Reject Enquiry
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-top-2">
                                    <label className="text-xs font-bold text-red-600">Reason for Rejection</label>
                                    <textarea
                                        rows={4}
                                        placeholder="e.g., We currently do not machine Titanium in-house..."
                                        value={rejectReason}
                                        onChange={(e) => setRejectReason(e.target.value)}
                                        className="w-full border border-red-200 rounded-lg p-3 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 resize-none"
                                    />
                                    
                                    {/* Email Toggle */}
                                    <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer mt-1">
                                        <input 
                                            type="checkbox" 
                                            checked={openEmailClient} 
                                            onChange={(e) => setOpenEmailClient(e.target.checked)}
                                            className="w-4 h-4 text-concentra-purple rounded border-slate-300 focus:ring-concentra-purple"
                                        />
                                        Open email draft for client
                                    </label>

                                    <div className="flex gap-2 mt-2">
                                        <button
                                            onClick={() => setShowRejectInput(false)}
                                            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-sm transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            disabled={isUpdating}
                                            onClick={handleReject}
                                            className="flex-1 flex justify-center items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-sm shadow-md transition-all active:scale-95 disabled:opacity-50"
                                        >
                                            <Send className="w-4 h-4" /> {openEmailClient ? "Draft Email & Reject" : "Reject Silently"}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">Workflow Status</h3>
                            <p className="text-sm text-slate-600 mb-4">This enquiry has already been processed.</p>
                            
                            {rfq.rejection_reason && (
                                <div className="bg-white p-4 rounded-lg border border-red-100">
                                    <p className="text-xs font-bold text-red-500 uppercase flex items-center gap-1 mb-1">
                                        <AlertCircle className="w-3 h-3" /> Rejection Reason Saved:
                                    </p>
                                    <p className="text-sm text-slate-700">{rfq.rejection_reason}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}