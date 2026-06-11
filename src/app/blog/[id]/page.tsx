"use client";

import React, { use } from "react";
import { useParams, useRouter } from "next/navigation";
import { usePortal } from "@/context/PortalContext";
import { ArrowLeft, Calendar, User, BookOpen } from "lucide-react";
import Link from "next/link";

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const { siteData } = usePortal();
  
  const id = params.id as string;
  const blog = siteData.blogs.find((b) => b.id === id);

  if (!blog) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center py-32 text-center px-6">
        <BookOpen className="h-12 w-12 text-slate-400 mb-4 animate-bounce" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Article Not Found</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xs leading-normal">
          The blog post you are searching for does not exist or has been deleted by an administrator.
        </p>
        <button
          onClick={() => router.push("/blog")}
          className="mt-6 px-5 py-2 rounded-lg bg-brand-600 text-white font-semibold text-xs transition-colors"
        >
          Return to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 w-full bg-white dark:bg-slate-950 pb-20">
      
      {/* Blog Hero Banner */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-slate-950 text-white border-b border-slate-900 px-6">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-4xl mx-auto relative flex flex-col gap-4">
          <Link 
            href="/blog" 
            className="flex items-center gap-1.5 text-xs text-brand-400 hover:text-brand-300 font-semibold uppercase tracking-wider"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Articles
          </Link>
          
          <div className="flex gap-4.5 items-center text-xs text-slate-400 mt-2">
            <span className="bg-brand-500 text-white px-2 py-0.5 rounded font-semibold uppercase">{blog.category}</span>
            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {blog.date}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mt-2 text-white">
            {blog.title}
          </h1>

          <div className="flex items-center gap-2 mt-4 text-xs sm:text-sm text-slate-350">
            <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
              <User className="h-4 w-4 text-brand-300" />
            </div>
            <span>Written by <strong>{blog.author}</strong></span>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <article className="py-16 px-6 max-w-4xl mx-auto w-full">
        <div className="flex flex-col gap-6">
          <img 
            src={blog.image} 
            alt={blog.title} 
            className="w-full h-80 sm:h-[400px] object-cover rounded-3xl shadow-lg border border-slate-100 dark:border-slate-850 mb-6"
          />

          <div className="text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-200 border-l-4 border-brand-500 pl-4 py-1.5 leading-relaxed italic bg-slate-50/50 dark:bg-slate-900/40 rounded-r-xl pr-4">
            {blog.excerpt}
          </div>

          <div className="text-sm sm:text-base text-slate-600 dark:text-slate-350 leading-relaxed space-y-6 mt-4">
            <p>{blog.content}</p>
            <p>
              When integrating high-frequency operations, standard API definitions are highly recommended. In this article, we outline the exact linter definitions and contract enforcement commands that should be run locally using the GitHub Spec Kit framework before pushing modifications.
            </p>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-8">Deployment and Contract Verification</h3>
            <p>
              In subsequent publications, we will delve into the dynamic testing profiles within sandboxes and map out latency patterns. Ensuring that these pipelines remain resilient during network migrations guarantees 99.99% operational SLA uptime for global partners.
            </p>
          </div>
        </div>
      </article>

    </div>
  );
}
