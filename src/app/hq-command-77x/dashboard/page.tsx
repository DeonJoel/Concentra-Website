"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { Activity, Search, Filter, ArrowUpDown, FolderOpen } from "lucide-react";

export default function SecureDashboard() {
  const router = useRouter();
  const [rfqs, setRfqs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters & Sorting State
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  useEffect(() => {
    const fetchRfqs = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/rfqs`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setRfqs(data);
        }
      } catch (error) {
        console.error("Failed to fetch database records", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRfqs();
  }, []);

  const filteredData = useMemo(() => {
    return rfqs
      .filter((rfq) => {
        const matchesSearch =
          rfq.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          rfq.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          rfq.part_name.toLowerCase().includes(searchTerm.toLowerCase());

        const rfqDate = new Date(rfq.submitted_at);
        const afterStart = startDate ? rfqDate >= new Date(startDate) : true;
        const beforeEnd = endDate
          ? rfqDate <= new Date(new Date(endDate).setDate(new Date(endDate).getDate() + 1))
          : true;

        return matchesSearch && afterStart && beforeEnd;
      })
      .sort((a, b) => {
        const dateA = new Date(a.submitted_at).getTime();
        const dateB = new Date(b.submitted_at).getTime();
        return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
      });
  }, [rfqs, searchTerm, startDate, endDate, sortOrder]);

  // Helper function for the exact requested tag colors
  const getStatusTag = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "Rejected - Email Failed":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        // Default is Pending
        return "bg-purple-100 text-purple-800 border-purple-200"; 
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2" style={{ color: "var(--color-concentra-green)" }}>
            Live Enquiries
          </h1>
          <p className="text-slate-600 flex items-center gap-2">
            <Activity className="w-4 h-4 text-concentra-green" /> Database Connection Active
          </p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200">
          <span className="text-slate-500 text-sm font-medium">Filtered Results: </span>
          <span className="text-xl font-bold text-slate-900">{filteredData.length}</span>
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="flex flex-wrap items-center gap-4 mb-6 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div className="flex-1 min-w-[250px] relative">
          <Search className="w-5 h-5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search clients or parts..."
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-concentra-purple/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Filter className="w-4 h-4 text-slate-400" />
          <span>From:</span>
          <input
            type="date"
            className="border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-concentra-purple/50"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <span>To:</span>
          <input
            type="date"
            className="border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-concentra-purple/50"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      {/* DATA TABLE */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-16 text-center">SL No.</th>
                <th
                  className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition"
                  onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
                >
                  <div className="flex items-center gap-2">
                    Date <ArrowUpDown className="w-4 h-4 text-slate-400" />
                  </div>
                </th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Client</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Part Details</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr><td colSpan={6} className="p-8 text-center text-slate-500">Decrypting database records...</td></tr>
              ) : filteredData.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center text-slate-500">No submissions match your filters.</td></tr>
              ) : (
                filteredData.map((rfq, index) => (
                  <tr key={rfq.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-sm font-medium text-slate-500 text-center">
                      {index + 1}
                    </td>

                    <td className="p-4 whitespace-nowrap text-sm text-slate-600 font-medium">
                      {new Date(rfq.submitted_at).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-slate-900">{rfq.full_name}</p>
                      <p className="text-xs text-slate-500">{rfq.company_name}</p>
                      <a href={`mailto:${rfq.email}`} className="text-xs text-blue-600 hover:underline">{rfq.email}</a>
                    </td>
                    <td className="p-4">
                      <p className="font-semibold text-slate-800">{rfq.part_name}</p>
                      <p className="text-xs text-slate-600">Qty: {rfq.quantity} | {rfq.material || "No material specified"}</p>
                    </td>

                    <td className="p-4">
                      <span className={`text-xs px-3 py-1 rounded-full font-bold border inline-block ${getStatusTag(rfq.status || "Pending")}`}>
                        {rfq.status || "Pending"}
                      </span>
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() => router.push(`/hq-command-77x/dashboard/rfq/${rfq.id}`)}
                        className="inline-flex items-center gap-2 bg-[#2A9D40] text-white hover:bg-green-700 px-4 py-2 rounded-lg text-sm font-bold shadow-md transition-all active:scale-95"
                      >
                        <FolderOpen className="w-4 h-4" /> Open
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}