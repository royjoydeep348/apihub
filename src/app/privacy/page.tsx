"use client";

import React from "react";
import SectionHeader from "@/components/SectionHeader";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col flex-1 w-full bg-white dark:bg-slate-950 pb-20">
      
      {/* Header Banner */}
      <section className="relative overflow-hidden pt-16 pb-20 bg-slate-950 text-white border-b border-slate-900 px-6">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto relative flex flex-col items-center text-center gap-4">
          <span className="text-xs sm:text-sm font-bold tracking-wider text-brand-400 uppercase">
            REGULATORY SAFETY
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Privacy Policy
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Effective Date: June 11, 2026. Standard policies regarding credential logs, sandbox metrics, and entity privacy.
          </p>
        </div>
      </section>

      {/* Policies Text */}
      <section className="py-16 px-6 max-w-3xl mx-auto w-full text-slate-650 dark:text-slate-350 text-xs sm:text-sm leading-relaxed space-y-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white pt-4">1. Information We Collect</h2>
        <p>
          We collect partner entity metadata, developer registration details (names, business emails, company registrations), and API request log headers for security compliance monitoring.
        </p>
        
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white pt-4">2. Use of API Credentials</h2>
        <p>
          Your Client ID, Secrets, and public certificate handshakes are stored using AES-256 standard encryption arrays. They are strictly utilized to authorize partner node requests to sandbox or live instances and are never shared.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white pt-4">3. Data Auditing & Compliance</h2>
        <p>
          API logs are archived for audit checks in SOC2 compliant cloud databases. Under GDPR and CCPA guidelines, partners can request complete removal of registration profiles or access logs by contacting support.
        </p>
      </section>

    </div>
  );
}
