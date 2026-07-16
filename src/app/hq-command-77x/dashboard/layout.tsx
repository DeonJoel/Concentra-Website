"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, FileText, LogOut, ShieldAlert } from "lucide-react";

export default function CMSLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Get current URL to highlight active tab
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8000/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      // Whether the API call succeeds or fails, force the browser back to the login screen
      window.location.href = "/hq-command-77x";
    }
  };

  return (
    <div className="flex h-screen bg-blueprint-bg">

      {/* PERSISTENT LIGHT SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shadow-sm z-20">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-2xl font-black tracking-widest text-concentra-purple mb-1">
            CONCENTRA
          </h2>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <ShieldAlert className="w-3 h-3 text-concentra-green" />
            <span>Admin Terminal</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link
            href="/hq-command-77x/dashboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition font-medium ${pathname === "/hq-command-77x/dashboard"
                ? "bg-concentra-purple/10 text-concentra-purple font-bold border-r-4 border-concentra-purple"
                : "text-slate-600 hover:bg-slate-50"
              }`}
          >
            <LayoutDashboard className="w-5 h-5" /> Live RFQs
          </Link>
          <Link
            href="/hq-command-77x/dashboard/content"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition font-medium ${pathname === "/hq-command-77x/dashboard/content"
                ? "bg-concentra-purple/10 text-concentra-purple font-bold border-r-4 border-concentra-purple"
                : "text-slate-600 hover:bg-slate-50"
              }`}
          >
            <FileText className="w-5 h-5" /> Website Content
          </Link>
          <Link
            href="/hq-command-77x/dashboard/users"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition font-medium ${pathname === "/hq-command-77x/dashboard/users"
                ? "bg-concentra-purple/10 text-concentra-purple font-bold border-r-4 border-concentra-purple"
                : "text-slate-600 hover:bg-slate-50"
              }`}
          >
            <Users className="w-5 h-5" /> Access Control
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-bold text-sm tracking-wide border border-red-200 active:scale-95"
          >
            <LogOut className="w-4 h-4" /> LOGOUT
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm z-10">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-concentra-green" />
            <h1 className="font-bold text-slate-800 tracking-wide">CONCENTRA SECURE TERMINAL</h1>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-slate-500 font-mono">
              Role: <span className="text-concentra-purple font-bold">SUPER ADMIN</span>
            </span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>

    </div>
  );
}