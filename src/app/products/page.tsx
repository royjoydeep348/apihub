"use client";

import React, { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import { BookOpen, Terminal, CodeSquare, Check, Copy, CheckCircle } from "lucide-react";

export default function ProductsPage() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const codeBlocks = {
    speckit: `// speckit-config.yaml
specKit:
  version: "1.0.0"
  rules:
    naming: camelCase
    requireDescription: true
    maxPayloadSizeBytes: 10485760 # 10MB
    allowedAuthMechanisms:
      - OAuth2
      - MutualTLS
    enforceSecurityHeaders: true
  mockGenerator:
    delayMs: 200
    seedBalances: true`,
    sandbox: `// test-sandbox-request.js
const axios = require('axios');

async function checkGateway() {
  const response = await axios.get('https://sandbox.bdo.com/v1/health', {
    headers: {
      'Authorization': 'Bearer test_key_gold_883',
      'X-Partner-Code': 'NXP_DEVELOPER'
    }
  });
  console.log(response.data.status); // "HEALTHY"
}
checkGateway();`,
  };

  const products = [
    {
      id: "spec-kit",
      title: "GitHub Spec Kit",
      icon: BookOpen,
      desc: "Standardize contract schemas. The GitHub Spec Kit is a CLI linter and GitHub Action that checks partner OpenAPI yaml documents against strict naming structures, payload limits, and authentication constraints before letting codes merge.",
      details: [
        "GitHub Actions builder integration.",
        "Automatic Swagger YAML linting rules.",
        "Pre-deployment contract verification.",
        "Auto-generation of client SDK wrappers.",
      ],
      code: codeBlocks.speckit,
      codeLang: "YAML",
    },
    {
      id: "sandbox",
      title: "Developer Sandbox",
      icon: Terminal,
      desc: "Isolated virtual playground. Provision sandboxes loaded with realistic account metrics, transactional logs, and compliance tables to verify integrations without risk of moving actual capital.",
      details: [
        "10k calls/day free rate tier limit.",
        "Mock payment rail webhooks logs.",
        "Custom database configuration models.",
        "Dynamic error injection simulation.",
      ],
      code: codeBlocks.sandbox,
      codeLang: "JavaScript",
    },
    {
      id: "sdk",
      title: "Software Wrapper SDKs",
      icon: CodeSquare,
      desc: "Pre-compiled connection libraries. Access verified wrapper libraries to connect ledger networks. Available in major frameworks, featuring built-in token renewals, request signing, and automatic socket retries.",
      details: [
        "Node.js & TypeScript wrapper module.",
        "Go (Golang) secure sync client.",
        "Java enterprise ledger connector.",
        "Python data synchronization scripts.",
      ],
      code: `// Install via package manager
npm install @bdo/ledger-client-node

// Go Module
go get github.com/bdo/ledger-client-go`,
      codeLang: "Bash",
    },
  ];

  return (
    <div className="flex flex-col flex-1 w-full bg-white dark:bg-slate-950 pb-20">
      
      {/* Header Banner */}
      <section className="relative overflow-hidden pt-16 pb-20 bg-slate-950 text-white border-b border-slate-900 px-6">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto relative flex flex-col items-center text-center gap-4">
          <span className="text-xs sm:text-sm font-bold tracking-wider text-brand-400 uppercase">
            DEVELOPER PLATFORM
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Our Developer Products
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Standardize schemas with local spec kits, debug integration logic in sandboxes, and import compiled software wrapper SDKs.
          </p>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full flex flex-col gap-24">
        {products.map((prod) => {
          const Icon = prod.icon;
          return (
            <div 
              key={prod.id} 
              id={prod.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch scroll-mt-24"
            >
              {/* Product Info */}
              <div className="lg:col-span-6 flex flex-col gap-6 justify-between">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-brand-50 dark:bg-brand-950 flex items-center justify-center text-brand-600 dark:text-brand-400 shrink-0">
                      <Icon className="h-5.5 w-5.5" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      {prod.title}
                    </h2>
                  </div>
                  
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {prod.desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                    {prod.details.map((detail, idx) => (
                      <div key={idx} className="flex gap-2 items-center text-xs text-slate-600 dark:text-slate-400">
                        <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <button className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg shadow-sm transition-colors cursor-pointer">
                    Download {prod.title} Documentation
                  </button>
                </div>
              </div>

              {/* Code Console */}
              <div className="lg:col-span-6 bg-slate-900 text-slate-100 rounded-2xl shadow-xl flex flex-col overflow-hidden border border-slate-800 min-h-[280px]">
                <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex justify-between items-center text-xs text-slate-400 font-mono">
                  <span>console_output.{prod.codeLang.toLowerCase()}</span>
                  <button
                    onClick={() => handleCopy(prod.code, prod.id)}
                    className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors"
                  >
                    {copiedText === prod.id ? (
                      <>
                        <Check className="h-3 w-3 text-green-400" />
                        <span className="text-green-400 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
                
                <div className="p-5 flex-1 bg-slate-950/40 font-mono text-[11px] sm:text-xs text-brand-200 overflow-x-auto whitespace-pre">
                  <pre>{prod.code}</pre>
                </div>
              </div>

            </div>
          );
        })}
      </section>

    </div>
  );
}
