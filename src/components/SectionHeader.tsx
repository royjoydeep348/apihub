"use client";

import React from "react";

interface SectionHeaderProps {
  subtitle?: string;
  title: string;
  description?: string;
  center?: boolean;
}

export default function SectionHeader({
  subtitle,
  title,
  description,
  center = true,
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 max-w-3xl flex flex-col gap-2.5 ${center ? "mx-auto text-center" : "text-left"}`}>
      {subtitle && (
        <span className="text-xs sm:text-sm font-bold tracking-wider text-brand-600 dark:text-brand-400 uppercase">
          {subtitle}
        </span>
      )}
      <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
        {title}
      </h2>
      {description && (
        <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
          {description}
        </p>
      )}
    </div>
  );
}
