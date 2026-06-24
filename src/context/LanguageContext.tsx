import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import strings from '../i18n/strings';
import type { Lang, Strings } from '../i18n/strings';

interface LanguageContextType {
  lang: Lang;
  t: Strings;
  setLang: (l: Lang) => void;
  ready: boolean;
}

const STORAGE_KEY = 'dogpark_lang';
const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('fr');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'fr' || stored === 'en') setLangState(stored);
    setReady(true);
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
  }

  return (
    <LanguageContext.Provider value={{ lang, t: strings[lang], setLang, ready }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be inside LanguageProvider');
  return ctx;
}
