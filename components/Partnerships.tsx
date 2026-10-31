"use client";

import React from "react";
import { motion } from "framer-motion";

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

export default function Partnerships() {
  return (
    <section id="pricing" className="py-28 bg-black text-white border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-[11px] font-mono tracking-[0.2em] uppercase text-[#808080] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B70909]" />
            Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-white tracking-[-0.03em] mb-4">
            Transparent pricing, <span className="italic font-light text-slate-300">no hidden fees.</span>
          </h2>
          <p className="text-[#808080] font-sans font-normal text-base md:text-lg leading-relaxed">
            Choose the operational model built for your velocity. Pause or scale anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Tier 1: Growth Architecture */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: LUXURY_EASE }}
            className="bg-[#0c0c0c] border border-white/[0.08] p-8 md:p-10 rounded flex flex-col justify-between"
          >
            <div>
              <h3 className="font-sans text-2xl font-bold text-white mb-2">Growth Architecture</h3>
              <p className="text-[#808080] text-sm mb-6">For scaling businesses requiring rigorous media acquisition and earned PR presence.</p>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-4xl sm:text-5xl font-extrabold text-white">$9,500</span>
                <span className="font-mono text-xs text-[#808080]">/ month</span>
              </div>

              <ul className="space-y-3 py-6 border-t border-white/[0.08] text-sm text-[#ddd]">
                <li className="flex items-center gap-2.5">
                  <span className="text-white font-bold">&check;</span> 1 active operational pod at a time
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-white font-bold">&check;</span> Full-stack data-driven advertising management
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-white font-bold">&check;</span> Algorithmic LTV and attribution modeling
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-white font-bold">&check;</span> Tier-1 editorial placements and narrative drafting
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-white font-bold">&check;</span> Weekly operational velocity reporting
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-white font-bold">&check;</span> Pause or cancel anytime
                </li>
              </ul>
            </div>

            <a
              href="#contact"
              className="w-full py-3.5 mt-6 text-center border border-white/[0.2] hover:border-white text-white text-xs font-semibold uppercase tracking-wider transition-colors rounded-sm"
            >
              Start Scaling
            </a>
          </motion.div>

          {/* Tier 2: Enterprise Pod (Featured) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: LUXURY_EASE }}
            className="bg-[#0f0f0f] border-2 border-white/[0.25] p-8 md:p-10 rounded flex flex-col justify-between relative"
          >
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#B70909] text-white px-3 py-0.5 text-[10px] font-mono uppercase tracking-widest font-bold rounded-sm">
              2 SPOTS AVAILABLE
            </div>

            <div>
              <h3 className="font-sans text-2xl font-bold text-white mb-2">Enterprise Pod</h3>
              <p className="text-[#808080] text-sm mb-6">Complete operational takeover: ad deployment, crisis PR, and intensive internal workforce training.</p>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-4xl sm:text-5xl font-extrabold text-[#B70909]">$18,500</span>
                <span className="font-mono text-xs text-[#808080]">/ month</span>
              </div>

              <ul className="space-y-3 py-6 border-t border-white/[0.08] text-sm text-[#ddd]">
                <li className="flex items-center gap-2.5">
                  <span className="text-[#B70909] font-bold">&check;</span> 2 active operational pods concurrently
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-[#B70909] font-bold">&check;</span> Rapid priority turnaround on strategic requests
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-[#B70909] font-bold">&check;</span> Dedicated 4-person growth &amp; analytics pod
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-[#B70909] font-bold">&check;</span> Bi-weekly digital transformation workshops
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-[#B70909] font-bold">&check;</span> Crisis communications and defense retainer
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-[#B70909] font-bold">&check;</span> Custom AI workflow architecture &amp; playbooks
                </li>
              </ul>
            </div>

            <a
              href="#contact"
              className="w-full py-3.5 mt-6 text-center bg-[#B70909] hover:bg-[#cf1111] active:bg-[#940707] text-white text-xs font-semibold uppercase tracking-wider transition-colors rounded-sm shadow-md"
            >
              Deploy Enterprise Pod
            </a>
          </motion.div>
        </div>

        <div className="mt-10 text-center font-mono text-xs text-[#808080]">
          <span>Prefer a bespoke enterprise arrangement? </span>
          <a href="mailto:advisory@igraphmedia.com" className="text-white underline ml-1">
            Email Us &rarr; advisory@igraphmedia.com
          </a>
        </div>
      </div>
    </section>
  );
}
