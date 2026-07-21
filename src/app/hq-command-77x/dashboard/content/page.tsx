"use client";

import { useState, useEffect } from "react";
import { 
  Plus, Edit, Trash2, LayoutTemplate, 
  Type, Image as ImageIcon, Save, X, Loader2, ListPlus
} from "lucide-react";

export default function CMSPage() {
  const [activePage, setActivePage] = useState("home");
  const [contentItems, setContentItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Edit State
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [editFile, setEditFile] = useState<File | null>(null);

  // Add Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBlock, setNewBlock] = useState<{
    section: string; type: string; key: string; value: string; file: File | null;
  }>({ section: "hero", type: "text", key: "", value: "", file: null });

  // 1. FETCH DATA
  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:8000/api/content/${activePage}`);
        if (response.ok) {
          const data = await response.json();
          setContentItems(data);
        }
      } catch (error) {
        console.error("Failed to fetch content", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, [activePage]);

  // Group Data by Section
  const groupedContent = contentItems.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {});

  // 2. SAVE EDITS (Text or Image)
  const handleSaveEdit = async (item: any) => {
    const formData = new FormData();
    if (item.content_type === "text") {
      formData.append("content_value", editValue);
    } else if (item.content_type === "image" && editFile) {
      formData.append("file", editFile);
    } else {
      setEditingId(null);
      return; // No file selected, cancel out
    }

    try {
      const response = await fetch(`http://localhost:8000/api/admin/content/${item.id}`, {
        method: "PUT",
        body: formData,
        credentials: "include"
      });
      if (response.ok) {
        // Refresh the page data to get the new file path from Python
        const res = await fetch(`http://localhost:8000/api/content/${activePage}`);
        setContentItems(await res.json());
        setEditingId(null);
        setEditFile(null);
      }
    } catch (error) {
      console.error("Failed to update", error);
    }
  };

  // 3. CREATE NEW BLOCK (Text or Image)
  const handleAddNew = async () => {
    if (!newBlock.key) return alert("Key name is required!");
    if (newBlock.type === "text" && !newBlock.value) return alert("Text value is required!");
    if (newBlock.type === "image" && !newBlock.file) return alert("Please select an image file!");

    const formData = new FormData();
    formData.append("page", activePage);
    formData.append("section", newBlock.section);
    formData.append("content_type", newBlock.type);
    formData.append("content_key", newBlock.key);
    
    if (newBlock.type === "image" && newBlock.file) {
      formData.append("file", newBlock.file);
    } else {
      formData.append("content_value", newBlock.value);
    }

    try {
      const response = await fetch(`http://localhost:8000/api/admin/content`, {
        method: "POST",
        body: formData,
        credentials: "include"
      });
      if (response.ok) {
        // Refresh the page data
        const res = await fetch(`http://localhost:8000/api/content/${activePage}`);
        setContentItems(await res.json());
        setShowAddModal(false);
        setNewBlock({ section: "hero", type: "text", key: "", value: "", file: null }); // Reset
      }
    } catch (error) {
      console.error("Failed to create", error);
    }
  };

  // 4. QUICK ADD LOGO/CERT (Text fallback)
  const handleQuickAdd = async (section: string, type: string, keyPrefix: string) => {
    const existingCount = contentItems.filter(i => i.section === section && i.content_key.startsWith(keyPrefix)).length;
    const newKey = `${keyPrefix}_${existingCount + 1}`;
    
    // Open the modal pre-filled so they can upload the logo immediately!
    setNewBlock({ section, type: "image", key: newKey, value: "", file: null });
    setShowAddModal(true);
  };


  // Add a full Slide (3 blocks at once)
  const handleAddSlide = async () => {
    // Determine the next slide number
    const existingSlides = contentItems.filter(i => i.section === "hero" && i.content_key.includes("_heading")).length;
    const nextNum = existingSlides + 1;

    const newBlocks = [
      { type: "text", key: `slide_${nextNum}_heading`, val: `Slide ${nextNum} Heading` },
      { type: "text", key: `slide_${nextNum}_subheading`, val: `Slide ${nextNum} Description` },
      { type: "image", key: `slide_${nextNum}_image`, val: "" } // Leave empty so you can upload a file later
    ];

    // Create all 3 blocks in the database
    for (const block of newBlocks) {
      const formData = new FormData();
      formData.append("page", activePage);
      formData.append("section", "hero");
      formData.append("content_type", block.type);
      formData.append("content_key", block.key);
      formData.append("content_value", block.val);

      await fetch(`http://localhost:8000/api/admin/content`, {
        method: "POST",
        body: formData,
        credentials: "include"
      });
    }
    
    // Refresh the page to show the new blocks
    window.location.reload(); 
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this block?")) return;
    try {
      const response = await fetch(`http://localhost:8000/api/admin/content/${id}`, { method: "DELETE", credentials: "include" });
      if (response.ok) setContentItems(items => items.filter(item => item.id !== id));
    } catch (error) {
      console.error("Failed to delete", error);
    }
  };

  const startEdit = (item: any) => {
    setEditingId(item.id);
    setEditValue(item.content_value);
    setEditFile(null);
  };

  const formatSectionName = (name: string) => name.replace(/_/g, ' ').toUpperCase();

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-8rem)] flex flex-col relative">
      
      {/* HEADER */}
      <div className="flex justify-between items-end mb-8 shrink-0">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Website Content Manager</h1>
          <p className="text-slate-600">Manage your website blocks by section.</p>
        </div>
        <button 
          onClick={() => { setNewBlock({...newBlock, section: Object.keys(groupedContent)[0] || "hero"}); setShowAddModal(true); }}
          className="flex items-center gap-2 bg-concentra-purple text-white hover:bg-purple-900 px-4 py-2.5 rounded-lg text-sm font-bold shadow-md transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" /> Add Custom Block
        </button>
      </div>

      {/* SPLIT LAYOUT */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-8 min-h-0">
        
        {/* LEFT: Page Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-slate-700 uppercase tracking-wider text-xs">
            Website Pages
          </div>
          <div className="p-2 space-y-1 overflow-y-auto">
            {["home", "services", "about", "contact"].map((page) => (
              <button
                key={page}
                onClick={() => setActivePage(page)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all capitalize ${
                  activePage === page 
                    ? "bg-concentra-purple/10 text-concentra-purple" 
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <LayoutTemplate className="w-4 h-4" /> {page} Page
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: Section-Grouped Editor List */}
        <div className="lg:col-span-3 bg-slate-50 rounded-xl shadow-inner border border-slate-200 overflow-hidden flex flex-col">
          <div className="p-4 bg-white border-b border-slate-200 font-bold text-slate-700 uppercase tracking-wider text-xs flex justify-between">
            <span>{activePage} Page Layout Builder</span>
            {!isLoading && <span className="text-slate-400 font-medium">{contentItems.length} active blocks</span>}
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-8 relative">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <Loader2 className="w-8 h-8 animate-spin mb-2 text-concentra-purple" />
                <p>Loading database...</p>
              </div>
            ) : contentItems.length === 0 ? (
              <div className="text-center text-slate-400 py-12">No content blocks found.</div>
            ) : (
              Object.keys(groupedContent).map((sectionKey) => (
                <div key={sectionKey} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                  
                  {/* Section Header */}
                  <div className="bg-slate-800 p-4 flex justify-between items-center">
                    <h3 className="font-bold text-white tracking-widest text-sm">
                      SECTION: {formatSectionName(sectionKey)}
                    </h3>
                    
                    {/* --- NEW HERO BUTTON --- */}
                    {sectionKey === "hero" && (
                      <button onClick={handleAddSlide} className="text-xs bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded flex items-center gap-1 transition">
                        <ListPlus className="w-3 h-3" /> + Add Slide
                      </button>
                    )}

                    {sectionKey === "trusted_by" && (
                      <button onClick={() => handleQuickAdd(sectionKey, "image", "logo")} className="text-xs bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded flex items-center gap-1 transition">
                        <ListPlus className="w-3 h-3" /> Add Image Logo
                      </button>
                    )}
                    {sectionKey === "quality" && (
                      <button onClick={() => handleQuickAdd(sectionKey, "image", "cert")} className="text-xs bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded flex items-center gap-1 transition">
                        <ListPlus className="w-3 h-3" /> Add Image Cert
                      </button>
                    )}
                  </div>

                  {/* Section Blocks */}
                  <div className="p-4 space-y-4">
                    {groupedContent[sectionKey].map((item: any) => (
                      <div key={item.id} className="border border-slate-100 bg-slate-50 rounded-lg p-4 hover:border-concentra-purple/50 transition-colors">
                        
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-2">
                            {item.content_type === "text" ? <Type className="w-4 h-4 text-blue-500" /> : <ImageIcon className="w-4 h-4 text-green-500" />}
                            <span className="font-mono text-xs font-bold text-slate-500 bg-slate-200 px-2 py-1 rounded">
                              {item.content_key}
                            </span>
                          </div>
                          
                          <div className="flex gap-2">
                            {editingId !== item.id && (
                              <>
                                <button onClick={() => startEdit(item)} className="p-1.5 text-slate-400 hover:text-concentra-purple hover:bg-purple-50 rounded transition">
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button onClick={() => handleDelete(item.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </>
                            )}
                          </div>
                        </div>

                        {editingId === item.id ? (
                          <div className="animate-in fade-in space-y-3 bg-white p-3 rounded border border-slate-200">
                            {item.content_type === "text" ? (
                              <textarea 
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                className="w-full border border-concentra-purple rounded-lg p-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-concentra-purple/20"
                                rows={3}
                              />
                            ) : (
                              <div className="flex flex-col gap-2">
                                <span className="text-xs font-bold text-slate-500 uppercase">Upload New Image Replacement</span>
                                <input 
                                  type="file" 
                                  accept="image/*" 
                                  onChange={(e) => setEditFile(e.target.files?.[0] || null)} 
                                  className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-concentra-purple/10 file:text-concentra-purple hover:file:bg-concentra-purple/20 cursor-pointer"
                                />
                              </div>
                            )}
                            <div className="flex gap-2 pt-2">
                              <button onClick={() => handleSaveEdit(item)} className="flex items-center gap-1 bg-concentra-green text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-green-700 transition">
                                <Save className="w-4 h-4" /> Save Update
                              </button>
                              <button onClick={() => setEditingId(null)} className="flex items-center gap-1 bg-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-300 transition">
                                <X className="w-4 h-4" /> Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-sm font-medium text-slate-900 break-words">
                            {item.content_type === "image" ? (
                               <div className="flex items-center gap-4">
                                 <img src={item.content_value.startsWith('http') ? item.content_value : `http://localhost:8000/${item.content_value}`} alt="CMS Preview" className="w-16 h-16 object-cover rounded shadow-sm border border-slate-200 bg-white" />
                                 <span className="text-xs text-slate-400 font-mono bg-white px-2 py-1 border border-slate-200 rounded">{item.content_value}</span>
                               </div>
                            ) : (
                               item.content_value
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ADD BLOCK MODAL */}
      {showAddModal && (
        <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center rounded-xl">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-slate-900">Add Content Block</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5"/></button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Section</label>
                  <select 
                    value={newBlock.section} 
                    onChange={(e) => setNewBlock({...newBlock, section: e.target.value})}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-concentra-purple"
                  >
                    {/* Maps existing sections, or defaults */}
                    {Array.from(new Set([...Object.keys(groupedContent), "hero", "trusted_by", "expertise", "quality", "global_reach", "cta"])).map(sec => (
                      <option key={sec} value={sec}>{formatSectionName(sec)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Content Type</label>
                  <select 
                    value={newBlock.type} 
                    onChange={(e) => setNewBlock({...newBlock, type: e.target.value, value: "", file: null})}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-concentra-purple font-bold text-concentra-purple"
                  >
                    <option value="text">Text / String</option>
                    <option value="image">Image Upload</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Unique Key (e.g., card_1_image)</label>
                <input 
                  type="text" 
                  placeholder="e.g. main_image or logo_5"
                  value={newBlock.key} 
                  onChange={(e) => setNewBlock({...newBlock, key: e.target.value.toLowerCase().replace(/ /g, '_')})}
                  className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-concentra-purple font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Content Payload</label>
                {newBlock.type === "text" ? (
                  <textarea 
                    placeholder="Enter text here..."
                    value={newBlock.value} 
                    onChange={(e) => setNewBlock({...newBlock, value: e.target.value})}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-concentra-purple"
                    rows={3}
                  />
                ) : (
                  <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 flex items-center justify-center">
                     <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => setNewBlock({...newBlock, file: e.target.files?.[0] || null})} 
                        className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-concentra-purple file:text-white hover:file:bg-purple-900 cursor-pointer"
                      />
                  </div>
                )}
              </div>

              <button 
                onClick={handleAddNew}
                className="w-full bg-concentra-purple text-white py-3 rounded-lg font-bold shadow-md hover:bg-purple-900 transition-colors mt-2"
              >
                Create & Save to Database
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}