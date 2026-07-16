"use client";

import { useState } from "react";
import { Lock } from "lucide-react";

export default function HiddenSecureLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const response = await fetch("http://localhost:8000/api/admin/login", {
        method: "POST",
        body: formData,
        credentials: "include", // <--- ADD THIS EXACT LINE
      });

      if (response.ok) {
        // Now the browser will actually save the cookie!
        window.location.href = "/hq-command-77x/dashboard";
      } else {
        setError(true);
        setPassword("");
      }
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
        <div className="flex justify-center mb-6">
          <div className="bg-slate-700 p-4 rounded-full">
            <Lock className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white text-center mb-8 tracking-wider">RESTRICTED ACCESS</h2>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input 
              type="text" 
              value={username}
              onChange={(e) => {setUsername(e.target.value); setError(false);}}
              placeholder="Admin ID" 
              className="w-full px-4 py-3 mb-4 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-green-500 focus:border-green-500 placeholder-slate-500 text-center tracking-widest"
              autoFocus
            />
            <input 
              type="password" 
              value={password}
              onChange={(e) => {setPassword(e.target.value); setError(false);}}
              placeholder="Master Passcode" 
              className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-green-500 focus:border-green-500 placeholder-slate-500 text-center tracking-widest"
            />
          </div>
          {error && <p className="text-red-400 text-sm text-center">Authentication Failed. Incident Logged.</p>}
          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors">
            AUTHORIZE
          </button>
        </form>
      </div>
    </div>
  );
}