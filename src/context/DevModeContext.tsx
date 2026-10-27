import React, { createContext, useContext, useState, useEffect } from 'react';

interface DevModeContextType {
  isDevMode: boolean;
  toggleDevMode: () => void;
}

const DevModeContext = createContext<DevModeContextType>({
  isDevMode: false,
  toggleDevMode: () => {},
});

export const DevModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDevMode, setIsDevMode] = useState<boolean>(false);

  const toggleDevMode = () => {
    setIsDevMode((prev) => !prev);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (isDevMode) {
      root.classList.add('dev-mode-active');
    } else {
      root.classList.remove('dev-mode-active');
    }
  }, [isDevMode]);

  // Optional keyboard shortcut: Press 'D' or 'X' to toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is currently typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      if (e.key === 'x' || e.key === 'X') {
        toggleDevMode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <DevModeContext.Provider value={{ isDevMode, toggleDevMode }}>
      {children}
    </DevModeContext.Provider>
  );
};

export const useDevMode = () => useContext(DevModeContext);
