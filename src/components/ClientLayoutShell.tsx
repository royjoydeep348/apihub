"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import CookieConsent from "./CookieConsent";
import LiveChat from "./LiveChat";
import { PortalProvider } from "@/context/PortalContext";

interface ClientLayoutShellProps {
  children: React.ReactNode;
}

export default function ClientLayoutShell({ children }: ClientLayoutShellProps) {
  const pathname = usePathname();

  // Route groupings
  const isDashboard = pathname.startsWith("/dashboard");
  const isAdmin = pathname.startsWith("/admin");
  const isAuth = pathname === "/login" || pathname === "/register";

  const hideGlobalShell = isDashboard || isAdmin || isAuth;

  return (
    <PortalProvider>
      <div className="flex flex-col min-h-screen">
        {!hideGlobalShell && <Header />}
        <main className="flex-1 flex flex-col">{children}</main>
        {!hideGlobalShell && <Footer />}
        <CookieConsent />
        <LiveChat />
      </div>
    </PortalProvider>
  );
}
