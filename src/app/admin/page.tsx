"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePortal } from "@/context/PortalContext";
import {
  LayoutDashboard,
  Inbox,
  FileText,
  Settings2,
  Users,
  BarChart3,
  LogOut,
  ChevronRight,
  Menu,
  Moon,
  Sun,
  X,
  Check,
  Plus,
  Trash2,
  Edit3,
  MessageSquare,
  Globe,
  Mail,
  Phone,
  AlertTriangle,
  CheckCircle2,
  Info,
  TrendingUp,
  Eye,
  HelpCircle,
  BookOpen,
  Star,
  Download,
  Search,
} from "lucide-react";
import type {
  ContactSubmission,
  BlogPost,
  FAQItem,
} from "@/context/PortalContext";

const adminNavItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "inbox", label: "Inbox", icon: Inbox },
  { id: "content", label: "CMS Content", icon: FileText },
  { id: "settings", label: "Global Settings", icon: Settings2 },
];

export default function AdminPage() {
  const {
    user,
    siteData,
    logout,
    toggleTheme,
    theme,
    updateSettings,
    updateSubmissionStatus,
    addBlogPost,
    deleteBlogPost,
    addFAQ,
    deleteFAQ,
  } = usePortal();
  const router = useRouter();

  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Inbox state
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [replyText, setReplyText] = useState("");

  // CMS: Blog
  const [contentTab, setContentTab] = useState<"blog" | "faq">("blog");
  const [showAddBlog, setShowAddBlog] = useState(false);
  const [showAddFAQ, setShowAddFAQ] = useState(false);
  const [blogSearch, setBlogSearch] = useState("");
  const [newBlog, setNewBlog] = useState({ title: "", excerpt: "", content: "", author: "", category: "", image: "" });
  const [newFAQ, setNewFAQ] = useState({ question: "", answer: "", category: "" });

  // Settings state
  const [settingsForm, setSettingsForm] = useState(siteData.settings);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && user.role !== "admin") {
      router.push("/login");
    }
  }, [isClient, user.role, router]);

  useEffect(() => {
    setSettingsForm(siteData.settings);
  }, [siteData.settings]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleReply = (sub: ContactSubmission) => {
    if (!replyText.trim()) return;
    updateSubmissionStatus(sub.id, "replied", replyText);
    setReplyText("");
    setSelectedSubmission(null);
  };

  const handleAddBlog = () => {
    if (!newBlog.title) return;
    addBlogPost({
      title: newBlog.title,
      excerpt: newBlog.excerpt,
      content: newBlog.content || "Content coming soon.",
      author: newBlog.author || user.name,
      category: newBlog.category || "General",
      image: newBlog.image || "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80",
    });
    setNewBlog({ title: "", excerpt: "", content: "", author: "", category: "", image: "" });
    setShowAddBlog(false);
  };

  const handleAddFAQ = () => {
    if (!newFAQ.question) return;
    addFAQ({
      question: newFAQ.question,
      answer: newFAQ.answer,
      category: newFAQ.category || "General",
    });
    setNewFAQ({ question: "", answer: "", category: "" });
    setShowAddFAQ(false);
  };

  const handleSaveSettings = () => {
    updateSettings(settingsForm);
    alert("Settings saved successfully!");
  };

  const unreadCount = siteData.submissions.filter((s) => s.status === "unread").length;

  if (!isClient || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const overviewStats = [
    { label: "Total Submissions", value: siteData.submissions.length, icon: Inbox, color: "text-brand-600", bg: "bg-brand-50 dark:bg-brand-950/30" },
    { label: "Unread Messages", value: unreadCount, icon: MessageSquare, color: "text-red-600", bg: "bg-red-50 dark:bg-red-950/30" },
    { label: "Blog Posts", value: siteData.blogs.length, icon: BookOpen, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-950/30" },
    { label: "Active Partners", value: 247, icon: Users, color: "text-green-600", bg: "bg-green-50 dark:bg-green-950/30" },
    { label: "FAQ Items", value: siteData.faqs.length, icon: HelpCircle, color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-950/30" },
    { label: "Testimonials", value: siteData.testimonials.length, icon: Star, color: "text-yellow-600", bg: "bg-yellow-50 dark:bg-yellow-950/30" },
  ];

  const filteredBlogs = siteData.blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(blogSearch.toLowerCase()) ||
      b.author.toLowerCase().includes(blogSearch.toLowerCase())
  );

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
          <Link href="/" className="flex items-center gap-2.5 mb-4">
            <Image src="/bdo-logo.png" alt="BDO Logo" width={72} height={36} className="h-8 w-auto object-contain" />
            <span className="font-bold text-[var(--foreground)]">
              {siteData.settings.companyName}
            </span>
          </Link>
          <div className="px-3 py-2 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-xl">
            <p className="text-xs text-purple-500 font-semibold uppercase tracking-wider">Admin Control Room</p>
            <p className="text-sm font-semibold text-[var(--foreground)] truncate mt-0.5">{user.name}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3">
          {adminNavItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              id={`admin-nav-${id}`}
              onClick={() => { setActiveSection(id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all mb-1 ${
                activeSection === id
                  ? "bg-brand-600 text-white shadow-md shadow-brand-500/20"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-brand-800/50"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
              {id === "inbox" && unreadCount > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-brand-800">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-brand-800/50 transition-all"
            >
              <BarChart3 className="w-4 h-4" />
              Partner Dashboard
              <ChevronRight className="w-3.5 h-3.5 ml-auto" />
            </Link>
          </div>
        </nav>

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

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white/90 dark:bg-brand-900/90 backdrop-blur-md border-b border-slate-100 dark:border-brand-800 px-4 sm:px-6 py-4 flex items-center gap-4">
          <button
            className="lg:hidden p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-brand-800 transition-all"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-[var(--foreground)]">
              {activeSection === "overview" ? "Admin Overview" :
               activeSection === "inbox" ? "Contact Inbox" :
               activeSection === "content" ? "CMS Content Editor" : "Global Settings"}
            </h1>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs px-3 py-1.5 bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 rounded-full font-semibold">
              Admin
            </span>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">
          {/* Overview */}
          {activeSection === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {overviewStats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.label}
                      className="bg-white dark:bg-brand-900/50 rounded-2xl p-4 border border-slate-100 dark:border-brand-800 shadow-sm"
                    >
                      <div className={`w-9 h-9 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
                        <Icon className={`w-4 h-4 ${stat.color}`} />
                      </div>
                      <p className="text-xl font-bold text-[var(--foreground)]">{stat.value}</p>
                      <p className="text-xs text-slate-400 mt-0.5 leading-tight">{stat.label}</p>
                    </div>
                  );
                })}
              </div>

              {/* Platform KPIs */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-brand-900/50 rounded-2xl p-6 border border-slate-100 dark:border-brand-800">
                  <h3 className="font-bold text-[var(--foreground)] mb-5">Platform KPIs (30 Days)</h3>
                  <div className="space-y-4">
                    {[
                      { label: "New Partner Registrations", value: 34, total: 50, color: "bg-brand-500" },
                      { label: "API Calls Processed", value: 86, total: 100, color: "bg-green-500" },
                      { label: "Compliance Verifications", value: 29, total: 40, color: "bg-purple-500" },
                      { label: "Support Tickets Resolved", value: 18, total: 22, color: "bg-orange-500" },
                    ].map((kpi) => (
                      <div key={kpi.label}>
                        <div className="flex items-center justify-between mb-1.5 text-sm">
                          <span className="text-slate-600 dark:text-slate-400">{kpi.label}</span>
                          <span className="font-semibold text-[var(--foreground)]">
                            {kpi.value}/{kpi.total}
                          </span>
                        </div>
                        <div className="h-2 bg-slate-100 dark:bg-brand-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${kpi.color} rounded-full transition-all duration-500`}
                            style={{ width: `${(kpi.value / kpi.total) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-brand-900/50 rounded-2xl p-6 border border-slate-100 dark:border-brand-800">
                  <h3 className="font-bold text-[var(--foreground)] mb-5">Recent Activity</h3>
                  <div className="space-y-3">
                    {[
                      { label: "New contact from David Miller (FinTechOps)", type: "info", time: "2h ago" },
                      { label: "Blog post published: Agentic AI & Partner Ecosystems", type: "success", time: "5h ago" },
                      { label: "Partner application from TradeMark Inc. approved", type: "success", time: "8h ago" },
                      { label: "Sandbox maintenance alert sent to all partners", type: "warning", time: "1d ago" },
                      { label: "FAQ section updated with 2 new items", type: "info", time: "2d ago" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            item.type === "success" ? "bg-green-100 dark:bg-green-900/30" :
                            item.type === "warning" ? "bg-yellow-100 dark:bg-yellow-900/30" :
                            "bg-blue-100 dark:bg-blue-900/30"
                          }`}
                        >
                          {item.type === "success" ? <CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> :
                           item.type === "warning" ? <AlertTriangle className="w-3.5 h-3.5 text-yellow-600" /> :
                           <Info className="w-3.5 h-3.5 text-blue-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.label}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Admin Actions */}
              <div className="bg-white dark:bg-brand-900/50 rounded-2xl p-6 border border-slate-100 dark:border-brand-800">
                <h3 className="font-bold text-[var(--foreground)] mb-5">Quick Actions</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "Review Inbox", icon: Inbox, action: () => setActiveSection("inbox") },
                    { label: "Add Blog Post", icon: Plus, action: () => { setActiveSection("content"); setContentTab("blog"); setTimeout(() => setShowAddBlog(true), 100); } },
                    { label: "Edit Settings", icon: Settings2, action: () => setActiveSection("settings") },
                    { label: "Export Report", icon: Download, action: () => {} },
                  ].map(({ label, icon: Icon, action }) => (
                    <button
                      key={label}
                      onClick={action}
                      className="flex flex-col items-center gap-2 px-4 py-5 bg-slate-50 dark:bg-brand-800/30 hover:bg-brand-50 dark:hover:bg-brand-800/60 border border-slate-100 dark:border-brand-700 rounded-2xl text-sm font-medium text-slate-700 dark:text-slate-300 transition-all group"
                    >
                      <Icon className="w-5 h-5 text-brand-500 group-hover:scale-110 transition-transform" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Inbox */}
          {activeSection === "inbox" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
              {/* Message List */}
              <div className="space-y-3">
                <h3 className="font-bold text-[var(--foreground)] mb-4">
                  {siteData.submissions.length} Contact Submission{siteData.submissions.length !== 1 ? "s" : ""}
                </h3>
                {siteData.submissions.length === 0 ? (
                  <div className="bg-white dark:bg-brand-900/50 rounded-2xl p-8 border border-slate-100 dark:border-brand-800 text-center">
                    <Inbox className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-400 text-sm">No submissions yet</p>
                  </div>
                ) : (
                  siteData.submissions.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => {
                        setSelectedSubmission(sub);
                        updateSubmissionStatus(sub.id, "read");
                      }}
                      className={`w-full text-left bg-white dark:bg-brand-900/50 rounded-2xl p-5 border transition-all ${
                        selectedSubmission?.id === sub.id
                          ? "border-brand-400 shadow-md"
                          : sub.status === "unread"
                          ? "border-brand-200 dark:border-brand-700"
                          : "border-slate-100 dark:border-brand-800"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <p className="text-sm font-bold text-[var(--foreground)]">{sub.name}</p>
                          <p className="text-xs text-slate-500">{sub.company} · {sub.email}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              sub.status === "unread"
                                ? "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400"
                                : sub.status === "replied"
                                ? "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {sub.status}
                          </span>
                          <span className="text-xs text-slate-400">{sub.date}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{sub.message}</p>
                    </button>
                  ))
                )}
              </div>

              {/* Message Detail / Reply */}
              {selectedSubmission ? (
                <div className="bg-white dark:bg-brand-900/50 rounded-2xl border border-slate-100 dark:border-brand-800 flex flex-col">
                  <div className="p-5 border-b border-slate-100 dark:border-brand-800">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-bold text-[var(--foreground)]">{selectedSubmission.name}</p>
                        <p className="text-sm text-slate-500">{selectedSubmission.company}</p>
                        <a href={`mailto:${selectedSubmission.email}`} className="text-xs text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1 mt-1">
                          <Mail className="w-3 h-3" />
                          {selectedSubmission.email}
                        </a>
                      </div>
                      <button
                        onClick={() => setSelectedSubmission(null)}
                        className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 p-5 overflow-y-auto">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Message</p>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-brand-950/30 rounded-xl p-4">
                      {selectedSubmission.message}
                    </p>

                    {selectedSubmission.replyContent && (
                      <div className="mt-4">
                        <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-2">Your Reply</p>
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-green-50 dark:bg-green-950/20 rounded-xl p-4 border border-green-100 dark:border-green-900">
                          {selectedSubmission.replyContent}
                        </p>
                      </div>
                    )}
                  </div>

                  {selectedSubmission.status !== "replied" && (
                    <div className="p-5 border-t border-slate-100 dark:border-brand-800">
                      <textarea
                        id="admin-reply-textarea"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Type your reply..."
                        rows={4}
                        className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-brand-950/30 text-[var(--foreground)] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none mb-3"
                      />
                      <button
                        id="admin-send-reply-btn"
                        onClick={() => handleReply(selectedSubmission)}
                        disabled={!replyText.trim()}
                        className="flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-xl text-sm font-semibold transition-all"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Send Reply
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white dark:bg-brand-900/50 rounded-2xl border border-slate-100 dark:border-brand-800 flex items-center justify-center">
                  <div className="text-center text-slate-400">
                    <Eye className="w-10 h-10 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">Select a message to view details</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* CMS Content */}
          {activeSection === "content" && (
            <div className="space-y-6">
              {/* Tab switcher */}
              <div className="flex items-center gap-2 bg-white dark:bg-brand-900/50 rounded-2xl p-1.5 border border-slate-100 dark:border-brand-800 w-fit">
                {[
                  { id: "blog" as const, label: "Blog Posts", icon: BookOpen },
                  { id: "faq" as const, label: "FAQ Items", icon: HelpCircle },
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setContentTab(id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      contentTab === id
                        ? "bg-brand-600 text-white shadow-md"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-brand-800/50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>

              {/* Blog Posts */}
              {contentTab === "blog" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        id="blog-search"
                        type="text"
                        value={blogSearch}
                        onChange={(e) => setBlogSearch(e.target.value)}
                        placeholder="Search blog posts..."
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-brand-950/20 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                    <button
                      id="admin-add-blog-btn"
                      onClick={() => setShowAddBlog(!showAddBlog)}
                      className="flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-semibold transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      Add Post
                    </button>
                  </div>

                  {/* Add Blog Form */}
                  {showAddBlog && (
                    <div className="bg-white dark:bg-brand-900/50 rounded-2xl p-6 border border-brand-200 dark:border-brand-700">
                      <h3 className="font-bold text-[var(--foreground)] mb-4">New Blog Post</h3>
                      <div className="space-y-4">
                        <input
                          id="new-blog-title"
                          type="text"
                          value={newBlog.title}
                          onChange={(e) => setNewBlog((p) => ({ ...p, title: e.target.value }))}
                          placeholder="Post Title *"
                          className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-brand-950/20 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-brand-500"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            id="new-blog-author"
                            type="text"
                            value={newBlog.author}
                            onChange={(e) => setNewBlog((p) => ({ ...p, author: e.target.value }))}
                            placeholder="Author"
                            className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-brand-950/20 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-brand-500"
                          />
                          <input
                            id="new-blog-category"
                            type="text"
                            value={newBlog.category}
                            onChange={(e) => setNewBlog((p) => ({ ...p, category: e.target.value }))}
                            placeholder="Category"
                            className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-brand-950/20 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-brand-500"
                          />
                        </div>
                        <textarea
                          id="new-blog-excerpt"
                          value={newBlog.excerpt}
                          onChange={(e) => setNewBlog((p) => ({ ...p, excerpt: e.target.value }))}
                          placeholder="Excerpt / Summary"
                          rows={2}
                          className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-brand-950/20 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                        />
                        <textarea
                          id="new-blog-content"
                          value={newBlog.content}
                          onChange={(e) => setNewBlog((p) => ({ ...p, content: e.target.value }))}
                          placeholder="Full content..."
                          rows={4}
                          className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-brand-950/20 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                        />
                        <div className="flex gap-3">
                          <button
                            id="admin-save-blog-btn"
                            onClick={handleAddBlog}
                            className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold transition-all"
                          >
                            <Check className="w-4 h-4" />
                            Publish Post
                          </button>
                          <button
                            onClick={() => setShowAddBlog(false)}
                            className="px-5 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-xl text-sm hover:bg-slate-50 dark:hover:bg-brand-800/50 transition-all"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Blog list */}
                  <div className="space-y-3">
                    {filteredBlogs.map((blog: BlogPost) => (
                      <div
                        key={blog.id}
                        className="bg-white dark:bg-brand-900/50 rounded-2xl p-5 border border-slate-100 dark:border-brand-800 flex items-start gap-4"
                      >
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-semibold text-[var(--foreground)] text-sm">{blog.title}</p>
                              <p className="text-xs text-slate-400 mt-0.5">
                                By {blog.author} · {blog.category} · {blog.date}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 flex-shrink-0">
                              <Link
                                href={`/blog/${blog.id}`}
                                className="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950/30 rounded-lg transition-all"
                                title="View post"
                              >
                                <Eye className="w-4 h-4" />
                              </Link>
                              <button
                                onClick={() => deleteBlogPost(blog.id)}
                                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-all"
                                title="Delete post"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-1">{blog.excerpt}</p>
                        </div>
                      </div>
                    ))}
                    {filteredBlogs.length === 0 && (
                      <div className="bg-white dark:bg-brand-900/50 rounded-2xl p-8 border border-slate-100 dark:border-brand-800 text-center text-slate-400 text-sm">
                        No blog posts found.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* FAQ Items */}
              {contentTab === "faq" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-500">{siteData.faqs.length} FAQ items</p>
                    <button
                      id="admin-add-faq-btn"
                      onClick={() => setShowAddFAQ(!showAddFAQ)}
                      className="flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-semibold transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      Add FAQ
                    </button>
                  </div>

                  {showAddFAQ && (
                    <div className="bg-white dark:bg-brand-900/50 rounded-2xl p-6 border border-brand-200 dark:border-brand-700">
                      <h3 className="font-bold text-[var(--foreground)] mb-4">New FAQ Item</h3>
                      <div className="space-y-4">
                        <input
                          id="new-faq-question"
                          type="text"
                          value={newFAQ.question}
                          onChange={(e) => setNewFAQ((p) => ({ ...p, question: e.target.value }))}
                          placeholder="Question *"
                          className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-brand-950/20 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-brand-500"
                        />
                        <textarea
                          id="new-faq-answer"
                          value={newFAQ.answer}
                          onChange={(e) => setNewFAQ((p) => ({ ...p, answer: e.target.value }))}
                          placeholder="Answer"
                          rows={3}
                          className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-brand-950/20 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                        />
                        <input
                          id="new-faq-category"
                          type="text"
                          value={newFAQ.category}
                          onChange={(e) => setNewFAQ((p) => ({ ...p, category: e.target.value }))}
                          placeholder="Category (e.g., Onboarding)"
                          className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-brand-950/20 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-brand-500"
                        />
                        <div className="flex gap-3">
                          <button
                            id="admin-save-faq-btn"
                            onClick={handleAddFAQ}
                            className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold transition-all"
                          >
                            <Check className="w-4 h-4" />
                            Save FAQ
                          </button>
                          <button
                            onClick={() => setShowAddFAQ(false)}
                            className="px-5 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-xl text-sm hover:bg-slate-50 dark:hover:bg-brand-800/50 transition-all"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    {siteData.faqs.map((faq: FAQItem) => (
                      <div
                        key={faq.id}
                        className="bg-white dark:bg-brand-900/50 rounded-2xl p-5 border border-slate-100 dark:border-brand-800"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs px-2 py-0.5 bg-brand-100 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300 rounded-full font-medium">
                                {faq.category}
                              </span>
                            </div>
                            <p className="text-sm font-semibold text-[var(--foreground)]">{faq.question}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{faq.answer}</p>
                          </div>
                          <button
                            onClick={() => deleteFAQ(faq.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-all flex-shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Global Settings */}
          {activeSection === "settings" && (
            <div className="space-y-6 max-w-2xl">
              {/* Branding */}
              <div className="bg-white dark:bg-brand-900/50 rounded-2xl p-6 border border-slate-100 dark:border-brand-800">
                <h3 className="font-bold text-[var(--foreground)] mb-5 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-brand-500" />
                  Branding & Identity
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                        Company Name
                      </label>
                      <input
                        id="settings-company-name"
                        type="text"
                        value={settingsForm.companyName}
                        onChange={(e) => setSettingsForm((p) => ({ ...p, companyName: e.target.value }))}
                        className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-brand-950/20 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                        Logo Text
                      </label>
                      <input
                        id="settings-logo-text"
                        type="text"
                        value={settingsForm.logoText}
                        onChange={(e) => setSettingsForm((p) => ({ ...p, logoText: e.target.value }))}
                        className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-brand-950/20 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-white dark:bg-brand-900/50 rounded-2xl p-6 border border-slate-100 dark:border-brand-800">
                <h3 className="font-bold text-[var(--foreground)] mb-5 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-brand-500" />
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                      Contact Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        id="settings-contact-email"
                        type="email"
                        value={settingsForm.contactEmail}
                        onChange={(e) => setSettingsForm((p) => ({ ...p, contactEmail: e.target.value }))}
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-brand-950/20 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                      Contact Phone
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        id="settings-contact-phone"
                        type="tel"
                        value={settingsForm.contactPhone}
                        onChange={(e) => setSettingsForm((p) => ({ ...p, contactPhone: e.target.value }))}
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-brand-950/20 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature Toggles */}
              <div className="bg-white dark:bg-brand-900/50 rounded-2xl p-6 border border-slate-100 dark:border-brand-800">
                <h3 className="font-bold text-[var(--foreground)] mb-5 flex items-center gap-2">
                  <Settings2 className="w-5 h-5 text-brand-500" />
                  Feature Toggles
                </h3>
                <div className="space-y-4">
                  {[
                    { key: "chatEnabled" as const, label: "Live Chat Widget", desc: "Show the live chat support widget" },
                    { key: "cookieBannerEnabled" as const, label: "Cookie Consent Banner", desc: "Display GDPR cookie consent" },
                    { key: "searchEnabled" as const, label: "Site Search", desc: "Enable global search functionality" },
                  ].map(({ key, label, desc }) => (
                    <div key={key} className="flex items-center justify-between py-3 border-b border-slate-50 dark:border-brand-800 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-[var(--foreground)]">{label}</p>
                        <p className="text-xs text-slate-400">{desc}</p>
                      </div>
                      <button
                        id={`toggle-${key}`}
                        onClick={() => setSettingsForm((p) => ({ ...p, [key]: !p[key] }))}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          settingsForm[key] ? "bg-brand-600" : "bg-slate-200 dark:bg-slate-700"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                            settingsForm[key] ? "translate-x-6" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button
                id="admin-save-settings-btn"
                onClick={handleSaveSettings}
                className="flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-semibold transition-all shadow-md shadow-brand-500/20"
              >
                <Check className="w-4 h-4" />
                Save All Settings
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
