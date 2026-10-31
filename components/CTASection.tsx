"use client";

import React from "react";

export default function CTASection() {
  return (
    <section className="py-20 bg-black text-white relative text-center overflow-hidden border-b border-white/[0.08]">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="bg-[#080808] border border-white/[0.14] rounded p-12 md:p-16 relative overflow-hidden">
          {/* Radial Ambient Glow */}
          <div 
            aria-hidden="true" 
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-b from-[#B70909]/[0.2] to-transparent blur-3xl"
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#808080] block mb-4">
              Ready to Grow?
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-white tracking-[-0.03em] leading-tight mb-5">
              We make growing your business <br />
              <span className="italic font-light text-slate-300">simple and predictable.</span>
            </h2>
            <p className="text-[#a0a0a0] font-sans font-normal text-sm md:text-base leading-relaxed mb-8">
              Book a private 20-minute consultation with our team to discuss your goals and map out a clear growth strategy.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 border border-white/[0.2] hover:border-white text-white text-xs font-semibold tracking-wider uppercase transition-colors rounded-sm"
              >
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
