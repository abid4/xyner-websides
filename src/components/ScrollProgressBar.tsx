import React, { useState, useEffect } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const progress = (scrollY / docHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] z-[100] pointer-events-none bg-black/60"
    >
      <div
        className="h-full bg-gradient-to-r from-[#aa771c] via-[#d4af37] to-[#f3e5ab] relative transition-transform duration-75 ease-out origin-left shadow-[0_0_15px_rgba(212,175,55,0.8),0_0_25px_rgba(243,229,171,0.6)]"
        style={{
          width: `${scrollProgress}%`,
        }}
      >
        {/* Leading edge metallic gold spark glow */}
        {scrollProgress > 0 && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#f3e5ab] blur-[2px] opacity-95 shadow-[0_0_12px_#d4af37]" />
        )}
      </div>
    </div>
  );
};
