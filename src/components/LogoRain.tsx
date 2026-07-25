import { useMemo } from 'react';

const LOGO_SRC = '/logo.png';
const COUNT = 28;

function seededRandom(seed: number) {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

export default function LogoRain() {
  const drops = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => ({
        id: i,
        left: `${seededRandom(i * 1.1) * 100}%`,
        size: 20 + seededRandom(i * 2.3) * 28,
        duration: 9 + seededRandom(i * 3.7) * 12,
        delay: seededRandom(i * 5.1) * 18,
        opacity: 0.12 + seededRandom(i * 7.2) * 0.28,
        spin: seededRandom(i * 4.4) > 0.5 ? 1 : -1,
      })),
    []
  );

  return (
    <div className="logo-rain fixed inset-0 overflow-hidden pointer-events-none z-[1]" aria-hidden="true">
      {drops.map((d) => (
        <img
          key={d.id}
          src={LOGO_SRC}
          alt=""
          className="logo-rain-drop absolute top-0"
          style={{
            left: d.left,
            width: d.size,
            height: d.size,
            opacity: d.opacity,
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
            ['--spin-dir' as string]: d.spin,
          }}
        />
      ))}
    </div>
  );
}
