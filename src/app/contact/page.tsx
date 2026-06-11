"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { usePortal } from "@/context/PortalContext";
import { Mail, Phone, MapPin, CheckCircle2, Loader2, Send } from "lucide-react";

const contactSchema = zod.object({
  name: zod.string().min(2, "Name must be at least 2 characters."),
  email: zod.string().email("Please enter a valid email address."),
  company: zod.string().min(2, "Company name must be at least 2 characters."),
  message: zod.string().min(10, "Message must be at least 10 characters."),
});

type ContactFormValues = zod.infer<typeof contactSchema>;

export default function ContactPage() {
  const { siteData, addSubmission } = usePortal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Add to global state
    addSubmission({
      name: data.name,
      email: data.email,
      company: data.company,
      message: data.message,
    });

    setIsSubmitting(false);
    setSubmitSuccess(true);
    reset();

    // Reset success banner after a few seconds
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  return (
    <div className="flex flex-col flex-1 w-full bg-white dark:bg-slate-950 pb-20">
      
      {/* Header Banner */}
      <section className="relative overflow-hidden pt-16 pb-20 bg-slate-950 text-white border-b border-slate-900 px-6">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto relative flex flex-col items-center text-center gap-4">
          <span className="text-xs sm:text-sm font-bold tracking-wider text-brand-400 uppercase">
            GET IN TOUCH
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Contact Support & Sales
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Have questions regarding ISO validations, rate ceilings, or Platinum agreements? Message our integration team.
          </p>
        </div>
      </section>

      {/* Forms and Coordinates */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Contact Coordinates */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
              Platform Integration Desk
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              We respond to developer support requests and sales inquiries within one business day. Check our documentation for instant troubleshooting files.
            </p>
          </div>

          <div className="flex flex-col gap-6 text-slate-600 dark:text-slate-300">
            <div className="flex gap-4 items-start">
              <div className="h-10 w-10 rounded-lg bg-brand-50 dark:bg-brand-950/40 flex items-center justify-center text-brand-600 dark:text-brand-400 shrink-0">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-white">Call Integration Engineers</h4>
                <span className="text-xs sm:text-sm text-slate-400 block mt-0.5">{siteData.settings.contactPhone}</span>
                <span className="text-[10px] text-slate-500 block">Mon - Fri, 09:00 - 18:00 EST</span>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="h-10 w-10 rounded-lg bg-brand-50 dark:bg-brand-950/40 flex items-center justify-center text-brand-600 dark:text-brand-400 shrink-0">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-white">Email Partner Desk</h4>
                <span className="text-xs sm:text-sm text-slate-400 block mt-0.5">{siteData.settings.contactEmail}</span>
                <span className="text-[10px] text-slate-500 block">Secure GPG encrypted communication ready</span>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="h-10 w-10 rounded-lg bg-brand-50 dark:bg-brand-950/40 flex items-center justify-center text-brand-600 dark:text-brand-400 shrink-0">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-white">Corporate HQ Office</h4>
                <span className="text-xs sm:text-sm text-slate-400 block mt-0.5">100 Pine Street, San Francisco, CA 94111</span>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Form */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-10 rounded-2xl shadow-sm">
          {submitSuccess && (
            <div className="mb-6 p-4 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/40 flex items-start gap-3 text-xs sm:text-sm text-green-700 dark:text-green-300">
              <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold">Message Submitted Successfully</h4>
                <p className="mt-0.5 text-slate-500 dark:text-slate-400">Thank you! Your submission has been saved to the admin inbox folder.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            {/* Row 1: Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500">Your Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  {...register("name")}
                  className={`bg-slate-50 dark:bg-slate-950 border rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-500 ${
                    errors.name ? "border-red-500" : "border-slate-200 dark:border-slate-800"
                  }`}
                />
                {errors.name && <span className="text-[10px] text-red-500">{errors.name.message}</span>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500">Corporate Email</label>
                <input
                  type="email"
                  placeholder="j.doe@company.com"
                  {...register("email")}
                  className={`bg-slate-50 dark:bg-slate-950 border rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-500 ${
                    errors.email ? "border-red-500" : "border-slate-200 dark:border-slate-800"
                  }`}
                />
                {errors.email && <span className="text-[10px] text-red-500">{errors.email.message}</span>}
              </div>
            </div>

            {/* Row 2: Company */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500">Company Legal Name</label>
              <input
                type="text"
                placeholder="Acme FinTech Corp"
                {...register("company")}
                className={`bg-slate-50 dark:bg-slate-950 border rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-500 ${
                  errors.company ? "border-red-500" : "border-slate-200 dark:border-slate-800"
                }`}
              />
              {errors.company && <span className="text-[10px] text-red-500">{errors.company.message}</span>}
            </div>

            {/* Row 3: Message */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500">Tell us about your project requirements</label>
              <textarea
                placeholder="Provide details on target API volume, sync specs, or other questions..."
                rows={5}
                {...register("message")}
                className={`bg-slate-50 dark:bg-slate-950 border rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-500 ${
                  errors.message ? "border-red-500" : "border-slate-200 dark:border-slate-800"
                }`}
              />
              {errors.message && <span className="text-[10px] text-red-500">{errors.message.message}</span>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:bg-slate-150 dark:disabled:bg-slate-800 disabled:text-slate-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting Request...
                </>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" />
                  Send Secure Message
                </>
              )}
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}
