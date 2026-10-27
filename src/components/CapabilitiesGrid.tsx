import React, { useState } from 'react';
import {
  Smartphone,
  Store,
  Database,
  Bot,
  ArrowRight,
  Check,
  Cpu,
  Layers,
  ChevronDown,
} from 'lucide-react';
import { CAPABILITIES, Capability } from '../data/content';
import { DevSectionBadge } from './DevSectionBadge';
import { TiltCard } from './TiltCard';

interface CapabilitiesGridProps {
  onSelectService: (serviceTitle: string) => void;
}

export const CapabilitiesGrid: React.FC<CapabilitiesGridProps> = ({ onSelectService }) => {
  const [expandedId, setExpandedId] = useState<string | null>('pos-kds');

  const getPillarIcon = (id: string) => {
    switch (id) {
      case 'mobile-web':
        return <Smartphone className="w-5 h-5 text-[#eab308]" />;
      case 'pos-kds':
        return <Store className="w-5 h-5 text-[#fef08a]" />;
      case 'offline-first':
        return <Database className="w-5 h-5 text-[#d4af37]" />;
      case 'ai-automation':
        return <Bot className="w-5 h-5 text-[#eab308]" />;
      default:
        return <Cpu className="w-5 h-5 text-[#eab308]" />;
    }
  };

  return (
    <section id="capabilities" className="py-24 bg-[#08080a] relative overflow-hidden">
      {/* Developer X-Ray Blueprint Label */}
      <DevSectionBadge
        componentName="CapabilitiesGrid"
        propsList='pillars={4} zoomEffect="scale-105" theme="obsidian-gold"'
        renderLatency="1.1ms"
        loc="src/components/CapabilitiesGrid.tsx"
      />

      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-gradient-to-r from-[#d4af37]/10 to-transparent blur-[150px] pointer-events-none -z-10 rounded-full animate-drift-gold" />
      <div className="absolute bottom-10 right-0 w-[450px] h-[450px] bg-gradient-to-l from-[#eab308]/8 to-transparent blur-[160px] pointer-events-none -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#eab308] font-bold">
            <span>Specialized Engineering Pillars</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">01 — 04</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            High-Performance Systems Built for{' '}
            <span className="bg-gradient-to-r from-[#fef08a] via-[#eab308] to-[#d4af37] bg-clip-text text-transparent">
              Zero Failure Under Pressure
            </span>
            .
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            From disconnected retail POS terminals surviving power blackouts to cross-platform mobile apps deployed across two operating systems, we eliminate technical bottlenecks.
          </p>
        </div>

        {/* Bento Grid: 4 Pillars with Structured bg-[#121216] Cards & Gold Outlines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {CAPABILITIES.map((cap: Capability) => {
            const isExpanded = expandedId === cap.id;
            return (
              <TiltCard
                key={cap.id}
                maxTilt={5}
                className="group rounded-2xl bg-[#121216] p-6 sm:p-8 flex flex-col justify-between border border-[#d4af37]/25 hover:border-[#eab308] overflow-hidden transition-all duration-300 shadow-[0_12px_35px_-10px_rgba(0,0,0,0.9)] hover:shadow-[0_16px_40px_-10px_rgba(0,0,0,0.95),0_0_25px_-5px_rgba(234,179,8,0.3)]"
              >
                {/* Tech Image Background with Subtle Obsidian Overlay */}
                <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                  <img
                    src={cap.bgImage}
                    alt={cap.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center opacity-15 filter brightness-85 contrast-110 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-25"
                  />
                  <div className="absolute inset-0 bg-[#121216]/90 backdrop-blur-sm" />
                </div>

                <div className="space-y-6 relative z-10">
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-[#08080a] border border-[#eab308]/40 flex items-center justify-center group-hover:border-[#eab308] transition-colors shadow-sm">
                        {getPillarIcon(cap.id)}
                      </div>
                      <div>
                        {/* Bold Yellow Accent Box */}
                        <span className="inline-block px-2 py-0.5 rounded bg-[#eab308] text-black text-[10px] font-mono font-extrabold uppercase tracking-wider mb-1">
                          Pillar {cap.number}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#eab308] transition-colors">
                          {cap.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Tagline & Description */}
                  <div>
                    <p className="text-sm font-semibold text-slate-200 mb-2">
                      {cap.tagline}
                    </p>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {cap.description}
                    </p>
                  </div>

                  {/* Concrete Key Deliverables */}
                  <div className="space-y-2.5 pt-2">
                    {cap.bulletPoints.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-[#eab308] shrink-0 mt-0.5 stroke-[2.5]" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                  {/* Expandable Architecture Deep-Dive */}
                  {isExpanded && (
                    <div className="pt-4 mt-2 border-t border-white/10 space-y-3 bg-[#08080a] p-4 rounded-xl border border-[#d4af37]/30 animate-in fade-in duration-200">
                      <div className="flex items-center gap-1.5 text-xs font-mono text-[#fef08a] font-bold">
                        <Layers className="w-3.5 h-3.5 text-[#eab308]" />
                        <span>Production Metric Benchmarks:</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {cap.metrics.map((m, mIdx) => (
                          <div key={mIdx} className="p-2.5 rounded-lg bg-[#121216] border border-[#d4af37]/25 shadow-sm">
                            <div className="text-[10px] text-slate-400 font-mono">{m.label}</div>
                            <div className="text-base font-bold font-mono tabular-nums text-[#eab308]">
                              {m.value}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="text-xs text-slate-400 italic pt-1">
                        "{cap.highlight}"
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-4 relative z-10">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono">
                    {cap.techPills.slice(0, 3).map((pill, pIdx) => (
                      <span key={pIdx}>
                        {pill}
                        {pIdx < 2 && <span className="ml-2 text-slate-600">/</span>}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : cap.id)}
                      className="text-xs text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-1 cursor-pointer font-medium"
                      aria-label="Toggle architecture details"
                    >
                      <span>{isExpanded ? 'Collapse' : 'Inspect'}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180 text-[#eab308]' : ''
                        }`}
                      />
                    </button>

                    {/* Solid Gold/Yellow Button with Black Text */}
                    <button
                      onClick={() => onSelectService(cap.title)}
                      className="text-xs font-extrabold px-3.5 py-2 rounded-lg bg-[#eab308] hover:bg-[#d4af37] text-black transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <span>Estimate</span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
