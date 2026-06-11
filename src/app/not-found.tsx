"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, HelpCircle, ArrowLeft, Layers } from "lucide-react";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col flex-1 items-center justify-center py-32 text-center px-6 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200">
      <div className="h-16 w-16 rounded-full bg-red-50 dark:bg-red-950/30 flex items-center justify-center text-red-500 mb-6 animate-pulse">
        <AlertCircle className="h-8 w-8" />
      </div>

      <h1 className="text-4xl font-extrabold tracking-tight">404 - Page Not Found</h1>
      
      <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-3 max-w-md leading-relaxed mx-auto">
        The route you are requesting does not exist, has been archived, or you lack the role credentials to view its contents.
      </p>

      <div className="flex flex-col sm:flex-row gap-3.5 justify-center mt-8">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-900 transition-all cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Go Back
        </button>
        <button
          onClick={() => router.push("/")}
          className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
        >
          <Layers className="h-3.5 w-3.5 animate-pulse" />
          Return Home
        </button>
      </div>
    </div>
  );
}
