import { useTheme, THEMES } from '../context/ThemeContext';
import s from './themeSwitcher.module.css';

/**
 * Petit sélecteur de thème — 3 pastilles (Sakura / Nature / Neutre).
 * Le choix est mémorisé (localStorage) et appliqué instantanément.
 */
export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className={s.row} role="group" aria-label="Choix du thème">
      {THEMES.map(t => (
        <button
          key={t.value}
          className={`${s.chip} ${theme === t.value ? s.active : ''}`}
          onClick={() => setTheme(t.value)}
          aria-pressed={theme === t.value}
          title={t.label}>
          <span className={s.emoji}>{t.emoji}</span>
          <span className={s.label}>{t.label}</span>
        </button>
      ))}
    </div>
  );
}
