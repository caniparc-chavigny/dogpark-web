import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import type { Lang } from '../i18n/strings';
import SakuraPetals from '../components/SakuraPetals';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { useTheme, HERO_EMOJI } from '../context/ThemeContext';
import s from './screens.module.css';

const OPTIONS: { value: Lang; label: string }[] = [
  { value: 'fr', label: 'Français' },
  { value: 'en', label: 'English' },
];

export default function LanguageScreen({ onDone }: { onDone: () => void }) {
  const { lang, setLang } = useLang();
  const { theme } = useTheme();
  const [chosen, setChosen] = useState<Lang>(lang);

  function handleContinue() {
    setLang(chosen);
    onDone();
  }

  return (
    <div className={s.screen}>
      <SakuraPetals />
      <div className={s.center}>
        <span className={s.emoji}>{HERO_EMOJI[theme]}</span>
        <h1 className={s.title}>Parc à chiens</h1>
        <p className={s.tag}>Parc de Chavigny · Boisbriand</p>

        <ThemeSwitcher />

        <div className={s.options}>
          {OPTIONS.map(opt => (
            <button
              key={opt.value}
              className={`${s.option} ${chosen === opt.value ? s.optionActive : ''}`}
              onClick={() => setChosen(opt.value)}>
              {opt.label}
            </button>
          ))}
        </div>

        <button className={s.primaryBtn} onClick={handleContinue}>
          {chosen === 'fr' ? 'Continuer →' : 'Continue →'}
        </button>
      </div>
    </div>
  );
}
