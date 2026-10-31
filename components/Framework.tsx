"use client";

import React from "react";
import { motion } from "framer-motion";

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

export default function Framework() {
  return (
    <section id="how-it-works" className="py-28 bg-black text-white border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-[11px] font-mono tracking-[0.2em] uppercase text-[#808080] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B70909]" />
            How It Works
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-white tracking-[-0.03em] mb-4">
            Great operations, <span className="italic font-light text-slate-300">done simply, delivered fast.</span>
          </h2>
          <p className="text-[#808080] font-sans font-normal text-base md:text-lg leading-relaxed">
            A frictionless cadence designed for ambitious leadership teams who move fast and scale faster.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1: Subscribe */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: LUXURY_EASE }}
            className="bg-[#0c0c0c] border border-white/[0.08] p-8 rounded flex flex-col justify-between"
          >
            <div>
              <div className="font-mono text-3xl font-extrabold text-white/20 mb-4">01</div>
              <div className="flex gap-2 mb-4">
                <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 bg-white/[0.04] border border-white/[0.08] text-[#808080]">
                  Flat Monthly Fee
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 bg-white/[0.04] border border-white/[0.08] text-[#808080]">
                  Pause Anytime
                </span>
              </div>
              <h3 className="font-sans text-xl font-bold text-white mb-3">Subscribe</h3>
              <p className="text-[#808080] text-sm leading-relaxed">
                Choose an operational model that matches your current growth stage. Predictable flat fee, no surprise retainer bloat.
              </p>
            </div>
          </motion.div>

          {/* Step 2: Request with Kanban Board Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: LUXURY_EASE }}
            className="bg-[#0e0e0e] border border-white/[0.14] p-8 rounded flex flex-col justify-between"
          >
            <div>
              <div className="font-mono text-3xl font-extrabold text-white/20 mb-4">02</div>
              <h3 className="font-sans text-xl font-bold text-white mb-2">Request</h3>
              <p className="text-[#808080] text-sm leading-relaxed mb-5">
                Submit your operational priorities directly to your dedicated team. Media campaigns, PR narratives, or internal AI training.
              </p>

              {/* Kanban Mockup */}
              <div className="space-y-2.5 pt-4 border-t border-white/[0.08]">
                <div className="bg-[#050505] border border-white/[0.08] p-3 rounded flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-white">Algorithmic Media Arbitrage Sprints</div>
                    <div className="font-mono text-[9px] text-[#555]">Active Sprint</div>
                  </div>
                  <span className="font-mono text-[9px] font-bold px-2 py-0.5 bg-[#B70909]/20 text-[#ff6666] border border-[#B70909]">
                    In Progress
                  </span>
                </div>

                <div className="bg-[#050505] border border-white/[0.08] p-3 rounded flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-white">Tier-1 Financial Editorial Syndicate</div>
                    <div className="font-mono text-[9px] text-[#555]">Phase 2</div>
                  </div>
                  <span className="font-mono text-[9px] font-bold px-2 py-0.5 bg-[#ffb800]/15 text-[#ffb800] border border-[#ffb800]/40">
                    Review
                  </span>
                </div>

                <div className="bg-[#050505] border border-white/[0.08] p-3 rounded flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-white">Enterprise AI Workflow Training Pod</div>
                    <div className="font-mono text-[9px] text-[#555]">Next Sprint</div>
                  </div>
                  <span className="font-mono text-[9px] font-bold px-2 py-0.5 bg-white/[0.05] text-[#808080] border border-white/[0.08]">
                    To Do
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Step 3: Receive */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: LUXURY_EASE }}
            className="bg-[#0c0c0c] border border-white/[0.08] p-8 rounded flex flex-col justify-between"
          >
            <div>
              <div className="font-mono text-3xl font-extrabold text-white/20 mb-4">03</div>
              <div className="flex gap-2 mb-4">
                <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 bg-white/[0.04] border border-white/[0.08] text-[#808080]">
                  Compounding Scale
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 bg-white/[0.04] border border-white/[0.08] text-[#808080]">
                  Continuous Velocity
                </span>
              </div>
              <h3 className="font-sans text-xl font-bold text-white mb-3">Receive</h3>
              <p className="text-[#808080] text-sm leading-relaxed">
                Receive high-impact deliverables and operational results within days. We stay continuously ready for your next milestone.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
