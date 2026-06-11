"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumbs() {
  const pathname = usePathname();

  // If we are on the home page, do not render breadcrumbs
  if (pathname === "/") {
    return null;
  }

  // Parse path segments
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  // Generate breadcrumb items
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const url = `/${pathSegments.slice(0, index + 1).join("/")}`;
    
    // Format label: replace hyphens/underscores, capitalize first letter
    const label = segment
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    return {
      label,
      url,
      isLast: index === pathSegments.length - 1,
    };
  });

  return (
    <nav 
      aria-label="Breadcrumb" 
      className="w-full bg-slate-50 dark:bg-slate-900/40 border-y border-slate-100 dark:border-slate-800/60 py-3 px-6 text-xs sm:text-sm text-slate-500 dark:text-slate-400"
    >
      <div className="max-w-7xl mx-auto flex items-center flex-wrap gap-1.5 sm:gap-2">
        <Link 
          href="/" 
          className="flex items-center gap-1.5 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium"
        >
          <Home className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only">Home</span>
        </Link>
        
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={item.url}>
            <ChevronRight className="h-3 w-3 text-slate-400 dark:text-slate-600 shrink-0" />
            {item.isLast ? (
              <span 
                className="text-slate-800 dark:text-slate-200 font-semibold truncate max-w-[150px] sm:max-w-none" 
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              <Link 
                href={item.url} 
                className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium truncate max-w-[150px] sm:max-w-none"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
}
