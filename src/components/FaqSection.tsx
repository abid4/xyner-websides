import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DevSectionBadge } from './DevSectionBadge';

interface FaqItem {
  category: string;
  question: string;
  answer: string;
  bullets?: string[];
}

const FAQS: FaqItem[] = [
  {
    category: 'Architecture & Offline Resilience',
    question: 'How does XYNER guarantee zero data loss during power cuts and internet outages?',
    answer:
      'We architect our POS systems with local-first persistence using embedded SQLite databases on each checkout terminal and waiter tablet. Transactions write locally in 0.04 milliseconds and are signed into an append-only transaction ledger.',
    bullets: [
      'Orders and inventory deductions commit to flash storage immediately before UI renders.',
      'Conflict-free Replicated Data Types (CRDTs) automatically merge multi-terminal edits when connection returns.',
      'Even if hardware power is abruptly severed, transactions survive reboot without corruption.',
    ],
  },
  {
    category: 'Hardware & Printers',
    question: 'What retail and restaurant hardware does XYNER support?',
    answer:
      'We write direct native hardware drivers rather than relying on brittle browser print dialogues. Our systems interface seamlessly with commercial POS peripherals across USB, LAN, Bluetooth, and Serial protocols.',
    bullets: [
      'ESC/POS thermal receipt and kitchen ticket printers (Epson, Star Micronics, Rongta, Xprinter).',
      'Dual Kitchen Display System (KDS) Android touchscreens with prep timers.',
      'Cash drawers, 1D/2D Honeywell and Zebra barcode scanners, and weighing scale interfaces.',
      'Embedded biometric fingerprint and RFID/NFC staff clock-in readers.',
    ],
  },
  {
    category: 'Platforms & Frameworks',
    question: 'Do you build native mobile apps or web-based wrappers?',
    answer:
      'We build true compiled applications using Flutter and React Native for mobile/tablets alongside reactive Next.js enterprise web portals. We never ship sluggish web wrappers disguised as apps.',
  },
  {
    category: 'Pricing & Engagement',
    question: 'How do you structure project costs and payment schedules?',
    answer:
      'We don’t trap clients in rigid, arbitrary enterprise tiers. Our interactive project estimator lets you select your exact feature specifications and budget in Pakistani Rupees (PKR) or US Dollars (USD). Payments are milestone-based tied directly to demonstrable code deliveries.',
  },
  {
    category: 'Support & SLAs',
    question: 'What ongoing maintenance and emergency support do you provide?',
    answer:
      'Retail and hospitality businesses operate during evenings, weekends, and holidays. We offer commercial Master Service Level Agreements (SLAs) with 15-minute emergency response times during operational peak hours.',
  },
  {
    category: 'Migration',
    question: 'Can you migrate our existing legacy database and menu inventory?',
    answer:
      'Yes. We provide automated extraction and ETL pipelines to migrate historical sales, customer loyalty records, and menu SKU matrices from legacy systems with zero operational disruption.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-[#08080a] border-t border-[#d4af37]/20 relative overflow-hidden">
      {/* Developer X-Ray Blueprint Label */}
      <DevSectionBadge
        componentName="SystemFaq"
        propsList='animator="motion" items={6}'
        renderLatency="0.4ms"
        loc="src/components/FaqSection.tsx"
      />

      {/* Moving Ambient Glow */}
      <div className="absolute top-1/2 right-1/4 w-[450px] h-[450px] bg-gradient-to-l from-[#d4af37]/10 to-transparent blur-[160px] pointer-events-none -z-10 rounded-full animate-drift-gold" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#121216] border border-[#d4af37]/35 text-xs font-mono text-[#fef08a] font-bold">
            <HelpCircle className="w-3.5 h-3.5 text-[#eab308]" />
            <span>Technical &amp; Engagement FAQs</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-[#fef08a] via-[#eab308] to-[#d4af37] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Everything you need to know about our offline-first architecture, hardware compatibility, and engagement lifecycle.
          </p>
        </div>

        {/* Accordion List with Motion */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`rounded-2xl transition-all duration-300 border ${
                  isOpen
                    ? 'bg-[#181820] border-[#eab308] shadow-[0_4px_25px_-5px_rgba(234,179,8,0.3)]'
                    : 'bg-[#121216] border-[#d4af37]/20 hover:border-[#eab308]/60'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1 pr-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#eab308] font-bold">
                      {faq.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white transition-colors">
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 mt-1 transition-all duration-300 ${
                      isOpen
                        ? 'border-[#eab308] bg-[#eab308] text-black rotate-180 shadow-sm'
                        : 'border-[#d4af37]/30 text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </button>

                {/* Animated Expanding Content with Motion */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: 'auto',
                        opacity: 1,
                        transition: {
                          height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.25, delay: 0.05 },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.15 },
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 sm:px-6 pt-1 text-sm text-slate-300 border-t border-white/10 space-y-3.5 leading-relaxed">
                        <p>{faq.answer}</p>

                        {faq.bullets && faq.bullets.length > 0 && (
                          <div className="p-4 rounded-xl bg-[#08080a] border border-[#d4af37]/25 space-y-2 mt-2 shadow-sm">
                            {faq.bullets.map((b, bIdx) => (
                              <div key={bIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                                <span className="text-[#eab308] font-bold mt-0.5">▪</span>
                                <span>{b}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA to WhatsApp */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#121216] border border-[#d4af37]/35 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-2xl">
          <div className="space-y-1">
            <h4 className="text-lg font-bold text-white">
              Have a specific technical architecture question?
            </h4>
            <p className="text-xs sm:text-sm text-slate-400">
              Speak directly with our senior system engineer in Islamabad.
            </p>
          </div>

          <a
            href="https://wa.me/923013207260"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#eab308] hover:bg-[#d4af37] text-black font-extrabold text-xs uppercase tracking-wide shadow-[0_4px_20px_-2px_rgba(234,179,8,0.5)] transition-all cursor-pointer whitespace-nowrap shrink-0 hover:-translate-y-0.5"
          >
            <MessageCircle className="w-4 h-4 fill-black stroke-none" />
            <span>Chat on WhatsApp</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </a>
        </div>
      </div>
    </section>
  );
};
