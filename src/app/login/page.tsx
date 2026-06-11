"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePortal } from "@/context/PortalContext";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Shield,
  Zap,
  ArrowRight,
  Building2,
  LayoutDashboard,
} from "lucide-react";

export default function LoginPage() {
  const { login, siteData } = usePortal();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeRole, setActiveRole] = useState<"partner" | "admin">("partner");

  const handleQuickLogin = async (role: "partner" | "admin") => {
    setIsLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 1200));
    login(role);
    if (role === "admin") {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setIsLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 1400));
    // Demo: admin email triggers admin login
    if (email.includes("admin")) {
      login("admin");
      router.push("/admin");
    } else {
      login("partner");
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex bg-[var(--background)]">
      {/* Left: Branding Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-700">
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        {/* Radial glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500 rounded-full opacity-10 blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-400 rounded-full opacity-10 blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image src="/bdo-logo.png" alt="BDO Logo" width={90} height={45} className="h-10 w-auto object-contain" priority />
            <span className="text-xl font-bold tracking-tight">
              {siteData.settings.companyName}
            </span>
          </div>

          {/* Center content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm font-medium mb-6">
              <Shield className="w-4 h-4 text-brand-300" />
              <span>Enterprise-Grade Security</span>
            </div>
            <h1 className="text-4xl font-bold leading-tight mb-4">
              Welcome back to your
              <br />
              <span className="text-brand-300">Partner Portal</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-10">
              Access your API credentials, usage analytics, and integration
              tools from one unified dashboard.
            </p>

            {/* Feature highlights */}
            <div className="space-y-4">
              {[
                { icon: Lock, text: "SOC 2 Type II Certified Infrastructure" },
                { icon: Zap, text: "Real-time usage metrics & monitoring" },
                {
                  icon: Shield,
                  text: "mTLS & OAuth 2.0 credential management",
                },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-white/80">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-brand-300" />
                  </div>
                  <span className="text-sm">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom quote */}
          <div className="border-t border-white/10 pt-8">
            <p className="text-white/50 text-sm italic">
              &ldquo;BDO reduced our partner onboarding from 45 days to 2
              days.&rdquo;
            </p>
            <p className="text-white/40 text-xs mt-2">
              — Marcus Vance, CTO, GlobalPay Solutions
            </p>
          </div>
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-3 mb-10">
            <Image src="/bdo-logo.png" alt="BDO Logo" width={81} height={41} className="h-9 w-auto object-contain" priority />
            <span className="text-lg font-bold text-[var(--foreground)]">
              {siteData.settings.companyName}
            </span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[var(--foreground)] mb-2">
              Sign in
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Enter your credentials or use a quick demo login below.
            </p>
          </div>

          {/* Quick Demo Role Selector */}
          <div className="mb-6 p-4 bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 rounded-2xl">
            <p className="text-xs font-semibold text-brand-700 dark:text-brand-300 uppercase tracking-wider mb-3">
              Demo Quick Access
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleQuickLogin("partner")}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-brand-900/50 border border-brand-200 dark:border-brand-700 rounded-xl text-sm font-medium text-brand-700 dark:text-brand-300 hover:bg-brand-500 hover:text-white hover:border-brand-500 transition-all duration-200 group disabled:opacity-50"
              >
                <Building2 className="w-4 h-4" />
                Partner Login
                <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={() => handleQuickLogin("admin")}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-brand-900/50 border border-brand-200 dark:border-brand-700 rounded-xl text-sm font-medium text-brand-700 dark:text-brand-300 hover:bg-brand-800 hover:text-white hover:border-brand-800 transition-all duration-200 group disabled:opacity-50"
              >
                <LayoutDashboard className="w-4 h-4" />
                Admin Login
                <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
            <span className="text-xs text-slate-400">or sign in manually</span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="login-email"
                className="block text-sm font-medium text-[var(--foreground)] mb-2"
              >
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-brand-950/30 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-[var(--foreground)] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="login-password"
                  className="block text-sm font-medium text-[var(--foreground)]"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs text-brand-600 dark:text-brand-400 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 bg-white dark:bg-brand-950/30 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-[var(--foreground)] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              id="login-submit-btn"
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-6 bg-brand-600 hover:bg-brand-700 disabled:bg-brand-400 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-brand-600 dark:text-brand-400 font-semibold hover:underline"
            >
              Become a Partner
            </Link>
          </p>

          <p className="mt-8 text-center text-xs text-slate-400">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
