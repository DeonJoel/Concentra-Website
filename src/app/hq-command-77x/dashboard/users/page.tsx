"use client";

import { useState, useEffect } from "react";
import { ShieldAlert, Trash2, UserPlus, Users, X, Loader2, KeyRound } from "lucide-react";

export default function AccessControlPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ username: "", password: "" });

  // 1. Fetch Users
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`, { credentials: "include" });
      if (response.ok) {
        setUsers(await response.json());
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 2. Add New User
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.username || !newUser.password) return alert("Username and password required");

    const formData = new FormData();
    formData.append("username", newUser.username);
    formData.append("password", newUser.password);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`, {
        method: "POST",
        body: formData,
        credentials: "include"
      });
      
      if (response.ok) {
        setShowModal(false);
        setNewUser({ username: "", password: "" });
        fetchUsers(); // Refresh the list
      } else {
        const error = await response.json();
        alert(error.detail || "Failed to create user");
      }
    } catch (error) {
      console.error("Error creating user", error);
    }
  };

  // 3. Delete User
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to permanently revoke this user's access?")) return;
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${id}`, {
        method: "DELETE",
        credentials: "include"
      });
      
      if (response.ok) {
        setUsers(users.filter(u => u.id !== id));
      } else {
        const error = await response.json();
        alert(error.detail || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-8rem)] flex flex-col relative">
      
      {/* HEADER */}
      <div className="flex justify-between items-end mb-8 shrink-0">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Access Control</h1>
          <p className="text-slate-600">Manage administrator accounts and dashboard access.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-concentra-purple text-white hover:bg-purple-900 px-5 py-2.5 rounded-lg text-sm font-bold shadow-md transition-all active:scale-95"
        >
          <UserPlus className="w-4 h-4" /> Add Admin
        </button>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col flex-1">
        
        <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-slate-700 uppercase tracking-wider text-xs flex items-center gap-2">
          <Users className="w-4 h-4 text-concentra-purple" /> Authorized Personnel
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin mb-2 text-concentra-purple" />
              <p>Loading security profiles...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user) => (
                <div key={user.id} className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow relative bg-slate-50 overflow-hidden">
                  
                  {/* Super Admin Badge styling */}
                  {user.is_superadmin && (
                    <div className="absolute top-0 right-0 bg-concentra-purple text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-lg shadow-sm">
                      Super Admin
                    </div>
                  )}

                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-sm ${user.is_superadmin ? 'bg-purple-100 text-concentra-purple' : 'bg-white border border-slate-200 text-slate-600'}`}>
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">{user.username}</h3>
                      <p className="text-xs text-slate-500 font-mono">ID: {user.id}</p>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-slate-200">
                    {user.is_superadmin ? (
                      <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3" /> Cannot be deleted
                      </span>
                    ) : (
                      <button 
                        onClick={() => handleDelete(user.id)}
                        className="text-sm font-bold text-red-600 hover:text-white hover:bg-red-600 px-3 py-1.5 rounded transition flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" /> Revoke Access
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ADD USER MODAL */}
      {showModal && (
        <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center rounded-xl">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm border border-slate-200">
            
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-extrabold text-xl text-slate-900">New Admin</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-1.5 rounded-full transition">
                <X className="w-5 h-5"/>
              </button>
            </div>
            
            <form onSubmit={handleAddUser} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Username</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. john_doe"
                  value={newUser.username} 
                  onChange={(e) => setNewUser({...newUser, username: e.target.value.toLowerCase().replace(/ /g, '_')})}
                  className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-concentra-purple focus:ring-1 focus:ring-concentra-purple transition bg-slate-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Password</label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="password" 
                    required
                    placeholder="Enter secure password"
                    value={newUser.password} 
                    onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                    className="w-full border border-slate-200 rounded-lg p-3 pl-9 text-sm focus:outline-none focus:border-concentra-purple focus:ring-1 focus:ring-concentra-purple transition bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-concentra-purple text-white py-3.5 rounded-lg font-bold shadow-md hover:bg-purple-900 transition-colors mt-4 flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" /> Create Account
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}