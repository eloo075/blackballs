import { GAME_URL } from '../lib/constants';

export default function ArcadeGameCTA() {
  return (
    <a
      href={GAME_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="arcade-game-cta group inline-flex items-center justify-center gap-2 sm:gap-3 w-full max-w-2xl px-6 sm:px-10 py-5 sm:py-6 text-center font-bangers text-lg sm:text-2xl md:text-3xl uppercase tracking-wide text-black border-4 border-black rounded-2xl bg-gradient-to-r from-lime-400 via-[#FF9B3B] to-lime-400 shadow-[6px_6px_0px_0px_#000] transition-all duration-200 hover:scale-105 hover:-translate-y-1 hover:shadow-[8px_10px_0px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:scale-100 active:shadow-[2px_2px_0px_0px_#000]"
    >
      <span className="animate-bounce inline-block group-hover:animate-none">🎮</span>
      <span>APE IN &amp; PLAY (SURVIVE THE RUG)</span>
      <span className="animate-bounce inline-block group-hover:animate-none animation-delay-150">📈📉</span>
    </a>
  );
}
