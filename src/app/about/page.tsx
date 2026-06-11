"use client";

import React from "react";
import SectionHeader from "@/components/SectionHeader";
import { Users, Shield, Target, Landmark, Award } from "lucide-react";

export default function AboutPage() {
  const coreValues = [
    { icon: Shield, title: "Zero Trust Security", desc: "Every transmission, endpoint handshake, and payload is verified with standard cryptographic signatures." },
    { icon: Target, title: "Frictionless Integration", desc: "Enforce API consistency and standardize spec templates to shrink onboarding schedules." },
    { icon: Landmark, title: "Enterprise Compliance", desc: "Continuous alignment with regulatory standards including SOC2 Type II, ISO 27001, CCPA and GDPR." },
    { icon: Users, title: "Partner Centricity", desc: "Dedicated integration engineering teams, custom SLAs, and developer sandboxes for every tier." },
  ];

  const leadership = [
    { name: "John Sterling", role: "CEO & Co-Founder", company: "Ex-Citi Core Banking Lead", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&h=150&q=80" },
    { name: "Diana Chen", role: "Chief Security Officer", company: "Ex-AWS Cryptography Lead", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80" },
    { name: "Joydeep Roy", role: "Chief Architect & DevOps Lead", company: "17+ Years Cloud Native Systems", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80" },
  ];

  return (
    <div className="flex flex-col flex-1 w-full bg-white dark:bg-slate-950 pb-20">
      
      {/* Hero Banner */}
      <section className="relative overflow-hidden pt-16 pb-20 bg-slate-950 text-white border-b border-slate-900 px-6">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto relative flex flex-col items-center text-center gap-4">
          <span className="text-xs sm:text-sm font-bold tracking-wider text-brand-400 uppercase">
            WHO WE ARE
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Our Mission & Legacy
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Standardizing enterprise digital sync capabilities, eliminating onboarding complexity, and bridging secure database ecosystems.
          </p>
        </div>
      </section>

      {/* Main Copy */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
            Bridging Legacy Systems with Secure Cloud Sync
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            BDO was founded in 2020 by a core group of banking architects and security engineers who faced a recurring problem: legacy financial networks are incredibly slow to integrate with modern partner platforms.
          </p>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            By standardizing payload schemas via GitHub Spec Kit formats and providing automated compliance testing pipelines, we&apos;ve helped dozens of Fortune 500 networks launch joint products and co-sell initiatives safely.
          </p>
          <div className="flex gap-4 items-center p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
            <Award className="h-10 w-10 text-brand-500 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Award Winning Integration Architecture</h4>
              <p className="text-xs text-slate-400 mt-0.5">Named Global Developer Portal of the Year by FinTech Weekly in 2025.</p>
            </div>
          </div>
        </div>
        
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80" 
          alt="BDO Team" 
          className="w-full h-80 lg:h-[450px] object-cover rounded-2xl shadow-lg"
        />
      </section>

      {/* Core Values */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/30 border-y border-slate-100 dark:border-slate-900 px-6">
        <div className="max-w-7xl mx-auto w-full">
          <SectionHeader
            subtitle="Foundation Principles"
            title="Our Core Values"
            description="The key standards that dictate our engineering decisions and partner relationships."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {coreValues.map((value, i) => {
              const Icon = value.icon;
              return (
                <div 
                  key={i} 
                  className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 p-6 rounded-xl flex flex-col gap-4 shadow-sm"
                >
                  <div className="h-10 w-10 rounded-lg bg-brand-50 dark:bg-brand-950 flex items-center justify-center text-brand-600 dark:text-brand-400">
                    <Icon className="h-5.5 w-5.5" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">{value.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full">
        <SectionHeader
          subtitle="EXPERT LEADERS"
          title="Our Leadership Team"
          description="Experienced banking engineers and cloud architects steering our integration vision."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 justify-center">
          {leadership.map((member, i) => (
            <div 
              key={i} 
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl shadow-sm text-center flex flex-col items-center gap-4"
            >
              <img 
                src={member.avatar} 
                alt={member.name} 
                className="h-24 w-24 rounded-full object-cover border-2 border-brand-500 shadow-md"
              />
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">{member.name}</h3>
                <span className="text-xs text-brand-600 dark:text-brand-400 font-semibold block mt-0.5">{member.role}</span>
                <p className="text-xs text-slate-400 mt-2 italic">{member.company}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
