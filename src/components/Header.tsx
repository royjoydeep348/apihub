"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePortal } from "@/context/PortalContext";
import { 
  Menu, X, Globe, Moon, Sun, ChevronDown, Bell, LogOut, 
  Settings, Cpu, ShieldCheck, Zap, Layers, BookOpen, Terminal, CodeSquare 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const { siteData, user, login, logout, theme, toggleTheme } = usePortal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("EN");
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const toggleDropdown = (name: string) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  const navItems = [
    { label: "Home", url: "/" },
    { label: "Solutions", url: "/solutions", hasMega: true },
    { label: "Products", url: "/products", hasMega: true },
    { label: "Partner Program", url: "/partner-program" },
    { label: "Success Stories", url: "/success-stories" },
    { label: "Resources", url: "/resources" },
    { label: "FAQ", url: "/faq" },
    { label: "About", url: "/about" },
    { label: "Contact", url: "/contact" },
  ];

  // Mock list of languages
  const languages = [
    { code: "EN", name: "English" },
    { code: "ES", name: "Español" },
    { code: "DE", name: "Deutsch" },
    { code: "FR", name: "Français" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Utility Bar */}
      <div className="hidden sm:block w-full bg-slate-900 dark:bg-slate-950 text-slate-300 border-b border-slate-800 text-xs py-2 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span>Support: {siteData.settings.contactPhone}</span>
            <span>Email: {siteData.settings.contactEmail}</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 hover:text-white transition-colors py-1 focus:outline-none"
              >
                <Globe className="h-3.5 w-3.5" />
                <span>{selectedLang}</span>
                <ChevronDown className="h-3 w-3" />
              </button>
              
              {langDropdownOpen && (
                <div className="absolute right-0 mt-1 w-32 bg-slate-800 dark:bg-slate-900 border border-slate-700 rounded-md shadow-lg py-1 z-50 text-slate-200">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLang(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-slate-700 hover:text-white text-xs block transition-colors"
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* User Session Quick links for evaluation */}
            {user.role === "guest" ? (
              <div className="flex gap-3">
                <button 
                  onClick={() => login("partner")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Quick Partner Login
                </button>
                <span className="text-slate-700">|</span>
                <button 
                  onClick={() => login("admin")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Quick Admin Login
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-brand-400 font-medium">Logged in: {user.name} ({user.role})</span>
                <button 
                  onClick={logout}
                  className="flex items-center gap-1 hover:text-white text-slate-400 transition-colors ml-2 cursor-pointer"
                >
                  <LogOut className="h-3 w-3" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Primary Header Bar */}
      <div className="glass-header w-full py-4 px-6 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/bdo-logo.png"
              alt="BDO Logo"
              width={72}
              height={36}
              className="object-contain group-hover:scale-105 transition-transform duration-200"
              priority
            />
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 hidden sm:block border-l border-slate-200 dark:border-slate-700 pl-3 leading-tight">
              Partner<br />Portal
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.url;
              if (item.hasMega) {
                const isSolutions = item.label === "Solutions";
                return (
                  <div 
                    key={item.label} 
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors hover:text-brand-600 dark:hover:text-brand-400 cursor-pointer ${isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-600 dark:text-slate-300'}`}>
                      {item.label}
                      <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                    
                    {/* Mega Menu Dropdown */}
                    <AnimatePresence>
                      {activeDropdown === item.label && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-1/2 -translate-x-1/2 mt-1 w-[480px] rounded-xl glass-card shadow-2xl p-6 grid grid-cols-2 gap-4 border border-slate-200 dark:border-slate-800 z-50"
                        >
                          <div className="col-span-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                              {isSolutions ? "Enterprise Ecosystem Capabilities" : "Technical Developer Products"}
                            </span>
                          </div>
                          {isSolutions ? (
                            <>
                              <Link href="/solutions#banking" className="flex gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 group/link transition-colors">
                                <Cpu className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-0.5 shrink-0" />
                                <div>
                                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover/link:text-brand-600 dark:group-hover/link:text-brand-400">Core Banking Sync</h4>
                                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Connect core banking ledger systems safely.</p>
                                </div>
                              </Link>
                              <Link href="/solutions#gateway" className="flex gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 group/link transition-colors">
                                <ShieldCheck className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-0.5 shrink-0" />
                                <div>
                                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover/link:text-brand-600 dark:group-hover/link:text-brand-400">Secure API Gateway</h4>
                                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">SOC2-compliant proxy API pipelines.</p>
                                </div>
                              </Link>
                              <Link href="/solutions#onboarding" className="flex gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 group/link transition-colors">
                                <Zap className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-0.5 shrink-0" />
                                <div>
                                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover/link:text-brand-600 dark:group-hover/link:text-brand-400">Onboarding Hub</h4>
                                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Automated KYC and developer verification.</p>
                                </div>
                              </Link>
                              <Link href="/solutions#ledger" className="flex gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 group/link transition-colors">
                                <Layers className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-0.5 shrink-0" />
                                <div>
                                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover/link:text-brand-600 dark:group-hover/link:text-brand-400">Ledger Sync</h4>
                                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Real-time ledger events distribution queue.</p>
                                </div>
                              </Link>
                            </>
                          ) : (
                            <>
                              <Link href="/products#spec-kit" className="flex gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 group/link transition-colors">
                                <BookOpen className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-0.5 shrink-0" />
                                <div>
                                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover/link:text-brand-600 dark:group-hover/link:text-brand-400">GitHub Spec Kit</h4>
                                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Standardized OpenAPI configuration contract kits.</p>
                                </div>
                              </Link>
                              <Link href="/products#sandbox" className="flex gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 group/link transition-colors">
                                <Terminal className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-0.5 shrink-0" />
                                <div>
                                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover/link:text-brand-600 dark:group-hover/link:text-brand-400">Developer Sandbox</h4>
                                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Mock environments with zero transaction capital risk.</p>
                                </div>
                              </Link>
                              <Link href="/products#sdk" className="flex gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 group/link transition-colors">
                                <CodeSquare className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-0.5 shrink-0" />
                                <div>
                                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover/link:text-brand-600 dark:group-hover/link:text-brand-400">Software Wrapper SDKs</h4>
                                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Standardized JS, Go, Java libraries download center.</p>
                                </div>
                              </Link>
                            </>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.url}
                  className={`px-3 py-2 text-sm font-medium transition-colors hover:text-brand-600 dark:hover:text-brand-400 ${
                    isActive 
                      ? "text-brand-600 dark:text-brand-400 font-semibold" 
                      : "text-slate-600 dark:text-slate-300"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            {/* Notification bell (only if signed in) */}
            {user.role !== "guest" && (
              <Link href="/dashboard" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 relative transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500"></span>
              </Link>
            )}

            {/* Auth Actions */}
            {user.role === "guest" ? (
              <div className="flex items-center gap-2">
                <Link 
                  href="/login" 
                  className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  href="/register" 
                  className="px-4 py-2 text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600 rounded-lg shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
                >
                  Become a Partner
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {user.role === "admin" ? (
                  <Link 
                    href="/admin" 
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg shadow-sm transition-colors border border-slate-700"
                  >
                    <Settings className="h-4 w-4 animate-spin-slow" />
                    Admin Panel
                  </Link>
                ) : (
                  <Link 
                    href="/dashboard" 
                    className="px-4 py-2 text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600 rounded-lg shadow-sm transition-colors"
                  >
                    Console Dashboard
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Mobile Actions Header */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Theme Toggle Mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors focus:outline-none"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-4 px-6 z-40 max-h-[85vh] overflow-y-auto"
          >
            <div className="flex flex-col gap-3">
              {navItems.map((item) => {
                const isActive = pathname === item.url;
                if (item.hasMega) {
                  return (
                    <div key={item.label} className="flex flex-col gap-1.5 py-1">
                      <button 
                        onClick={() => toggleDropdown(item.label)}
                        className="flex items-center justify-between w-full text-left font-medium text-slate-700 dark:text-slate-200 text-sm py-1.5"
                      >
                        <span>{item.label}</span>
                        <ChevronDown className={`h-4 w-4 transform transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {activeDropdown === item.label && (
                        <div className="pl-4 border-l-2 border-slate-100 dark:border-slate-800 flex flex-col gap-2.5 mt-1 pb-2">
                          {item.label === "Solutions" ? (
                            <>
                              <Link href="/solutions#banking" className="text-xs text-slate-600 dark:text-slate-400 hover:text-brand-500 font-medium">Core Banking Sync</Link>
                              <Link href="/solutions#gateway" className="text-xs text-slate-600 dark:text-slate-400 hover:text-brand-500 font-medium">Secure API Gateway</Link>
                              <Link href="/solutions#onboarding" className="text-xs text-slate-600 dark:text-slate-400 hover:text-brand-500 font-medium">Onboarding Hub</Link>
                              <Link href="/solutions#ledger" className="text-xs text-slate-600 dark:text-slate-400 hover:text-brand-500 font-medium">Ledger Sync</Link>
                            </>
                          ) : (
                            <>
                              <Link href="/products#spec-kit" className="text-xs text-slate-600 dark:text-slate-400 hover:text-brand-500 font-medium">GitHub Spec Kit</Link>
                              <Link href="/products#sandbox" className="text-xs text-slate-600 dark:text-slate-400 hover:text-brand-500 font-medium">Developer Sandbox</Link>
                              <Link href="/products#sdk" className="text-xs text-slate-600 dark:text-slate-400 hover:text-brand-500 font-medium">Software SDKs</Link>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.url}
                    className={`text-sm font-medium py-1.5 ${
                      isActive ? "text-brand-500 font-semibold" : "text-slate-700 dark:text-slate-200"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <div className="h-px bg-slate-100 dark:bg-slate-800 my-2"></div>

              {/* Mobile Auth actions */}
              {user.role === "guest" ? (
                <div className="flex flex-col gap-2.5">
                  <Link
                    href="/login"
                    className="w-full text-center px-4 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="w-full text-center px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-brand-600 hover:bg-brand-700"
                  >
                    Become a Partner
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-2.5">
                  {user.role === "admin" ? (
                    <Link
                      href="/admin"
                      className="w-full text-center px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-slate-900 border border-slate-700 hover:bg-slate-800"
                    >
                      Admin Panel
                    </Link>
                  ) : (
                    <Link
                      href="/dashboard"
                      className="w-full text-center px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-brand-600 hover:bg-brand-700"
                    >
                      Console Dashboard
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="w-full text-center px-4 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 bg-slate-50 dark:bg-slate-800/20"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
