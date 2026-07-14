import { FileText, Download, Clock } from "lucide-react";

export default function InternalDashboard() {
  // Mock data representing what the Python engine will save to the database
  const mockEnquiries = [
    {
      id: "REQ-001",
      email: "engineer@aerospace.com",
      partName: "Spindle Housing",
      status: "Analyzed",
      date: "Just now",
      complexity: "High"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Simple Sidebar */}
      <div className="w-64 bg-slate-900 text-white min-h-screen p-6">
        <h2 className="text-2xl font-bold mb-8 text-blue-400">Concentra OS</h2>
        <nav className="space-y-4">
          <a href="#" className="block py-2 px-4 bg-slate-800 rounded text-sm font-medium">Enquiries</a>
          <a href="#" className="block py-2 px-4 text-slate-400 hover:text-white text-sm">Machinery List</a>
          <a href="#" className="block py-2 px-4 text-slate-400 hover:text-white text-sm">Settings</a>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">Engineering Enquiries</h1>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">Customer / Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">Part Details</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">Status</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase">Internal Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {mockEnquiries.map((enquiry) => (
                <tr key={enquiry.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-slate-900">{enquiry.email}</div>
                    <div className="text-sm text-slate-500 flex items-center mt-1">
                      <Clock className="w-3 h-3 mr-1" /> {enquiry.date}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-slate-800">{enquiry.partName}</div>
                    <div className="text-xs text-slate-500">ID: {enquiry.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {enquiry.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    {/* These buttons represent the Agent 1 and Agent 2 data */}
                    <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
                      View Routing
                    </button>
                    <button className="inline-flex items-center text-slate-600 hover:text-slate-900 text-sm font-medium bg-slate-100 px-3 py-1.5 rounded-md">
                      <Download className="w-4 h-4 mr-2" />
                      FAI Excel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
