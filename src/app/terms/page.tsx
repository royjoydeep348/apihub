"use client";

import React from "react";
import SectionHeader from "@/components/SectionHeader";

export default function TermsPage() {
  return (
    <div className="flex flex-col flex-1 w-full bg-white dark:bg-slate-950 pb-20">
      
      {/* Header Banner */}
      <section className="relative overflow-hidden pt-16 pb-20 bg-slate-950 text-white border-b border-slate-900 px-6">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto relative flex flex-col items-center text-center gap-4">
          <span className="text-xs sm:text-sm font-bold tracking-wider text-brand-400 uppercase">
            LEGAL AGREEMENTS
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Terms of Service
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Effective Date: June 11, 2026. Legal terms governing sandbox access, SDK usage, and node SLAs.
          </p>
        </div>
      </section>

      {/* Terms Text */}
      <section className="py-16 px-6 max-w-3xl mx-auto w-full text-slate-650 dark:text-slate-350 text-xs sm:text-sm leading-relaxed space-y-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white pt-4">1. Sandbox Usage Regulations</h2>
        <p>
          Developers receive sandboxes with mock financial ledgers. Attempting to reverse-engineer matching systems or launch automated denial-of-service testing against the sandbox is strictly prohibited.
        </p>
        
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white pt-4">2. Proprietary Rights</h2>
        <p>
          GitHub Spec Kit linting libraries and pre-compiled software wrapper SDK code are licensed under standard MIT or Apache 2.0 rules unless otherwise specified in private agreements.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white pt-4">3. Limit of Liability</h2>
        <p>
          We provide the portal and mock nodes "as-is" with zero warranty. Partners are fully responsible for ensuring their integrated components meet compliance audits before routing production traffic.
        </p>
      </section>

    </div>
  );
}
