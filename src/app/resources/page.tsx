"use client";

import React, { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import { usePortal } from "@/context/PortalContext";
import { Search, Download, FileText, Terminal, BookOpen, AlertCircle } from "lucide-react";

export default function ResourcesPage() {
  const { siteData } = usePortal();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const resourceTypes = [
    { code: "all", name: "All Resources" },
    { code: "whitepaper", name: "Whitepapers" },
    { code: "documentation", name: "API Docs" },
    { code: "guide", name: "User Guides" },
    { code: "sdk", name: "Software SDKs" },
  ];

  // Filter logic
  const filteredResources = siteData.resources.filter((res) => {
    const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          res.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || res.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleDownload = (id: string, title: string) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadSuccess(title);
      setTimeout(() => setDownloadSuccess(null), 3500);
    }, 1500);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "sdk": return Terminal;
      case "documentation": return BookOpen;
      default: return FileText;
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full bg-white dark:bg-slate-950 pb-20">
      
      {/* Header Banner */}
      <section className="relative overflow-hidden pt-16 pb-20 bg-slate-950 text-white border-b border-slate-900 px-6">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto relative flex flex-col items-center text-center gap-4">
          <span className="text-xs sm:text-sm font-bold tracking-wider text-brand-400 uppercase">
            DEVELOPER ASSETS
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Resources Center
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Search, filter, and download files, API schema definitions, whitepapers, and compiled wrapper SDK libraries.
          </p>
        </div>
      </section>

      {/* Main Search Area */}
      <section className="py-12 px-6 max-w-7xl mx-auto w-full">
        {/* Toast alerts */}
        {downloadSuccess && (
          <div className="fixed top-24 right-6 bg-slate-900 border border-brand-500 text-white px-5 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-3 text-xs sm:text-sm animate-bounce">
            <CheckCircleIcon className="h-5 w-5 text-green-400 shrink-0" />
            <span>Success: Mock download for <strong>{downloadSuccess}</strong> initiated.</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Filters */}
          <div className="flex flex-col gap-6 lg:border-r lg:border-slate-100 lg:dark:border-slate-800 lg:pr-8">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Search Assets</span>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Query titles, SDKs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-brand-500"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Resource Categories</span>
              <div className="flex flex-col gap-1.5">
                {resourceTypes.map((type) => (
                  <button
                    key={type.code}
                    onClick={() => setSelectedType(type.code)}
                    className={`w-full text-left px-3 py-2 text-xs rounded-lg font-semibold transition-colors cursor-pointer ${
                      selectedType === type.code
                        ? "bg-brand-50 text-brand-600 dark:bg-brand-950/40 dark:text-brand-400"
                        : "hover:bg-slate-50 dark:hover:bg-slate-900/50 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    {type.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Resources Grid List */}
          <div className="lg:col-span-3">
            {filteredResources.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center p-16 bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 gap-3">
                <AlertCircle className="h-10 w-10 text-slate-400" />
                <h4 className="text-base font-bold text-slate-900 dark:text-white">No Assets Found</h4>
                <p className="text-xs text-slate-400 max-w-xs leading-normal">
                  No resources matched your search query. Try another keyword or reset the category filter.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredResources.map((res) => {
                  const Icon = getIcon(res.type);
                  const isDownloading = downloadingId === res.id;
                  return (
                    <div 
                      key={res.id}
                      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 p-6 rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col gap-3.5">
                        <div className="flex justify-between items-start">
                          <div className="h-9 w-9 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 shrink-0">
                            <Icon className="h-4.5 w-4.5" />
                          </div>
                          {res.size && <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono text-slate-400">{res.size}</span>}
                        </div>
                        
                        <div>
                          <span className="text-[9px] font-extrabold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                            {res.type}
                          </span>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1 leading-snug">{res.title}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{res.summary}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDownload(res.id, res.title)}
                        disabled={isDownloading}
                        className={`w-full text-center mt-6 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                          isDownloading 
                            ? "bg-slate-150 text-slate-400 dark:bg-slate-800 cursor-not-allowed" 
                            : "bg-brand-600 hover:bg-brand-700 text-white dark:bg-brand-500 dark:hover:bg-brand-600"
                        }`}
                      >
                        <Download className="h-3.5 w-3.5" />
                        {isDownloading ? "Downloading Asset..." : "Download Asset"}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}

// Simple internal check icon
function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}
