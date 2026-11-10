"use client";

import React from "react";
import { motion } from "framer-motion";

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

export default function About() {
  return (
    <section id="about" className="py-28 bg-black text-white border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-[11px] font-mono tracking-[0.2em] uppercase text-[#808080] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B70909]" />
            Institutional Ethos
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-white tracking-[-0.03em] mb-4">
            Establishing <span className="italic font-light text-slate-300">Enduring Brand Authority</span>
          </h2>
          <p className="text-[#808080] font-sans font-normal text-base md:text-lg leading-relaxed">
            Architecting enduring market authority through algorithmic precision, narrative defense, and internal operational mastery.
          </p>
        </div>

        {/* Editorial About Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Main Narrative Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: LUXURY_EASE }}
            className="lg:col-span-7 bg-[#0c0c0c] border border-white/[0.08] p-8 md:p-12 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img src="/assets/logo-icon-white.png" alt="Igraph Mark" className="w-7 h-7 object-contain" />
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#808080]">
                  Established 2024 &bull; Digital Growth Agency
                </span>
              </div>
              <h3 className="font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-5">
                Own Your Narrative, Grow Your Business
              </h3>
              <div className="space-y-4">
                <p className="text-[#c4c4c4] font-sans font-normal text-sm md:text-base leading-relaxed">
                  We believe that every ambitious startup and small business possesses a story powerful enough to challenge industry leaders. You do not just need promotion—you need to own your narrative. Our core purpose is to give growing brands the voice, authority, and presence required to be heard clearly in a noisy marketplace.
                </p>

                {/* Lower Section: Emboldened and animated to change colors on hover */}
                <div className="group relative bg-gradient-to-br from-[#141414] to-[#0a0a0a] border border-white/[0.14] hover:border-[#B70909]/70 rounded-xl p-6 sm:p-7 transition-all duration-500 overflow-hidden cursor-pointer shadow-lg hover:shadow-[#B70909]/20 hover:-translate-y-0.5">
                  <div className="pointer-events-none absolute -top-12 -right-12 w-36 h-36 rounded-full bg-[#B70909]/20 blur-2xl opacity-30 group-hover:opacity-90 group-hover:scale-125 transition-all duration-500" />
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B70909] shadow-[0_0_8px_#B70909]" />
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#808080] group-hover:text-[#ff8080] transition-colors">
                      The Growth Architecture
                    </span>
                  </div>

                  <p className="font-sans font-extrabold text-base sm:text-lg leading-relaxed text-white transition-all duration-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-[#ff4d4d] group-hover:to-[#B70909] group-hover:animate-pulse">
                    &ldquo;By combining data-backed public relations strategies with precise, targeted digital advertising, we turn authentic brand stories into measurable commercial success. We focus on clear facts, persuasive positioning, and consistent execution to help you earn customer trust, outmaneuver competitors, and build lasting market leadership.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-white/[0.08] flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="text-xl font-bold text-white">Strategy • Public Relations • Growth</div>
                <div className="text-xs text-[#808080] font-mono">Strategy &bull; Public Relations &bull; Growth</div>
              </div>
              <a
                href="#contact"
                className="px-6 py-3 bg-[#B70909] hover:bg-[#cf1111] active:bg-[#940707] text-white text-xs font-semibold tracking-wider uppercase transition-colors"
              >
                Get in touch
              </a>
            </div>
          </motion.div>

          {/* Pillars Stack */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12, ease: LUXURY_EASE }}
            className="lg:col-span-5 flex flex-col gap-3.5"
          >
            <div className="bg-[#0c0c0c] border border-white/[0.08] p-5 flex gap-4">
              <div className="font-mono text-xs font-bold text-[#808080]">01</div>
              <div>
                <h4 className="text-sm font-semibold text-white mb-1">Openness &amp; Creative Clarity</h4>
                <p className="text-xs text-[#808080] leading-relaxed">
                  Radical transparency in performance data and creative strategy. Every client retains full intellectual property, direct ad account access, and complete data governance.
                </p>
              </div>
            </div>

            <div className="bg-[#0c0c0c] border border-white/[0.08] p-5 flex gap-4">
              <div className="font-mono text-xs font-bold text-[#808080]">02</div>
              <div>
                <h4 className="text-sm font-semibold text-white mb-1">Architectural Depth &amp; Discipline</h4>
                <p className="text-xs text-[#808080] leading-relaxed">
                  Uncompromising narrative integrity and algorithmic rigor. We do not engage in superficial vanity metrics; we build durable balance-sheet expansion.
                </p>
              </div>
            </div>

            <div className="bg-[#0c0c0c] border border-white/[0.08] p-5 flex gap-4">
              <div className="font-mono text-xs font-bold text-[#808080]">03</div>
              <div>
                <h4 className="text-sm font-semibold text-white mb-1">Intellectual Experience &amp; Wisdom</h4>
                <p className="text-xs text-[#808080] leading-relaxed">
                  Our advisors and engineers bring decades of collective market mastery to navigate regulatory, macro-economic, and technological transitions.
                </p>
              </div>
            </div>

            <div className="bg-[#0c0c0c] border-l-4 border-l-[#B70909] border-y border-r border-white/[0.08] p-5 flex gap-4">
              <div className="font-mono text-xs font-bold text-[#B70909]">04</div>
              <div>
                <h4 className="text-sm font-semibold text-white mb-1">Desire &amp; Passion for Scale</h4>
                <p className="text-xs text-[#808080] leading-relaxed">
                  A restless obsession with speed, compounding efficiency, and securing permanent market advantages for the institutions we represent.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Real-Time Metrics Strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.18, ease: LUXURY_EASE }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-8 border-t border-white/[0.08]"
        >
          <div className="p-6 bg-white/[0.015] border border-white/[0.08] text-center">
            <div className="font-sans text-4xl font-extrabold text-white tracking-tight">$420M+</div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#808080] mt-2">Capital Arbitraged &amp; Scaled</div>
          </div>
          <div className="p-6 bg-white/[0.015] border border-white/[0.08] text-center">
            <div className="font-sans text-4xl font-extrabold text-white tracking-tight">99.4%</div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#808080] mt-2">Operational Permanence Rating</div>
          </div>
          <div className="p-6 bg-white/[0.015] border border-white/[0.08] text-center">
            <div className="font-sans text-4xl font-extrabold text-white tracking-tight">14 Days</div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#808080] mt-2">Average Systemic Deployment</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
