import React, { useState, useEffect } from 'react';
import { ArrowUpRight, MessageSquare, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const [islamabadTime, setIslamabadTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Karachi',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }).format(new Date());
        setIslamabadTime(timeStr);
      } catch (e) {
        setIslamabadTime('12:00 PM PKT');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-[#050507] border-t border-[#d4af37]/25 pt-16 pb-12 relative overflow-hidden">
      {/* Background glow subtle in gold */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[750px] h-[220px] bg-gradient-to-t from-[#eab308]/8 via-[#d4af37]/4 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          {/* Brand & Mission */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#121216] border border-[#eab308]/50 shadow-sm">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 4L20 20M20 4L4 20"
                    stroke="#eab308"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className="text-xl font-extrabold tracking-wider text-white">
                XYNER
              </span>
            </div>

            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              Engineering high-performance mobile apps, web platforms, and mission-critical offline-first POS systems. Resilient architectures designed for zero downtime under high transaction pressure.
            </p>

            {/* Direct Contact Bar */}
            <div className="space-y-2 pt-2 text-xs font-mono text-slate-300">
              <a
                href="https://wa.me/923013207260"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#eab308] transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp: +92 301 3207260</span>
                <ArrowUpRight className="w-3 h-3 text-slate-400" />
              </a>

              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#eab308]" />
                <span>HQ: Blue Area / I-8, Islamabad, Pakistan</span>
              </div>

              <div className="flex items-center gap-2 text-slate-400">
                <span>Islamabad Studio Time:</span>
                <span className="text-[#fef08a] font-bold tabular-nums">
                  {islamabadTime || 'PKT (UTC+5)'}
                </span>
              </div>
            </div>
          </div>

          {/* Solutions Column */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-[#eab308] font-bold">
              Solutions
            </div>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="#capabilities" className="hover:text-[#eab308] transition-colors">
                  Restaurant POS &amp; KDS
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-[#eab308] transition-colors">
                  Offline-First SQLite Sync
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-[#eab308] transition-colors">
                  Cross-Platform Flutter Apps
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-[#eab308] transition-colors">
                  Enterprise Next.js Portals
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-[#eab308] transition-colors">
                  WhatsApp Automation Bots
                </a>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-[#eab308] font-bold">
              Company
            </div>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="#portfolio" className="hover:text-[#eab308] transition-colors">
                  Production Showcase
                </a>
              </li>
              <li>
                <a href="#architecture" className="hover:text-[#eab308] transition-colors">
                  Architecture Blueprint
                </a>
              </li>
              <li>
                <a href="#showreel" className="hover:text-[#eab308] transition-colors">
                  Studio Showreel
                </a>
              </li>
              <li>
                <a href="#estimator" className="hover:text-[#eab308] transition-colors">
                  Project Estimator
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#eab308] transition-colors">
                  Technical FAQs
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/923013207260"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#eab308] transition-colors flex items-center gap-1 text-[#fef08a] font-semibold"
                >
                  Direct Inquiry
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Standards Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-[#eab308] font-bold">
              Standards
            </div>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <span>SOC-2 Type Readiness</span>
              </li>
              <li>
                <span>ACID SQLite Persistence</span>
              </li>
              <li>
                <span>Data Sovereignty Compliant</span>
              </li>
              <li>
                <span>Commercial Master SLA</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; 2026 XYNER. HQ: Islamabad, Pakistan. Built for the World.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Engineering Systems That Never Stop</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
