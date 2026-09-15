"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, Trash2, Mail, Phone, Building, Clock } from "lucide-react";

interface ContactMsg {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  company_name?: string;
  phone?: string;
  message: string;
  submitted_at: string;
}

export default function AdminContactMessagesPage() {
  const [messages, setMessages] = useState<ContactMsg[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/contact`, {
        credentials: "include", // Required to send the admin token
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to permanently delete this message?")) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/contact/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        setMessages(messages.filter((msg) => msg.id !== id));
      } else {
        alert("Failed to delete message.");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-industrial-slate tracking-tight">Inbox & Enquiries</h1>
        <p className="text-slate-500 mt-2 font-medium">Manage messages submitted through the public Contact Us page.</p>
      </div>

      {isLoading ? (
        <div className="w-full h-40 flex items-center justify-center bg-white rounded-3xl border border-slate-200">
          <span className="text-slate-400 font-medium animate-pulse">Loading messages...</span>
        </div>
      ) : messages.length === 0 ? (
        <div className="w-full py-16 flex flex-col items-center justify-center bg-white rounded-3xl border border-dashed border-slate-300">
          <MessageSquare className="w-12 h-12 text-slate-300 mb-4" />
          <h3 className="text-lg font-bold text-slate-700">Inbox is empty</h3>
          <p className="text-slate-500 mt-1">New contact requests will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {messages.map((msg) => (
            <div key={msg.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              
              <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-xl font-bold text-industrial-slate flex items-center gap-2">
                    {msg.first_name} {msg.last_name}
                  </h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                    <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> {msg.email}</span>
                    {msg.phone && <span className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> {msg.phone}</span>}
                    {msg.company_name && <span className="flex items-center gap-1.5"><Building className="w-4 h-4" /> {msg.company_name}</span>}
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-3 shrink-0">
                  <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(msg.submitted_at).toLocaleString()}
                  </span>
                  <button 
                    onClick={() => handleDelete(msg.id)}
                    className="flex items-center gap-2 text-red-500 hover:text-red-700 text-sm font-bold transition p-2 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>

              <div className="bg-[#f8f9fa] p-4 rounded-xl border border-slate-100">
                <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">{msg.message}</p>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}