"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePortal } from "@/context/PortalContext";
import {
  Zap,
  Building2,
  User,
  Mail,
  Phone,
  Globe,
  ChevronRight,
  ChevronLeft,
  Check,
  Shield,
  FileText,
  Briefcase,
  ArrowRight,
} from "lucide-react";

interface FormData {
  // Step 1: Company Info
  companyName: string;
  industry: string;
  companySize: string;
  website: string;
  country: string;
  // Step 2: Contact Info
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  // Step 3: Partnership Details
  partnerType: string;
  integrationUseCase: string;
  estimatedVolume: string;
  termsAgreed: boolean;
}

const steps = [
  { id: 1, title: "Company Info", icon: Building2, description: "Tell us about your organization" },
  { id: 2, title: "Your Details", icon: User, description: "Primary contact information" },
  { id: 3, title: "Partnership", icon: Briefcase, description: "Integration requirements" },
  { id: 4, title: "Complete", icon: Check, description: "Review and submit" },
];

const industries = ["Banking & Finance", "Payments & FinTech", "Insurance", "Wealth Management", "Lending & Credit", "RegTech & Compliance", "Other Financial Services"];
const companySizes = ["1–10 employees", "11–50 employees", "51–200 employees", "201–1,000 employees", "1,001–10,000 employees", "10,000+ employees"];
const partnerTypes = ["Technology Integration Partner", "Reseller Partner", "Referral Partner", "SI / Consulting Partner", "OEM Partner"];
const useCases = ["Core Banking Connectivity", "Payments Rail Integration", "Compliance & KYC Automation", "Data Analytics & Reporting", "Customer Portal Build-Out", "Other"];
const volumes = ["Under 10K API calls/day", "10K–100K calls/day", "100K–1M calls/day", "1M–10M calls/day", "10M+ calls/day"];

export default function RegisterPage() {
  const { login, siteData } = usePortal();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    industry: "",
    companySize: "",
    website: "",
    country: "",
    firstName: "",
    lastName: "",
    title: "",
    email: "",
    phone: "",
    partnerType: "",
    integrationUseCase: "",
    estimatedVolume: "",
    termsAgreed: false,
  });

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep((s) => s + 1);
  };
  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000));
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const handleDashboard = () => {
    login("partner", {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      company: formData.companyName,
    });
    router.push("/dashboard");
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-6">
        <div className="max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-[var(--foreground)] mb-3">
            Application Submitted!
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-2">
            Welcome, <strong>{formData.firstName}</strong>! Your partner application for{" "}
            <strong>{formData.companyName}</strong> has been received.
          </p>
          <p className="text-slate-400 text-sm mb-8">
            Our compliance engine is reviewing your submission. You&apos;ll receive a
            confirmation email at <strong>{formData.email}</strong> within 24-48 hours.
          </p>
          <div className="p-4 bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 rounded-2xl mb-8 text-left">
            <p className="text-xs font-semibold text-brand-700 dark:text-brand-300 uppercase tracking-wider mb-2">
              For Demo Purposes
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Skip the wait and access your Partner Dashboard immediately to explore all features.
            </p>
          </div>
          <button
            onClick={handleDashboard}
            className="w-full py-3 px-6 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            Go to Partner Dashboard
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <Link
            href="/"
            className="block mt-4 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-9 h-9 bg-brand-500 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-[var(--foreground)]">
              {siteData.settings.companyName}
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
            Become a Partner
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Complete the form below to apply for NexusPort partner access.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-10 overflow-x-auto pb-2">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isDone = currentStep > step.id;
            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center gap-1 min-w-[80px]">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      isDone
                        ? "bg-brand-600 border-brand-600 text-white"
                        : isActive
                        ? "border-brand-500 bg-brand-50 dark:bg-brand-950/50 text-brand-600"
                        : "border-slate-200 dark:border-slate-700 text-slate-400"
                    }`}
                  >
                    {isDone ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <span
                    className={`text-xs font-medium transition-colors ${
                      isActive
                        ? "text-brand-600 dark:text-brand-400"
                        : isDone
                        ? "text-brand-500"
                        : "text-slate-400"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 transition-colors duration-500 ${
                      currentStep > step.id ? "bg-brand-500" : "bg-slate-200 dark:bg-slate-700"
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Form Card */}
        <div className="glass-card rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-800">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[var(--foreground)]">
              {steps[currentStep - 1].title}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              {steps[currentStep - 1].description}
            </p>
          </div>

          {/* Step 1: Company Info */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                    Company Name *
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      id="company-name"
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => updateField("companyName", e.target.value)}
                      placeholder="Acme Corp"
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-brand-950/20 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                    Website
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      id="company-website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => updateField("website", e.target.value)}
                      placeholder="https://acmecorp.com"
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-brand-950/20 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                  Industry *
                </label>
                <select
                  id="company-industry"
                  value={formData.industry}
                  onChange={(e) => updateField("industry", e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-brand-950/20 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="">Select your industry</option>
                  {industries.map((ind) => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                    Company Size *
                  </label>
                  <select
                    id="company-size"
                    value={formData.companySize}
                    onChange={(e) => updateField("companySize", e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-brand-950/20 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="">Select size</option>
                    {companySizes.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                    Country / Region
                  </label>
                  <input
                    id="company-country"
                    type="text"
                    value={formData.country}
                    onChange={(e) => updateField("country", e.target.value)}
                    placeholder="United States"
                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-brand-950/20 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Contact Info */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                    First Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      id="reg-first-name"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => updateField("firstName", e.target.value)}
                      placeholder="Jane"
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-brand-950/20 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                    Last Name *
                  </label>
                  <input
                    id="reg-last-name"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    placeholder="Doe"
                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-brand-950/20 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                  Job Title / Role
                </label>
                <input
                  id="reg-title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  placeholder="VP of Technology"
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-brand-950/20 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                  Work Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="reg-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="jane@acmecorp.com"
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-brand-950/20 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="reg-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-brand-950/20 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Partnership Details */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                  Partner Type *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {partnerTypes.map((pt) => (
                    <button
                      key={pt}
                      type="button"
                      onClick={() => updateField("partnerType", pt)}
                      className={`text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                        formData.partnerType === pt
                          ? "border-brand-500 bg-brand-50 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300 font-medium"
                          : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-brand-300"
                      }`}
                    >
                      {pt}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                  Primary Use Case
                </label>
                <select
                  id="use-case"
                  value={formData.integrationUseCase}
                  onChange={(e) => updateField("integrationUseCase", e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-brand-950/20 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="">Select use case</option>
                  {useCases.map((uc) => (
                    <option key={uc} value={uc}>{uc}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                  Estimated API Volume
                </label>
                <select
                  id="api-volume"
                  value={formData.estimatedVolume}
                  onChange={(e) => updateField("estimatedVolume", e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-brand-950/20 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="">Select volume</option>
                  {volumes.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Step 4: Review & Submit */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 dark:bg-brand-950/30 rounded-xl">
                  <p className="text-xs uppercase tracking-wider text-slate-400 mb-2 font-medium">Company</p>
                  <p className="font-semibold text-[var(--foreground)]">{formData.companyName || "—"}</p>
                  <p className="text-sm text-slate-500">{formData.industry}</p>
                  <p className="text-sm text-slate-500">{formData.companySize}</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-brand-950/30 rounded-xl">
                  <p className="text-xs uppercase tracking-wider text-slate-400 mb-2 font-medium">Contact</p>
                  <p className="font-semibold text-[var(--foreground)]">
                    {formData.firstName} {formData.lastName}
                  </p>
                  <p className="text-sm text-slate-500">{formData.title}</p>
                  <p className="text-sm text-slate-500">{formData.email}</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-brand-950/30 rounded-xl sm:col-span-2">
                  <p className="text-xs uppercase tracking-wider text-slate-400 mb-2 font-medium">Partnership</p>
                  <p className="font-semibold text-[var(--foreground)]">{formData.partnerType || "—"}</p>
                  <p className="text-sm text-slate-500">{formData.integrationUseCase}</p>
                  <p className="text-sm text-slate-500">{formData.estimatedVolume}</p>
                </div>
              </div>

              <div className="p-4 bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 rounded-xl flex gap-3">
                <Shield className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-brand-700 dark:text-brand-300">
                  Your information is encrypted and processed in accordance with our privacy policy.
                  Verification typically takes 24-48 hours.
                </div>
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  id="terms-checkbox"
                  type="checkbox"
                  checked={formData.termsAgreed}
                  onChange={(e) => updateField("termsAgreed", e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  I agree to the{" "}
                  <Link href="/terms" className="text-brand-600 dark:text-brand-400 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-brand-600 dark:text-brand-400 hover:underline">
                    Privacy Policy
                  </Link>
                  . I confirm the information provided is accurate.
                </span>
              </label>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-semibold transition-all group"
              >
                Continue
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            ) : (
              <button
                id="register-submit-btn"
                type="button"
                onClick={handleSubmit}
                disabled={!formData.termsAgreed || isSubmitting}
                className="flex items-center gap-2 px-6 py-2.5 bg-green-600 hover:bg-green-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-xl text-sm font-semibold transition-all group"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    Submit Application
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        <p className="text-center mt-6 text-sm text-slate-500 dark:text-slate-400">
          Already a partner?{" "}
          <Link href="/login" className="text-brand-600 dark:text-brand-400 font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
