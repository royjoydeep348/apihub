"use client";

import React, { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import { usePortal } from "@/context/PortalContext";
import { Search, ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

export default function FAQPage() {
  const { siteData } = usePortal();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const categories = ["All", "Onboarding", "Developer Tools", "Testing Environment", "Billing & Tiers"];

  const filteredFaqs = siteData.faqs.filter((faq) => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === "All" || faq.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const toggleFaq = (id: string) => {
    if (openFaqId === id) {
      setOpenFaqId(null);
    } else {
      setOpenFaqId(id);
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full bg-white dark:bg-slate-950 pb-20">
      
      {/* Header Banner */}
      <section className="relative overflow-hidden pt-16 pb-20 bg-slate-950 text-white border-b border-slate-900 px-6">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto relative flex flex-col items-center text-center gap-4">
          <span className="text-xs sm:text-sm font-bold tracking-wider text-brand-400 uppercase">
            COMMON INQUIRIES
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Find answers to standard questions about API keys, automated KYC checklists, sandbox balances, and program SLAs.
          </p>
        </div>
      </section>

      {/* Accordion List Section */}
      <section className="py-16 px-6 max-w-4xl mx-auto w-full">
        {/* Search & Categories */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pb-6 border-b border-slate-100 dark:border-slate-800 mb-10">
          
          {/* Scrollable Categories List */}
          <div className="flex gap-2 overflow-x-auto pb-1.5 w-full sm:w-auto scrollbar-thin">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                  selectedCategory === cat
                    ? "bg-brand-600 text-white"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-600 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64 shrink-0">
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-brand-500"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          </div>
        </div>

        {/* FAQs List */}
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 dark:bg-slate-900/30 border border-dashed border-slate-250 dark:border-slate-850 rounded-xl p-8">
            <HelpCircle className="h-9 w-9 text-slate-400 mx-auto mb-3" />
            <h4 className="font-bold text-slate-850 dark:text-slate-200">No Questions Match</h4>
            <p className="text-xs text-slate-400 mt-1.5">Please modify your search term or select another category.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850/80 rounded-xl overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left px-5 py-4 flex justify-between items-center gap-4 cursor-pointer focus:outline-none hover:bg-slate-50/50 dark:hover:bg-slate-800/10"
                  >
                    <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-snug">
                      {faq.question}
                    </span>
                    <span className="text-slate-400 shrink-0">
                      {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </span>
                  </button>
                  
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-50 dark:border-slate-800/40">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[9px] font-extrabold text-brand-600 dark:text-brand-400 uppercase tracking-wider">{faq.category}</span>
                      </div>
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

    </div>
  );
}
