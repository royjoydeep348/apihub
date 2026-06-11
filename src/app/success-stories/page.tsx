"use client";

import React, { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import { usePortal } from "@/context/PortalContext";
import { Award, ArrowRight, Download, Filter } from "lucide-react";
import Link from "next/link";

export default function SuccessStoriesPage() {
  const { siteData } = usePortal();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Banking Modernization", "Compliance & Security"];

  const filteredStories = selectedCategory === "All"
    ? siteData.caseStudies
    : siteData.caseStudies.filter((cs) => cs.category === selectedCategory);

  return (
    <div className="flex flex-col flex-1 w-full bg-white dark:bg-slate-950 pb-20">
      
      {/* Header Banner */}
      <section className="relative overflow-hidden pt-16 pb-20 bg-slate-950 text-white border-b border-slate-900 px-6">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto relative flex flex-col items-center text-center gap-4">
          <span className="text-xs sm:text-sm font-bold tracking-wider text-brand-400 uppercase">
            CLIENT PARTNERSHIPS
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Client Success Stories
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Read how global financial networks, retail banks, and fintech processors migrate rails and scale with BDO.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-6 max-w-7xl mx-auto w-full">
        {/* Category Filters */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-10 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 font-semibold uppercase">
            <Filter className="h-4.5 w-4.5" />
            <span>Filter Case Studies:</span>
          </div>
          
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-brand-600 text-white shadow-sm"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-655 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Stories Listing */}
        <div className="flex flex-col gap-16">
          {filteredStories.map((cs, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div 
                key={cs.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
              >
                {/* Image */}
                <div className={`lg:col-span-5 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                  <img 
                    src={cs.image} 
                    alt={cs.client} 
                    className="w-full h-80 object-cover rounded-2xl shadow-md border border-slate-100 dark:border-slate-850"
                  />
                </div>

                {/* Text Content */}
                <div className={`lg:col-span-7 flex flex-col gap-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold tracking-wider text-brand-600 dark:text-brand-400 uppercase">
                      {cs.category}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold uppercase">{cs.client}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                    {cs.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {cs.content}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Business Outcome</span>
                      <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1">{cs.outcome}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">ROI Metric</span>
                      <p className="text-base font-extrabold text-brand-600 dark:text-brand-400 mt-0.5">{cs.roi}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button className="flex items-center gap-1.5 px-4.5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold shadow-sm transition-colors cursor-pointer">
                      <Download className="h-4 w-4" />
                      Download Case Study PDF
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
