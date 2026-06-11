"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { usePortal } from "@/context/PortalContext";
import {
  LayoutDashboard,
  Key,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  Copy,
  RefreshCw,
  Eye,
  EyeOff,
  TrendingUp,
  TrendingDown,
  Activity,
  Shield,
  Globe,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Info,
  X,
  ChevronRight,
  Moon,
  Sun,
  Menu,
  FileText,
  HelpCircle,
  Download,
} from "lucide-react";

interface ApiCredential {
  id: string;
  name: string;
  clientId: string;
  clientSecret: string;
  environment: "production" | "sandbox";
  created: string;
  lastUsed: string;
  status: "active" | "revoked";
}

interface UsageDataPoint {
  hour: string;
  calls: number;
  errors: number;
}

const mockCredentials: ApiCredential[] = [
  {
    id: "cred-1",
    name: "Production Integration",
    clientId: "npx_prod_k8s2mf9xq1r4",
    clientSecret: "sk_live_3hJ9mKpLnW2eXvQ8rT5uYz0aB7cD4fG6",
    environment: "production",
    created: "2026-05-01",
    lastUsed: "2026-06-11",
    status: "active",
  },
  {
    id: "cred-2",
    name: "Development Sandbox",
    clientId: "npx_sand_m2r5pq7xt9w1",
    clientSecret: "sk_test_9xZ3kLmNpQrS1uT7vW2yA5bC8dE0fH4",
    environment: "sandbox",
    created: "2026-04-15",
    lastUsed: "2026-06-10",
    status: "active",
  },
];

const generateUsageData = (): UsageDataPoint[] => {
  const hours = [];
  for (let i = 23; i >= 0; i--) {
    const h = new Date();
    h.setHours(h.getHours() - i);
    const label = h.getHours().toString().padStart(2, "0") + ":00";
    const peak = Math.sin((h.getHours() / 24) * Math.PI * 2) * 0.5 + 0.5;
    hours.push({
      hour: label,
      calls: Math.floor(peak * 8000 + Math.random() * 2000),
      errors: Math.floor(Math.random() * 120),
    });
  }
  return hours;
};

const activityLog = [
  { id: 1, action: "API Key Generated", detail: "Production Integration key created", time: "2h ago", status: "success" },
  { id: 2, action: "Sandbox Request", detail: "POST /v1/transactions/initiate — 200 OK", time: "4h ago", status: "success" },
  { id: 3, action: "Rate Limit Warning", detail: "Approaching 80% of daily quota (10K calls)", time: "6h ago", status: "warning" },
  { id: 4, action: "Schema Validation", detail: "GET /v1/ledger/balances — Schema mismatch", time: "8h ago", status: "error" },
  { id: 5, action: "Webhook Verified", detail: "Endpoint https://app.acme.com/webhook verified", time: "1d ago", status: "success" },
  { id: 6, action: "Credentials Rotated", detail: "Sandbox key auto-rotated via compliance policy", time: "2d ago", status: "info" },
];

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "credentials", label: "API Credentials", icon: Key },
  { id: "analytics", label: "Usage Analytics", icon: BarChart3 },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function DashboardPage() {
  const { user, logout, siteData, markNotificationRead, clearAllNotifications, toggleTheme, theme } = usePortal();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [usageData] = useState<UsageDataPoint[]>(generateUsageData());
  const [credentials, setCredentials] = useState<ApiCredential[]>(mockCredentials);
  const [revealedSecrets, setRevealedSecrets] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && user.role === "guest") {
      router.push("/login");
    }
  }, [isClient, user.role, router]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleSecret = (id: string) => {
    setRevealedSecrets((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const revokeCredential = (id: string) => {
    setCredentials((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "revoked" as const } : c))
    );
  };

  const regenerateCredential = (id: string) => {
    setCredentials((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            clientSecret: "sk_" + (c.environment === "production" ? "live" : "test") + "_" + Math.random().toString(36).substring(2, 34),
            lastUsed: new Date().toISOString().split("T")[0],
          };
        }
        return c;
      })
    );
  };

  const unreadNotifications = siteData.notifications.filter((n) => !n.read);

  // Compute chart dimensions
  const maxCalls = Math.max(...usageData.map((d) => d.calls));
  const chartDataSlice = usageData.slice(-12); // Last 12 hours

  if (!isClient || user.role === "guest") {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const stats = [
    {
      label: "API Calls Today",
      value: "47,821",
      change: "+12.4%",
      up: true,
      icon: Activity,
      color: "text-brand-600",
      bg: "bg-brand-50 dark:bg-brand-950/30",
    },
    {
      label: "Success Rate",
      value: "99.3%",
      change: "+0.2%",
      up: true,
      icon: CheckCircle2,
      color: "text-green-600",
      bg: "bg-green-50 dark:bg-green-950/30",
    },
    {
      label: "Avg Latency",
      value: "83ms",
      change: "-6ms",
      up: true,
      icon: Clock,
      color: "text-purple-600",
      bg: "bg-purple-50 dark:bg-purple-950/30",
    },
    {
      label: "Active Endpoints",
      value: "14",
      change: "+2 new",
      up: true,
      icon: Globe,
      color: "text-orange-600",
      bg: "bg-orange-50 dark:bg-orange-950/30",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-brand-950 flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-brand-900 border-r border-slate-100 dark:border-brand-800 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-100 dark:border-brand-800">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/bdo-logo.png" alt="BDO Logo" width={72} height={36} className="h-8 w-auto object-contain" />
            <span className="font-bold text-[var(--foreground)]">
              {siteData.settings.companyName}
            </span>
          </Link>
          <div className="mt-4 px-3 py-2 bg-brand-50 dark:bg-brand-950/50 rounded-xl">
            <p className="text-xs text-slate-500 dark:text-slate-400">Signed in as</p>
            <p className="text-sm font-semibold text-[var(--foreground)] truncate">{user.name}</p>
            <p className="text-xs text-brand-600 dark:text-brand-400 font-medium capitalize">
              {user.role} · {user.company}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              id={`dash-nav-${id}`}
              onClick={() => { setActiveSection(id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all mb-1 ${
                activeSection === id
                  ? "bg-brand-600 text-white shadow-md shadow-brand-500/20"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-brand-800/50"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
              {id === "notifications" && unreadNotifications.length > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadNotifications.length}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-100 dark:border-brand-800 space-y-2">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-brand-800/50 transition-all"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 min-h-screen flex flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white/90 dark:bg-brand-900/90 backdrop-blur-md border-b border-slate-100 dark:border-brand-800 px-4 sm:px-6 py-4 flex items-center gap-4">
          <button
            className="lg:hidden p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-brand-800 transition-all"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-[var(--foreground)] capitalize">
              {activeSection === "overview" ? "Dashboard Overview" :
               activeSection === "credentials" ? "API Credentials" :
               activeSection === "analytics" ? "Usage Analytics" :
               activeSection === "notifications" ? "Notifications" : "Settings"}
            </h1>
            <p className="text-xs text-slate-400 hidden sm:block">
              {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-green-700 dark:text-green-400">All Systems Operational</span>
            </div>
            <Link
              href="/admin"
              className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                user.role === "admin"
                  ? "border-brand-300 text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/30"
                  : "hidden"
              }`}
            >
              Admin Panel
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6">
          {/* Overview */}
          {activeSection === "overview" && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.label}
                      className="bg-white dark:bg-brand-900/50 rounded-2xl p-5 border border-slate-100 dark:border-brand-800 shadow-sm"
                    >
                      <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
                        <Icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                      <p className="text-2xl font-bold text-[var(--foreground)]">{stat.value}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{stat.label}</p>
                      <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${stat.up ? "text-green-600" : "text-red-500"}`}>
                        {stat.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {stat.change}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart */}
                <div className="lg:col-span-2 bg-white dark:bg-brand-900/50 rounded-2xl p-6 border border-slate-100 dark:border-brand-800">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-bold text-[var(--foreground)]">API Call Volume</h3>
                      <p className="text-xs text-slate-400 mt-0.5">Last 12 hours</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 bg-brand-500 rounded-sm" />
                        <span className="text-slate-500">Calls</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 bg-red-400 rounded-sm" />
                        <span className="text-slate-500">Errors</span>
                      </div>
                    </div>
                  </div>
                  {/* SVG Bar Chart */}
                  <div className="relative h-40">
                    <svg viewBox={`0 0 ${chartDataSlice.length * 40} 160`} className="w-full h-full" preserveAspectRatio="none">
                      {chartDataSlice.map((d, i) => {
                        const barHeight = (d.calls / maxCalls) * 140;
                        const errHeight = (d.errors / maxCalls) * 140;
                        const x = i * 40 + 6;
                        return (
                          <g key={d.hour}>
                            <rect
                              x={x}
                              y={160 - barHeight}
                              width={14}
                              height={barHeight}
                              fill="#0284c7"
                              opacity="0.85"
                              rx="3"
                            />
                            <rect
                              x={x + 16}
                              y={160 - errHeight}
                              width={10}
                              height={errHeight}
                              fill="#f87171"
                              opacity="0.85"
                              rx="3"
                            />
                          </g>
                        );
                      })}
                    </svg>
                    <div className="absolute bottom-0 left-0 right-0 flex justify-between px-1">
                      {chartDataSlice.filter((_, i) => i % 3 === 0).map((d) => (
                        <span key={d.hour} className="text-[10px] text-slate-400">{d.hour}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-brand-900/50 rounded-2xl p-6 border border-slate-100 dark:border-brand-800">
                  <h3 className="font-bold text-[var(--foreground)] mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    {[
                      { label: "Manage API Keys", icon: Key, action: () => setActiveSection("credentials") },
                      { label: "View Analytics", icon: BarChart3, action: () => setActiveSection("analytics") },
                      { label: "Read Docs", icon: FileText, href: "/resources" },
                      { label: "Get Support", icon: HelpCircle, href: "/faq" },
                    ].map(({ label, icon: Icon, action, href }) => (
                      href ? (
                        <Link
                          key={label}
                          href={href}
                          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-brand-800/50 transition-all group"
                        >
                          <Icon className="w-4 h-4 text-brand-500" />
                          {label}
                          <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      ) : (
                        <button
                          key={label}
                          onClick={action}
                          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-brand-800/50 transition-all group"
                        >
                          <Icon className="w-4 h-4 text-brand-500" />
                          {label}
                          <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      )
                    ))}
                  </div>
                </div>
              </div>

              {/* Activity Log */}
              <div className="bg-white dark:bg-brand-900/50 rounded-2xl border border-slate-100 dark:border-brand-800">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-brand-800">
                  <h3 className="font-bold text-[var(--foreground)]">Recent Activity</h3>
                  <span className="text-xs text-slate-400">Last 7 days</span>
                </div>
                <div className="divide-y divide-slate-50 dark:divide-brand-800">
                  {activityLog.map((log) => (
                    <div key={log.id} className="flex items-start gap-4 px-6 py-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          log.status === "success" ? "bg-green-100 dark:bg-green-900/30" :
                          log.status === "warning" ? "bg-yellow-100 dark:bg-yellow-900/30" :
                          log.status === "error" ? "bg-red-100 dark:bg-red-900/30" :
                          "bg-blue-100 dark:bg-blue-900/30"
                        }`}
                      >
                        {log.status === "success" ? <CheckCircle2 className="w-4 h-4 text-green-600" /> :
                         log.status === "warning" ? <AlertTriangle className="w-4 h-4 text-yellow-600" /> :
                         log.status === "error" ? <X className="w-4 h-4 text-red-600" /> :
                         <Info className="w-4 h-4 text-blue-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[var(--foreground)]">{log.action}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{log.detail}</p>
                      </div>
                      <span className="text-xs text-slate-400 flex-shrink-0">{log.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Credentials */}
          {activeSection === "credentials" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Manage your API keys and secrets. Keep credentials secure and never share them publicly.
                </p>
                <button className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-medium transition-all">
                  <Key className="w-4 h-4" />
                  New Key
                </button>
              </div>

              <div className="p-4 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-2xl flex gap-3">
                <Shield className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-yellow-700 dark:text-yellow-400">Security Best Practices</p>
                  <p className="text-xs text-yellow-600 dark:text-yellow-500 mt-1">
                    Never expose production secrets in client-side code. Use environment variables and rotate secrets every 90 days.
                    mTLS configuration is available in your security settings.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {credentials.map((cred) => (
                  <div
                    key={cred.id}
                    className={`bg-white dark:bg-brand-900/50 rounded-2xl border p-6 transition-all ${
                      cred.status === "revoked"
                        ? "border-red-200 dark:border-red-900 opacity-60"
                        : "border-slate-100 dark:border-brand-800"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-5">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-[var(--foreground)]">{cred.name}</h3>
                          <span
                            className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                              cred.environment === "production"
                                ? "bg-brand-100 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300"
                                : "bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400"
                            }`}
                          >
                            {cred.environment === "production" ? "Production" : "Sandbox"}
                          </span>
                          {cred.status === "revoked" && (
                            <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-red-100 text-red-700">
                              Revoked
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400">
                          Created {cred.created} · Last used {cred.lastUsed}
                        </p>
                      </div>
                      {cred.status === "active" && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => regenerateCredential(cred.id)}
                            className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950/30 rounded-lg transition-all"
                            title="Regenerate secret"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => revokeCredential(cred.id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-all"
                            title="Revoke key"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      {/* Client ID */}
                      <div>
                        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 block">
                          Client ID
                        </label>
                        <div className="flex items-center gap-2 bg-slate-50 dark:bg-brand-950/30 rounded-xl px-4 py-2.5 font-mono text-sm border border-slate-100 dark:border-slate-700">
                          <span className="flex-1 text-[var(--foreground)]">{cred.clientId}</span>
                          <button
                            onClick={() => copyToClipboard(cred.clientId, cred.id + "-id")}
                            className="text-slate-400 hover:text-brand-600 transition-colors"
                          >
                            {copiedId === cred.id + "-id" ? (
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Client Secret */}
                      <div>
                        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 block">
                          Client Secret
                        </label>
                        <div className="flex items-center gap-2 bg-slate-50 dark:bg-brand-950/30 rounded-xl px-4 py-2.5 font-mono text-sm border border-slate-100 dark:border-slate-700">
                          <span className="flex-1 text-[var(--foreground)]">
                            {revealedSecrets.has(cred.id)
                              ? cred.clientSecret
                              : cred.clientSecret.substring(0, 12) + "•".repeat(24)}
                          </span>
                          <button
                            onClick={() => toggleSecret(cred.id)}
                            className="text-slate-400 hover:text-brand-600 transition-colors"
                          >
                            {revealedSecrets.has(cred.id) ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => copyToClipboard(cred.clientSecret, cred.id + "-sec")}
                            className="text-slate-400 hover:text-brand-600 transition-colors"
                          >
                            {copiedId === cred.id + "-sec" ? (
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analytics */}
          {activeSection === "analytics" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Total Calls (30d)", value: "1.23M" },
                  { label: "Avg Daily Calls", value: "41,000" },
                  { label: "Error Rate", value: "0.7%" },
                  { label: "p99 Latency", value: "210ms" },
                ].map((m) => (
                  <div key={m.label} className="bg-white dark:bg-brand-900/50 rounded-2xl p-5 border border-slate-100 dark:border-brand-800">
                    <p className="text-2xl font-bold text-[var(--foreground)]">{m.value}</p>
                    <p className="text-xs text-slate-500 mt-1">{m.label}</p>
                  </div>
                ))}
              </div>

              {/* Full 24h chart */}
              <div className="bg-white dark:bg-brand-900/50 rounded-2xl p-6 border border-slate-100 dark:border-brand-800">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-bold text-[var(--foreground)]">24-Hour API Traffic</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Calls vs Errors by hour</p>
                  </div>
                  <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-brand-800/50 transition-all">
                    <Download className="w-3.5 h-3.5" />
                    Export CSV
                  </button>
                </div>
                <div className="relative h-48">
                  <svg viewBox={`0 0 ${usageData.length * 28} 180`} className="w-full h-full" preserveAspectRatio="none">
                    {usageData.map((d, i) => {
                      const barH = (d.calls / maxCalls) * 160;
                      const errH = (d.errors / maxCalls) * 160;
                      const x = i * 28 + 4;
                      return (
                        <g key={d.hour}>
                          <rect x={x} y={180 - barH} width={10} height={barH} fill="#0284c7" opacity="0.8" rx="2" />
                          <rect x={x + 12} y={180 - errH} width={8} height={errH} fill="#f87171" opacity="0.8" rx="2" />
                        </g>
                      );
                    })}
                  </svg>
                </div>
                <div className="flex justify-between mt-2">
                  {usageData.filter((_, i) => i % 6 === 0).map((d) => (
                    <span key={d.hour} className="text-[10px] text-slate-400">{d.hour}</span>
                  ))}
                </div>
              </div>

              {/* Endpoint Breakdown */}
              <div className="bg-white dark:bg-brand-900/50 rounded-2xl border border-slate-100 dark:border-brand-800">
                <div className="px-6 py-4 border-b border-slate-100 dark:border-brand-800">
                  <h3 className="font-bold text-[var(--foreground)]">Top Endpoints</h3>
                </div>
                <div className="divide-y divide-slate-50 dark:divide-brand-800">
                  {[
                    { endpoint: "POST /v1/transactions/initiate", calls: 18420, pct: 92 },
                    { endpoint: "GET /v1/ledger/balances", calls: 12830, pct: 64 },
                    { endpoint: "GET /v1/accounts/{id}", calls: 9502, pct: 47 },
                    { endpoint: "POST /v1/webhooks/verify", calls: 6211, pct: 31 },
                    { endpoint: "GET /v1/compliance/status", calls: 3104, pct: 15 },
                  ].map((ep) => (
                    <div key={ep.endpoint} className="flex items-center gap-4 px-6 py-4">
                      <code className="text-xs font-mono text-slate-600 dark:text-slate-400 flex-1 truncate">
                        {ep.endpoint}
                      </code>
                      <div className="w-24 h-1.5 bg-slate-100 dark:bg-brand-800 rounded-full overflow-hidden flex-shrink-0">
                        <div
                          className="h-full bg-brand-500 rounded-full"
                          style={{ width: `${ep.pct}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-[var(--foreground)] w-16 text-right flex-shrink-0">
                        {ep.calls.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeSection === "notifications" && (
            <div className="space-y-4">
              {siteData.notifications.length === 0 ? (
                <div className="bg-white dark:bg-brand-900/50 rounded-2xl p-12 border border-slate-100 dark:border-brand-800 text-center">
                  <Bell className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">No notifications</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-500">
                      {unreadNotifications.length} unread notification{unreadNotifications.length !== 1 ? "s" : ""}
                    </p>
                    <button
                      onClick={clearAllNotifications}
                      className="text-xs text-red-500 hover:text-red-700 transition-colors"
                    >
                      Clear All
                    </button>
                  </div>
                  {siteData.notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`bg-white dark:bg-brand-900/50 rounded-2xl p-5 border transition-all ${
                        !notif.read
                          ? "border-brand-200 dark:border-brand-700"
                          : "border-slate-100 dark:border-brand-800 opacity-60"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            notif.type === "success" ? "bg-green-100 dark:bg-green-900/30" :
                            notif.type === "warning" ? "bg-yellow-100 dark:bg-yellow-900/30" :
                            "bg-blue-100 dark:bg-blue-900/30"
                          }`}
                        >
                          {notif.type === "success" ? <CheckCircle2 className="w-5 h-5 text-green-600" /> :
                           notif.type === "warning" ? <AlertTriangle className="w-5 h-5 text-yellow-600" /> :
                           <Info className="w-5 h-5 text-blue-600" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-semibold text-[var(--foreground)]">{notif.title}</p>
                            <span className="text-xs text-slate-400 flex-shrink-0">{notif.date}</span>
                          </div>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{notif.message}</p>
                        </div>
                        {!notif.read && (
                          <button
                            onClick={() => markNotificationRead(notif.id)}
                            className="text-xs text-brand-600 dark:text-brand-400 hover:underline flex-shrink-0"
                          >
                            Mark read
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}

          {/* Settings */}
          {activeSection === "settings" && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-brand-900/50 rounded-2xl p-6 border border-slate-100 dark:border-brand-800">
                <h3 className="font-bold text-[var(--foreground)] mb-5">Account Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { label: "Full Name", value: user.name },
                    { label: "Email Address", value: user.email },
                    { label: "Company", value: user.company || "—" },
                    { label: "Role", value: user.role.charAt(0).toUpperCase() + user.role.slice(1) },
                  ].map((field) => (
                    <div key={field.label}>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                        {field.label}
                      </label>
                      <p className="text-sm font-medium text-[var(--foreground)] bg-slate-50 dark:bg-brand-950/30 px-4 py-2.5 rounded-xl border border-slate-100 dark:border-slate-700">
                        {field.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-brand-900/50 rounded-2xl p-6 border border-slate-100 dark:border-brand-800">
                <h3 className="font-bold text-[var(--foreground)] mb-5">Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-[var(--foreground)]">Dark Mode</p>
                      <p className="text-xs text-slate-400">Switch between light and dark interface</p>
                    </div>
                    <button
                      onClick={toggleTheme}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        theme === "dark" ? "bg-brand-600" : "bg-slate-200"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          theme === "dark" ? "translate-x-6" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                  <div className="border-t border-slate-100 dark:border-brand-800 pt-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-[var(--foreground)]">Email Notifications</p>
                      <p className="text-xs text-slate-400">Receive alerts about API activity</p>
                    </div>
                    <button className="relative w-12 h-6 rounded-full bg-brand-600">
                      <span className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow translate-x-6" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-950/20 rounded-2xl p-6 border border-red-100 dark:border-red-900">
                <h3 className="font-bold text-red-700 dark:text-red-400 mb-2">Danger Zone</h3>
                <p className="text-sm text-red-600/70 dark:text-red-400/70 mb-4">
                  Signing out will end your current session and clear local credentials.
                </p>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-medium transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
