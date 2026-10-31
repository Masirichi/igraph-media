"use client";

import React from "react";
import { motion } from "framer-motion";

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

export default function WhyChooseUs() {
  const brands = [
    "90's Management",
    "TFZ Cakes & Academy",
    "Cocu Atelier",
    "Creator Linda",
    "DandyAyanfe",
    "Arie & Arin",
    "Hexaves",
    "Perfection Beauty Home",
    "Gidavest",
    "Techregard",
    "Moderncrux",
    "Cityfidelity",
    "Unifera",
  ];

  return (
    <section id="benefits" className="py-24 bg-black text-white border-b border-white/[0.08] relative">
      <div id="why-choose-us" className="absolute -top-24" />
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-[11px] font-mono tracking-[0.2em] uppercase text-[#808080] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B70909]" />
            Why Choose Us
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-white tracking-[-0.03em] mb-4">
            Why choose <span className="italic font-light text-slate-300">Igraph Media</span>
          </h2>
          <p className="text-[#808080] font-sans font-normal text-base md:text-lg leading-relaxed">
            Built for everyday business owners and growing enterprises that require data-driven advertising, strategic PR, and digital transformation built to scale everyday operations.
          </p>
        </div>

        {/* Bento Canvas with Warm Bone/Stone Frame (Matching Reference Mockup) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: LUXURY_EASE }}
          className="bg-[#ebeae5] p-4 sm:p-6 rounded-[28px] shadow-2xl border border-white/20"
        >
          {/* macOS Browser Window Mockup Header Bar */}
          <div className="flex items-center px-2 pb-3 mb-2" aria-hidden="true">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block" />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            
            {/* Row 1: Card 1 (Formatted for Every Platform) + Card 2 (Trusted by 100+ Businesses) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              
              {/* Card 1 (Top-Left, Wide: 7 cols) */}
              <div className="lg:col-span-7 bg-[#1e2320] rounded-[22px] p-8 sm:p-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="max-w-sm">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-3 tracking-tight font-sans">
                    Perfectly Formatted for Every Platform
                  </h3>
                  <p className="text-[#9ca3af] text-sm leading-relaxed">
                    Every edit and campaign is optimized for Google, Meta, TikTok, and YouTube to ensure maximum visibility and business growth.
                  </p>
                </div>

                {/* Staggered App Squircle Matrix */}
                <div className="flex gap-3 items-center self-center sm:self-auto flex-shrink-0">
                  {/* Column 1 */}
                  <div className="flex flex-col gap-3">
                    {/* Google */}
                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-md hover:scale-105 transition-transform" title="Google Search & Ads">
                      <svg width="24" height="24" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                      </svg>
                    </div>
                    {/* TikTok */}
                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-md hover:scale-105 transition-transform" title="TikTok Growth">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="#000000">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-.88-.07A6.34 6.34 0 0 0 3 15.67a6.34 6.34 0 0 0 9.29 5.56 6.31 6.31 0 0 0 3.38-5.56V8.6a8.27 8.27 0 0 0 4.79 1.52v-3.43a4.85 4.85 0 0 1-.87 0z"/>
                      </svg>
                    </div>
                    {/* Instagram */}
                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-md hover:scale-105 transition-transform" title="Instagram Marketing">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </div>
                    {/* Ghost Metallic Tile */}
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-[#3d443f] to-[#242925] border border-white/10 shadow-inner" aria-hidden="true" />
                  </div>

                  {/* Column 2 (Offset) */}
                  <div className="flex flex-col gap-3">
                    {/* Ghost Metallic Tile */}
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-[#3d443f] to-[#242925] border border-white/10 shadow-inner" aria-hidden="true" />
                    {/* Meta */}
                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-md hover:scale-105 transition-transform" title="Meta Advertising">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#0081FB">
                        <path d="M16.96 4.5c-1.97 0-3.66 1.04-4.96 2.65C10.7 5.54 9.01 4.5 7.04 4.5 3.51 4.5 1 7.35 1 11.23c0 4.19 3.1 8.27 6.42 8.27 2.18 0 3.8-1.12 4.58-2.31.78 1.19 2.4 2.31 4.58 2.31 3.32 0 6.42-4.08 6.42-8.27 0-3.88-2.51-6.73-6.04-6.73zm-9.92 12.6c-2.32 0-4.34-3.32-4.34-5.87 0-2.34 1.48-4.33 3.94-4.33 1.94 0 3.37 1.25 4.31 2.8-1.12 2.16-2.43 5.4-3.91 7.4zm9.92 0c-1.48-2-2.79-5.24-3.91-7.4.94-1.55 2.37-2.8 4.31-2.8 2.46 0 3.94 1.99 3.94 4.33 0 2.55-2.02 5.87-4.34 5.87z"/>
                      </svg>
                    </div>
                    {/* YouTube */}
                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-md hover:scale-105 transition-transform" title="YouTube Video Funnels">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="#000000">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </div>
                    {/* Ghost Metallic Tile */}
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-[#3d443f] to-[#242925] border border-white/10 shadow-inner" aria-hidden="true" />
                  </div>
                </div>
              </div>

              {/* Card 2 (Top-Right, Narrow: 5 cols) */}
              <div className="lg:col-span-5 bg-[#1e2320] rounded-[22px] p-8 sm:p-10 flex flex-col justify-start gap-3.5 shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="text-white text-sm tracking-widest flex gap-1" aria-label="5 stars rating">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight tracking-tight font-sans">
                  Trusted by 100+ Businesses
                </h3>
                <p className="text-[#9ca3af] text-sm leading-relaxed">
                  From rising startups to established brands, we've helped over 100 business owners scale their commercial presence, attract loyal customers, and build lasting authority.
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {brands.map((b) => (
                    <span
                      key={b}
                      className="text-[11px] font-medium bg-white/[0.07] text-neutral-300 px-2.5 py-1 rounded-full border border-white/[0.09]"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Row 2: Card 3 (Organic Reach) + Card 4 (Dedicated Partnership) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              
              {/* Card 3 (Bottom-Left, Narrow: 4 cols) */}
              <div className="lg:col-span-4 bg-[#1e2320] rounded-[22px] p-8 sm:p-10 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-2xl transition-all duration-300 min-h-[290px]">
                <div className="text-white mb-3" aria-hidden="true">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </div>
                <div className="text-6xl sm:text-7xl font-extrabold text-white tracking-tight my-2 font-sans">
                  5M+
                </div>
                <div className="text-sm font-medium text-[#9ca3af] max-w-[200px] leading-snug">
                  Organic Impressions Generated
                </div>
              </div>

              {/* Card 4 (Bottom-Right, Wide: 8 cols) */}
              <div className="lg:col-span-8 bg-[#1e2320] rounded-[22px] overflow-hidden grid grid-cols-1 sm:grid-cols-2 items-stretch shadow-lg hover:shadow-2xl transition-all duration-300 min-h-[290px]">
                {/* Team photography */}
                <div className="relative h-60 sm:h-full w-full overflow-hidden">
                  <img
                    src="assets/team-collaboration.jpg"
                    alt="Igraph Media Collaboration Team"
                    className="w-full h-full object-cover object-left"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1e2320]/80 to-[#1e2320] hidden sm:block" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1e2320]/80 to-[#1e2320] sm:hidden" />
                </div>

                {/* Dedicated Partnership content */}
                <div className="p-8 sm:p-10 flex flex-col justify-center gap-3.5 bg-[#1e2320] z-10">
                  <div className="text-white" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.19"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-sans">
                    Dedicated Partnership
                  </h3>
                  <p className="text-[#9ca3af] text-sm leading-relaxed">
                    We collaborate closely with your leadership to architect, launch, and scale high-impact commercial campaigns.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
