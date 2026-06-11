"use client";

import React from "react";
import SectionHeader from "@/components/SectionHeader";
import { usePortal } from "@/context/PortalContext";
import { Quote, Star } from "lucide-react";

export default function TestimonialsPage() {
  const { siteData } = usePortal();

  return (
    <div className="flex flex-col flex-1 w-full bg-white dark:bg-slate-950 pb-20">
      
      {/* Header Banner */}
      <section className="relative overflow-hidden pt-16 pb-20 bg-slate-950 text-white border-b border-slate-900 px-6">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto relative flex flex-col items-center text-center gap-4">
          <span className="text-xs sm:text-sm font-bold tracking-wider text-brand-400 uppercase">
            PARTNER TESTIMONIALS
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Client & Partner Reviews
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Read verified reviews from CTOs, product directors, and developer team leads running integrations on our platform.
          </p>
        </div>
      </section>

      {/* Grid of Testimonials */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteData.testimonials.map((test) => (
            <div 
              key={test.id}
              className="glass-card p-8 rounded-2xl flex flex-col justify-between border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <Quote className="h-8 w-8 text-brand-600 dark:text-brand-400 opacity-20" />
                  <div className="flex gap-0.5 text-yellow-500">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                
                <p className="text-xs sm:text-sm italic text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
                  "{test.quote}"
                </p>
              </div>

              <div className="h-px bg-slate-100 dark:bg-slate-800 my-6"></div>

              <div className="flex items-center gap-3">
                <img 
                  src={test.avatar} 
                  alt={test.name} 
                  className="h-10 w-10 rounded-full object-cover border border-brand-500 shrink-0"
                />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm leading-none">{test.name}</h4>
                  <span className="text-[10px] text-slate-400 block mt-1 leading-none">
                    {test.role}, {test.company}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
