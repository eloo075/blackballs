export default function LiveMultiplierWidget() {
  return (
    <div
      role="status"
      aria-label="Game calibrating — system booting"
      className="live-multiplier-widget fixed bottom-4 right-4 z-40 flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 bg-black/90 border-2 border-red-500 rounded-full text-white font-black text-xs sm:text-sm uppercase tracking-wide shadow-[0_0_16px_rgba(239,68,68,0.25)] cursor-default select-none"
    >
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
      </span>
      <span className="whitespace-nowrap">
        <span className="text-red-400">⚠️ CALIBRATING</span>
        {' '}
        <span className="text-orange-400">[ SYSTEM BOOTING... ]</span>
      </span>
    </div>
  );
}
