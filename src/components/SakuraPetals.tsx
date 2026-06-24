import { useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import s from './sakura.module.css';

/**
 * Particules qui dérivent doucement vers le bas.
 * Pétales de cerisier (Sakura) ou feuilles (Nature). Rien en mode Neutre.
 * Pur CSS — léger, ne bloque jamais l'interface.
 */
export default function SakuraPetals({ count = 14 }: { count?: number }) {
  const { theme } = useTheme();

  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const left = Math.random() * 100;
        const duration = 9 + Math.random() * 9;
        const delay = -Math.random() * 18;
        const size = 10 + Math.random() * 10;
        const drift = (Math.random() * 2 - 1) * 60;
        const tone = i % 3;
        return { left, duration, delay, size, drift, tone };
      }),
    [count]
  );

  if (theme === 'neutre') return null;

  return (
    <div className={`${s.field} sakura-field`} aria-hidden="true">
      {petals.map((p, i) => (
        <span
          key={i}
          className={`${s.petal} ${s[`tone${p.tone}`]}`}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.85,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            ['--drift' as string]: `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
