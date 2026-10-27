import React, { useState } from 'react';
import {
  MessageSquare,
  Copy,
  Check,
  Calculator,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { PROJECT_TYPES } from '../data/content';
import { DevSectionBadge } from './DevSectionBadge';

interface ProjectEstimatorProps {
  initialProjectType?: string;
}

export const ProjectEstimator: React.FC<ProjectEstimatorProps> = ({ initialProjectType }) => {
  // Step 1: Project Type
  const [selectedTypeId, setSelectedTypeId] = useState<string>(
    initialProjectType || 'pos-retail'
  );

  // Step 2: Currency & Custom Budget
  const [currency, setCurrency] = useState<'PKR' | 'USD'>('PKR');
  const [customBudget, setCustomBudget] = useState<string>('750000');

  // Timeline & Scope Add-ons
  const [timeline, setTimeline] = useState<string>('standard');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    'Offline-First Local SQLite Engine',
    'Hardware Thermal Printer SDK',
  ]);

  // Client Details
  const [clientName, setClientName] = useState<string>('');
  const [businessName, setBusinessName] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const currentType =
    PROJECT_TYPES.find((p) => p.id === selectedTypeId) || PROJECT_TYPES[0];

  const availableAddons = [
    'Offline-First Local SQLite Engine',
    'Hardware Thermal Printer SDK',
    'Multi-Terminal LAN Mesh Sync',
    'WhatsApp Order Injection Bot',
    'Biometric & NFC Staff Punching',
    'Central Head-Office Analytics',
  ];

  const toggleAddon = (addon: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addon) ? prev.filter((a) => a !== addon) : [...prev, addon]
    );
  };

  const handleCurrencyChange = (newCurrency: 'PKR' | 'USD') => {
    if (newCurrency === currency) return;
    setCurrency(newCurrency);
    if (newCurrency === 'USD') {
      const num = parseFloat(customBudget.replace(/,/g, ''));
      if (!isNaN(num) && num > 1000) {
        setCustomBudget(Math.round(num / 280).toString());
      } else {
        setCustomBudget('3500');
      }
    } else {
      const num = parseFloat(customBudget.replace(/,/g, ''));
      if (!isNaN(num) && num < 100000) {
        setCustomBudget(Math.round(num * 280).toString());
      } else {
        setCustomBudget('750000');
      }
    }
  };

  const formattedBudgetDisplay = () => {
    const raw = customBudget.trim();
    if (!raw) return currency === 'PKR' ? 'Rs. 0' : '$0';
    const num = parseFloat(raw.replace(/,/g, ''));
    if (isNaN(num)) return raw;
    return currency === 'PKR'
      ? `Rs. ${num.toLocaleString('en-US')}`
      : `$${num.toLocaleString('en-US')}`;
  };

  const generateWhatsAppUrl = () => {
    const phone = '923013207260';
    const msg = `*NEW XYNER PROJECT INQUIRY*
━━━━━━━━━━━━━━━━━━━━
*Platform:* ${currentType.title}
*Target Budget:* ${formattedBudgetDisplay()} (${currency})
*Timeline:* ${timeline === 'fast' ? 'Rapid (< 4 weeks)' : timeline === 'enterprise' ? 'Enterprise (10+ weeks)' : 'Standard (6-8 weeks)'}
*Modules:* ${selectedAddons.join(', ')}
${clientName ? `*Client Name:* ${clientName}` : ''}
${businessName ? `*Company/Brand:* ${businessName}` : ''}
━━━━━━━━━━━━━━━━━━━━
_Generated via XYNER Interactive Estimator_`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  };

  const handleCopySpec = () => {
    const spec = `XYNER PROJECT SPECIFICATION
Platform: ${currentType.title}
Budget: ${formattedBudgetDisplay()} (${currency})
Timeline: ${timeline}
Modules: ${selectedAddons.join(', ')}
Client: ${clientName || 'Inquiry'}
Company: ${businessName || 'Business'}
Direct Lead: +92 301 3207260`;

    navigator.clipboard.writeText(spec);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="estimator" className="py-24 bg-[#08080a] border-t border-[#d4af37]/20 relative overflow-hidden">
      {/* Developer X-Ray Blueprint Label */}
      <DevSectionBadge
        componentName="ProjectEstimator"
        propsList='currencies={["PKR","USD"]} dispatch="whatsapp-api"'
        renderLatency="1.2ms"
        loc="src/components/ProjectEstimator.tsx"
      />

      {/* Moving Ambient Glow */}
      <div className="absolute top-1/4 left-1/3 w-[550px] h-[550px] bg-gradient-to-r from-[#d4af37]/10 via-[#eab308]/6 to-transparent blur-[160px] pointer-events-none -z-10 rounded-full animate-drift-gold" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#eab308] font-bold">
            <Calculator className="w-3.5 h-3.5 text-[#eab308]" />
            <span>Interactive Project Estimator</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">Direct WhatsApp Dispatch</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Configure Your Scope &amp;{' '}
            <span className="bg-gradient-to-r from-[#fef08a] via-[#eab308] to-[#d4af37] bg-clip-text text-transparent">
              Receive an Architectural Proposal
            </span>
            .
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Select your platform category, configure required modules, and define your timeline. Instantly generate a formal specification dispatched directly to our technical lead on WhatsApp.
          </p>
        </div>

        {/* 2-Column Clean Structured Box Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Estimator Interactive Controls */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl bg-[#121216] border border-[#d4af37]/30 p-6 sm:p-8 space-y-7 shadow-xl">
              {/* Step 1: Select Platform Archetype */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono text-white uppercase tracking-wider font-bold">
                    01. Select Platform Category
                  </label>
                  <span className="text-[11px] font-mono text-[#eab308] font-semibold">
                    Step 1 of 3
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {PROJECT_TYPES.map((pt) => {
                    const isSelected = pt.id === selectedTypeId;
                    return (
                      <button
                        key={pt.id}
                        type="button"
                        onClick={() => setSelectedTypeId(pt.id)}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#eab308] border-[#eab308] text-black shadow-md font-bold'
                            : 'bg-[#08080a] border-[#d4af37]/20 text-slate-300 hover:border-[#eab308]/60 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold">{pt.title}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3] text-black" />}
                        </div>
                        <p className={`text-[11px] mt-1 line-clamp-1 leading-relaxed ${isSelected ? 'text-black/80 font-medium' : 'text-slate-400'}`}>
                          {pt.recommendedTimeline} &middot; {pt.features.slice(0, 2).join(', ')}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Target Investment Budget */}
              <div className="space-y-3 pt-2 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono text-white uppercase tracking-wider font-bold">
                    02. Target Investment Budget
                  </label>
                  <div className="flex items-center gap-1 p-0.5 rounded-lg bg-[#08080a] border border-[#d4af37]/25 text-xs font-mono">
                    <button
                      type="button"
                      onClick={() => handleCurrencyChange('PKR')}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                        currency === 'PKR'
                          ? 'bg-[#eab308] text-black'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      PKR
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCurrencyChange('USD')}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                        currency === 'USD'
                          ? 'bg-[#eab308] text-black'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      USD ($)
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#08080a] border border-[#d4af37]/25 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Target Allocation:</span>
                    <span className="text-lg font-extrabold text-[#eab308] tabular-nums">
                      {formattedBudgetDisplay()}
                    </span>
                  </div>

                  {/* Range Slider */}
                  <input
                    type="range"
                    min={currency === 'PKR' ? 250000 : 1500}
                    max={currency === 'PKR' ? 4500000 : 25000}
                    step={currency === 'PKR' ? 50000 : 500}
                    value={customBudget}
                    onChange={(e) => setCustomBudget(e.target.value)}
                    className="w-full accent-[#eab308] cursor-pointer"
                  />

                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>{currency === 'PKR' ? 'Rs. 250k (Entry)' : '$1,500'}</span>
                    <span>{currency === 'PKR' ? 'Rs. 1.5M (Average)' : '$8,000'}</span>
                    <span>{currency === 'PKR' ? 'Rs. 4.5M+ (Enterprise)' : '$25,000+'}</span>
                  </div>
                </div>
              </div>

              {/* Step 3: Required Modules */}
              <div className="space-y-3 pt-2 border-t border-white/10">
                <label className="block text-xs font-mono text-white uppercase tracking-wider font-bold">
                  03. Architectural Modules Included
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {availableAddons.map((addon) => {
                    const isChecked = selectedAddons.includes(addon);
                    return (
                      <button
                        key={addon}
                        type="button"
                        onClick={() => toggleAddon(addon)}
                        className={`p-3 rounded-lg border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                          isChecked
                            ? 'bg-[#eab308]/15 border-[#eab308] text-white font-semibold'
                            : 'bg-[#08080a] border-[#d4af37]/20 text-slate-400 hover:border-[#eab308]/40'
                        }`}
                      >
                        <span className="truncate pr-2">{addon}</span>
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                            isChecked
                              ? 'border-[#eab308] bg-[#eab308] text-black font-bold'
                              : 'border-slate-600'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Timeline Preference */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <label className="block text-xs font-mono text-white uppercase tracking-wider font-bold">
                  Target Engineering Timeline
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setTimeline('fast')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold border text-center transition-all cursor-pointer ${
                      timeline === 'fast'
                        ? 'bg-[#eab308] text-black border-[#eab308]'
                        : 'bg-[#08080a] text-slate-400 border-[#d4af37]/20 hover:border-[#eab308]/60'
                    }`}
                  >
                    Rapid (&lt; 4 wks)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTimeline('standard')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold border text-center transition-all cursor-pointer ${
                      timeline === 'standard'
                        ? 'bg-[#eab308] text-black border-[#eab308]'
                        : 'bg-[#08080a] text-slate-400 border-[#d4af37]/20 hover:border-[#eab308]/60'
                    }`}
                  >
                    Standard (6-8 wks)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTimeline('enterprise')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold border text-center transition-all cursor-pointer ${
                      timeline === 'enterprise'
                        ? 'bg-[#eab308] text-black border-[#eab308]'
                        : 'bg-[#08080a] text-slate-400 border-[#d4af37]/20 hover:border-[#eab308]/60'
                    }`}
                  >
                    Enterprise (10+ wks)
                  </button>
                </div>
              </div>

              {/* Optional Contact Details to pre-fill */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/10">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Tariq Malik"
                    className="w-full px-3 py-2.5 rounded-lg bg-[#08080a] border border-[#d4af37]/30 text-white text-xs focus:outline-none focus:border-[#eab308]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Retail Group International"
                    className="w-full px-3 py-2.5 rounded-lg bg-[#08080a] border border-[#d4af37]/30 text-white text-xs focus:outline-none focus:border-[#eab308]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Estimate Specification & WhatsApp Dispatch */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="rounded-2xl bg-[#121216] border border-[#d4af37]/35 p-6 sm:p-7 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#eab308]" />
                  <span className="text-xs font-mono uppercase tracking-wider text-white font-bold">
                    Live Proposal Summary
                  </span>
                </div>
                <span className="text-[11px] font-mono text-black bg-[#eab308] px-2.5 py-0.5 rounded font-extrabold">
                  Ready to Dispatch
                </span>
              </div>

              {/* Summary Items */}
              <div className="space-y-4 text-xs">
                <div>
                  <div className="text-slate-400 font-mono">Target Platform:</div>
                  <div className="text-sm font-bold text-white mt-0.5">
                    {currentType.title}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#08080a] border border-[#d4af37]/30">
                  <div className="text-slate-400 font-mono text-[11px]">Specified Target Budget:</div>
                  <div className="text-2xl font-black font-mono tabular-nums mt-1 text-[#eab308]">
                    {formattedBudgetDisplay()}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    Direct engineering budget without agency commissions
                  </div>
                </div>

                <div>
                  <div className="text-slate-400 font-mono">Selected Scope Modules ({selectedAddons.length}):</div>
                  <div className="space-y-1 mt-1.5">
                    {selectedAddons.map((addon) => (
                      <div key={addon} className="flex items-center gap-1.5 text-slate-300">
                        <Check className="w-3 h-3 text-[#eab308] shrink-0 stroke-[2.5]" />
                        <span className="truncate">{addon}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-slate-400 font-mono text-[11px]">
                  <span>Technical Lead Hotline:</span>
                  <span className="text-[#fef08a] font-bold">+92 301 3207260</span>
                </div>
              </div>

              {/* Primary Dispatch Action: Solid Gold/Yellow Button with Black Text */}
              <div className="space-y-2.5 pt-2">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-xl bg-[#eab308] hover:bg-[#d4af37] text-black font-extrabold text-sm flex items-center justify-center gap-2.5 shadow-[0_4px_25px_-2px_rgba(234,179,8,0.5)] hover:shadow-[0_6px_30px_-2px_rgba(212,175,55,0.7)] transition-all cursor-pointer hover:-translate-y-0.5"
                >
                  <MessageSquare className="w-5 h-5 fill-black stroke-none" />
                  <span>Send to WhatsApp (+92 301 3207260)</span>
                </a>

                {/* Secondary: Copy Specification Spec */}
                <button
                  type="button"
                  onClick={handleCopySpec}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#08080a] text-xs font-semibold text-slate-300 hover:text-white flex items-center justify-center gap-2 border border-[#d4af37]/25 hover:border-[#eab308] cursor-pointer transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-300 font-bold">Copied Specification to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy Project Specification</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5 pt-1">
                <Calendar className="w-3.5 h-3.5 text-[#eab308]" />
                <span>Response time: Usually within 15 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
