import { useState, useEffect, useRef } from 'react';
import { Copy, Check, Send, ExternalLink, TrendingUp, Zap, Shield, Flame, ChevronDown, Menu, X, Wallet } from 'lucide-react';
import First500Believers from './components/First500Believers';
import {
  CHAIN_NAME,
  CHAIN_EXPLORER,
  ROBINHOOD_CHAIN_LOGO,
  X_HANDLE,
  TELEGRAM_URL,
  X_PROFILE_URL,
  MASCOT_HERO,
  MASCOT_FULL,
  MASCOT_BANNER,
} from './lib/constants';

const CA = 'COMING SOON';

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

function CopyButton({ text, label = 'Copy CA' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      className="degen-btn degen-btn-primary flex items-center gap-2 px-5 py-2.5 text-sm btn-press"
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
      {copied ? 'Snatched!' : label}
    </button>
  );
}

function Ticker() {
  const items = [
    '$BLACKBALLS', 'DIAMOND NUTS', 'ROBINHOOD CHAIN', 'NO ROADMAP',
    'APE IN', 'NUMBER GO UP', 'PHANTOM GANG', 'DEGEN ENERGY', 'BALLS OF STEEL',
  ];
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden bg-[#F7931A] py-3 ticker-degen">
      <div className="ticker-track flex gap-0 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="font-bangers text-black text-xl tracking-widest px-8 degen-headline">
            {item} <span className="text-black/40">★</span>
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

  const links = ['First 500', 'About', 'BALLSVIBE', 'How to Buy', 'Community'];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 nav-blur ${scrolled ? 'bg-black/90 border-b-2 border-[#F7931A]/30' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 sm:gap-3 group">
          <img src={MASCOT_FULL} alt="BlackBalls mascot" className="w-10 h-10 rounded-full object-cover object-top border-2 border-[#F7931A] degen-shadow" />
          <span className="font-bangers text-xl sm:text-2xl text-white tracking-wider group-hover:text-[#F7931A] transition-colors degen-headline">BLACKBALLS</span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/ /g, '-')}`}
              className="text-white/70 hover:text-[#F7931A] font-bold transition-colors duration-200 text-sm uppercase tracking-wider"
            >
              {l}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="#how-to-buy" className="degen-btn degen-btn-primary px-6 py-2.5 text-sm btn-press">
            APE IN 🥜
          </a>
        </div>

        <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-black/95 border-t-2 border-[#F7931A]/30 px-6 py-4 flex flex-col gap-3">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g, '-')}`}
              className="text-white/80 hover:text-[#F7931A] font-bold py-2 border-b border-white/5 transition-colors"
              onClick={() => setMobileOpen(false)}>
              {l}
            </a>
          ))}
          <a href="#how-to-buy" className="degen-btn degen-btn-primary px-5 py-3 text-center mt-2"
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
    { label: 'vibe check', value: 'certified unhinged' },
    { label: 'roadmap', value: 'we forgot lol' },
    { label: 'chain', value: CHAIN_NAME },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-12 noise-bg">
      <div className="degen-blob w-[500px] h-[500px] bg-[#F7931A]/20 top-[-10%] left-[-10%]" style={{ animationDelay: '0s' }} />
      <div className="degen-blob w-[400px] h-[400px] bg-[#CCFF00]/10 top-[20%] right-[-5%]" style={{ animationDelay: '2s' }} />
      <div className="degen-blob w-[350px] h-[350px] bg-orange-600/10 bottom-[10%] left-[30%]" style={{ animationDelay: '4s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-4 items-center">
          {/* Left — copy */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-5">
            <div className="degen-badge inline-flex items-center gap-2 bg-[#CCFF00] text-black px-4 py-1.5 text-xs sm:text-sm">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <img src={ROBINHOOD_CHAIN_LOGO} alt={CHAIN_NAME} className="w-4 h-4 rounded-full" />
              live on {CHAIN_NAME}!!!
            </div>

            <h1 className="font-bangers text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] text-white degen-headline">
              <span className="gradient-text">BLACK</span>
              <br />
              <span className="text-white">BALLS</span>
            </h1>

            <p className="text-white/75 text-lg sm:text-xl max-w-lg leading-relaxed font-medium">
              the most <span className="text-[#F7931A] font-black">stupidly bold</span> meme coin
              on {CHAIN_NAME}. no utility. no roadmap. just{' '}
              <span className="text-[#F7931A] font-black">massive balls energy</span> and diamond hands.
            </p>

            <div className="degen-card bg-[#111] p-4 w-full max-w-lg flex flex-col sm:flex-row items-center gap-3">
              <div className="flex-1 text-center sm:text-left min-w-0">
                <div className="text-white/40 text-xs uppercase tracking-widest mb-1">contract (don&apos;t fumble)</div>
                <div className="text-white font-mono text-sm font-bold break-all">{CA}</div>
              </div>
              <CopyButton text={CA} label="Snag CA" />
            </div>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <a href="#how-to-buy" className="degen-btn degen-btn-primary px-8 py-4 text-base sm:text-lg btn-press flex items-center gap-2">
                <TrendingUp size={20} />
                APE IN NOW
              </a>
              <a href="#first-500" className="degen-btn degen-btn-secondary px-8 py-4 text-base sm:text-lg btn-press flex items-center gap-2">
                Free tokens???
                <ChevronDown size={18} />
              </a>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-8 mt-2">
              {stats.map(s => (
                <div key={s.label} className="text-center lg:text-left">
                  <div className="font-bangers text-xl sm:text-2xl text-[#F7931A]">{s.value}</div>
                  <div className="text-white/35 text-xs uppercase tracking-widest">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — diamond mascot */}
          <div className="relative flex justify-center items-end">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <img src={MASCOT_BANNER} alt="" className="w-full max-w-lg opacity-20 blur-sm scale-110" aria-hidden="true" />
            </div>
            <div className="relative w-full max-w-md lg:max-w-lg mascot-wrapper">
              <img
                src={MASCOT_HERO}
                alt="BlackBalls mascot with diamond hands"
                className="w-full h-auto object-contain mascot-zoom mascot-glow"
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 degen-badge bg-[#F7931A] text-black px-4 py-1 text-xs whitespace-nowrap wobble">
                💎 diamond nuts 💎
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const { ref, visible } = useInView();

  const cards = [
    {
      icon: <Flame className="text-[#F7931A]" size={28} />,
      title: 'Born Unhinged',
      body: 'BlackBalls didn\'t ask for permission. It crawled out of the Robinhood Chain memecoin swamp with zero plan and maximum confidence.',
    },
    {
      icon: <Zap className="text-[#F7931A]" size={28} />,
      title: 'Chart Go Brrr',
      body: 'We don\'t do financial advice. We do vibes. Early apes get the full send treatment. Late apes get the "should\'ve listened" treatment.',
    },
    {
      icon: <Shield className="text-[#F7931A]" size={28} />,
      title: 'Diamond Nut Energy',
      body: 'Zero tax. Zero rug. Zero brain cells required. Just pure, uncut meme coin for people who hold like their life depends on it.',
    },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a]" />
      <div className="orange-divider absolute top-0 left-0" />
      <div className="degen-blob w-[300px] h-[300px] bg-[#F7931A]/15 top-[20%] right-[-5%]" />

      <div ref={ref} className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-12 sm:mb-16">
          <span className="degen-badge inline-block bg-black text-[#F7931A] border-[#F7931A] px-4 py-1 text-xs mb-4">wtf is this?</span>
          <h2 className="font-bangers text-5xl sm:text-6xl md:text-7xl text-white degen-headline">
            MEET <span className="gradient-text">THE BALLS</span>
          </h2>
          <p className="text-white/55 text-base sm:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
            one mascot. one chain. infinite stupidity. the bravest (or dumbest) holders on {CHAIN_NAME}.
          </p>
        </div>

        {/* Mascot hero feature */}
        <div className="degen-card bg-gradient-to-br from-[#1a0d00] to-[#111] p-6 sm:p-10 mb-10 sm:mb-14 flex flex-col md:flex-row items-center gap-6 sm:gap-10">
          <div className="flex-shrink-0 w-48 sm:w-56 md:w-64">
            <img src={MASCOT_FULL} alt="BlackBalls mascot full body" className="w-full object-contain float mascot-glow" />
          </div>
          <div className="text-center md:text-left">
            <div className="text-[#F7931A] text-xs font-black uppercase tracking-widest mb-2">your new financial advisor</div>
            <h3 className="font-bangers text-3xl sm:text-4xl text-white mb-3 degen-headline">THE MUSCLE BALLS MAN</h3>
            <p className="text-white/60 leading-relaxed mb-4">
              jacked body. balls for a head. diamond gloves. he doesn&apos;t know what a whitepaper is
              and he doesn&apos;t care. he just knows the chart needs to go up.
            </p>
            <p className="text-white/40 text-sm italic">
              &ldquo;buy the balls. hold the balls. become the balls.&rdquo; — him, probably
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
          {cards.map((c, i) => (
            <div
              key={i}
              className="degen-card bg-[#111] p-6 sm:p-8"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="bg-[#F7931A]/15 w-14 h-14 rounded-xl flex items-center justify-center mb-5 border-2 border-[#F7931A]/30">
                {c.icon}
              </div>
              <h3 className="font-bangers text-xl sm:text-2xl text-white mb-2">{c.title}</h3>
              <p className="text-white/55 text-sm leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Tokenomics() {
  const { ref, visible } = useInView();

  return (
    <section id="ballsvibe" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#0d0d0d]" />
      <div className="orange-divider absolute top-0 left-0" />

      <div ref={ref} className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-12">
          <span className="degen-badge inline-block bg-[#F7931A] text-black px-4 py-1 text-xs mb-4">no tokenomics. just vibes.</span>
          <h2 className="font-bangers text-5xl sm:text-6xl md:text-7xl text-white degen-headline">
            BALLS <span className="gradient-text">VIBE</span>
          </h2>
        </div>

        <div className="degen-card bg-[#111] p-8 sm:p-12 text-center max-w-4xl mx-auto">
          <img src={MASCOT_FULL} alt="" className="w-24 h-24 object-cover object-top rounded-full mx-auto mb-6 border-3 border-[#F7931A] degen-shadow float" aria-hidden="true" />
          <h3 className="font-bangers text-2xl sm:text-3xl text-white mb-6">blackballs is not a project. it&apos;s a movement.</h3>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-5">
            we&apos;re not building a protocol. we&apos;re building a cult with better memes.
            late-night energy, unhinged community spirit, and {CHAIN_NAME} fire all in one stupid package.
          </p>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-5">
            every holder is part of the lore. every meme is fuel. every pre-launch moment
            is proof the degens are already winning before the token even drops.
          </p>
          <p className="text-[#F7931A] font-black text-lg sm:text-xl uppercase tracking-wide">
            stay close. stay hyped. the biggest balls drop on {CHAIN_NAME} is coming.
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
      body: 'Download Phantom wallet. Robinhood Chain is already live in Phantom — no weird setup, no 47-step tutorial. Just install and go.',
      icon: <Wallet size={24} className="text-[#F7931A]" />,
    },
    {
      num: '02',
      title: 'Switch to Robinhood Chain',
      body: 'Open Phantom → pick Robinhood Chain from the network list. That\'s it. You\'re on the chain. Welcome to degen paradise.',
      icon: <Shield size={24} className="text-[#F7931A]" />,
    },
    {
      num: '03',
      title: 'Get Some ETH',
      body: 'Bridge ETH into Robinhood Chain via Phantom, or buy directly. You need gas money. Even balls need fuel.',
      icon: <TrendingUp size={24} className="text-[#F7931A]" />,
    },
    {
      num: '04',
      title: 'Swap for $BLACKBALLS',
      body: 'Open Uniswap in Phantom, paste the CA, set slippage to 1-3%, smash swap. Congratulations — you now have balls.',
      icon: <Zap size={24} className="text-[#F7931A]" />,
    },
  ];

  return (
    <section id="how-to-buy" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      <div className="orange-divider absolute top-0 left-0" />
      <div className="degen-blob w-[400px] h-[400px] bg-[#CCFF00]/8 bottom-0 left-[-10%]" />

      <div ref={ref} className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-12 sm:mb-16">
          <span className="degen-badge inline-block bg-black text-white border-white/30 px-4 py-1 text-xs mb-4">ez mode activated</span>
          <h2 className="font-bangers text-5xl sm:text-6xl md:text-7xl text-white degen-headline">
            HOW TO <span className="gradient-text">APE</span>
          </h2>
          <p className="text-white/55 text-base sm:text-lg max-w-xl mx-auto mt-4">
            4 steps. phantom wallet. robinhood chain. zero excuses.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-12 sm:mb-16">
          {steps.map((s, i) => (
            <div
              key={i}
              className="degen-card relative bg-[#111] p-6"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="font-bangers text-5xl sm:text-6xl text-[#F7931A]/10 absolute top-3 right-4 leading-none select-none">{s.num}</div>
              <div className="bg-[#F7931A]/15 w-12 h-12 rounded-xl flex items-center justify-center mb-4 border-2 border-[#F7931A]/25">
                {s.icon}
              </div>
              <h3 className="font-bangers text-lg sm:text-xl text-white mb-2">{s.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="degen-card bg-gradient-to-r from-[#F7931A]/15 via-[#111] to-[#F7931A]/15 p-8 sm:p-12 text-center">
          <div className="font-bangers text-3xl sm:text-4xl md:text-5xl text-white mb-2 degen-headline">Contract Address</div>
          <p className="text-white/40 text-sm mb-6">copy this. verify it. don&apos;t get rugged by a fake.</p>
          <div className="degen-input bg-black/60 p-4 sm:p-6 max-w-2xl mx-auto mb-6">
            <p className="font-mono text-[#F7931A] text-sm sm:text-lg break-all font-bold">{CA}</p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <CopyButton text={CA} label="Snag CA" />
            <a href={CHAIN_EXPLORER} target="_blank" rel="noopener noreferrer" className="degen-btn degen-btn-secondary px-6 py-2.5 text-sm btn-press flex items-center gap-2">
              <ExternalLink size={16} />
              Blockscout
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
      name: 'X / Twitter',
      handle: X_HANDLE,
      href: X_PROFILE_URL,
      desc: 'memes, alpha, and unhinged posting. follow or stay poor.',
      color: 'from-[#000] to-[#111]',
      border: 'border-white/20 hover:border-white/40',
      iconColor: 'text-white',
      bg: 'bg-black',
    },
    {
      icon: <Send size={28} />,
      name: 'Telegram',
      handle: TELEGRAM_URL.replace('https://', ''),
      href: TELEGRAM_URL,
      desc: 'the war room. news drops first. degeneracy guaranteed.',
      color: 'from-[#001a1a] to-[#111]',
      border: 'border-cyan-500/20 hover:border-cyan-500/50',
      iconColor: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
    },
  ];

  return (
    <section id="community" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#0d0d0d]" />
      <div className="orange-divider absolute top-0 left-0" />

      <div ref={ref} className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-12 sm:mb-16">
          <span className="degen-badge inline-block bg-cyan-500 text-black px-4 py-1 text-xs mb-4">join the cult</span>
          <h2 className="font-bangers text-5xl sm:text-6xl md:text-7xl text-white degen-headline">
            BALLS <span className="gradient-text">ARMY</span>
          </h2>
          <p className="text-white/55 text-base sm:text-lg max-w-xl mx-auto mt-4">
            we&apos;re not a community. we&apos;re a disorder. the most legendary meme coin gang on {CHAIN_NAME}.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 max-w-3xl mx-auto mb-12 sm:mb-16">
          {socials.map((s, i) => (
            <a
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`degen-card bg-gradient-to-br ${s.color} border ${s.border} p-6 sm:p-8 flex flex-col gap-4 transition-all duration-300`}
            >
              <div className={`${s.bg} w-14 h-14 rounded-2xl flex items-center justify-center ${s.iconColor} border-2 border-white/10`}>
                {s.icon}
              </div>
              <div>
                <div className="font-bangers text-xl sm:text-2xl text-white mb-1">{s.name}</div>
                <div className={`text-sm font-mono mb-2 ${s.iconColor}`}>{s.handle}</div>
                <p className="text-white/50 text-sm">{s.desc}</p>
              </div>
              <div className={`text-sm font-black flex items-center gap-2 ${s.iconColor}`}>
                Enter the chaos <ExternalLink size={14} />
              </div>
            </a>
          ))}
        </div>

        <div className="degen-card relative bg-gradient-to-r from-[#1a0900] via-[#111] to-[#001020] p-8 sm:p-14 overflow-hidden text-center">
          <img src={MASCOT_HERO} alt="" className="absolute -right-4 sm:right-4 bottom-0 w-32 sm:w-48 opacity-30 pointer-events-none hidden sm:block" aria-hidden="true" />
          <div className="relative z-10">
            <div className="font-bangers text-4xl sm:text-5xl md:text-6xl text-white mb-3 degen-headline">
              READY TO GROW <span className="gradient-text">YOUR BALLS?</span>
            </div>
            <p className="text-white/55 text-base sm:text-lg max-w-lg mx-auto mb-8">
              stop lurking. stop coping. ape in on {CHAIN_NAME} before your friends do.
            </p>
            <a
              href="#how-to-buy"
              className="degen-btn degen-btn-primary inline-flex items-center gap-3 px-10 py-5 text-lg sm:text-xl btn-press"
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
    <footer className="relative bg-[#080808] border-t-2 border-[#F7931A]/20 py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={MASCOT_FULL} alt="BlackBalls mascot" className="w-12 h-12 rounded-full object-cover object-top border-2 border-[#F7931A] degen-shadow" />
            <div>
              <div className="font-bangers text-2xl text-white tracking-wider degen-headline">BLACKBALLS</div>
              <div className="text-white/30 text-xs flex items-center gap-1.5">
                $BLACKBALLS on {CHAIN_NAME}
                <img src={ROBINHOOD_CHAIN_LOGO} alt={CHAIN_NAME} className="w-4 h-4 rounded-full" />
              </div>
            </div>
          </div>

          <p className="text-white/25 text-xs sm:text-sm text-center max-w-xs italic">
            not financial advice. we&apos;re literally a balls mascot with no brain.
          </p>

          <div className="flex items-center gap-4">
            <a href={X_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
              <span className="sr-only">X</span>
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-cyan-400 transition-colors">
              <Send size={20} />
            </a>
          </div>
        </div>

        <div className="orange-divider my-6 sm:my-8" />

        <div className="text-center text-white/20 text-xs sm:text-sm">
          BlackBalls. Built on {CHAIN_NAME}. Powered by stupidity. 💎🥜
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Nav />
      <Ticker />
      <First500Believers />
      <Hero />
      <About />
      <Tokenomics />
      <HowToBuy />
      <Community />
      <Footer />
    </div>
  );
}
