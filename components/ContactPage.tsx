import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import SupportAgent from './SupportAgent';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#B70909] selection:text-white font-sans">
      <Navbar />

      <main className="pt-28 pb-20">
        {/* Hero Section */}
        <section className="relative px-6 md:px-12 max-w-7xl mx-auto text-center pt-12 pb-16">
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-b from-[#B70909]/20 to-transparent blur-3xl -z-10" />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-neutral-300 uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B70909]" />
            Initiate Advisory &bull; Direct Consultation
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
            Contact <span className="italic font-serif font-normal">Igraph Media</span>
          </h1>

          <p className="text-xl md:text-2xl font-medium text-neutral-200 max-w-3xl mx-auto mb-6">
            Let's Discuss Your Growth Strategy
          </p>

          <p className="text-sm md:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-8">
            Whether you are looking to secure high-visibility press coverage, launch high-ROI digital advertising campaigns, or establish lasting market authority, our senior advisory partners are ready to assist.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#brief-intake"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#B70909] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#cf1111] transition-all hover:-translate-y-0.5"
            >
              Get Started &rarr;
            </a>
            <a
              href="tel:+2348153253639"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/20 text-white text-xs font-semibold uppercase tracking-wider hover:bg-white/10 transition-all"
            >
              Direct Line: +234 (815) 325-3639
            </a>
          </div>
        </section>

        {/* 3 Channels Grid */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Phone */}
            <div className="p-8 bg-neutral-900 border border-white/10 rounded-2xl flex flex-col justify-between hover:border-[#B70909]/40 transition-colors">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#B70909] font-bold block mb-2">Immediate Consultation</span>
                <h3 className="text-xl font-bold text-white mb-2">Direct Phone Line</h3>
                <p className="text-xs text-neutral-400 leading-relaxed mb-4">Direct line for executive consultation and active client operations. Available Mon – Fri, 9am – 6pm WAT.</p>
                <a href="tel:+2348153253639" className="text-base font-bold text-white block mb-4 hover:text-[#B70909]">+234 (815) 325-3639</a>
              </div>
              <div className="space-y-2">
                <a href="tel:+2348153253639" className="w-full py-2.5 px-4 rounded-lg bg-white/5 border border-white/15 text-xs text-center block text-white font-medium hover:bg-[#B70909] hover:border-[#B70909] transition-all">Call Directly &rarr;</a>
                <a href="https://wa.me/2348153253639" target="_blank" rel="noopener noreferrer" className="w-full py-2.5 px-4 rounded-lg bg-[#25D366]/10 border border-[#25D366]/30 text-xs text-center block text-[#25D366] font-medium hover:bg-[#25D366] hover:text-black transition-all">Chat on WhatsApp &#x2197;</a>
              </div>
            </div>

            {/* Email */}
            <div className="p-8 bg-neutral-900 border border-white/10 rounded-2xl flex flex-col justify-between hover:border-[#B70909]/40 transition-colors">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#B70909] font-bold block mb-2">Confidential Inquiries</span>
                <h3 className="text-xl font-bold text-white mb-2">Advisory Briefs</h3>
                <p className="text-xs text-neutral-400 leading-relaxed mb-4">Send campaign briefs, RFPs, and strategic partnership proposals directly to our strategy partners.</p>
                <a href="mailto:advisory@igraphmedia.com" className="text-base font-bold text-white block mb-4 hover:text-[#B70909]">advisory@igraphmedia.com</a>
              </div>
              <a href="mailto:advisory@igraphmedia.com" className="w-full py-2.5 px-4 rounded-lg bg-white/5 border border-white/15 text-xs text-center block text-white font-medium hover:bg-[#B70909] hover:border-[#B70909] transition-all">Email Advisory Team &rarr;</a>
            </div>

            {/* General */}
            <div className="p-8 bg-neutral-900 border border-white/10 rounded-2xl flex flex-col justify-between hover:border-[#B70909]/40 transition-colors">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#B70909] font-bold block mb-2">Media &amp; Press</span>
                <h3 className="text-xl font-bold text-white mb-2">Media &amp; Press Communications</h3>
                <p className="text-xs text-neutral-400 leading-relaxed mb-4">For press syndication inquiries, speaking engagements, and general correspondence.</p>
                <a href="mailto:hello@igraphmedia.com" className="text-base font-bold text-white block mb-4 hover:text-[#B70909]">hello@igraphmedia.com</a>
              </div>
              <a href="mailto:hello@igraphmedia.com" className="w-full py-2.5 px-4 rounded-lg bg-white/5 border border-white/15 text-xs text-center block text-white font-medium hover:bg-[#B70909] hover:border-[#B70909] transition-all">Send General Message &rarr;</a>
            </div>
          </div>
        </section>

        {/* Brief Intake Form */}
        <section id="brief-intake" className="border-t border-white/10 py-16 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-mono font-bold text-[#B70909] uppercase tracking-wider block">Consultation Protocol</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">How Our Advisory Process Works</h2>
              <p className="text-sm text-neutral-400 leading-relaxed">
                We value your time and commercial focus. Every inquiry is reviewed directly by a senior advisor who develops an actionable perspective tailored to your specific objectives.
              </p>

              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-lg bg-[#B70909]/20 border border-[#B70909]/40 text-[#B70909] font-bold text-xs flex items-center justify-center flex-shrink-0">01</div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Brief Audit &amp; Footprint Review</h4>
                    <p className="text-xs text-neutral-400 mt-0.5">We analyze your market presence, competitors, and commercial growth targets before our call.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-lg bg-[#B70909]/20 border border-[#B70909]/40 text-[#B70909] font-bold text-xs flex items-center justify-center flex-shrink-0">02</div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Private 20-Minute Strategy Session</h4>
                    <p className="text-xs text-neutral-400 mt-0.5">A focused session with an executive partner to identify immediate growth bottlenecks and opportunities.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-lg bg-[#B70909]/20 border border-[#B70909]/40 text-[#B70909] font-bold text-xs flex items-center justify-center flex-shrink-0">03</div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Tailored Scope &amp; Deliverables</h4>
                    <p className="text-xs text-neutral-400 mt-0.5">We deliver a transparent roadmap detailing timelines, channels, and measurable deliverables.</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900 border border-white/10 text-xs text-neutral-300 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[#B70909] font-bold">&check;</span>
                  <span>Mutual Non-Disclosure Agreement (NDA) executed upon request</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#B70909] font-bold">&check;</span>
                  <span>Direct senior partner involvement in every engagement</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-neutral-950 border border-white/10 rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-neutral-300 block mb-1">Full Name &amp; Title</label>
                    <input type="text" required placeholder="Adebayo Adeleke, MD" className="w-full bg-black border border-white/15 rounded-lg px-4 py-2.5 text-xs text-white outline-none focus:border-[#B70909]" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-neutral-300 block mb-1">Company / Brand Name</label>
                    <input type="text" required placeholder="Nexura Retail" className="w-full bg-black border border-white/15 rounded-lg px-4 py-2.5 text-xs text-white outline-none focus:border-[#B70909]" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-neutral-300 block mb-1">Corporate Email</label>
                    <input type="email" required placeholder="adeleke@nexura.com" className="w-full bg-black border border-white/15 rounded-lg px-4 py-2.5 text-xs text-white outline-none focus:border-[#B70909]" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-neutral-300 block mb-1">Phone / WhatsApp</label>
                    <input type="tel" placeholder="+234 815 000 0000" className="w-full bg-black border border-white/15 rounded-lg px-4 py-2.5 text-xs text-white outline-none focus:border-[#B70909]" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">Primary Service Needed</label>
                  <select className="w-full bg-black border border-white/15 rounded-lg px-4 py-2.5 text-xs text-white outline-none focus:border-[#B70909]" required>
                    <option value="">Select from our 8 core services...</option>
                    <option value="press-release">01. Press Release Distribution</option>
                    <option value="social-media">02. Social Media Management</option>
                    <option value="personal-branding">03. Personal Branding &amp; Profiling</option>
                    <option value="media-buying">04. Media Planning &amp; Buying</option>
                    <option value="seo">05. Search Engine Optimization (SEO)</option>
                    <option value="brand-promotion">06. Brand Promotion</option>
                    <option value="content-strategy">07. Content Strategy</option>
                    <option value="digital-advertising">08. Digital Advertising</option>
                    <option value="full-pod">Comprehensive Growth Pod</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">Project Brief &amp; Commercial Goals</label>
                  <textarea rows={4} placeholder="Describe your current bottlenecks or expansion goals..." className="w-full bg-black border border-white/15 rounded-lg px-4 py-2.5 text-xs text-white outline-none focus:border-[#B70909]"></textarea>
                </div>

                <button type="submit" className="w-full py-3.5 bg-[#B70909] hover:bg-[#cf1111] text-white font-semibold text-xs uppercase tracking-wider rounded-lg transition-all">
                  Get Started &rarr;
                </button>

                {submitted && (
                  <div className="p-3 bg-[#B70909]/20 border border-[#B70909] rounded-lg text-xs text-white">
                    ✓ Brief received. An advisory partner will reach out within 24 hours.
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <SupportAgent />
    </div>
  );
}
