"use client";

import React from "react";
import SectionHeader from "@/components/SectionHeader";
import { Check, ShieldAlert, Award, Star, Zap } from "lucide-react";
import Link from "next/link";

export default function PartnerProgramPage() {
  const tiers = [
    {
      name: "Developer / Silver",
      price: "Free",
      icon: Star,
      desc: "Perfect for initial product debugging, testing configurations, and setting up initial ledger mappings.",
      features: [
        "Up to 10,000 API calls / day",
        "Community support & slack access",
        "Standard developer sandbox",
        "Single client credentials token",
        "GitHub Spec Kit linters",
      ],
      cta: "Register Free Profile",
      popular: false,
    },
    {
      name: "Gold Partner",
      price: "$499/mo",
      icon: Zap,
      desc: "For growing companies launching live synchronization pipelines with standard traffic requirements.",
      features: [
        "Up to 500,000 API calls / day",
        "9-to-5 support engineering SLAs",
        "Multi-region sandbox isolation",
        "Up to 5 API keys credentials",
        "Shared transaction queues",
        "Automated KYC verifications",
      ],
      cta: "Become Gold Partner",
      popular: true,
    },
    {
      name: "Enterprise Platinum",
      price: "Custom",
      icon: Award,
      desc: "Dedicated instances for clearing networks, high-frequency exchanges, and massive daily data transfers.",
      features: [
        "Unlimited API transaction limit",
        "24/7/365 dedicated engineer SLAs",
        "Dedicated isolated VPC nodes",
        "Unlimited API credentials keys",
        "Isolated transaction queues",
        "Real-time fraud audit alerts",
        "Custom legal compliance setup",
      ],
      cta: "Contact Sales Team",
      popular: false,
    },
  ];

  return (
    <div className="flex flex-col flex-1 w-full bg-white dark:bg-slate-950 pb-20">
      
      {/* Header Banner */}
      <section className="relative overflow-hidden pt-16 pb-20 bg-slate-950 text-white border-b border-slate-900 px-6">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto relative flex flex-col items-center text-center gap-4">
          <span className="text-xs sm:text-sm font-bold tracking-wider text-brand-400 uppercase">
            COMMERCIAL ENGAGEMENT
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Our Partner Program
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Select the partner tier that matches your integration complexity, target request rates, and compliance criteria.
          </p>
        </div>
      </section>

      {/* Pricing/Tier Cards */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mt-8">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <div 
                key={tier.name}
                className={`glass-card p-8 rounded-2xl flex flex-col justify-between border relative transition-all ${
                  tier.popular 
                    ? "border-brand-500 shadow-xl shadow-brand-500/5 lg:scale-105 z-10 bg-slate-50/50 dark:bg-slate-900/40" 
                    : "border-slate-200 dark:border-slate-800 hover:border-slate-350"
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider bg-brand-600 text-white uppercase shadow-sm">
                    Most Popular Tier
                  </span>
                )}

                <div className="flex flex-col gap-6">
                  {/* Tier Header */}
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{tier.name}</h3>
                      <p className="text-xs text-slate-400 mt-1.5 leading-normal">{tier.desc}</p>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-brand-50 dark:bg-brand-950/40 flex items-center justify-center text-brand-600 dark:text-brand-400 shrink-0">
                      <Icon className="h-5.5 w-5.5" />
                    </div>
                  </div>

                  <div className="h-px bg-slate-100 dark:bg-slate-800"></div>

                  {/* Price */}
                  <div>
                    <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{tier.price}</span>
                    {tier.price !== "Custom" && <span className="text-xs text-slate-400 ml-1">/ month</span>}
                  </div>

                  {/* Features */}
                  <ul className="flex flex-col gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    {tier.features.map((feat) => (
                      <li key={feat} className="flex gap-2 items-center">
                        <Check className="h-4 w-4 text-green-500 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="mt-8">
                  <Link
                    href={tier.price === "Custom" ? "/contact" : "/register"}
                    className={`w-full text-center py-3.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all block cursor-pointer ${
                      tier.popular
                        ? "bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-500/10"
                        : "bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-700"
                    }`}
                  >
                    {tier.cta}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Program Benefits */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/30 border-y border-slate-100 dark:border-slate-900 px-6">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs sm:text-sm font-bold tracking-wider text-brand-600 dark:text-brand-400 uppercase">
              CO-SELLING & REWARDS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight mt-2">
              Partner Commission & Revenue Sharing
            </h2>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed mt-4">
              Our Gold and Platinum partners are eligible for our co-selling commission programs. By building standard SaaS modules on top of the BDO ledger syncing gateway, you can publish your integrations in our Partner Catalog and earn referral fees.
            </p>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed mt-4">
              We provide joint marketing support, structured pitch templates for enterprise clients, and co-branded sales decks to facilitate onboarding.
            </p>
          </div>
          <div className="bg-slate-900 text-slate-100 p-8 rounded-2xl border border-slate-850 shadow-lg flex flex-col gap-6">
            <h3 className="text-lg font-bold text-brand-300">Co-Sell Program Key Numbers</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-white">20%</span>
                <span className="text-xs text-slate-400 font-semibold uppercase">Referral commission</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-white">$12.4K</span>
                <span className="text-xs text-slate-400 font-semibold uppercase">Avg monthly payouts</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-white">48 hr</span>
                <span className="text-xs text-slate-400 font-semibold uppercase">Payout processing time</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-white">30+</span>
                <span className="text-xs text-slate-400 font-semibold uppercase">Enterprise Client Leads</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
