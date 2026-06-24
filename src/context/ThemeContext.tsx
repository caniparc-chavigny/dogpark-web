import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

export type Theme = 'sakura' | 'nature' | 'neutre';

export const THEMES: { value: Theme; label: string; emoji: string }[] = [
  { value: 'nature', label: 'Nature', emoji: '🌿' },
  { value: 'sakura', label: 'Sakura', emoji: '🌸' },
  { value: 'neutre', label: 'Neutre', emoji: '✨' },
];

/* Emoji « héros » affiché en grand sur les écrans d'accueil */
export const HERO_EMOJI: Record<Theme, string> = {
  sakura: '🌸',
  nature: '🌿',
  neutre: '🐾',
};

interface ThemeContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const STORAGE_KEY = 'dogpark_theme';
const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('nature');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored === 'sakura' || stored === 'nature' || stored === 'neutre') {
      setThemeState(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  function setTheme(t: Theme) {
    setThemeState(t);
    localStorage.setItem(STORAGE_KEY, t);
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme doit être utilisé dans ThemeProvider');
  return ctx;
}

/* Couleurs de la carte Leaflet par thème (utilisées en JS, pas en CSS) */
export const MAP_COLORS: Record<Theme, {
  circle: string; selfStroke: string; selfFill: string; otherStroke: string; otherFill: string;
}> = {
  sakura: { circle: '#ff8fb3', selfStroke: '#ff6f9e', selfFill: '#ffffff', otherStroke: '#ffffff', otherFill: '#ff8fb3' },
  nature: { circle: '#4caf6a', selfStroke: '#2e7d46', selfFill: '#ffffff', otherStroke: '#ffffff', otherFill: '#4caf6a' },
  neutre: { circle: '#6b7280', selfStroke: '#374151', selfFill: '#ffffff', otherStroke: '#ffffff', otherFill: '#6b7280' },
};
