import React, { useState } from 'react';
import { MessageCircle, Calculator, Sparkles, X } from 'lucide-react';

interface FloatingQuickActionsProps {
  onOpenConsultation: () => void;
  onOpenEstimator: () => void;
}

export const FloatingQuickActions: React.FC<FloatingQuickActionsProps> = ({
  onOpenConsultation,
  onOpenEstimator,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // WhatsApp click handler
  const handleWhatsAppClick = () => {
    const phone = '923001234567'; // Islamabad headquarters client hotline
    const message = encodeURIComponent(
      'Hello XYNER Engineering, I would like to schedule a consultation regarding a custom software architecture project.'
    );
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 font-sans">
      {/* Quick Actions Menu Expandable */}
      {isOpen && (
        <div className="flex flex-col items-end gap-2.5 mb-1 animate-in fade-in slide-in-from-bottom-3 duration-200">
          {/* Quick Estimator Trigger */}
          <button
            onClick={() => {
              onOpenEstimator();
              setIsOpen(false);
            }}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#121216] border border-[#d4af37]/40 hover:border-[#eab308] text-white shadow-[0_10px_25px_-5px_rgba(0,0,0,0.8)] text-xs font-semibold hover:bg-[#1a1a22] transition-all cursor-pointer group"
          >
            <span className="text-slate-300 group-hover:text-white">Calculate Project Scope</span>
            <div className="w-7 h-7 rounded-lg bg-[#eab308]/20 flex items-center justify-center text-[#eab308] border border-[#eab308]/30">
              <Calculator className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* WhatsApp Direct Chat Trigger */}
          <button
            onClick={handleWhatsAppClick}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#121216] border border-[#25D366]/40 hover:border-[#25D366] text-white shadow-[0_10px_25px_-5px_rgba(0,0,0,0.8)] text-xs font-semibold hover:bg-[#1a1a22] transition-all cursor-pointer group"
          >
            <span className="text-slate-300 group-hover:text-white">Chat on WhatsApp (Instant)</span>
            <div className="w-7 h-7 rounded-lg bg-[#25D366]/20 flex items-center justify-center text-[#25D366] border border-[#25D366]/30">
              <MessageCircle className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Quick Consultation Modal Trigger */}
          <button
            onClick={() => {
              onOpenConsultation();
              setIsOpen(false);
            }}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#eab308] hover:bg-[#d4af37] text-black shadow-[0_10px_25px_-5px_rgba(234,179,8,0.4)] text-xs font-bold transition-all cursor-pointer group"
          >
            <span>Request Architecture Call</span>
            <div className="w-7 h-7 rounded-lg bg-black/15 flex items-center justify-center text-black">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      )}

      {/* Main Trigger Dock */}
      <div className="flex items-center gap-2.5">
        {/* WhatsApp Direct Instant Icon */}
        <button
          onClick={handleWhatsAppClick}
          aria-label="Direct WhatsApp Contact"
          title="Direct WhatsApp Contact"
          className="w-12 h-12 rounded-full bg-[#121216] border border-[#25D366]/50 hover:border-[#25D366] shadow-[0_8px_25px_-3px_rgba(37,211,102,0.35)] flex items-center justify-center text-[#25D366] hover:scale-105 transition-all cursor-pointer group relative"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#25D366] border-2 border-[#08080a] animate-pulse" />
        </button>

        {/* Master Quick Actions FAB in Rich Gold/Yellow */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open Quick Action Menu"
          title="Quick Project Actions"
          className="h-12 px-4 rounded-full bg-[#eab308] hover:bg-[#d4af37] text-black font-extrabold text-xs tracking-wide shadow-[0_8px_30px_-5px_rgba(234,179,8,0.55)] flex items-center gap-2 hover:scale-105 transition-all cursor-pointer border border-[#fef08a]/60"
        >
          {isOpen ? (
            <>
              <X className="w-4 h-4 stroke-[3]" />
              <span>Close</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-black fill-black" />
              <span>Quick Action</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
