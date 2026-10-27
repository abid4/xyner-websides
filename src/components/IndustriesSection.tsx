import React, { useState } from 'react';
import {
  UtensilsCrossed,
  ShoppingBag,
  HeartPulse,
  Rocket,
  CheckCircle2,
  TrendingUp,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import { INDUSTRIES, Industry } from '../data/content';
import { DevSectionBadge } from './DevSectionBadge';

interface IndustriesSectionProps {
  onSelectIndustry: (industryName: string) => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ onSelectIndustry }) => {
  const [selectedIndustryId, setSelectedIndustryId] = useState<string>('hospitality');

  const getIndustryIcon = (id: string, isSelected: boolean) => {
    switch (id) {
      case 'hospitality':
        return <UtensilsCrossed className={`w-5 h-5 ${isSelected ? 'text-black' : 'text-[#eab308]'}`} />;
      case 'retail':
        return <ShoppingBag className={`w-5 h-5 ${isSelected ? 'text-black' : 'text-[#eab308]'}`} />;
      case 'healthcare':
        return <HeartPulse className={`w-5 h-5 ${isSelected ? 'text-black' : 'text-emerald-400'}`} />;
      case 'startups':
        return <Rocket className={`w-5 h-5 ${isSelected ? 'text-black' : 'text-[#fef08a]'}`} />;
      default:
        return <UtensilsCrossed className={`w-5 h-5 ${isSelected ? 'text-black' : 'text-[#eab308]'}`} />;
    }
  };

  const currentIndustry = INDUSTRIES.find((i) => i.id === selectedIndustryId) || INDUSTRIES[0];

  return (
    <section id="industries" className="py-24 bg-[#08080a] border-t border-[#d4af37]/20 relative overflow-hidden">
      {/* Developer X-Ray Blueprint Label */}
      <DevSectionBadge
        componentName="IndustriesMatrix"
        propsList='sectors={4} proofAdjacency={true}'
        renderLatency="0.5ms"
        loc="src/components/IndustriesSection.tsx"
      />

      {/* Moving Ambient Glow */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-gradient-to-l from-[#eab308]/8 via-[#d4af37]/6 to-transparent blur-[160px] pointer-events-none -z-10 rounded-full animate-drift-gold" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#eab308] font-bold">
            <span>Operational Domains</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">Industries We Empower</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Engineered for High-Pressure{' '}
            <span className="bg-gradient-to-r from-[#fef08a] via-[#eab308] to-[#d4af37] bg-clip-text text-transparent">
              Real-World Environments
            </span>
            .
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Whether managing a multi-floor restaurant during rush hour or a fast-moving pharmacy dispensary, our bespoke software systems ensure operational continuity.
          </p>
        </div>

        {/* Industry Sector Selector Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {INDUSTRIES.map((ind: Industry) => {
            const isSelected = selectedIndustryId === ind.id;
            return (
              <button
                key={ind.id}
                onClick={() => setSelectedIndustryId(ind.id)}
                className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all text-left cursor-pointer ${
                  isSelected
                    ? 'bg-[#eab308] border-[#eab308] shadow-[0_4px_20px_-2px_rgba(234,179,8,0.4)] text-black'
                    : 'bg-[#121216] border-[#d4af37]/20 text-slate-300 hover:border-[#eab308]/60 hover:text-white'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-black/15' : 'bg-[#08080a] border border-[#d4af37]/30'
                  }`}
                >
                  {getIndustryIcon(ind.id, isSelected)}
                </div>
                <div className="truncate">
                  <div className={`text-xs font-extrabold ${isSelected ? 'text-black' : 'text-white'}`}>
                    {ind.name}
                  </div>
                  <div className={`text-[10px] font-mono ${isSelected ? 'text-black/75' : 'text-slate-400'}`}>
                    Specialized Stack
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Industry Detail Card */}
        <div className="rounded-2xl bg-[#121216] border border-[#d4af37]/30 p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono text-[#eab308] font-bold">
                <span>{currentIndustry.name}</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-slate-400">Field-Tested Solution</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                {currentIndustry.headline}
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {currentIndustry.description}
              </p>

              {/* Feature Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {currentIndustry.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-[#eab308] shrink-0 mt-0.5 stroke-[2.5]" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                {/* Solid Gold/Yellow Button with Black Text */}
                <button
                  onClick={() => onSelectIndustry(currentIndustry.name)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#eab308] hover:bg-[#d4af37] text-black font-extrabold text-xs tracking-wide shadow-[0_4px_20px_-2px_rgba(234,179,8,0.45)] transition-all cursor-pointer hover:-translate-y-0.5"
                >
                  <span>Build Solution for {currentIndustry.name}</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* Right Card: Concrete Case Study & Metric Evidence */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-xl bg-[#08080a] border border-[#d4af37]/35 shadow-2xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-[#eab308]" />
                    <span>{currentIndustry.caseStudy.location}</span>
                  </div>
                  <span className="text-[10px] font-mono text-black bg-[#eab308] px-2.5 py-0.5 rounded font-extrabold">
                    Case Study
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-slate-400 font-mono">
                    {currentIndustry.caseStudy.client}
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-[#eab308] shrink-0" />
                    <div className="text-2xl font-black font-mono tabular-nums text-[#eab308]">
                      {currentIndustry.caseStudy.metric}
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 italic pl-3 leading-relaxed border-l border-[#eab308]/40">
                  "{currentIndustry.caseStudy.detail}"
                </p>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Architecture: SQLite + Flutter + AWS</span>
                  <span className="text-[#fef08a] font-bold">Verified Deployment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
