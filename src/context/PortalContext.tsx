"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Types
export interface SiteSettings {
  companyName: string;
  logoText: string;
  logoUrl: string;
  contactEmail: string;
  contactPhone: string;
  supportUrl: string;
  defaultLang: string;
  searchEnabled: boolean;
  chatEnabled: boolean;
  cookieBannerEnabled: boolean;
  primaryColor: string;
  accentColor: string;
}

export interface HeroBanner {
  headline: string;
  description: string;
  primaryCtaText: string;
  primaryCtaUrl: string;
  secondaryCtaText: string;
  secondaryCtaUrl: string;
  backgroundImage: string;
  videoUrl: string;
}

export interface ClientLogo {
  id: string;
  name: string;
  logoUrl: string;
}

export interface Solution {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name string
  learnMoreUrl: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  rating: number;
  isFeatured: boolean;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  outcome: string;
  roi: string;
  category: string;
  summary: string;
  content: string;
  image: string;
}

export interface Resource {
  id: string;
  title: string;
  type: "whitepaper" | "documentation" | "guide" | "sdk";
  summary: string;
  url: string;
  size?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company: string;
  message: string;
  date: string;
  status: "unread" | "read" | "replied";
  replyContent?: string;
}

export interface UserSession {
  name: string;
  email: string;
  role: "guest" | "partner" | "admin";
  company?: string;
}

export interface PortalNotification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: "info" | "success" | "warning";
}

export interface PortalData {
  settings: SiteSettings;
  hero: HeroBanner;
  clientLogos: ClientLogo[];
  solutions: Solution[];
  testimonials: Testimonial[];
  caseStudies: CaseStudy[];
  resources: Resource[];
  blogs: BlogPost[];
  faqs: FAQItem[];
  submissions: ContactSubmission[];
  notifications: PortalNotification[];
}

interface PortalContextType {
  siteData: PortalData;
  user: UserSession;
  theme: "light" | "dark";
  toggleTheme: () => void;
  login: (role: "partner" | "admin" | "guest", customUser?: Partial<UserSession>) => void;
  logout: () => void;
  updateSettings: (settings: Partial<SiteSettings>) => void;
  updateHero: (hero: Partial<HeroBanner>) => void;
  addSubmission: (submission: Omit<ContactSubmission, "id" | "date" | "status">) => void;
  updateSubmissionStatus: (id: string, status: "unread" | "read" | "replied", reply?: string) => void;
  addBlogPost: (post: Omit<BlogPost, "id" | "date">) => void;
  deleteBlogPost: (id: string) => void;
  addFAQ: (faq: Omit<FAQItem, "id">) => void;
  deleteFAQ: (id: string) => void;
  addTestimonial: (testimonial: Omit<Testimonial, "id">) => void;
  deleteTestimonial: (id: string) => void;
  addResource: (resource: Omit<Resource, "id">) => void;
  deleteResource: (id: string) => void;
  addClientLogo: (logo: Omit<ClientLogo, "id">) => void;
  deleteClientLogo: (id: string) => void;
  addNotification: (title: string, message: string, type: "info" | "success" | "warning") => void;
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;
}

const PortalContext = createContext<PortalContextType | undefined>(undefined);

// Initial Static Data
const defaultSiteData: PortalData = {
  settings: {
    companyName: "NexusPort",
    logoText: "NexusPort",
    logoUrl: "",
    contactEmail: "partners@nexusport.com",
    contactPhone: "+1 (800) 555-0199",
    supportUrl: "/faq",
    defaultLang: "EN",
    searchEnabled: true,
    chatEnabled: true,
    cookieBannerEnabled: true,
    primaryColor: "#0f172a",
    accentColor: "#3b82f6",
  },
  hero: {
    headline: "The Unified Partner Portal for Modern Enterprise Integrations",
    description: "Accelerate development cycles, establish secure cloud connections, and scale your co-selling partnerships with NexusPort.",
    primaryCtaText: "Become a Partner",
    primaryCtaUrl: "/register",
    secondaryCtaText: "Explore Solutions",
    secondaryCtaUrl: "/solutions",
    backgroundImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "",
  },
  clientLogos: [
    { id: "1", name: "FinBank Global", logoUrl: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=120&h=40&q=80" },
    { id: "2", name: "TradeCore", logoUrl: "https://images.unsplash.com/photo-1614064643750-a92cee0adff8?auto=format&fit=crop&w=120&h=40&q=80" },
    { id: "3", name: "GlobalPay", logoUrl: "https://images.unsplash.com/photo-1614064548237-096f735f344f?auto=format&fit=crop&w=120&h=40&q=80" },
    { id: "4", name: "ApexSecurity", logoUrl: "https://images.unsplash.com/photo-1614064850003-13dbfd69fd11?auto=format&fit=crop&w=120&h=40&q=80" },
    { id: "5", name: "FinSync", logoUrl: "https://images.unsplash.com/photo-1614064797087-0b1e3ddfe876?auto=format&fit=crop&w=120&h=40&q=80" },
    { id: "6", name: "CloudCore", logoUrl: "https://images.unsplash.com/photo-1614064547960-911e3b69a23b?auto=format&fit=crop&w=120&h=40&q=80" },
  ],
  solutions: [
    {
      id: "sol-1",
      title: "Core Banking Integration",
      description: "Secure, bi-directional synchronization protocols connecting core systems to modern RESTful cloud architecture.",
      icon: "Cpu",
      learnMoreUrl: "/solutions#banking",
    },
    {
      id: "sol-2",
      title: "Secure Enterprise Gateway",
      description: "SOC2-compliant API distribution layers featuring automatic TLS-encryption, token validation, and rate limiting.",
      icon: "ShieldCheck",
      learnMoreUrl: "/solutions#gateway",
    },
    {
      id: "sol-3",
      title: "Automated Onboarding Hub",
      description: "Standardized developer sandboxes and automated KYC/compliance workflows to shrink partner verification times.",
      icon: "Zap",
      learnMoreUrl: "/solutions#onboarding",
    },
    {
      id: "sol-4",
      title: "Unified Ledger Sync",
      description: "Distributed message queues and double-entry transaction posting endpoints with built-in conflict-resolution engines.",
      icon: "Layers",
      learnMoreUrl: "/solutions#ledger",
    },
  ],
  testimonials: [
    {
      id: "test-1",
      name: "Sarah Jenkins",
      role: "VP of Strategic Alliances",
      company: "FinBank Global",
      quote: "NexusPort shortened our partner integration cycle from months to under two weeks. The interactive sandboxes and automated verification APIs are unmatched in the enterprise space.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
      rating: 5,
      isFeatured: true,
    },
    {
      id: "test-2",
      name: "Marcus Vance",
      role: "Chief Technology Officer",
      company: "GlobalPay Solutions",
      quote: "Security is non-negotiable for our payment rail connectivity. NexusPort's pre-configured compliance blueprints and secure gateway gave our board full confidence to launch ahead of schedule.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
      rating: 5,
      isFeatured: true,
    },
    {
      id: "test-3",
      name: "Elena Rostova",
      role: "Director of Technical Products",
      company: "TradeCore",
      quote: "The developer experience here is a masterclass in portal design. The dynamic breadcrumbs, auto-generated mock endpoints, and transparent SDK releases saved our team hundreds of hours.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&h=100&q=80",
      rating: 5,
      isFeatured: false,
    },
  ],
  caseStudies: [
    {
      id: "case-1",
      title: "FinBank Migrates Legacy Rails to Secure Cloud Sync",
      client: "FinBank Global",
      outcome: "Modernized 30+ core legacy services to cloud endpoints safely, reducing API request latencies by 40%.",
      roi: "300% Developer Onboarding Acceleration",
      category: "Banking Modernization",
      summary: "FinBank Global needed to safely connect legacy transaction systems to third-party fintech apps. NexusPort provided pre-built schema definitions and a secure API distribution gateway.",
      content: "Detailed post-migration analysis showed that migrating core services to the NexusPort secure gateway reduced configuration faults by 80%. Integrating with the sandbox allowed external partners to safely execute dummy requests, boosting developer registration by over 300%. The system handles over 100M daily events with zero disruption to the legacy database layers.",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "case-2",
      title: "GlobalPay Automates Vendor Verification Protocols",
      client: "GlobalPay Solutions",
      outcome: "Reduced manual compliance checks by 95%, accelerating onboarding timeframes from 45 days to 2 days.",
      roi: "95% Reduction in Admin Overhead",
      category: "Compliance & Security",
      summary: "GlobalPay compliance pipelines were heavily manual, slowing partner sign-up. Using NexusPort's automated compliance workflows, verification checks were integrated directly into the onboarding wizard.",
      content: "By implementing automated checks using Zod validator endpoints and integrating third-party background API scripts, GlobalPay eliminated paperwork bottleneck. Submissions are now auto-flagged and analyzed by mock AI verification algorithms. Verified partners instantly receive secure client keys, cutting down wait lists.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80",
    },
  ],
  resources: [
    { id: "res-1", title: "Enterprise API Integration Guide v4.1", type: "documentation", summary: "Detailed guidelines on connecting core databases via secure webhook listener configurations.", url: "#", size: "2.4 MB" },
    { id: "res-2", title: "SSO and OAuth 2.0 Security Manual", type: "whitepaper", summary: "Whitepaper regarding standardizing client authorization tokens across multi-tenant networks.", url: "#", size: "1.8 MB" },
    { id: "res-3", title: "Node.js Software Development Kit (SDK)", type: "sdk", summary: "Production-ready wrapper for accessing transaction ledger endpoints dynamically.", url: "#", size: "12.4 MB" },
    { id: "res-4", title: "Partner Compliance Audit Checklist", type: "guide", summary: "Pre-audit questions and checklists to comply with SOC2, GDPR, and ISO 27001 policies.", url: "#", size: "850 KB" },
  ],
  blogs: [
    {
      id: "blog-1",
      title: "How Agentic AI is Shaping Partner Ecosystem Integration",
      excerpt: "Explore how automated agents are replacing standard webhooks, diagnosing API mismatches, and auto-correcting payloads.",
      content: "Modern enterprise integrations are transitioning from static REST structures to agentic orchestration models. In this post, we discuss how autonomous AI agents can read OpenAPI contracts, auto-generate conversion microservices, and troubleshoot errors. This dramatically shifts the role of developer portals, turning them into active workspaces for intelligent developer systems.",
      author: "Joydeep Roy",
      date: "2026-06-01",
      category: "Agentic AI",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "blog-2",
      title: "Securing High-Frequency REST Transmissions",
      excerpt: "A technical deep-dive into implementing JSON Web Encryption (JWE) alongside mutual TLS configurations.",
      content: "Standard API keys are no longer sufficient for top-tier financial exchanges. The implementation of Mutual TLS (mTLS) creates a secure handshake between client and host, while JWE encrypts sensitive payloads so they remain secure even in the event of traffic interception. Here, we outline the exact configuration commands for Docker deployments.",
      author: "Aero Security Team",
      date: "2026-05-18",
      category: "Security & DevSecOps",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=400&q=80",
    },
  ],
  faqs: [
    { id: "faq-1", question: "How long does the partner approval process take?", answer: "Once submitted via the multi-step registration wizard, our automated compliance engine checks company records. Verification typically takes 24 to 48 hours.", category: "Onboarding" },
    { id: "faq-2", question: "Where do I retrieve my API Client ID and Secrets?", answer: "Sign in to your account, navigate to the Dashboard page, and locate the 'Credentials Manager' section. There you can create, copy, or regenerate keys.", category: "Developer Tools" },
    { id: "faq-3", question: "Does the Sandbox mirror live market data?", answer: "Yes. The sandbox matches live data feeds but uses mock financial balances, permitting complete test execution with zero actual capital risk.", category: "Testing Environment" },
    { id: "faq-4", question: "Is there a limit on sandbox API calls?", answer: "The developer tier supports up to 10,000 API calls per day. Gold and Platinum tiers offer higher rate ceilings which can be requested via the Dashboard support form.", category: "Billing & Tiers" },
  ],
  submissions: [
    { id: "sub-1", name: "David Miller", email: "d.miller@fintechops.com", company: "FinTechOps", message: "We would like to request a customized demo showing how the Ledger Sync integration scales under 5,000 requests per second.", date: "2026-06-10", status: "unread" },
  ],
  notifications: [
    { id: "not-1", title: "Sandbox Maintenance", message: "Sandbox services will undergo routine updates on June 15th between 02:00 and 04:00 UTC. Expect brief interruptions.", date: "2026-06-11", read: false, type: "warning" },
    { id: "not-2", title: "API Credentials", message: "You generated a new development API Key. Keep your Client Secret safe.", date: "2026-06-11", read: true, type: "success" },
  ],
};

export const PortalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteData, setSiteData] = useState<PortalData>(defaultSiteData);
  const [user, setUser] = useState<UserSession>({ name: "Guest", email: "", role: "guest" });
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Load from local storage if available
  useEffect(() => {
    const savedData = localStorage.getItem("nexus_portal_data");
    const savedUser = localStorage.getItem("nexus_portal_user");
    const savedTheme = localStorage.getItem("nexus_portal_theme") as "light" | "dark" | null;

    if (savedData) {
      try {
        setSiteData(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to parse saved portal data", e);
      }
    }
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse saved user", e);
      }
    }
    
    // Set theme
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialTheme = prefersDark ? "dark" : "light";
      setTheme(initialTheme);
      document.documentElement.classList.toggle("dark", initialTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("nexus_portal_theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  };

  const saveAndSetData = (newData: PortalData) => {
    setSiteData(newData);
    localStorage.setItem("nexus_portal_data", JSON.stringify(newData));
  };

  const login = (role: "partner" | "admin" | "guest", customUser?: Partial<UserSession>) => {
    let newSession: UserSession;
    if (role === "partner") {
      newSession = {
        name: customUser?.name || "Joydeep Roy",
        email: customUser?.email || "royjoydeep11@gmail.com",
        role: "partner",
        company: customUser?.company || "Capgemini Corp",
      };
    } else if (role === "admin") {
      newSession = {
        name: "Admin Manager",
        email: "admin@nexusport.com",
        role: "admin",
      };
    } else {
      newSession = { name: "Guest", email: "", role: "guest" };
    }
    setUser(newSession);
    localStorage.setItem("nexus_portal_user", JSON.stringify(newSession));

    // Send notifications for login events
    if (role !== "guest") {
      addNotification(
        "Login Successful",
        `Welcome to the portal, ${newSession.name}! Role: ${role.toUpperCase()}`,
        "success"
      );
    }
  };

  const logout = () => {
    const guestUser: UserSession = { name: "Guest", email: "", role: "guest" };
    setUser(guestUser);
    localStorage.setItem("nexus_portal_user", JSON.stringify(guestUser));
  };

  const updateSettings = (settings: Partial<SiteSettings>) => {
    const updated = { ...siteData, settings: { ...siteData.settings, ...settings } };
    saveAndSetData(updated);
  };

  const updateHero = (hero: Partial<HeroBanner>) => {
    const updated = { ...siteData, hero: { ...siteData.hero, ...hero } };
    saveAndSetData(updated);
  };

  const addSubmission = (submission: Omit<ContactSubmission, "id" | "date" | "status">) => {
    const newSub: ContactSubmission = {
      ...submission,
      id: "sub-" + Date.now(),
      date: new Date().toISOString().split("T")[0],
      status: "unread",
    };
    const updatedSubmissions = [newSub, ...siteData.submissions];
    const updated = { ...siteData, submissions: updatedSubmissions };
    saveAndSetData(updated);

    // Notify admins
    addNotification("New Contact Request", `From ${submission.name} (${submission.company})`, "info");
  };

  const updateSubmissionStatus = (id: string, status: "unread" | "read" | "replied", reply?: string) => {
    const updatedSubmissions = siteData.submissions.map((sub) => {
      if (sub.id === id) {
        return { ...sub, status, replyContent: reply || sub.replyContent };
      }
      return sub;
    });
    saveAndSetData({ ...siteData, submissions: updatedSubmissions });
  };

  const addBlogPost = (post: Omit<BlogPost, "id" | "date">) => {
    const newPost: BlogPost = {
      ...post,
      id: "blog-" + Date.now(),
      date: new Date().toISOString().split("T")[0],
    };
    saveAndSetData({ ...siteData, blogs: [newPost, ...siteData.blogs] });
  };

  const deleteBlogPost = (id: string) => {
    const filtered = siteData.blogs.filter((b) => b.id !== id);
    saveAndSetData({ ...siteData, blogs: filtered });
  };

  const addFAQ = (faq: Omit<FAQItem, "id">) => {
    const newFaq: FAQItem = {
      ...faq,
      id: "faq-" + Date.now(),
    };
    saveAndSetData({ ...siteData, faqs: [...siteData.faqs, newFaq] });
  };

  const deleteFAQ = (id: string) => {
    const filtered = siteData.faqs.filter((f) => f.id !== id);
    saveAndSetData({ ...siteData, faqs: filtered });
  };

  const addTestimonial = (testimonial: Omit<Testimonial, "id">) => {
    const newTest: Testimonial = {
      ...testimonial,
      id: "test-" + Date.now(),
    };
    saveAndSetData({ ...siteData, testimonials: [...siteData.testimonials, newTest] });
  };

  const deleteTestimonial = (id: string) => {
    const filtered = siteData.testimonials.filter((t) => t.id !== id);
    saveAndSetData({ ...siteData, testimonials: filtered });
  };

  const addResource = (resource: Omit<Resource, "id">) => {
    const newRes: Resource = {
      ...resource,
      id: "res-" + Date.now(),
    };
    saveAndSetData({ ...siteData, resources: [newRes, ...siteData.resources] });
  };

  const deleteResource = (id: string) => {
    const filtered = siteData.resources.filter((r) => r.id !== id);
    saveAndSetData({ ...siteData, resources: filtered });
  };

  const addClientLogo = (logo: Omit<ClientLogo, "id">) => {
    const newLogo: ClientLogo = {
      ...logo,
      id: "logo-" + Date.now(),
    };
    saveAndSetData({ ...siteData, clientLogos: [...siteData.clientLogos, newLogo] });
  };

  const deleteClientLogo = (id: string) => {
    const filtered = siteData.clientLogos.filter((l) => l.id !== id);
    saveAndSetData({ ...siteData, clientLogos: filtered });
  };

  const addNotification = (title: string, message: string, type: "info" | "success" | "warning") => {
    const newNotification: PortalNotification = {
      id: "not-" + Date.now(),
      title,
      message,
      date: new Date().toISOString().split("T")[0],
      read: false,
      type,
    };
    setSiteData((prev) => {
      const updated = { ...prev, notifications: [newNotification, ...prev.notifications] };
      localStorage.setItem("nexus_portal_data", JSON.stringify(updated));
      return updated;
    });
  };

  const markNotificationRead = (id: string) => {
    const updatedNotif = siteData.notifications.map((not) => {
      if (not.id === id) return { ...not, read: true };
      return not;
    });
    saveAndSetData({ ...siteData, notifications: updatedNotif });
  };

  const clearAllNotifications = () => {
    saveAndSetData({ ...siteData, notifications: [] });
  };

  return (
    <PortalContext.Provider
      value={{
        siteData,
        user,
        theme,
        toggleTheme,
        login,
        logout,
        updateSettings,
        updateHero,
        addSubmission,
        updateSubmissionStatus,
        addBlogPost,
        deleteBlogPost,
        addFAQ,
        deleteFAQ,
        addTestimonial,
        deleteTestimonial,
        addResource,
        deleteResource,
        addClientLogo,
        deleteClientLogo,
        addNotification,
        markNotificationRead,
        clearAllNotifications,
      }}
    >
      {children}
    </PortalContext.Provider>
  );
};

export const usePortal = () => {
  const context = useContext(PortalContext);
  if (context === undefined) {
    throw new Error("usePortal must be used within a PortalProvider");
  }
  return context;
};
