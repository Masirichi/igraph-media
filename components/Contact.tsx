"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const partnerBrands = [
    "Cocu Atelier",
    "TFZ Cakes and Academy",
    "90's Management",
    "Creator Linda",
    "Unifera",
    "Hexaves",
    "Gidavest",
    "Perfection Beauty Home",
    "DandyAyanfe",
    "Arie & Arin",
    "Techregard",
  ];

  return (
    <section id="contact" className="py-28 bg-black text-white border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-[11px] font-mono tracking-[0.2em] uppercase text-[#808080] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B70909]" />
            Confidential Advisory &bull; Direct Consultation
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-white tracking-[-0.03em] mb-4">
            Contact <span className="italic font-light text-slate-300">Igraph Media</span>
          </h2>
          <p className="text-[#808080] font-sans font-normal text-base md:text-lg leading-relaxed">
            Direct executive consultation for business owners, founders, and enterprise leadership seeking digital permanence, cross-platform customer acquisition, and market authority.
          </p>
        </div>

        {/* Contact Grid: Details + Advisory Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: LUXURY_EASE }}
            className="lg:col-span-5 bg-[#0c0c0c] border border-white/[0.08] p-8 md:p-10 flex flex-col justify-between"
          >
            <div>
              <h3 className="font-sans text-xl font-bold text-white mb-2">Executive Advisory</h3>
              <p className="text-[#808080] font-sans font-normal text-sm leading-relaxed mb-6">
                Direct consultation for business owners evaluating data-driven advertising, conversion web development, generative search optimization (GEO), and strategic PR architecture.
              </p>

              {/* Advisory Card */}
              <div className="bg-[#080808] border border-white/[0.08] p-5 mb-5">
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#808080] mb-1.5">Client Advisory Services</div>
                <div className="flex items-center gap-2 text-lg font-bold text-white">
                  <span className="w-2 h-2 rounded-full bg-[#B70909]" />
                  <span>Direct Client Consultation</span>
                </div>
                <div className="text-xs text-[#808080] font-mono mt-1.5">
                  Dedicated Account Operations &bull; GMT+1 (WAT)
                </div>
              </div>

              {/* Verified Partner Brands Strip */}
              <div className="mb-6 p-4 bg-white/[0.02] border border-white/[0.06] rounded-sm">
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#808080] mb-2.5">
                  Proven Across 10+ Scaling Brands
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {partnerBrands.map((b) => (
                    <span
                      key={b}
                      className="text-[11px] font-medium bg-white/[0.06] text-neutral-300 px-2 py-0.5 rounded-sm border border-white/[0.06]"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-3.5 text-sm font-sans">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#808080] block mb-0.5">Confidential Briefs</span>
                  <a href="mailto:advisory@igraphmedia.com" className="text-white hover:underline transition-colors">
                    advisory@igraphmedia.com
                  </a>
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#808080] block mb-0.5">Executive Inquiries</span>
                  <a href="mailto:hello@igraphmedia.com" className="text-white hover:underline transition-colors">
                    hello@igraphmedia.com
                  </a>
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#808080] block mb-0.5">Direct Phone Line</span>
                  <a href="tel:+2348153253639" className="text-white font-mono hover:underline">
                    +234 (815) 325-3639
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/[0.08] flex items-center gap-2.5">
              <img src="/assets/logo-icon-white.png" alt="Igraph Mark" className="w-4 h-4 object-contain" />
              <span className="font-mono text-xs text-[#808080]">
                Igraph Media Inc. &bull; Enterprise Non-Disclosure Protocols
              </span>
            </div>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12, ease: LUXURY_EASE }}
            className="lg:col-span-7 bg-[#0c0c0c] border border-white/[0.08] p-8 md:p-10"
          >
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-10 h-10 rounded-full bg-[#B70909]/20 border border-[#B70909] flex items-center justify-center mb-4">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B70909" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h4 className="font-sans text-xl font-bold text-white mb-2">Commercial Brief Received</h4>
                <p className="text-[#808080] font-sans max-w-md text-sm leading-relaxed mb-6">
                  Thank you. Our executive advisory team will review your operational brief and reach out within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2 border border-white/[0.15] text-xs font-mono uppercase tracking-wider text-[#808080] hover:text-white"
                >
                  Submit Another Brief
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block font-mono text-[10px] uppercase tracking-wider text-[#808080] mb-1.5">
                    Full Name &amp; Executive Title
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    placeholder="e.g. Adebayo Adeleke, Managing Director"
                    className="w-full bg-[#000000] border border-white/[0.12] px-4 py-3 text-white text-sm focus:border-white/[0.4] focus:outline-none transition-colors rounded-sm"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block font-mono text-[10px] uppercase tracking-wider text-[#808080] mb-1.5">
                    Company / Brand Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    required
                    placeholder="e.g. Cocu Atelier, 90's Management, Unifera, TFZ Cakes"
                    className="w-full bg-[#000000] border border-white/[0.12] px-4 py-3 text-white text-sm focus:border-white/[0.4] focus:outline-none transition-colors rounded-sm"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-mono text-[10px] uppercase tracking-wider text-[#808080] mb-1.5">
                    Corporate Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="name@company.com"
                    className="w-full bg-[#000000] border border-white/[0.12] px-4 py-3 text-white text-sm focus:border-white/[0.4] focus:outline-none transition-colors rounded-sm"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block font-mono text-[10px] uppercase tracking-wider text-[#808080] mb-1.5">
                    Primary Service Requirement
                  </label>
                  <select
                    id="service"
                    className="w-full bg-[#000000] border border-white/[0.12] px-4 py-3 text-white text-sm focus:border-white/[0.4] focus:outline-none transition-colors rounded-sm"
                  >
                    <option value="web-dev">Web Design and Development</option>
                    <option value="seo-geo">SEO &amp; GEO (Search &amp; Generative AI Optimization)</option>
                    <option value="social-media">Social Media Management &amp; Omnichannel Content</option>
                    <option value="advertising">Digital Advertising (Google, Meta, LinkedIn, TikTok)</option>
                    <option value="pr">Public Relations &amp; Tier-1 Authority Stature</option>
                    <option value="full">Comprehensive Business Growth &amp; Transformation Pod</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block font-mono text-[10px] uppercase tracking-wider text-[#808080] mb-1.5">
                    Commercial Objective / Growth Bottleneck
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="Briefly outline your revenue targets, current digital bottlenecks, or target milestones..."
                    className="w-full bg-[#000000] border border-white/[0.12] px-4 py-3 text-white text-sm focus:border-white/[0.4] focus:outline-none transition-colors resize-none rounded-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#B70909] hover:bg-[#cf1111] active:bg-[#940707] text-white text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 rounded-sm shadow-md"
                >
                  <span>Get Started</span>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
                  </svg>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
