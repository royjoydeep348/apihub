"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePortal } from "@/context/PortalContext";
import { 
  Send, Link2, MessageCircle, Code2, Globe2,
  Mail, Phone, MapPin, ShieldCheck, Layers 
} from "lucide-react";

export default function Footer() {
  const { siteData } = usePortal();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }
    
    // Simulate API newsletter signup
    setStatus("success");
    setEmail("");
    setTimeout(() => {
      setStatus("idle");
    }, 4000);
  };

  const footerLinks = [
    {
      title: "Solutions",
      items: [
        { label: "Core Banking Integration", url: "/solutions#banking" },
        { label: "Secure API Gateway", url: "/solutions#gateway" },
        { label: "Automated Onboarding", url: "/solutions#onboarding" },
        { label: "Unified Ledger Sync", url: "/solutions#ledger" },
      ],
    },
    {
      title: "Products",
      items: [
        { label: "GitHub Spec Kit", url: "/products#spec-kit" },
        { label: "Developer Sandbox", url: "/products#sandbox" },
        { label: "Software SDK wrappers", url: "/products#sdk" },
        { label: "GraphQL Schema Hub", url: "/products#graphql" },
      ],
    },
    {
      title: "Resources",
      items: [
        { label: "Documentation", url: "/resources" },
        { label: "Developer Blog", url: "/blog" },
        { label: "Platform FAQs", url: "/faq" },
        { label: "Support ticket portal", url: "/contact" },
      ],
    },
    {
      title: "Company",
      items: [
        { label: "About Us", url: "/about" },
        { label: "Partner Program", url: "/partner-program" },
        { label: "Success Stories", url: "/success-stories" },
        { label: "Contact Sales", url: "/contact" },
      ],
    },
  ];

  return (
    <footer className="w-full bg-slate-950 text-slate-300 border-t border-slate-900 pt-16 pb-8 px-6 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-slate-900">
        
        {/* Company Identity */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-brand-700 to-brand-500 flex items-center justify-center text-white">
              <Layers className="h-4.5 w-4.5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              {siteData.settings.companyName}
            </span>
          </Link>
          
          <p className="text-sm text-slate-400 max-w-sm mt-2 leading-relaxed">
            The secure developer gateway built to standardize partner APIs, accelerate cloud migrations, and establish trusted financial ledger connectivity.
          </p>

          <div className="flex flex-col gap-2.5 mt-2 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-brand-400" />
              <span>{siteData.settings.contactPhone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-brand-400" />
              <span>{siteData.settings.contactEmail}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-brand-400" />
              <span>100 Pine Street, San Francisco, CA 94111</span>
            </div>
          </div>
        </div>

        {/* Dynamic Footer Links */}
        {footerLinks.map((group) => (
          <div key={group.title} className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">
              {group.title}
            </h4>
            <ul className="flex flex-col gap-2 mt-2">
              {group.items.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.url}
                    className="text-sm text-slate-400 hover:text-brand-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Subscription & Legal Rights */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Newsletter subscription form */}
        <div className="w-full md:w-auto flex flex-col gap-2.5">
          <span className="text-sm font-semibold text-white">Subscribe to Developer Updates</span>
          <form onSubmit={handleSubscribe} className="flex max-w-sm mt-1">
            <input
              type="email"
              placeholder="developer@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-slate-200 rounded-l-lg px-4 py-2 text-sm focus:outline-none focus:border-brand-500 w-full"
              required
            />
            <button
              type="submit"
              className="bg-brand-600 hover:bg-brand-700 text-white rounded-r-lg px-4 flex items-center justify-center transition-colors cursor-pointer"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
          {status === "success" && (
            <p className="text-xs text-green-400 mt-0.5">Success! Thank you for subscribing.</p>
          )}
          {status === "error" && (
            <p className="text-xs text-red-400 mt-0.5">Please enter a valid email address.</p>
          )}
        </div>

        {/* Legal & Copyright */}
        <div className="flex flex-col items-center md:items-end gap-3 text-sm text-slate-500">
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <span>&bull;</span>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            <span>&bull;</span>
            <Link href="/faq" className="hover:text-slate-300 transition-colors">Support FAQ</Link>
          </div>
          
          {/* Social Icons */}
          <div className="flex gap-4 mt-1 text-slate-400">
            <a href="#" className="hover:text-brand-400 transition-colors" aria-label="LinkedIn"><Link2 className="h-4 w-4" /></a>
            <a href="#" className="hover:text-brand-400 transition-colors" aria-label="GitHub"><Code2 className="h-4 w-4" /></a>
            <a href="#" className="hover:text-brand-400 transition-colors" aria-label="Twitter/X"><MessageCircle className="h-4 w-4" /></a>
            <a href="#" className="hover:text-brand-400 transition-colors" aria-label="Web"><Globe2 className="h-4 w-4" /></a>
          </div>

          <p className="mt-2 text-xs text-slate-600">
            &copy; {new Date().getFullYear()} {siteData.settings.companyName} Corp. All rights reserved. Original developer ecosystem portal.
          </p>
        </div>
      </div>
    </footer>
  );
}
