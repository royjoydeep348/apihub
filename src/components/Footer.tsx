"use client";

import React from "react";
import Link from "next/link";

const footerLinks = [
  {
    title: "Products",
    items: [
      { label: "Lending", url: "/products#lending" },
      { label: "Credit Cards", url: "/products#credit-cards" },
      { label: "Deposit Products", url: "/products#deposit-products" },
      { label: "Open Banking", url: "/products#open-banking" },
    ],
  },
  {
    title: "Partners",
    items: [{ label: "Featured Partners", url: "/partner-program" }],
  },
  {
    title: "Developers",
    items: [{ label: "For Developers", url: "/resources" }],
  },
  {
    title: "Help & Support",
    items: [{ label: "Contact Us", url: "/contact" }],
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto w-full bg-[#303030] px-10 py-8 text-white">
      <div className="grid max-w-5xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {footerLinks.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h4 className="mb-6 text-sm font-bold leading-none text-white">
              {group.title}
            </h4>
            <ul className="space-y-6">
              {group.items.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.url}
                    className="text-xs font-medium text-white transition-colors hover:text-slate-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
    </footer>
  );
}
