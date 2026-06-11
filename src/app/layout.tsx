import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayoutShell from "@/components/ClientLayoutShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BDO Partner Portal",
  description: "The official BDO partner portal for enterprise API integrations, secure cloud services, and co-selling partnerships.",
  keywords: ["BDO Partner Portal", "BDO Developer Center", "API Hub", "Secure Sync Gateway", "Enterprise Integration"],
  openGraph: {
    title: "BDO Partner Portal",
    description: "The official BDO partner portal for enterprise API integrations and secure cloud services.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans antialiased text-slate-900 bg-white dark:bg-slate-950 dark:text-slate-50">
        <ClientLayoutShell>{children}</ClientLayoutShell>
      </body>
    </html>
  );
}
