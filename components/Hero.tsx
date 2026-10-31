"use client";

import React from "react";
import { motion } from "framer-motion";

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const brands = [
    "90'S MANAGEMENT",
    "DANDYAYANFE",
    "ARIE & ARIN",
    "HEXAVES",
    "PERFECTION BEAUTY HOME",
    "GIDAVEST",
    "TECHREGARD",
    "MODERNCRUX",
    "CITYFIDELITY",
    "TFZ CAKES & ACADEMY",
  ];

  return (
    <section id="home" className="relative bg-black text-white selection:bg-[#B70909] selection:text-white pt-36 md:pt-44 pb-12 overflow-hidden text-center">
      {/* Background Dot Grid (LineaDS Style) */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-0 z-0 opacity-40 [background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_70%,transparent_100%)]"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
        {/* Social Proof Avatar Pill & Rating (LineaDS Style) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: LUXURY_EASE }}
          className="inline-flex items-center gap-3.5 px-4 py-1.5 rounded-full border border-white/[0.14] bg-white/[0.03] mb-8"
        >
          <div className="flex items-center -space-x-1.5">
            <span className="w-6 h-6 rounded-full bg-[#1e1e1e] border-2 border-black flex items-center justify-center text-[9px] font-bold">SC</span>
            <span className="w-6 h-6 rounded-full bg-[#1e1e1e] border-2 border-black flex items-center justify-center text-[9px] font-bold">MB</span>
            <span className="w-6 h-6 rounded-full bg-[#1e1e1e] border-2 border-black flex items-center justify-center text-[9px] font-bold">PK</span>
            <span className="w-6 h-6 rounded-full bg-black border-2 border-black flex items-center justify-center p-1">
              <img src="/assets/logo-icon-white.png" alt="Igraph" className="w-full h-full object-contain" />
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-white">
            <span className="text-[#ffb800] tracking-widest">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            <span><strong>4.9</strong> &bull; 300+ Scaled Brands &bull; Verified Impact</span>
          </div>
        </motion.div>

        {/* Declarative Headline (H1) */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: LUXURY_EASE }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-white tracking-[-0.03em] leading-[1.08] mb-6"
        >
          Turn Your Brand Story Into <br className="hidden sm:inline" />
          <span className="italic font-normal text-slate-300">Real Business Growth.</span>
        </motion.h1>

        {/* Subheadline: Clear, Plain, Accessible Diction */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.16, ease: LUXURY_EASE }}
          className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-[#a0a0a0] font-sans font-normal leading-relaxed tracking-[-0.01em] mb-10"
        >
          We combine targeted digital advertising, strategic public relations, and high-converting websites to help everyday businesses attract customers, build trust, and grow revenue.
        </motion.p>

        {/* Buttons: Primary (Get Started) + Secondary (Explore Services) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24, ease: LUXURY_EASE }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#B70909] hover:bg-[#cf1111] active:bg-[#940707] text-white text-xs font-semibold tracking-wider uppercase transition-colors rounded-sm shadow-md"
          >
            <span>Get Started</span>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square"/>
            </svg>
          </a>

          <a
            href="#services"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 border border-white/[0.18] hover:border-white bg-transparent text-white text-xs font-semibold tracking-wider uppercase transition-colors rounded-sm"
          >
            <span>Explore Services</span>
          </a>
        </motion.div>
      </div>

      {/* Marquee Ticker */}
      <div className="w-full border-y border-white/[0.08] py-6 bg-[#030303] overflow-hidden">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#555555] mb-4 text-center">
          Trusted by institutional teams and ambitious founders globally
        </p>
        <div className="flex overflow-hidden whitespace-nowrap select-none">
          <div className="flex gap-12 items-center animate-marquee">
            {brands.concat(brands).map((brand, i) => (
              <span key={i} className="font-mono text-xs font-semibold tracking-[0.2em] text-white/40 hover:text-white transition-colors">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
