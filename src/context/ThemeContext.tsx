import React, { createContext, useContext, useEffect } from 'react';

type Theme = 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Strictly force dark mode permanently on root
    const root = document.documentElement;
    root.classList.remove('light');
    root.classList.add('dark');
    try {
      localStorage.setItem('xyner-theme', 'dark');
    } catch {
      // ignore
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: 'dark', toggleTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
