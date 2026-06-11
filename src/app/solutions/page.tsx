"use client";

import React from "react";
import SectionHeader from "@/components/SectionHeader";
import { Cpu, ShieldCheck, Zap, Layers, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function SolutionsPage() {
  const solutions = [
    {
      id: "banking",
      title: "Core Banking Integration",
      icon: Cpu,
      desc: "Connect legacy systems to modern RESTful cloud infrastructure safely. Our synchronization engines convert standard ISO 8583 message streams into clean JSON webhooks in real time, preventing connection dropouts.",
      features: [
        "Bi-directional ISO 8583 message parsing.",
        "Secure TLS 1.3 socket connections.",
        "Automatic transaction failover queues.",
        "Payload filtering to exclude card owner PII records.",
      ],
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: "gateway",
      title: "Secure Enterprise Gateway",
      icon: ShieldCheck,
      desc: "Distribute access tokens safely. The secure gateway proxies requests through an isolated DMZ layer, validating digital signatures, checking role authorizations, and shielding internal nodes from denial-of-service attempts.",
      features: [
        "Mutual TLS (mTLS) handshake validation.",
        "JSON Web Signature (JWS) checking.",
        "Dynamic IP blocklists and rate limits.",
        "Real-time request routing headers.",
      ],
      img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: "onboarding",
      title: "Automated Onboarding Hub",
      icon: Zap,
      desc: "Dramatically lower registration barriers. The onboarding hub automatically validates company records against legal registrar API streams, issues risk grades, and launches test sandbox servers with pre-seeded ledgers.",
      features: [
        "Automated KYC and AML compliance checks.",
        "Instant sandbox credentials provisioning.",
        "Interactive setup guides for developer tools.",
        "Risk classification engine dashboards.",
      ],
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: "ledger",
      title: "Unified Ledger Sync",
      icon: Layers,
      desc: "Guarantee financial ledger consistency. Utilizing double-entry transaction posting endpoints and conflict-resolution logs, we synchronize ledger accounts across hybrid multi-cloud services with transactional finality.",
      features: [
        "Double-entry bookkeeping validation.",
        "At-least-once message delivery configurations.",
        "Conflict reconciliation and audit reports.",
        "Support for AWS Aurora and RDS database sync.",
      ],
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&q=80",
    },
  ];

  return (
    <div className="flex flex-col flex-1 w-full bg-white dark:bg-slate-950 pb-20">
      
      {/* Header Banner */}
      <section className="relative overflow-hidden pt-16 pb-20 bg-slate-950 text-white border-b border-slate-900 px-6">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto relative flex flex-col items-center text-center gap-4">
          <span className="text-xs sm:text-sm font-bold tracking-wider text-brand-400 uppercase">
            ENTERPRISE ECOSYSTEMS
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Our Solutions Architecture
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Secure cloud architectures designed to link core systems, automate developer verifications, and distribute transaction events.
          </p>
        </div>
      </section>

      {/* Solutions Details */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full flex flex-col gap-24">
        {solutions.map((sol, index) => {
          const Icon = sol.icon;
          const isEven = index % 2 === 0;
          return (
            <div 
              key={sol.id} 
              id={sol.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-16 items-center scroll-mt-24`}
            >
              {/* Text Area */}
              <div className={`lg:col-span-7 flex flex-col gap-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                <div className="flex items-center gap-3.5">
                  <div className="h-12 w-12 rounded-xl bg-brand-50 dark:bg-brand-950 flex items-center justify-center text-brand-600 dark:text-brand-400">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                    {sol.title}
                  </h2>
                </div>
                
                <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
                  {sol.desc}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  {sol.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex gap-2 items-start text-xs sm:text-sm">
                      <CheckCircle2 className="h-4.5 w-4.5 text-brand-500 shrink-0 mt-0.5" />
                      <span className="text-slate-700 dark:text-slate-350">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 mt-4">
                  <Link
                    href="/register"
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-sm transition-colors cursor-pointer"
                  >
                    Deploy Solution
                  </Link>
                  <Link
                    href="/contact"
                    className="px-5 py-2.5 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 dark:text-slate-200 dark:bg-slate-800 dark:border-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    Request Demo
                  </Link>
                </div>
              </div>

              {/* Image Area */}
              <div className={`lg:col-span-5 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                <img 
                  src={sol.img} 
                  alt={sol.title} 
                  className="w-full h-72 sm:h-96 object-cover rounded-2xl shadow-lg border border-slate-100 dark:border-slate-850"
                />
              </div>
            </div>
          );
        })}
      </section>

    </div>
  );
}
