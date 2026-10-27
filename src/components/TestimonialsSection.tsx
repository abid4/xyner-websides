import React, { useState } from 'react';
import {
  Star,
  Quote,
  ShieldCheck,
  Building2,
  CheckCircle2,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import { DevSectionBadge } from './DevSectionBadge';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  industry: string;
  rating: number;
  quote: string;
  metric: string;
  metricLabel: string;
  systemDeployed: string;
  verifiedHash: string;
  verifiedDate: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'hospitality',
    name: 'Taimur Khan',
    role: 'Managing Partner',
    company: 'The Roast Room Bistro Group (18 Tables)',
    location: 'Islamabad',
    industry: 'Hospitality',
    rating: 5,
    quote:
      'During Friday dinner rushes in Islamabad, internet outages used to wipe out our order tickets. XYNER installed an offline-first POS with local SQLite sync and dual kitchen screens. Even during a complete 40-minute fiber blackout, our waiters took orders, kitchen printers fired in 0.04s, and not a single table bill was lost.',
    metric: '100%',
    metricLabel: 'Zero Missed Orders During Peak Outages',
    systemDeployed: 'Dual KDS + Offline-First POS Engine',
    verifiedHash: 'XYN-PK-9812',
    verifiedDate: 'Active Deployment',
  },
  {
    id: 'retail',
    name: 'Hassan Raza',
    role: 'Head of Retail Operations',
    company: 'Metro Express Marts (8 Locations)',
    location: 'Lahore, Punjab',
    industry: 'Retail',
    rating: 5,
    quote:
      'Deploying their offline-first Flutter application across our 8 branches dropped checkout latency from 3.2 seconds down to 40 milliseconds. The local SQLite store with conflict-free sync handles our 14,000 SKU catalog without frame drops or freezes.',
    metric: '40ms',
    metricLabel: 'Barcode Execution & 14k SKUs Cached',
    systemDeployed: 'Offline-First SQLite Retail Suite',
    verifiedHash: 'XYN-PK-4420',
    verifiedDate: 'Active Deployment',
  },
  {
    id: 'healthcare',
    name: 'Dr. Ayesha Rehman',
    role: 'Clinical Director',
    company: 'Al-Noor Medical Specialty Center',
    location: 'Islamabad',
    industry: 'Healthcare',
    rating: 5,
    quote:
      'In emergency and outpatient clinics, waiting for remote server roundtrips is unacceptable. XYNER built an offline-resilient tablet system for our physicians and pharmacy. Patient check-in lines shrank by 45% within the first week.',
    metric: '-45%',
    metricLabel: 'Patient Waiting Times & 100% Prescription Integrity',
    systemDeployed: 'Encrypted Clinical Sync Engine',
    verifiedHash: 'XYN-PK-7719',
    verifiedDate: 'Active Deployment',
  },
  {
    id: 'logistics',
    name: 'Kashif Munir',
    role: 'Co-Founder & CTO',
    company: 'LogiRoute Dispatch Platform',
    location: 'Karachi & Dubai',
    industry: 'Tech Founder',
    rating: 5,
    quote:
      'XYNER architected our entire mobile driver application and dispatch core. When drivers pass through dead cell zones in transit corridors, the app buffers telemetry and signatures locally with zero memory leakage. They are our go-to engineering partners.',
    metric: '99.98%',
    metricLabel: 'Telemetry Delivery Rate in Low-Bandwidth Zones',
    systemDeployed: 'Cross-Platform Flutter & AWS Mesh',
    verifiedHash: 'XYN-AE-1025',
    verifiedDate: 'Active Deployment',
  },
];

export const TestimonialsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = ['All', 'Hospitality', 'Retail', 'Healthcare', 'Tech Founder'];

  const filteredTestimonials =
    activeFilter === 'All'
      ? TESTIMONIALS
      : TESTIMONIALS.filter((t) => t.industry === activeFilter);

  return (
    <section id="testimonials" className="py-24 bg-[#08080a] border-t border-[#d4af37]/20 relative overflow-hidden">
      {/* Developer X-Ray Blueprint Label */}
      <DevSectionBadge
        componentName="ClientTestimonials"
        propsList='verified={true} rating={5.0} total={4}'
        renderLatency="0.7ms"
        loc="src/components/TestimonialsSection.tsx"
      />

      {/* Moving Ambient Glows */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-gradient-to-r from-[#d4af37]/10 to-transparent blur-[160px] pointer-events-none -z-10 rounded-full animate-drift-gold" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#eab308] font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#eab308]" />
              <span>Proven Production Impact</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">Verified Client Success</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Trusted by High-Velocity{' '}
              <span className="bg-gradient-to-r from-[#fef08a] via-[#eab308] to-[#d4af37] bg-clip-text text-transparent">
                Retail &amp; Tech Operators
              </span>
              .
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Read how enterprise businesses and scaling founders achieve zero downtime, instant transaction speed, and sustained revenue growth with XYNER architectures.
            </p>
          </div>

          {/* Interactive Filter Controls */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#121216] border border-[#d4af37]/25 shrink-0 shadow-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === cat
                    ? 'bg-[#eab308] text-black shadow-md font-extrabold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Testimonials Structured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredTestimonials.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl bg-[#121216] p-6 sm:p-8 flex flex-col justify-between border border-[#d4af37]/25 hover:border-[#eab308] shadow-xl hover:shadow-[0_16px_40px_-10px_rgba(0,0,0,0.95),0_0_25px_-5px_rgba(234,179,8,0.25)] transition-all duration-300"
            >
              <div className="space-y-5">
                {/* Header: Verified by XYNER Badge & Rating Stars */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-0.5 text-[#eab308]">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#eab308] text-[#eab308]" />
                      ))}
                    </div>
                    <span className="text-xs font-bold font-mono text-white ml-1">
                      5.0
                    </span>
                  </div>

                  {/* "Verified by XYNER" Badge with Gold Accent */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#eab308]/15 border border-[#eab308]/40 text-[#fef08a] text-[11px] font-mono font-bold tracking-wide">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#eab308] shrink-0" />
                    <span>Verified Deployment</span>
                  </div>
                </div>

                {/* Quantitative Impact Metric Box */}
                <div className="p-3.5 rounded-xl bg-[#08080a] border border-[#d4af37]/25 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#eab308]/15 border border-[#eab308]/30 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5 text-[#eab308]" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-black font-mono tabular-nums tracking-tight text-[#eab308]">
                      {item.metric}
                    </div>
                    <div className="text-xs text-slate-400 font-medium">
                      {item.metricLabel}
                    </div>
                  </div>
                </div>

                {/* Client Quote */}
                <div className="relative">
                  <Quote className="w-6 h-6 text-[#eab308]/20 absolute -top-2 -left-1 pointer-events-none" />
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed italic pl-3 pt-1">
                    "{item.quote}"
                  </p>
                </div>
              </div>

              {/* Footer: Client Info & Production Deployment Footprint */}
              <div className="pt-5 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <span>{item.name}</span>
                    <span className="text-[10px] font-mono text-slate-400 font-normal">
                      ({item.location})
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#eab308]" />
                    <span>{item.role} &middot; <strong className="text-slate-200 font-semibold">{item.company}</strong></span>
                  </div>
                </div>

                {/* System Deployed Tag */}
                <div className="text-right text-[11px] font-mono text-slate-400">
                  <div className="text-[#fef08a] font-bold">{item.systemDeployed}</div>
                  <div className="text-[10px] text-slate-500 flex items-center justify-end gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>ID: {item.verifiedHash}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
