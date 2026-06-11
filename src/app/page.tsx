"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePortal } from "@/context/PortalContext";
import SectionHeader from "@/components/SectionHeader";
import Breadcrumbs from "@/components/Breadcrumbs";
import * as Icons from "lucide-react";
import { motion } from "framer-motion";

// Helper component for dynamic Lucide Icons
const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) return <Icons.HelpCircle className={className} />;
  return <IconComponent className={className} />;
};

export default function Home() {
  const { siteData } = usePortal();
  const [activeTab, setActiveTab] = useState("api-spec");
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // Auto-playing testimonials carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonialIndex((prevIndex) => 
        prevIndex === siteData.testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);
    return () => clearInterval(timer);
  }, [siteData.testimonials.length]);

  // Metric stats
  const metrics = [
    { label: "Modernization Experience", value: "17+ Years", desc: "Proven track record in digital infrastructure modernisation." },
    { label: "Service Level Agreement", value: "99.99% Uptime", desc: "Enterprise-grade reliability for transaction pipelines." },
    { label: "Active Integrations", value: "50+ Financial Partners", desc: "Standardized node deployments across global clearing houses." },
    { label: "Average API Response", value: "45ms Latency", desc: "Sub-second sync response speeds under peak volume." },
  ];

  // Feature list
  const features = {
    "api-spec": {
      title: "GitHub Spec Kit Standardization",
      desc: "Our automated build pipeline ensures all partner API schemas conform strictly to OpenAPI specs before deployment, decreasing parsing anomalies.",
      bullets: [
        "Enforces unified payload naming standards.",
        "Auto-checks schemas against enterprise security criteria.",
        "Generates mock responses dynamically.",
      ],
      code: `// Spec Kit JSON Schema Contract Definition
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "PartnerTransaction",
  "type": "object",
  "required": ["transactionId", "amount", "senderBin"],
  "properties": {
    "transactionId": { "type": "string", "format": "uuid" },
    "amount": { "type": "number", "minimum": 0.01 },
    "senderBin": { "type": "string", "pattern": "^[0-9]{6,8}$" }
  }
}`,
    },
    "sandbox": {
      title: "Interactive Developer Sandboxes",
      desc: "Instant provisioning of fully-isolated sandboxes preloaded with mock financial tables, allowing developers to safely debug REST endpoints.",
      bullets: [
        "Pre-filled ledger balances for stress-testing.",
        "Realistic latency mapping to match live systems.",
        "Complete transaction history analytics.",
      ],
      code: `// Fetch mock accounts balances
curl -X GET "https://sandbox.bdo.com/v1/accounts" \\
  -H "Authorization: Bearer mock_token_platinum" \\
  -H "X-Partner-Id: Capgemini_Aero"

// Response: Status 200 OK
{
  "accountNumber": "NXP-9098-883",
  "balance": 25000000.00,
  "currency": "USD",
  "status": "ACTIVE"
}`,
    },
    "compliance": {
      title: "Automated Regulatory Verifications",
      desc: "Shrink onboarding overhead. Our automated compliance checker matches company registry details against regulatory tables inside the onboarding wizard.",
      bullets: [
        "Real-time background verification engines.",
        "Compliant with GDPR, SOC2, and ISO 27001 architectures.",
        "Dynamic risk grading dashboard modules.",
      ],
      code: `// Check background risk parameters
const { validateEntity } = require('@bdo/compliance-validator');

const result = await validateEntity({
  legalName: "FinBank Global Ltd",
  registrationNumber: "UK-909283-F",
  jurisdiction: "GB"
});

console.log(result.riskScore); // Output: "LOW" (Passed KYC)`,
    },
  };

  return (
    <div className="flex flex-col flex-1 w-full bg-white dark:bg-slate-950">
      
      {/* 1. Hero Banner */}
      <section className="relative overflow-hidden pt-12 pb-24 md:py-32 hero-gradient border-b border-slate-100 dark:border-slate-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-60"></div>
        <div className="max-w-7xl mx-auto px-6 relative flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6 max-w-4xl"
          >
            {/* Small Pill Tag */}
            <span className="mx-auto flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-100 dark:bg-brand-900/30 dark:text-brand-300 dark:border-brand-800">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-ping"></span>
              Enterprise Partner Platform
            </span>

            {/* Configurable Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white">
              {siteData.hero.headline}
            </h1>

            {/* Configurable Description */}
            <p className="text-base sm:text-xl text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
              {siteData.hero.description}
            </p>

            {/* Call To Actions */}
            <div className="flex flex-col sm:flex-row gap-3.5 justify-center mt-4">
              <Link
                href={siteData.hero.primaryCtaUrl}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600 rounded-xl shadow-lg shadow-brand-500/10 transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                {siteData.hero.primaryCtaText}
              </Link>
              <Link
                href={siteData.hero.secondaryCtaUrl}
                className="px-6 py-3.5 text-sm font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 dark:text-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 transition-all hover:-translate-y-0.5"
              >
                {siteData.hero.secondaryCtaText}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Breadcrumbs Component (Dynamically rendered at top of page body) */}
      <Breadcrumbs />

      {/* 3. Trusted By Logo Section */}
      <section className="py-12 bg-slate-50/50 dark:bg-slate-900/10 border-b border-slate-100 dark:border-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-6">
            Trusted By Market Leaders & clearing networks globally
          </p>
          
          {/* Logo slider container */}
          <div className="relative w-full overflow-hidden py-4">
            <div className="animate-infinite-scroll flex gap-16 items-center">
              {/* Double arrays to support seamless loop scrolling */}
              {[...siteData.clientLogos, ...siteData.clientLogos].map((logo, index) => (
                <div 
                  key={`${logo.id}-${index}`}
                  className="flex items-center gap-2 grayscale hover:grayscale-0 opacity-55 hover:opacity-100 transition-all duration-300 transform hover:scale-105 shrink-0"
                >
                  <img 
                    src={logo.logoUrl} 
                    alt={logo.name} 
                    className="h-7 w-auto object-contain rounded"
                    onError={(e) => {
                      // fallback representation if Unsplash fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{logo.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Services & Solutions (Card-based grid) */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full">
        <SectionHeader
          subtitle="Solutions Portfolio"
          title="Digital Gateway Capabilities"
          description="Tailored cloud architecture designed to connect partner databases, sync ledgers, and secure API networks safely."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteData.solutions.map((sol, index) => (
            <motion.div
              key={sol.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="glass-card hover:border-brand-300 dark:hover:border-brand-800 p-6 rounded-xl flex flex-col justify-between transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex flex-col gap-4">
                <div className="h-10 w-10 rounded-lg bg-brand-50 dark:bg-brand-950 flex items-center justify-center text-brand-600 dark:text-brand-400">
                  <DynamicIcon name={sol.icon} className="h-5.5 w-5.5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{sol.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    {sol.description}
                  </p>
                </div>
              </div>
              
              <Link 
                href={sol.learnMoreUrl}
                className="text-xs font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 flex items-center gap-1 mt-6 group"
              >
                Learn More 
                <Icons.ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Why Choose Us (Metrics counters & badges) */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/30 border-y border-slate-100 dark:border-slate-900 px-6">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text descriptions */}
          <div className="flex flex-col gap-6">
            <span className="text-xs sm:text-sm font-bold tracking-wider text-brand-600 dark:text-brand-400 uppercase">
              Security & Reliability
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
              Enterprise-Grade Foundation Built on Trust
            </h2>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
              We understand the complexities of core banking ledger synchronization. Our infrastructure utilizes advanced cryptographic handshakes, secure environment isolation, and automated spec validation rules to prevent data loss.
            </p>
            
            {/* Compliance badges */}
            <div className="flex flex-wrap gap-4 mt-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold">
                <Icons.Shield className="h-4 w-4 text-green-500" />
                <span>SOC 2 Type II Certified</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold">
                <Icons.CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>GDPR & CCPA Compliant</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold">
                <Icons.Lock className="h-4 w-4 text-green-500" />
                <span>ISO 27001 Blueprint</span>
              </div>
            </div>
          </div>

          {/* Metric grids */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {metrics.map((metric, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-6 rounded-xl flex flex-col gap-2 shadow-sm"
              >
                <span className="text-2xl sm:text-3xl font-extrabold text-brand-600 dark:text-brand-400">{metric.value}</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{metric.label}</span>
                <p className="text-xs text-slate-400 mt-1 leading-normal">{metric.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Platform Features (Interactive comparison/code block tabs) */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full">
        <SectionHeader
          subtitle="Developer Experience"
          title="Interactive Platform Features"
          description="Click the tabs below to explore our codebase specifications, developer sandbox APIs, and compliance tools."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-8">
          {/* Tab Selector Buttons */}
          <div className="lg:col-span-4 flex flex-col gap-3.5">
            {Object.entries(features).map(([key, value]) => {
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`w-full text-left p-5 rounded-xl border transition-all cursor-pointer ${
                    isActive
                      ? "border-brand-500 bg-brand-50/20 dark:bg-brand-950/20 shadow-md"
                      : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  <h3 className={`font-bold text-sm sm:text-base ${isActive ? "text-brand-600 dark:text-brand-400" : "text-slate-800 dark:text-slate-200"}`}>
                    {value.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-normal">
                    {key === "api-spec" ? "Unified Swagger contracts" : key === "sandbox" ? "Dummy testing rails" : "Automated KYC modules"}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Details & Live Code Console */}
          <div className="lg:col-span-8 bg-slate-900 text-slate-100 rounded-2xl shadow-xl flex flex-col overflow-hidden border border-slate-800">
            {/* Console top header */}
            <div className="bg-slate-950 px-5 py-3.5 border-b border-slate-800 flex justify-between items-center text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-500"></span>
                <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
                <span className="h-3 w-3 rounded-full bg-green-500"></span>
                <span className="ml-2 font-semibold">bdo_console.sh</span>
              </div>
              <span>UTF-8</span>
            </div>
            
            {/* Console body content */}
            <div className="p-6 sm:p-8 flex flex-col gap-6 flex-1 justify-between">
              <div className="flex flex-col gap-4">
                <h4 className="text-base sm:text-lg font-bold text-brand-300">
                  {features[activeTab as keyof typeof features].title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {features[activeTab as keyof typeof features].desc}
                </p>
                
                <ul className="flex flex-col gap-2 mt-2 text-xs sm:text-sm text-slate-300">
                  {features[activeTab as keyof typeof features].bullets.map((b, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Icons.Check className="h-4 w-4 text-brand-400 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Code snippet block */}
              <div className="bg-slate-950 p-4 rounded-lg font-mono text-xs text-brand-200 overflow-x-auto mt-4 max-h-[180px]">
                <pre>{features[activeTab as keyof typeof features].code}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Process Workflow Timeline */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/30 border-y border-slate-100 dark:border-slate-900 px-6">
        <div className="max-w-7xl mx-auto w-full">
          <SectionHeader
            subtitle="onboarding timeline"
            title="Step-by-Step Onboarding Journey"
            description="Our structured validation lifecycle allows enterprise developers to register and scale integrations quickly."
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative mt-12">
            
            {/* Onboarding steps list */}
            {[
              { step: "01", title: "Apply Online", desc: "Submit contact records and API integration requirements via our secure multi-step registration wizard." },
              { step: "02", title: "Compliance Check", desc: "Our background validation engine checks entity registration documents and issues active risk scores." },
              { step: "03-SANDBOX", title: "Sandbox Testing", desc: "Instantly deploy your sandbox environment. Verify REST or GraphQL contract structures safely." },
              { step: "04-LIVE", title: "Go Live & Scale", desc: "Activate production keys, configure real-time alert webhooks, and start syncing node logs." },
            ].map((item, index) => (
              <div key={index} className="flex flex-col gap-4 relative">
                {/* Visual number step indicator */}
                <div className="h-10 w-10 rounded-full bg-brand-600 text-white font-extrabold text-xs flex items-center justify-center shadow-lg shadow-brand-500/10 shrink-0">
                  {item.step}
                </div>
                
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Client Testimonials */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full overflow-hidden">
        <SectionHeader
          subtitle="Testimonials"
          title="What Our Partners Say"
          description="Hear from tech leaders, operations managers, and CTOs utilizing the BDO portal."
        />

        <div className="relative max-w-4xl mx-auto bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 sm:p-12 rounded-2xl shadow-sm">
          {/* Testimonial slider card */}
          {siteData.testimonials.map((test, index) => {
            const isCurrent = index === currentTestimonialIndex;
            if (!isCurrent) return null;
            return (
              <div 
                key={test.id}
                className="flex flex-col gap-6 text-center sm:text-left"
              >
                <Icons.Quote className="h-10 w-10 text-brand-600 dark:text-brand-400 opacity-20 mx-auto sm:mx-0" />
                <p className="text-base sm:text-xl font-medium italic text-slate-800 dark:text-slate-100 leading-relaxed">
                  "{test.quote}"
                </p>
                <div className="h-px bg-slate-200 dark:bg-slate-800 my-2"></div>
                
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={test.avatar} 
                      alt={test.name} 
                      className="h-12 w-12 rounded-full object-cover border-2 border-brand-500"
                    />
                    <div className="text-left">
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base leading-none">{test.name}</h4>
                      <span className="text-xs text-slate-400 mt-1 block">{test.role}, {test.company}</span>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex gap-1 text-yellow-500">
                    {[...Array(test.rating)].map((_, i) => (
                      <Icons.Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Dots Indicator */}
          <div className="flex justify-center gap-1.5 mt-8">
            {siteData.testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonialIndex(index)}
                className={`h-2.5 w-2.5 rounded-full transition-all cursor-pointer ${
                  index === currentTestimonialIndex ? "bg-brand-600 w-6" : "bg-slate-300 dark:bg-slate-700"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 9. Success Stories Case Study Highlight */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/30 border-y border-slate-100 dark:border-slate-900 px-6">
        <div className="max-w-7xl mx-auto w-full">
          <SectionHeader
            subtitle="Case Studies"
            title="Featured Success Story"
            description="Discover how our partners achieve massive business results and reduce code integration friction."
          />

          {siteData.caseStudies.slice(0, 1).map((cs) => (
            <div 
              key={cs.id}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-2 mt-8 items-center"
            >
              <img 
                src={cs.image} 
                alt={cs.client} 
                className="w-full h-64 lg:h-full object-cover min-h-[300px]"
              />
              <div className="p-8 sm:p-12 flex flex-col gap-6">
                <span className="text-xs font-bold tracking-wider text-brand-600 dark:text-brand-400 uppercase">
                  {cs.category}
                </span>
                
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                  {cs.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {cs.summary}
                </p>
                
                <div className="bg-brand-50/50 dark:bg-brand-950/20 border border-brand-100 dark:border-brand-900/40 p-4 rounded-xl">
                  <span className="text-xs text-slate-400 block font-semibold uppercase">Business Outcome:</span>
                  <span className="text-sm font-bold text-slate-850 dark:text-slate-200 mt-1 block">{cs.outcome}</span>
                  <span className="text-lg font-extrabold text-brand-600 dark:text-brand-400 mt-2 block">{cs.roi}</span>
                </div>

                <Link
                  href="/success-stories"
                  className="px-5 py-2.5 text-xs font-semibold text-center text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg shadow-sm transition-colors mt-2"
                >
                  Read Success Stories
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Resources Center Summary */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full">
        <SectionHeader
          subtitle="Developer library"
          title="Resources Center Guides"
          description="Browse documentation manuals, compliance blueprints, and download wrapper SDKs."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {siteData.resources.slice(0, 4).map((res) => (
            <div 
              key={res.id} 
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-xl flex gap-4 items-start"
            >
              <div className="h-10 w-10 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 text-slate-500">
                {res.type === "sdk" ? <Icons.Terminal className="h-5 w-5" /> : <Icons.FileText className="h-5 w-5" />}
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{res.type}</span>
                  {res.size && <span className="text-xs text-slate-400">{res.size}</span>}
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">{res.title}</h4>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-normal">{res.summary}</p>
                <Link 
                  href="/resources" 
                  className="text-xs font-bold text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 mt-2 block"
                >
                  Download Asset
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. Final Call-to-Action */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full">
        <div className="bg-gradient-to-tr from-brand-950 via-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-16 text-center border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="relative max-w-3xl mx-auto flex flex-col gap-6">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Ready to Accelerate Your Enterprise Integration?
            </h2>
            <p className="text-xs sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
              Register a partner profile, explore the sandbox, download the spec kit contracts, and launch production nodes with complete confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
              <Link
                href="/register"
                className="px-6 py-3.5 text-xs sm:text-sm font-semibold text-slate-950 bg-white hover:bg-slate-100 rounded-xl transition-all hover:-translate-y-0.5"
              >
                Become a Partner
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-700 transition-all hover:-translate-y-0.5"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
