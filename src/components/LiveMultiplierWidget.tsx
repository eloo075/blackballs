export default function LiveMultiplierWidget() {
  return (
    <a
      href="#first-500"
      aria-label="Join the BlackBalls drop"
      className="live-multiplier-widget fixed bottom-4 right-4 z-40 flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 bg-black/90 border-2 border-[#FF9B3B] rounded-full text-white font-black text-xs sm:text-sm uppercase tracking-wide shadow-[4px_4px_0_#000] hover:bg-black transition-colors"
    >
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF9B3B] opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#FF9B3B]" />
      </span>
      <span className="whitespace-nowrap">
        <span className="text-[#FF9B3B]">SOON</span>
        {' '}
        <span className="text-orange-400">JOIN THE DROP →</span>
      </span>
    </a>
  );
}
