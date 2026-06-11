"use client";

import React, { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import { usePortal } from "@/context/PortalContext";
import { Search, Calendar, User, ArrowRight, Filter } from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  const { siteData } = usePortal();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Agentic AI", "Security & DevSecOps"];

  const filteredBlogs = siteData.blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === "All" || blog.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="flex flex-col flex-1 w-full bg-white dark:bg-slate-950 pb-20">
      
      {/* Header Banner */}
      <section className="relative overflow-hidden pt-16 pb-20 bg-slate-950 text-white border-b border-slate-900 px-6">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto relative flex flex-col items-center text-center gap-4">
          <span className="text-xs sm:text-sm font-bold tracking-wider text-brand-400 uppercase">
            TECHNICAL REVIEWS & NEWS
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Developer Blog
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Read technical articles, product announcements, and architectural analysis written by our engineering team.
          </p>
        </div>
      </section>

      {/* Main Listing */}
      <section className="py-16 px-6 max-w-7xl mx-auto w-full">
        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center pb-8 border-b border-slate-100 dark:border-slate-800 mb-12">
          
          {/* Categories */}
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-brand-600 text-white"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-600 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-brand-500"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          </div>
        </div>

        {/* Blogs grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <div 
              key={blog.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-48 object-cover"
                />
                
                <div className="p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="bg-brand-50 text-brand-600 dark:bg-brand-950/30 dark:text-brand-400 px-2 py-0.5 rounded font-semibold uppercase">{blog.category}</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {blog.date}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                    {blog.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-50 dark:border-slate-800/50 mt-6 flex justify-between items-center text-xs">
                <span className="flex items-center gap-1 text-slate-400 font-semibold uppercase"><User className="h-3.5 w-3.5 text-brand-500" /> {blog.author}</span>
                
                <Link 
                  href={`/blog/${blog.id}`}
                  className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 font-bold flex items-center gap-1 group"
                >
                  Read Post 
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
