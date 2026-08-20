import { useState, useEffect, useRef } from 'react';
import { Copy, Check, Send, ExternalLink, TrendingUp, Zap, Shield, Flame, ChevronDown, Menu, X, Wallet, Gift, Trophy, ShieldCheck, CheckCircle2, Loader2, Lock, Sparkles } from 'lucide-react';
import First500Believers from './components/First500Believers';
import LogoRain from './components/LogoRain';
import PastelBackground from './components/PastelBackground';
import ArcadeGameCTA from './components/ArcadeGameCTA';
import LiveMultiplierWidget from './components/LiveMultiplierWidget';
import { CHAIN_NAME, CHAIN_EXPLORER, ROBINHOOD_CHAIN_LOGO, X_HANDLE, TELEGRAM_URL, X_PROFILE_URL } from './lib/constants';

const CA = 'COMING SOON';

function RobinhoodFeather({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.5 2.5c-5.2 3.8-8.8 8.2-10.8 13.2-.6 1.5-1 3-1.2 4.5l-.1.8.8-.2c1.5-.4 3-.9 4.5-1.6 5-2.2 9.4-5.8 13.2-11 .3-.4.2-1-.3-1.3-.5-.3-1.1-.2-1.4.3-.1.1-.1.1-.7.3z" />
    </svg>
  );
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      className="meme-btn meme-btn-orange flex items-center gap-2 px-5 py-2.5 text-sm btn-press"
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
      {copied ? 'Snagged!' : 'Snag CA'}
    </button>
  );
}

function Ticker() {
  const items = [
    '$BLACKBALLS', 'BALLS OF STEEL', 'REAL GAME JUST VIBES', 'NUMBER GO BRRR',
    'ROBINHOOD CHAIN', 'DIAMOND NUTS', 'PHANTOM GANG', 'DEGEN ENERGY', 'HODL OR GET REKT',
  ];
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden bg-[#FF9B3B] py-3 ticker-meme">
      <div className="ticker-track flex gap-0 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="font-bangers text-black text-xl tracking-widest px-8 meme-headline">
            {item} <span className="text-black/50">★</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = ['First 500', 'About', 'Roadmap', 'BALLSVIBE', 'How to Buy', 'Community'];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 nav-blur ${scrolled ? 'bg-white/90 border-b-2 border-black' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <img src="/logo.png" alt="BlackBalls" className="w-10 h-10 object-contain logo-pulse" />
          <span className="font-bangers text-2xl tracking-wider group-hover:opacity-90 transition-opacity cartoon-title-orange">BLACKBALLS</span>
        </a>

        <div className="hidden md:flex items-center gap-5 lg:gap-7">
          <a
            href="#first-500"
            className="nav-play text-sm uppercase tracking-wider"
          >
            JOIN THE DROP
          </a>
          {links.map(l => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/ /g, '-')}`}
              className="nav-link"
            >
              {l}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="#how-to-buy" className="meme-btn meme-btn-orange px-5 py-2.5 text-sm btn-press">
            APE IN 🥜
          </a>
        </div>

        <button className="md:hidden text-black" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t-2 border-black px-6 py-4 flex flex-col gap-4 shadow-[0_4px_0_#000]">
          <a
            href="#first-500"
            className="meme-btn meme-btn-orange px-5 py-3 text-center"
            onClick={() => setMobileOpen(false)}
          >
            JOIN THE DROP
          </a>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g, '-')}`}
              className="nav-link nav-link-mobile py-2 border-b border-black/10"
              onClick={() => setMobileOpen(false)}>
              {l}
            </a>
          ))}
          <a href="#how-to-buy" className="meme-btn meme-btn-sky px-5 py-3 text-center mt-2"
            onClick={() => setMobileOpen(false)}>
            APE IN 🥜
          </a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const stats = [
    { label: 'vibe check', value: 'certified unhinged ✓' },
    { label: 'roadmap', value: 'phases. no cope dates.' },
    { label: 'utility', value: 'balls of steel' },
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16">
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col items-center text-center gap-6 mb-16">
          {/* Game CTA + chain badge */}
          <div className="flex flex-col items-center gap-3 w-full max-w-2xl">
            <ArcadeGameCTA />
            <div className="meme-badge bg-lime-300 text-black px-4 py-2 text-xs sm:text-sm flex flex-wrap items-center justify-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <RobinhoodFeather className="w-4 h-4 shrink-0" />
              <span className="font-black uppercase tracking-wide">soon on {CHAIN_NAME}</span>
            </div>
          </div>

          {/* Main headline */}
          <h1 className="font-bangers text-7xl md:text-9xl lg:text-[11rem] leading-none">
            <span className="cartoon-title-orange">BLACK</span>
            <br />
            <span className="cartoon-title">BALLS</span>
          </h1>

          {/* Logo */}
          <div className="relative my-2 wobble-slow">
            <div className="w-32 h-32 md:w-40 md:h-40 logo-pulse">
              <img src="/logo.png" alt="BlackBalls" className="w-full h-full object-contain" />
            </div>
            <div className="absolute -top-2 -right-2 bg-lime-300 rounded-full p-1 border-2 border-black shadow-[2px_2px_0_#000]">
              <img src={ROBINHOOD_CHAIN_LOGO} alt={CHAIN_NAME} className="w-8 h-8 rounded-full object-cover" />
            </div>
          </div>

          <p className="text-black/75 text-xl md:text-2xl max-w-2xl leading-relaxed font-semibold">
            the dumbest, boldest, most{' '}
            <span className="text-[#FF9B3B] font-black">ballsy</span> meme coin on{' '}
            {CHAIN_NAME}. no dates. no empty promises. just a real game and{' '}
            <span className="text-[#FF9B3B] font-black">number go brrr</span>.
          </p>

          {/* CA Box */}
          <div className="meme-card flex flex-col sm:flex-row items-center gap-3 p-4 w-full max-w-xl">
            <div className="flex-1 text-center sm:text-left">
              <div className="text-black/45 text-xs uppercase tracking-widest mb-1 font-bold">contract (don&apos;t fumble)</div>
              <div className="text-black font-mono text-sm font-bold break-all">{CA}</div>
            </div>
            <CopyButton text={CA} />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center w-full max-w-2xl">
            <a href="#how-to-buy" className="meme-btn meme-btn-orange px-8 py-4 text-lg btn-press flex items-center gap-2">
              <TrendingUp size={20} />
              APE IN NOW
            </a>
            <a href="#first-500" className="meme-btn meme-btn-sky px-8 py-4 text-lg btn-press flex items-center gap-2">
              free tokens???
              <ChevronDown size={20} />
            </a>
          </div>

          {/* Stats bar */}
          <div className="flex flex-wrap justify-center gap-8 mt-4">
            {stats.map(s => (
              <div key={s.label} className="text-center">
                <div className="font-bangers text-2xl text-[#FF9B3B]">{s.value}</div>
                <div className="text-black/45 text-xs uppercase tracking-wider font-bold">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mascot */}
        <div className="relative flex justify-center items-end">
          <div className="w-64 md:w-96 lg:w-[32rem] mascot-wrapper">
            <img src="/images/99.png" alt="Mascot" className="w-full h-full object-contain mascot-zoom" />
          </div>
        </div>
      </div>
    </section>
  );
}

function GamePreviewVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    const play = video.play();
    if (play) play.catch(() => {});
  }, []);

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label="BlackBalls crash game preview"
    >
      <source src="/game-preview.mp4" type="video/mp4" />
    </video>
  );
}

function TheGame() {
  const { ref, visible } = useInView();

  const points = [
    {
      icon: <Gift className="text-[#FF9B3B]" size={32} />,
      title: 'FREE TO PLAY',
      body: 'play-money credits. no deposit. no wallet drain. just smash cash out.',
    },
    {
      icon: <Trophy className="text-[#FF9B3B]" size={32} />,
      title: 'REAL PRIZES',
      body: 'top of the weekly board wins real $BLACKBALLS. vibes AND bags.',
    },
    {
      icon: <ShieldCheck className="text-[#FF9B3B]" size={32} />,
      title: 'PROVABLY FAIR',
      body: 'every round verifiable. seed committed before it runs. no dealer magic.',
    },
  ];

  return (
    <section id="the-game" className="relative py-24 md:py-32 overflow-hidden">
      <div ref={ref} className={`relative z-10 max-w-7xl mx-auto px-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-12">
          <span className="meme-badge bg-lime-300 text-black px-4 py-1 text-xs mb-3">crash game soon. drop is live.</span>
          <h2 className="font-bangers text-5xl md:text-7xl mt-2 leading-tight">
            <span className="cartoon-title">NOT JUST A COIN. </span>
            <span className="cartoon-title-orange">WE BUILT THE GAME.</span>
          </h2>
        </div>

        <div className="game-preview-frame max-w-5xl mx-auto mb-8">
          <GamePreviewVideo />
        </div>

        <div className="meme-card bg-yellow-50 p-6 md:p-8 text-center max-w-4xl mx-auto mb-10">
          <p className="font-bangers text-2xl md:text-3xl text-black mb-3">the loop is stupid simple</p>
          <p className="text-black/70 text-base md:text-lg leading-relaxed font-semibold">
            connect wallet → get free credits → play the crash → climb the weekly leaderboard →
            top players win real $BLACKBALLS. no deposit. no cope. just balls.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {points.map((c, i) => {
            const iconBgs = ['bg-yellow-100', 'bg-pink-100', 'bg-sky-100'];
            return (
              <div
                key={c.title}
                className={`meme-card card-hover p-8 pastel-accent-${i}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className={`${iconBgs[i]} w-16 h-16 rounded-xl border-2 border-black flex items-center justify-center mb-6 shadow-[3px_3px_0_#000]`}>
                  {c.icon}
                </div>
                <h3 className="font-bangers text-2xl text-black mb-3">{c.title}</h3>
                <p className="text-black/65 leading-relaxed font-medium">{c.body}</p>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center">
          <a
            href="#first-500"
            className="meme-btn meme-btn-orange px-10 py-5 text-xl btn-press inline-flex items-center gap-3"
          >
            JOIN THE DROP 🥜
          </a>
        </div>
      </div>
    </section>
  );
}

function Roadmap() {
  const { ref, visible } = useInView();

  const phases = [
    {
      num: '01',
      title: 'WE ACTUALLY BUILT IT',
      status: 'SHIPPED',
      statusTone: 'shipped' as const,
      accent: 'roadmap-phase-shipped',
      items: [
        'on-chain crash game — built, live, playable',
        'provably fair — every round verifiable, seed committed before it runs',
        'wallet accounts, persistent balances, weekly leaderboard',
        'free to play. no deposits. no wallet drains.',
      ],
    },
    {
      num: '02',
      title: 'THE FIRST 500',
      status: 'IN PROGRESS',
      statusTone: 'progress' as const,
      accent: 'roadmap-phase-progress',
      items: [
        'first 500 believers claim their spot',
        '$BLACKBALLS launches on Robinhood Chain',
        'the 500 get airdropped',
        'weekly leaderboard prizes go live — top players win real $BLACKBALLS',
      ],
    },
    {
      num: '03',
      title: 'MORE WAYS TO LOSE',
      status: 'NEXT',
      statusTone: 'next' as const,
      accent: 'roadmap-phase-next',
      items: [
        'Flip goes live (already built, just locked)',
        'more game modes',
        'bigger weekly prize pools',
        'community tournaments',
      ],
    },
    {
      num: '04',
      title: 'BALLS OF STEEL',
      status: 'THE VISION',
      statusTone: 'vision' as const,
      accent: 'roadmap-phase-vision',
      items: [
        'more games in the arcade',
        'deeper competitive seasons',
        'whatever the cult demands',
      ],
    },
  ];

  const statusStyles = {
    shipped: 'bg-lime-300',
    progress: 'bg-yellow-300',
    next: 'bg-sky-300',
    vision: 'bg-pink-300',
  };

  const statusIcons = {
    shipped: <CheckCircle2 size={16} className="shrink-0" />,
    progress: <Loader2 size={16} className="shrink-0 animate-spin" />,
    next: <Lock size={16} className="shrink-0" />,
    vision: <Sparkles size={16} className="shrink-0" />,
  };

  return (
    <section id="roadmap" className="relative py-24 md:py-32 overflow-hidden">
      <div ref={ref} className={`relative z-10 max-w-7xl mx-auto px-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-14 md:mb-16">
          <span className="meme-badge bg-yellow-300 text-black px-4 py-1 text-xs mb-3">phases. not dates.</span>
          <h2 className="font-bangers text-5xl md:text-7xl mt-2 leading-none">
            <span className="cartoon-title">THE </span>
            <span className="cartoon-title-orange">ROADMAP</span>
          </h2>
          <p className="roadmap-subhead text-lg md:text-xl max-w-2xl mx-auto mt-5 leading-relaxed">
            most meme coins ship a jpeg and a prayer. we shipped a game first. here&apos;s what comes next.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="roadmap-rail hidden sm:block" aria-hidden />

          <div className="flex flex-col gap-7 md:gap-8">
            {phases.map((phase, i) => (
              <article
                key={phase.num}
                className={`roadmap-card meme-card card-hover relative overflow-hidden ${phase.accent}`}
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <div className="roadmap-card-stripe" aria-hidden />

                <div className="relative p-6 pt-24 sm:p-8 sm:pt-8 md:p-10 sm:pl-28 md:pl-32">
                  <div className="roadmap-stamp absolute left-5 top-5 sm:left-5 sm:top-8" aria-hidden>
                    <span className="roadmap-stamp-num font-bangers">{phase.num}</span>
                    <span className="roadmap-stamp-label font-bangers">PHASE</span>
                  </div>

                  <div className="flex flex-col gap-3 mb-5 sm:mb-6">
                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                      <span className={`meme-badge ${statusStyles[phase.statusTone]} text-black px-3 py-1 text-xs inline-flex items-center gap-1.5`}>
                        {statusIcons[phase.statusTone]}
                        {phase.status}
                      </span>
                      <span className="roadmap-phase-tag font-bangers">PHASE {phase.num}</span>
                    </div>
                    <h3 className="roadmap-phase-title font-bangers leading-none">
                      {phase.title}
                    </h3>
                  </div>

                  <ul className="space-y-3">
                    {phase.items.map((item) => (
                      <li key={item} className="roadmap-item flex items-start gap-3">
                        <span className="roadmap-bullet shrink-0" aria-hidden>★</span>
                        <span className="roadmap-item-text">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>

        <p className="roadmap-footnote text-center mt-12 md:mt-14 max-w-xl mx-auto">
          no dates. no promises we can&apos;t keep. we ship when it&apos;s ready.
        </p>
      </div>
    </section>
  );
}

function About() {
  const { ref, visible } = useInView();

  const cards = [
    {
      icon: <Flame className="text-[#FF9B3B]" size={32} />,
      title: 'Born Unhinged',
      body: 'BlackBalls crawled out of the Robinhood Chain swamp with zero plan and maximum confidence. when markets burn, our balls don\'t shrink.',
    },
    {
      icon: <Zap className="text-[#FF9B3B]" size={32} />,
      title: 'Number Go Brrr',
      body: 'not financial advice. not even financial anything. just vibes, memes, and chart lines that only go up (probably).',
    },
    {
      icon: <Shield className="text-[#FF9B3B]" size={32} />,
      title: 'Diamond Nut Energy',
      body: 'zero tax. zero rug. zero brain cells required. hold like your portfolio depends on it — because it kinda does.',
    },
  ];

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div ref={ref} className={`relative z-10 max-w-7xl mx-auto px-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <span className="meme-badge bg-yellow-300 text-black px-4 py-1 text-xs mb-3">wtf is this?</span>
          <h2 className="font-bangers text-5xl md:text-7xl mt-2">
            <span className="cartoon-title">ABOUT </span>
            <span className="cartoon-title-orange">BLACKBALLS</span>
          </h2>
          <p className="text-black/60 text-lg max-w-2xl mx-auto mt-4 leading-relaxed font-semibold">
            one token. one chain. infinite stupidity. the bravest (or dumbest) degens on {CHAIN_NAME}.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {cards.map((c, i) => {
            const iconBgs = ['bg-yellow-100', 'bg-pink-100', 'bg-sky-100'];
            return (
            <div
              key={i}
              className={`meme-card card-hover p-8 pastel-accent-${i}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className={`${iconBgs[i]} w-16 h-16 rounded-xl border-2 border-black flex items-center justify-center mb-6 shadow-[3px_3px_0_#000]`}>
                {c.icon}
              </div>
              <h3 className="font-bangers text-2xl text-black mb-3">{c.title}</h3>
              <p className="text-black/65 leading-relaxed font-medium">{c.body}</p>
            </div>
          );})}
        </div>

        {/* Mascot feature */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="pastel-frame-pink overflow-hidden flex flex-col md:flex-row items-center p-8 gap-6 card-hover">
            <img src="/images/645.png" alt="FireBalls" className="w-36 h-48 object-contain float" />
            <div>
              <div className="text-[#FF9B3B] text-xs font-black uppercase tracking-widest mb-2">the fire one</div>
              <h3 className="font-bangers text-3xl text-black mb-3">FIRE BALLS 🔥</h3>
              <p className="text-black/65 leading-relaxed font-medium">when charts get hot, fire balls get hotter. this is the energy your portfolio is missing (or doesn&apos;t need).</p>
            </div>
          </div>

          <div className="pastel-frame-sky overflow-hidden flex flex-col md:flex-row items-center p-8 gap-6 card-hover">
            <img src="/images/939.png" alt="LightningBalls" className="w-36 h-48 object-contain float-alt" />
            <div>
              <div className="text-sky-600 text-xs font-black uppercase tracking-widest mb-2">the electric one</div>
              <h3 className="font-bangers text-3xl text-black mb-3">LIGHTNING BALLS ⚡</h3>
              <p className="text-black/65 leading-relaxed font-medium">already ten steps ahead while you&apos;re still reading this. number go brrr energy only.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Tokenomics() {
  const { ref, visible } = useInView();

  return (
    <section id="ballsvibe" className="relative py-32 overflow-hidden">
      <div ref={ref} className={`relative z-10 max-w-7xl mx-auto px-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <span className="meme-badge bg-pink-300 text-black px-4 py-1 text-xs mb-3">tokenomics incoming. vibes already live.</span>
          <h2 className="font-bangers text-5xl md:text-7xl mt-2">
            <span className="cartoon-title">BALLS </span>
            <span className="cartoon-title-orange">VIBE</span>
          </h2>
        </div>

        <div className="meme-card p-8 sm:p-12 text-center max-w-4xl mx-auto bg-pink-50">
          <h3 className="font-bangers text-2xl sm:text-3xl text-black mb-6">not a whitepaper cult. a crash game cult with better memes.</h3>
          <p className="text-black/65 text-base sm:text-lg leading-relaxed mb-5 font-medium">
            we built a real on-chain crash game on {CHAIN_NAME} — then the chaos around it.
            late-night energy, unhinged community, and balls of steel all in one package.
          </p>
          <p className="text-black/65 text-base sm:text-lg leading-relaxed mb-5 font-medium">
            every holder is part of the lore. every meme is fuel. every pre-launch moment
            proves the degens are already winning before the token drops.
          </p>
          <p className="text-[#FF9B3B] font-black text-lg uppercase tracking-wide">
            stay close. stay hyped. number go brrr. 🥜
          </p>
        </div>
      </div>
    </section>
  );
}

function HowToBuy() {
  const { ref, visible } = useInView();

  const steps = [
    {
      num: '01',
      title: 'Get Phantom',
      body: 'Download Phantom. Robinhood Chain is already live inside — no 47-step setup guide needed.',
      icon: <Wallet size={24} className="text-[#FF9B3B]" />,
    },
    {
      num: '02',
      title: 'Pick Robinhood Chain',
      body: 'Open Phantom → switch network to Robinhood Chain. One tap. Welcome to degen paradise.',
      icon: <Shield size={24} className="text-[#FF9B3B]" />,
    },
    {
      num: '03',
      title: 'Grab Some ETH',
      body: 'Bridge or buy ETH on Robinhood Chain. You need gas. Even balls need fuel.',
      icon: <TrendingUp size={24} className="text-[#FF9B3B]" />,
    },
    {
      num: '04',
      title: 'Swap for $BLACKBALLS',
      body: 'Uniswap in Phantom → paste CA → set slippage 1-3% → smash swap. You now have balls. 🥜',
      icon: <Zap size={24} className="text-[#FF9B3B]" />,
    },
  ];

  return (
    <section id="how-to-buy" className="relative py-32 overflow-hidden">
      <div ref={ref} className={`relative z-10 max-w-7xl mx-auto px-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <span className="meme-badge bg-lime-300 text-black px-4 py-1 text-xs mb-3">ez mode</span>
          <h2 className="font-bangers text-5xl md:text-7xl mt-2">
            <span className="cartoon-title">HOW TO </span>
            <span className="cartoon-title-orange">APE</span>
          </h2>
          <p className="text-black/60 text-lg max-w-xl mx-auto mt-4 font-semibold">
            4 steps. phantom wallet. zero excuses. let&apos;s go.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((s, i) => {
            const pillColors = ['step-pill-yellow', 'step-pill-pink', 'step-pill-sky', 'step-pill-lime'];
            return (
            <div
              key={i}
              className={`meme-card card-hover relative p-6 ${pillColors[i]}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="step-num-badge inline-flex items-center justify-center w-10 h-10 text-sm font-bangers text-black mb-4">{s.num}</div>
              <div className="bg-white w-12 h-12 rounded-xl border-2 border-black flex items-center justify-center mb-4 shadow-[2px_2px_0_#000]">
                {s.icon}
              </div>
              <h3 className="font-bangers text-xl text-black mb-2">{s.title}</h3>
              <p className="text-black/65 text-sm leading-relaxed font-medium">{s.body}</p>
            </div>
          );})}
        </div>

        {/* CA prominent display */}
        <div className="meme-card bg-yellow-50 p-8 md:p-12 text-center">
          <div className="font-bangers text-3xl sm:text-4xl md:text-5xl text-black mb-2">Contract Address</div>
          <p className="text-black/50 text-sm mb-6 font-semibold">copy it. verify it. don&apos;t get rugged.</p>
          <div className="meme-input p-4 md:p-6 max-w-2xl mx-auto mb-6">
            <p className="font-mono text-[#FF9B3B] text-base md:text-lg break-all font-bold">{CA}</p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <CopyButton text={CA} />
            <a href={CHAIN_EXPLORER} target="_blank" rel="noopener noreferrer" className="meme-btn meme-btn-sky px-6 py-2.5 text-sm btn-press flex items-center gap-2">
              <ExternalLink size={16} />
              View on Blockscout
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Community() {
  const { ref, visible } = useInView();

  const socials = [
    {
      icon: (
        <img
          src="data:image/png;base64,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"
          alt="X logo"
          className="w-7 h-7 object-contain"
        />
      ),
      name: 'X',
      handle: X_HANDLE,
      desc: 'memes, alpha, unhinged posting. follow or stay poor.',
      color: 'from-[#000] to-[#111]',
      border: 'border-white/20 hover:border-white/40',
      iconColor: 'text-white',
      bg: 'bg-black',
    },
    {
      icon: <Send size={28} />,
      name: 'Telegram',
      handle: TELEGRAM_URL.replace('https://', ''),
      desc: 'the war room. news drops first. degeneracy guaranteed.',
      color: 'from-[#001a1a] to-[#111]',
      border: 'border-cyan-500/20 hover:border-cyan-500/50',
      iconColor: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
    },
  ];

  return (
    <section id="community" className="relative py-32 overflow-hidden">
      <div ref={ref} className={`relative z-10 max-w-7xl mx-auto px-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <span className="meme-badge bg-sky-300 text-black px-4 py-1 text-xs mb-3">join the cult</span>
          <h2 className="font-bangers text-5xl md:text-7xl mt-2">
            <span className="cartoon-title">BALLS </span>
            <span className="cartoon-title-orange">ARMY</span>
          </h2>
          <p className="text-black/60 text-lg max-w-xl mx-auto mt-4 font-semibold">
            not a community — a disorder. the most legendary degen gang on {CHAIN_NAME}.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
          {socials.map((s, i) => (
            <a
              key={i}
              href={s.name === 'X' ? X_PROFILE_URL : TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`meme-card card-hover p-8 flex flex-col gap-4 transition-all duration-300 ${i === 0 ? 'social-x' : 'social-tg'}`}
            >
              <div className="bg-white w-16 h-16 rounded-2xl border-2 border-black flex items-center justify-center shadow-[3px_3px_0_#000] text-black">
                {s.icon}
              </div>
              <div>
                <div className="font-bangers text-2xl text-black mb-1">{s.name}</div>
                <div className="text-sm font-mono mb-3 text-black/70 font-bold">{s.handle}</div>
                <p className="text-black/65 text-sm font-medium">{s.desc}</p>
              </div>
              <div className="text-sm font-bold flex items-center gap-2 text-black">
                Enter the chaos <ExternalLink size={14} />
              </div>
            </a>
          ))}
        </div>

        {/* Mascots CTA */}
        <div className="cta-banner relative p-8 md:p-16 overflow-hidden text-center">
          <div className="relative z-10">
            <div className="font-bangers text-4xl sm:text-5xl md:text-7xl mb-4 leading-tight">
              <span className="cartoon-title">READY TO GROW </span>
              <span className="cartoon-title-orange">YOUR BALLS?</span>
            </div>
            <p className="text-black/65 text-lg max-w-xl mx-auto mb-8 font-semibold">
              stop lurking. stop coping. ape in on {CHAIN_NAME} before your friends do.
            </p>
            <a
              href="#how-to-buy"
              className="meme-btn meme-btn-orange inline-flex items-center gap-3 px-10 py-5 text-xl btn-press"
            >
              <TrendingUp size={24} />
              APE IN NOW 🥜
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t-4 border-black py-12 bg-white/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="BlackBalls" className="w-10 h-10 object-contain logo-pulse" />
            <div>
              <div className="font-bangers text-2xl text-black tracking-wider">BLACKBALLS</div>
              <div className="text-black/50 text-xs flex items-center gap-1.5 font-bold">
                <RobinhoodFeather className="w-3.5 h-3.5 shrink-0" />
                $BLACKBALLS on {CHAIN_NAME}
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-black/45 text-xs sm:text-sm max-w-xs italic font-medium">
              not financial advice. we&apos;re literally balls on a blockchain.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a href={X_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border-2 border-black bg-white flex items-center justify-center shadow-[3px_3px_0_#000] text-black hover:bg-purple-100 transition-colors">
              <span className="sr-only">X</span>
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border-2 border-black bg-sky-200 flex items-center justify-center shadow-[3px_3px_0_#000] text-black hover:bg-sky-300 transition-colors">
              <Send size={20} />
            </a>
          </div>
        </div>

        <div className="orange-divider my-8" />

        <div className="text-center text-black/40 text-sm font-semibold">
          BlackBalls. Built on {CHAIN_NAME}. Powered by stupidity. 💎🥜
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen site-canvas relative text-black">
      <PastelBackground />
      <LogoRain />
      <LiveMultiplierWidget />
      <div className="relative z-[2]">
        <Nav />
        <Ticker />
        <First500Believers />
        <Hero />
        <TheGame />
        <Roadmap />
        <About />
        <Tokenomics />
        <HowToBuy />
        <Community />
        <Footer />
      </div>
    </div>
  );
}
