export default function PastelBackground() {
  const blobs = [
    { className: 'bg-amber-200/45 w-72 h-72 -top-20 -left-16', delay: '0s' },
    { className: 'bg-orange-200/40 w-80 h-80 top-[15%] -right-20', delay: '2s' },
    { className: 'bg-yellow-200/35 w-64 h-64 top-[45%] -left-10', delay: '4s' },
    { className: 'bg-rose-200/30 w-96 h-96 bottom-[10%] -right-16', delay: '1s' },
    { className: 'bg-teal-200/30 w-56 h-56 bottom-[30%] left-[20%]', delay: '3s' },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {blobs.map((b, i) => (
        <div
          key={i}
          className={`pastel-blob absolute rounded-full ${b.className}`}
          style={{ animationDelay: b.delay }}
        />
      ))}
    </div>
  );
}
