import { useLang } from '../context/LanguageContext';
import SakuraPetals from '../components/SakuraPetals';
import s from './screens.module.css';

export default function ClosedScreen() {
  const { t } = useLang();
  return (
    <div
      className={s.screen}
      style={{ background: 'linear-gradient(170deg, #2b2545 0%, #4a3a63 50%, #7d5a7e 100%)' }}>
      <SakuraPetals count={10} />
      <div className={s.center}>
        <span className={s.emoji}>🌙</span>
        <h1 className={s.title} style={{ color: '#ffd9e4' }}>{t.parkClosed}</h1>
        <p className={s.subtitle} style={{ color: '#f0e4f5' }}>{t.parkClosedSub}</p>
        <div className={s.hoursBox}>
          <div className={s.hoursRow}>
            <span>Lun – Dim / Mon – Sun</span>
            <span className={s.hoursTime}>7h00 – 21h00</span>
          </div>
        </div>
      </div>
    </div>
  );
}
