"use client";

import { useEffect, useState } from "react";
import { Edit2, Save, Image as ImageIcon, Type, Loader2, Plus, Trash2 } from "lucide-react";

// --- TYPES ---
interface CMSItem {
  id: number;
  page: string;
  section: string;
  content_type: string;
  content_key: string;
  content_value: string;
}

// State for bulk-editing a group
interface EditGroupState {
  [itemId: number]: {
    type: string;
    value: string;
    file: File | null;
  };
}

export default function HomeCMSDashboard() {
  const [data, setData] = useState<CMSItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Tracks which ENTIRE group (card/slide) is being edited
  const [editingGroupKey, setEditingGroupKey] = useState<string | null>(null);
  
  // Holds the temporary edits for all items in the active group
  const [editState, setEditState] = useState<EditGroupState>({});
  const [isSaving, setIsSaving] = useState(false);

  const fetchContent = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/content/home`);
      if (!res.ok) throw new Error("Failed to fetch CMS data");
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error("Error loading CMS:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  // --- START BULK EDITING A GROUP ---
  const startEditingGroup = (sectionName: string, groupName: string, items: CMSItem[]) => {
    const key = `${sectionName}-${groupName}`;
    setEditingGroupKey(key);
    
    // Populate the temporary state with all fields in this group
    const initialState: EditGroupState = {};
    items.forEach(item => {
      initialState[item.id] = {
        type: item.content_type,
        value: item.content_value,
        file: null
      };
    });
    setEditState(initialState);
  };

  // Helper to update a specific field inside the bulk editor
  const updateEditState = (id: number, field: 'type' | 'value' | 'file', val: any) => {
    setEditState(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: val
      }
    }));
  };

  // --- SMART BULK SAVE HANDLER ---
  const handleSaveGroup = async (items: CMSItem[]) => {
    setIsSaving(true);
    
    try {
      // Loop through all items in the group and process their updates concurrently
      const promises = items.map(async (item) => {
        const current = editState[item.id];
        if (!current) return;

        // 🚀 SCENARIO 1: They swapped the type (e.g. Text -> Image)
        if (current.type !== item.content_type) {
          // Delete old block
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/content/${item.id}`, { 
            method: "DELETE", credentials: "include" 
          });

          // Recreate with new type
          const formData = new FormData();
          formData.append("page", item.page);
          formData.append("section", item.section);
          formData.append("content_type", current.type);
          formData.append("content_key", item.content_key);
          
          if (current.type === "image" && current.file) {
            formData.append("file", current.file);
          } else if (current.type === "text") {
            formData.append("content_value", current.value || "Placeholder");
          }
          
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/content`, { 
            method: "POST", body: formData, credentials: "include" 
          });
        } 
        
        // 🚀 SCENARIO 2: Standard Update (Type did not change)
        else {
          let hasChanges = false;
          const formData = new FormData();

          if (current.type === "image" && current.file) {
            formData.append("file", current.file);
            hasChanges = true;
          } else if (current.type === "text" && current.value !== item.content_value) {
            formData.append("content_value", current.value);
            hasChanges = true;
          }

          // Only hit the API if they actually changed the text or uploaded a new file
          if (hasChanges) {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/content/${item.id}`, { 
              method: "PUT", body: formData, credentials: "include" 
            });
          }
        }
      });

      // Wait for all fields in the card to save before reloading
      await Promise.all(promises);
      await fetchContent();
      setEditingGroupKey(null);

    } catch (error) {
      console.error("Save error:", error);
      alert("Error saving content.");
    } finally {
      setIsSaving(false);
    }
  };

  // --- DELETE ENTIRE GROUP LOGIC ---
  const handleDeleteGroup = async (items: CMSItem[], groupName: string) => {
    if (!confirm(`Are you sure you want to permanently delete ${groupName}?`)) return;
    setIsLoading(true);
    
    try {
      // Delete all fields belonging to this slide/partner concurrently
      const promises = items.map(item => 
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/content/${item.id}`, { method: "DELETE", credentials: "include" })
      );
      
      await Promise.all(promises);
      await fetchContent();
    } catch (e) {
      console.error(e);
      alert("Failed to delete group.");
      setIsLoading(false);
    }
  };

  // Single field delete (Fallback for General Settings cleanup)
  const handleDeleteSingleField = async (id: number) => {
    if (!confirm("Delete this individual field?")) return;
    setIsLoading(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/content/${id}`, { method: "DELETE", credentials: "include" });
      await fetchContent();
    } catch (e) {
      console.error(e);
      alert("Failed to delete.");
      setIsLoading(false);
    }
  };

  // --- ADD NEW SLIDE/PARTNER LOGIC (Unchanged) ---
  const handleAddSlide = async () => {
    setIsLoading(true);
    const sliderItems = data.filter(i => i.section === 'hero_slider');
    const maxSlide = sliderItems.reduce((max, item) => {
      const match = item.content_key.match(/slide_(\d+)/);
      return match ? Math.max(max, parseInt(match[1])) : max;
    }, 0);
    const nextId = maxSlide + 1;

    const newSlideFields = [
      { key: `slide_${nextId}_image`, type: 'text', val: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070' }, 
      { key: `slide_${nextId}_subtitle`, type: 'text', val: 'New Subtitle' },
      { key: `slide_${nextId}_title`, type: 'text', val: `Slide ${nextId} Title` },
      { key: `slide_${nextId}_description`, type: 'text', val: 'Description goes here.' },
      { key: `slide_${nextId}_btn1_text`, type: 'text', val: 'Learn More' },
      { key: `slide_${nextId}_btn1_link`, type: 'text', val: '#' }
    ];

    for (const field of newSlideFields) {
      const formData = new FormData();
      formData.append("page", "home");
      formData.append("section", "hero_slider");
      formData.append("content_type", field.type);
      formData.append("content_key", field.key);
      formData.append("content_value", field.val);
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/content`, { method: "POST", body: formData, credentials: "include" });
    }
    await fetchContent();
  };

  const handleAddPartner = async () => {
    setIsLoading(true);
    const partnerItems = data.filter(i => i.section === 'trusted_by');
    const maxPartner = partnerItems.reduce((max, item) => {
      const match = item.content_key.match(/trusted_logo_(\d+)/);
      return match ? Math.max(max, parseInt(match[1])) : max;
    }, 0);
    const nextId = maxPartner + 1;

    const formData = new FormData();
    formData.append("page", "home");
    formData.append("section", "trusted_by");
    formData.append("content_type", "text");
    formData.append("content_key", `trusted_logo_${nextId}`);
    formData.append("content_value", "New Partner");
    
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/content`, { method: "POST", body: formData, credentials: "include" });
    await fetchContent();
  };

  // --- DATA ORGANIZATION ---
  const organizeContent = (items: CMSItem[]) => {
    const sections: Record<string, Record<string, CMSItem[]>> = {};

    items.forEach((item) => {
      if (!sections[item.section]) sections[item.section] = {};

      let groupName = "General Settings";

      if (item.content_key.includes("slide_")) {
        const match = item.content_key.match(/slide_(\d+)/);
        if (match) groupName = `Slide ${match[1]}`;
      } else if (item.content_key.includes("card_")) {
        const match = item.content_key.match(/card_(\d+)/);
        if (match) groupName = `Card ${match[1]}`;
      } else if (item.content_key.includes("trusted_logo_")) {
        const match = item.content_key.match(/trusted_logo_(\d+)/);
        if (match) groupName = `Partner Logo ${match[1]}`;
      } else if (item.content_key.includes("cert_logo_")) {
        const match = item.content_key.match(/cert_logo_(\d+)/);
        if (match) groupName = `Certificate Logo ${match[1]}`;
      }

      if (!sections[item.section][groupName]) {
        sections[item.section][groupName] = [];
      }
      sections[item.section][groupName].push(item);
    });

    return sections;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-concentra-purple" />
      </div>
    );
  }

  const groupedData = organizeContent(data);
  const formatTitle = (str: string) => str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  // 🚀 CUSTOM SECTION ORDERING ARRAY
  const sectionOrder = [
    "hero_slider",
    "trusted_by",
    "our_expertise",
    "quality_certificates",
    "global_reach"
  ];

  // Map the groups according to the requested order, appending any unlisted ones at the end
  const orderedSections = sectionOrder.filter(sec => groupedData[sec]);
  Object.keys(groupedData).forEach(sec => {
    if (!orderedSections.includes(sec)) orderedSections.push(sec);
  });

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-12">
      
      <div className="mb-8 border-b pb-6">
        <h1 className="text-3xl font-extrabold text-industrial-slate">Home Page CMS</h1>
        <p className="text-slate-500 mt-2">Manage text, images, and links for the public B2B portal.</p>
      </div>

      {orderedSections.map((sectionName) => {
        const groups = groupedData[sectionName];

        return (
          <div key={sectionName} className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 border-b border-slate-200 pb-4 gap-4">
              <h2 className="text-2xl font-bold text-concentra-purple uppercase tracking-wider flex items-center m-0">
                <span className="bg-concentra-purple w-2 h-6 mr-3 rounded-full inline-block"></span>
                {formatTitle(sectionName)}
              </h2>
              
              {/* DYNAMIC ACTION BUTTONS */}
              {sectionName === "hero_slider" && (
                <button onClick={handleAddSlide} className="flex items-center gap-2 bg-concentra-green hover:bg-green-600 text-white text-sm font-bold py-2 px-4 rounded transition shadow-sm">
                  <Plus className="w-4 h-4"/> Add New Slide
                </button>
              )}
              {sectionName === "trusted_by" && (
                <button onClick={handleAddPartner} className="flex items-center gap-2 bg-concentra-green hover:bg-green-600 text-white text-sm font-bold py-2 px-4 rounded transition shadow-sm">
                  <Plus className="w-4 h-4"/> Add Partner Logo
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {Object.entries(groups).map(([groupName, items]) => {
                
                // Identify if this is a dynamic group that can be safely deleted entirely
                const isDynamicGroup = groupName.includes("Slide") || groupName.includes("Partner") || groupName.includes("Card") || groupName.includes("Certificate");
                const currentGroupKey = `${sectionName}-${groupName}`;
                const isEditingThisGroup = editingGroupKey === currentGroupKey;

                return (
                  /* --- CMS GROUP CARD --- */
                  <div key={groupName} className={`bg-white p-6 rounded-xl border transition duration-300 ${isEditingThisGroup ? 'border-blue-300 shadow-lg ring-4 ring-blue-50' : 'border-slate-200 shadow-sm hover:shadow-md'}`}>
                    
                    {/* Card Header & Actions */}
                    <div className="flex justify-between items-center mb-5 border-b border-slate-100 pb-3">
                      <h3 className="font-bold text-lg text-slate-800">{groupName}</h3>
                      
                      {!isEditingThisGroup && (
                        <div className="flex gap-2">
                          {isDynamicGroup && (
                            <button 
                              onClick={() => handleDeleteGroup(items, groupName)}
                              className="text-slate-400 hover:text-red-600 bg-slate-50 hover:bg-red-50 p-1.5 rounded transition"
                              title="Delete Entire Group"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                          <button 
                            onClick={() => startEditingGroup(sectionName, groupName, items)}
                            className="text-slate-400 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 p-1.5 rounded transition border border-transparent hover:border-blue-200"
                            title="Edit Group"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                    
                    {/* Fields List */}
                    <div className="space-y-4">
                      {items.map((item) => {
                        
                        // EDITING MODE FOR THIS GROUP
                        if (isEditingThisGroup) {
                          const currentField = editState[item.id];
                          if (!currentField) return null;

                          return (
                            <div key={item.id} className="bg-slate-50 p-3 rounded border border-slate-200">
                              
                              <p className="text-xs font-semibold text-slate-500 uppercase mb-2">
                                {formatTitle(item.content_key)}
                              </p>
                              
                              {/* TYPE SWAPPER RADIO BUTTONS */}
                              <div className="flex items-center gap-4 mb-3 pb-2 border-b border-slate-200">
                                <label className="text-xs font-bold text-slate-600 flex items-center gap-1 cursor-pointer">
                                  <input type="radio" checked={currentField.type === 'text'} onChange={() => updateEditState(item.id, 'type', 'text')} /> 
                                  Text Field
                                </label>
                                <label className="text-xs font-bold text-slate-600 flex items-center gap-1 cursor-pointer">
                                  <input type="radio" checked={currentField.type === 'image'} onChange={() => updateEditState(item.id, 'type', 'image')} /> 
                                  Image Upload
                                </label>
                              </div>

                              {currentField.type === "text" ? (
                                <textarea 
                                  className="w-full text-sm border border-slate-300 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                  rows={2}
                                  value={currentField.value}
                                  onChange={(e) => updateEditState(item.id, 'value', e.target.value)}
                                />
                              ) : (
                                <input 
                                  type="file" 
                                  accept="image/*"
                                  className="text-sm w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                  onChange={(e) => updateEditState(item.id, 'file', e.target.files?.[0] || null)}
                                />
                              )}
                            </div>
                          );
                        }

                        // VIEW MODE FOR THIS GROUP
                        return (
                          <div key={item.id} className="relative group">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                                {item.content_type === "image" ? <ImageIcon className="w-3 h-3"/> : <Type className="w-3 h-3"/>}
                                {formatTitle(item.content_key)}
                              </p>
                              
                              {/* Fallback Single Delete for General Settings */}
                              {!isDynamicGroup && (
                                <button 
                                  onClick={() => handleDeleteSingleField(item.id)}
                                  className="text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>

                            <div className="overflow-hidden">
                              {item.content_type === "image" ? (
                                <img 
                                  src={item.content_value.startsWith('http') ? item.content_value : `${process.env.NEXT_PUBLIC_API_URL}/${item.content_value}`} 
                                  alt={item.content_key} 
                                  className="w-full h-24 object-cover rounded border border-slate-200 mt-1"
                                />
                              ) : (
                                <p className="text-sm text-slate-700 line-clamp-3 leading-snug">
                                  {item.content_value}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* BULK SAVE BUTTONS AT THE END OF THE CARD */}
                    {isEditingThisGroup && (
                      <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-slate-200 bg-white">
                        <button 
                          onClick={() => setEditingGroupKey(null)}
                          className="text-sm px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition"
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={() => handleSaveGroup(items)}
                          disabled={isSaving}
                          className="text-sm px-5 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50 transition shadow-sm"
                        >
                          {isSaving ? <Loader2 className="w-4 h-4 animate-spin"/> : <Save className="w-4 h-4" />}
                          Save Changes
                        </button>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

    </div>
  );
}