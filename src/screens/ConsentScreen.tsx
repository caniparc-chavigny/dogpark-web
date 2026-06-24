import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { useSession } from '../context/SessionContext';
import SakuraPetals from '../components/SakuraPetals';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { useTheme, HERO_EMOJI } from '../context/ThemeContext';
import s from './screens.module.css';

export default function ConsentScreen({ onEnter, onSpectate }: { onEnter: () => void; onSpectate: () => void }) {
  const { t } = useLang();
  const { theme } = useTheme();
  const { startSession } = useSession();
  const [visible, setVisible] = useState(true);

  function handleEnter() {
    startSession(visible);
    onEnter();
  }

  return (
    <div className={s.screen}>
      <SakuraPetals />
      <div className={s.center}>
        <span className={s.emoji}>{HERO_EMOJI[theme]}</span>
        <h1 className={s.title}>{t.welcome}</h1>
        <p className={s.subtitle}>{t.visibilityQuestion}</p>

        <div className={s.toggleRow}>
          <button
            className={`${s.toggleBtn} ${visible ? s.toggleActive : ''}`}
            onClick={() => setVisible(true)}>
            {t.visible}
          </button>
          <button
            className={`${s.toggleBtn} ${!visible ? s.toggleActive : ''}`}
            onClick={() => setVisible(false)}>
            {t.invisible}
          </button>
        </div>

        <p className={s.hint}>{visible ? t.visibleHint : t.invisibleHint}</p>

        <button className={s.primaryBtn} onClick={handleEnter}>
          {t.enterPark}
        </button>

        <button className={s.textBtnGreen} onClick={onSpectate} style={{ marginTop: 4 }}>
          {t.spectate}
        </button>

        <div style={{ marginTop: 18 }}>
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
}
