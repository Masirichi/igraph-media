"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GovernanceFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How fast will we see operational results?",
      a: "Phase 01 Diagnostic and Vector Mapping begins within 48 hours of onboarding. Initial ad infrastructure and PR narrative deployment typically go live within 14 business days.",
    },
    {
      q: "How does digital transformation training work?",
      a: "We work directly with your internal marketing, growth, and operations leads via bi-weekly workshops, AI workflow playbooks, and automation pipelines. We ensure your team permanently retains capability.",
    },
    {
      q: "Who owns the advertising data, models, and PR assets?",
      a: "You retain full intellectual property and independent data ownership. All ad accounts, custom attribution models, automation playbooks, and PR media archives belong entirely to your enterprise.",
    },
    {
      q: "Can we pause or adjust our subscription?",
      a: "Yes. Our partnership models are completely flexible. You can pause or scale your operational pod whenever your seasonal or financial priorities require.",
    },
    {
      q: "What confidentiality and security protocols are maintained?",
      a: "We sign institutional Non-Disclosure Agreements, operate inside your corporate IAM permissions, and adhere strictly to enterprise-grade data protection standards.",
    },
  ];

  return (
    <section id="faq" className="py-28 bg-black text-white border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-[11px] font-mono tracking-[0.2em] uppercase text-[#808080] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B70909]" />
            FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-white tracking-[-0.03em] mb-4">
            Frequently Asked Questions.
          </h2>
          <p className="text-[#808080] font-sans font-normal text-base md:text-lg leading-relaxed">
            Everything you need to know about our partnership structure and operational standards.
          </p>
        </div>

        <div className="max-w-3xl mx-auto border-t border-white/[0.08]">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={faq.q} className="border-b border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full py-5 flex items-center justify-between text-left font-sans text-base font-semibold text-white hover:text-slate-200 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <span className={`font-mono text-lg text-[#808080] transition-transform duration-200 ${isOpen ? "rotate-45 text-white" : ""}`}>
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-sm font-sans font-normal text-[#808080] leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
