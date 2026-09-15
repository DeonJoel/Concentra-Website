"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, ArrowLeft, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SecureLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // On page load, verify if the user already has an active session
  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/me`, {
          credentials: "include",
        });
        if (response.ok) {
          // Session is valid, redirect immediately to dashboard
          router.push("/hq-command-77x/dashboard");
        } else {
          // No valid session, allow the login form to render
          setIsChecking(false);
        }
      } catch (err) {
        setIsChecking(false);
      }
    };
    verifySession();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(false);
    
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        window.location.href = "/hq-command-77x/dashboard";
      } else {
        setError(true);
        setPassword("");
        setIsSubmitting(false);
      }
    } catch (err) {
      setError(true);
      setIsSubmitting(false);
    }
  };

  // On-brand loading state with a trace of green
  if (isChecking) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
        <ShieldCheck className="w-12 h-12 text-concentra-green animate-pulse mb-4" />
        <div className="text-industrial-slate font-bold tracking-widest text-sm uppercase">
          Verifying Secure Connection...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 relative flex items-center justify-center px-4 overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#F8EBFF] to-transparent opacity-60 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#e6f4ea] to-transparent opacity-60 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

      {/* Back Button */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 text-slate-500 hover:text-concentra-green transition font-semibold z-20 bg-white px-4 py-2.5 rounded-xl shadow-sm border border-slate-200 hover:shadow-md"
      >
        <ArrowLeft className="w-4 h-4" /> 
        <span className="hidden md:inline">Back to Website</span>
      </Link>

      {/* Login Card - Added a top border for subtle branding */}
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-slate-100 border-t-4 border-t-concentra-purple relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        <div className="flex flex-col items-center mb-8">
          {/* Changed the icon container to the green theme */}
          <div className="w-16 h-16 bg-[#e6f4ea] rounded-2xl flex items-center justify-center mb-5 shadow-sm border border-green-100">
            <ShieldCheck className="w-8 h-8 text-concentra-green" />
          </div>
          <h2 className="text-2xl font-black text-industrial-slate tracking-tight text-center">Admin Terminal</h2>
          <p className="text-slate-500 text-sm font-medium mt-1 text-center">Authorized Personnel Only</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Admin ID</label>
            {/* Input focus rings changed to green */}
            <input 
              type="text" 
              value={username}
              onChange={(e) => {setUsername(e.target.value); setError(false);}}
              placeholder="e.g. system_admin" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-concentra-green/50 focus:border-concentra-green bg-slate-50 focus:bg-white transition-colors text-industrial-slate font-medium"
              autoFocus
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Passcode</label>
            {/* Input focus rings changed to green */}
            <input 
              type="password" 
              value={password}
              onChange={(e) => {setPassword(e.target.value); setError(false);}}
              placeholder="••••••••" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-concentra-green/50 focus:border-concentra-green bg-slate-50 focus:bg-white transition-colors text-industrial-slate font-medium tracking-widest"
              required
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-lg text-sm font-semibold border border-red-100 animate-in shake">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Authentication failed. Please verify credentials.</span>
            </div>
          )}

          <div className="pt-2">
            {/* Main button remains purple to anchor the brand identity */}
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-concentra-purple hover:bg-purple-900 text-white font-bold py-3.5 rounded-xl transition duration-300 shadow-md shadow-purple-200 flex justify-center items-center gap-2 disabled:opacity-70"
            >
              {isSubmitting ? (
                <span className="animate-pulse">Authorizing...</span>
              ) : (
                "Authorize Access"
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}