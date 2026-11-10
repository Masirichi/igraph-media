"use client";

import React from "react";
import { motion } from "framer-motion";

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

export default function CaseStudies() {
  const cases = [
    {
      metric: "21K & 5M+ Traffic",
      title: "Cocu Atelier",
      desc: "Scaled social media presence to 21,000 followers within 3 months purely organically, generating over 5 million organic traffic impressions and high-ticket client conversions.",
      footer: "Growth: 21k Organic Followers • 5M+ Impressions",
    },
    {
      metric: "Cohort Sellouts",
      title: "TFZ Cakes and Academy",
      desc: "Engineered automated lead generation funnels and enrollment marketing for their professional training academy, consistently filling every student cohort with qualified applicants.",
      footer: "Result: Qualified Academy Leads • 100% Cohort Capacity",
    },
    {
      metric: "3x Engagement",
      title: "City Fidelity",
      desc: "Completely revamped multi-platform social media strategy and content deployment, tripling audience engagements on Instagram across executive and talent portfolios.",
      footer: "Strategy: Instagram Architecture • 300% Engagement Surge",
    },
  ];

  return (
    <section id="works" className="py-28 bg-black text-white border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-[11px] font-mono tracking-[0.2em] uppercase text-[#808080] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B70909]" />
            Proven Impact
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-white tracking-[-0.03em] mb-4">
            Collaboration that <span className="italic font-light text-slate-300">moved the needle.</span>
          </h2>
          <p className="text-[#808080] font-sans font-normal text-base md:text-lg leading-relaxed">
            Quantifiable capital expansion and reputational permanence delivered across private and enterprise operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.map((c, idx) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: LUXURY_EASE }}
              className="bg-[#0c0c0c] hover:bg-[#121212] border border-white/[0.08] hover:border-white/[0.18] p-8 rounded flex flex-col justify-between transition-colors duration-200"
            >
              <div>
                <div className="font-mono text-2xl font-extrabold text-white mb-3">{c.metric}</div>
                <h3 className="font-sans text-xl font-bold text-white mb-2">{c.title}</h3>
                <p className="text-[#808080] text-sm leading-relaxed mb-6">{c.desc}</p>
              </div>
              <div className="pt-4 border-t border-white/[0.08] font-mono text-xs text-[#555]">
                {c.footer}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
