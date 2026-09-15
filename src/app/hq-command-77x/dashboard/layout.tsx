"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, FileText, LogOut, ShieldAlert, Cpu, Briefcase, MessageSquare } from "lucide-react";

// Define the available routes dynamically
const NAVIGATION_ROUTES = [
  { name: "Live RFQs", path: "/hq-command-77x/dashboard", icon: LayoutDashboard },
  { name: "Website Content", path: "/hq-command-77x/dashboard/content", icon: FileText },
  { name: "Job Postings", path: "/hq-command-77x/dashboard/careers", icon: Briefcase },
  { name: "Inbox", path: "/hq-command-77x/dashboard/contact", icon: MessageSquare },
  { name: "Access Control", path: "/hq-command-77x/dashboard/users", icon: Users },
  { name: "AI Analytics", path: "/hq-command-77x/dashboard/analytics", icon: Cpu },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [userRole, setUserRole] = useState("LOADING...");
  const [userName, setUserName] = useState("");
  
  // NEW: Strict render guard state
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/me`, { credentials: "include" });
        if (response.ok) {
          const data = await response.json();
          setUserRole(data.role);
          setUserName(data.username);
          // Only unlock the UI if the token is valid
          setIsAuthorized(true);
        } else {
          window.location.href = "/hq-command-77x";
        }
      } catch (error) {
        window.location.href = "/hq-command-77x";
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/logout`, { method: "POST", credentials: "include" });
    } finally {
      window.location.href = "/hq-command-77x";
    }
  };

  // NEW: If they are not authorized yet, show a secure loading screen instead of the dashboard
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 z-50">
        <div className="text-green-500 font-mono animate-pulse tracking-widest text-sm">
          VERIFYING SECURE CONNECTION...
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-blueprint-bg">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shadow-sm z-20">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-2xl font-black tracking-widest text-concentra-purple mb-1">CONCENTRA</h2>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <ShieldAlert className="w-3 h-3 text-concentra-green" />
            <span>Admin Terminal</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {/* DYNAMICALLY RENDER NAV ITEMS */}
          {NAVIGATION_ROUTES.map((route) => {
            const Icon = route.icon;
            const isActive = pathname === route.path;
            return (
              <Link
                key={route.path}
                href={route.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition font-medium ${
                  isActive
                    ? "bg-concentra-green/10 text-concentra-green font-bold border-r-4 border-concentra-green"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Icon className="w-5 h-5" /> {route.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button onClick={handleLogout} className="flex items-center justify-center w-full gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-bold text-sm tracking-wide border border-red-200 active:scale-95">
            <LogOut className="w-4 h-4" /> LOGOUT
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm z-10">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-concentra-green" />
            <h1 className="font-bold text-concentra-purple tracking-wide">CONCENTRA SECURE TERMINAL</h1>
          </div>
          <div className="flex items-center gap-4 text-sm">
            {userName && (
              <span className="text-slate-500 font-medium mr-2">
                User: <span className="text-slate-800 font-bold uppercase">{userName}</span>
              </span>
            )}
            <span className="text-slate-500 font-mono">
              Role: <span className={`font-bold ${userRole === 'SUPER ADMIN' ? 'text-concentra-green' : 'text-blue-600'}`}>
                {userRole}
              </span>
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