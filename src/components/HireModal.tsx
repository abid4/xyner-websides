import React, { useState } from 'react';
import { X, MessageSquare, ArrowRight, Check } from 'lucide-react';

interface HireModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToEstimator: () => void;
}

export const HireModal: React.FC<HireModalProps> = ({
  isOpen,
  onClose,
  onNavigateToEstimator,
}) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [brief, setBrief] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleDirectWhatsApp = () => {
    const text = `Hello XYNER Engineering,
I'd like to schedule an architectural discovery call for a software project.
Name: ${name || 'Prospective Client'}
Contact: ${contact || 'Direct WhatsApp'}
Notes: ${brief || 'Interested in POS / Mobile / Web application'}`;

    window.open(`https://wa.me/923013207260?text=${encodeURIComponent(text)}`, '_blank');
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      handleDirectWhatsApp();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#121216] border border-[#d4af37]/40 p-6 sm:p-8 shadow-2xl shadow-black/90">
        {/* Top Gold Accent bar */}
        <div className="absolute -top-[1.5px] left-12 right-12 h-[2px] bg-[#eab308]" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-[#eab308] font-bold">
            Start a Direct Project
          </div>

          <h3 className="text-2xl font-bold text-white">
            Hire the <span className="bg-gradient-to-r from-[#fef08a] via-[#eab308] to-[#d4af37] bg-clip-text text-transparent">XYNER</span> Engineering Team
          </h3>

          <p className="text-xs sm:text-sm text-slate-300">
            Tell us about your mobile app, offline-first POS, or enterprise web platform. We respond within 15 minutes.
          </p>

          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div className="text-base font-bold text-white">Connecting to WhatsApp...</div>
              <div className="text-xs text-slate-400">Opening direct channel to +92 301 3207260</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5 pt-2">
              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                  Your Name or Company
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Tariq Malik / Retail Group"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#08080a] border border-[#d4af37]/30 text-white text-xs focus:outline-none focus:border-[#eab308]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                  Your WhatsApp or Phone
                </label>
                <input
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="+92 300 1234567 or email"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#08080a] border border-[#d4af37]/30 text-white text-xs focus:outline-none focus:border-[#eab308]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                  Project Needs & Constraints
                </label>
                <textarea
                  rows={3}
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  placeholder="Briefly describe what you want to build (e.g. Offline restaurant POS with 3 kitchen printers, or Flutter delivery app)..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#08080a] border border-[#d4af37]/30 text-white text-xs focus:outline-none focus:border-[#eab308] resize-none"
                />
              </div>

              <div className="pt-2 space-y-2">
                {/* Solid Gold/Yellow Button with Black Text */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#eab308] hover:bg-[#d4af37] text-black font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg hover:-translate-y-0.5"
                >
                  <MessageSquare className="w-4 h-4 fill-black stroke-none" />
                  <span>Send via WhatsApp (+92 301 3207260)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigateToEstimator();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl text-xs text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer font-medium"
                >
                  <span>Or use the interactive Budget Estimator</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#eab308]" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
