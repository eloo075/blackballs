import { useEffect, useState } from 'react';
import { GAME_URL } from '../lib/constants';

function randomStart() {
  return 1 + Math.random() * 3;
}

export default function LiveMultiplierWidget() {
  const [multiplier, setMultiplier] = useState(randomStart);

  useEffect(() => {
    const id = window.setInterval(() => {
      setMultiplier((prev) => {
        if (prev > 1.8 && Math.random() < 0.07) {
          return 1 + Math.random() * 0.8;
        }
        const bump = 0.02 + Math.random() * 0.12;
        return Math.min(prev + bump, 47.69);
      });
    }, 140);

    return () => window.clearInterval(id);
  }, []);

  return (
    <a
      href={GAME_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="live-multiplier-widget fixed bottom-4 right-4 z-40 flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 bg-black/90 border-2 border-green-500 rounded-full text-white font-black text-xs sm:text-sm uppercase tracking-wide shadow-[0_0_20px_rgba(34,197,94,0.35)] transition-all duration-300 hover:scale-105 hover:border-green-400 hover:shadow-[0_0_28px_rgba(34,197,94,0.55)]"
      aria-label={`Live game multiplier ${multiplier.toFixed(2)}x — play Survive the Rug`}
    >
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
      </span>
      <span className="whitespace-nowrap tabular-nums">
        LIVE:{' '}
        <span className="text-green-400">{multiplier.toFixed(2)}x</span>
        {' '}- CAN YOU HOLD?
      </span>
    </a>
  );
}
