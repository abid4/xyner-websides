import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useDevMode } from '../context/DevModeContext';

interface NavbarProps {
  onHireClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onHireClick }) => {
  const { isDevMode, toggleDevMode } = useDevMode();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#capabilities' },
    { label: 'Showcase', href: '#portfolio' },
    { label: 'Project Estimator', href: '#estimator' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    if (href === '#contact') {
      e.preventDefault();
      onHireClick();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3.5 bg-[#08080a]/95 backdrop-blur-xl border-b border-[#d4af37]/25 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.95)]'
          : 'py-5 bg-[#08080a] border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 sm:gap-8">
          {/* Zone 1: Solid Dark Header Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-3 text-white group whitespace-nowrap shrink-0 focus-visible:outline-[#eab308]"
          >
            <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-[#121216] border border-[#eab308]/50 group-hover:border-[#eab308] transition-all shadow-[0_0_15px_-2px_rgba(234,179,8,0.35)]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transform group-hover:rotate-12 transition-transform duration-300"
              >
                <path
                  d="M4 4L20 20M20 4L4 20"
                  stroke="#eab308"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="text-xl font-extrabold tracking-wider text-white group-hover:text-[#eab308] transition-colors">
              XYNER
            </span>
          </a>

          {/* Zone 2: Clean Navigation Links in the Center */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(link.href, e)}
                className="relative py-1 text-slate-300 hover:text-[#eab308] transition-colors whitespace-nowrap shrink-0 group text-[13.5px] font-medium"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#eab308] transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Zone 3: Actions - [/>] Dev Mode + Striking Solid Gold/Yellow CTA Button */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {/* [/>] Dev Mode Toggle */}
            <button
              onClick={toggleDevMode}
              title="Toggle Developer X-Ray Mode (Shortcut: Key 'X')"
              aria-label="Toggle Developer X-Ray Mode"
              className={`px-3 py-2 rounded-lg text-xs font-mono font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer border ${
                isDevMode
                  ? 'bg-[#00ff88]/15 text-[#00ff88] border-[#00ff88] shadow-[0_0_20px_-2px_rgba(0,255,136,0.6)]'
                  : 'bg-[#121216] text-slate-300 border-[#d4af37]/30 hover:border-[#eab308] hover:text-[#eab308]'
              }`}
            >
              <span className={isDevMode ? 'text-[#00ff88]' : 'text-[#eab308]'}>[/&gt;]</span>
              <span>Dev</span>
            </button>

            {/* Striking Solid Gold/Yellow CTA Button with Black Text */}
            <button
              onClick={onHireClick}
              className="px-5 py-2.5 rounded-lg bg-[#eab308] hover:bg-[#d4af37] text-black font-extrabold text-xs tracking-wider uppercase transition-all duration-200 shadow-[0_4px_20px_-2px_rgba(234,179,8,0.45)] hover:shadow-[0_6px_25px_-2px_rgba(212,175,55,0.65)] hover:-translate-y-0.5 cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <span>Hire Us</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onHireClick}
              className="px-3 py-1.5 rounded bg-[#eab308] text-black font-extrabold text-xs"
            >
              Hire Us
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 text-slate-300 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#d4af37]/25 bg-[#08080a] px-6 py-5 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  handleNavClick(link.href, e);
                  setMobileMenuOpen(false);
                }}
                className="text-base font-medium text-slate-300 hover:text-[#eab308] transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
            <button
              onClick={() => {
                toggleDevMode();
                setMobileMenuOpen(false);
              }}
              className={`w-full py-2 px-3 rounded-lg border text-xs font-mono flex items-center justify-center gap-2 ${
                isDevMode
                  ? 'border-[#00ff88] bg-[#00ff88]/15 text-[#00ff88]'
                  : 'border-[#d4af37]/30 bg-[#121216] text-[#eab308]'
              }`}
            >
              <span>[/&gt;] Developer X-Ray Mode: {isDevMode ? 'ACTIVE' : 'STANDBY'}</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onHireClick();
              }}
              className="w-full py-3 px-4 rounded-lg bg-[#eab308] hover:bg-[#d4af37] text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg"
            >
              Contact Us &middot; Hire XYNER
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
