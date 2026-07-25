import { useState, useEffect, useRef } from 'react';
import { Copy, Check, Send, ExternalLink, TrendingUp, Zap, Shield, Flame, ChevronDown, Menu, X, Wallet } from 'lucide-react';
import First500Believers from './components/First500Believers';
import LogoRain from './components/LogoRain';
import { CHAIN_NAME, CHAIN_EXPLORER, ROBINHOOD_CHAIN_LOGO, X_HANDLE, TELEGRAM_URL, X_PROFILE_URL } from './lib/constants';

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
    '$BLACKBALLS', 'BALLS OF STEEL', 'NO ROADMAP JUST VIBES', 'NUMBER GO BRRR',
    'ROBINHOOD CHAIN', 'DIAMOND NUTS', 'PHANTOM GANG', 'DEGEN ENERGY', 'HODL OR GET REKT',
  ];
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden bg-[#F7931A] py-3 ticker-meme">
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

  const links = ['First 500', 'About', 'BALLSVIBE', 'How to Buy', 'Community'];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 nav-blur ${scrolled ? 'bg-black/80 border-b border-white/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <img src="/favicon.png" alt="BlackBalls" className="w-10 h-10 rounded-full object-cover border-2 border-[#F7931A] logo-pulse" />
          <span className="font-bangers text-2xl text-white tracking-wider group-hover:text-[#F7931A] transition-colors">BLACKBALLS</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/ /g, '-')}`}
              className="text-white/70 hover:text-[#F7931A] font-medium transition-colors duration-200 text-sm uppercase tracking-wider"
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

        <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-black/95 border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g, '-')}`}
              className="text-white/80 hover:text-[#F7931A] font-medium py-2 border-b border-white/5 transition-colors"
              onClick={() => setMobileOpen(false)}>
              {l}
            </a>
          ))}
          <a href="#how-to-buy" className="meme-btn meme-btn-orange px-5 py-3 text-center mt-2"
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
    { label: 'roadmap', value: 'lol no' },
    { label: 'utility', value: 'balls of steel' },
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16 noise-bg">
      <div className="meme-blob w-[450px] h-[450px] bg-[#F7931A]/15 top-[5%] left-[-8%]" />
      <div className="meme-blob w-[350px] h-[350px] bg-[#CCFF00]/8 top-[30%] right-[-5%]" style={{ animationDelay: '3s' }} />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-[#F7931A]/5 blur-3xl" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-orange-900/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-orange-900/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col items-center text-center gap-6 mb-16">
          {/* Badge */}
          <div className="meme-badge bg-[#CCFF00] text-black px-4 py-1.5 text-xs sm:text-sm mb-1">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <img src={ROBINHOOD_CHAIN_LOGO} alt={CHAIN_NAME} className="w-4 h-4 rounded-full" />
            live on {CHAIN_NAME}!!!
          </div>

          {/* Main headline */}
          <h1 className="font-bangers text-7xl md:text-9xl lg:text-[11rem] leading-none text-white meme-headline">
            <span className="gradient-text text-glow">BLACK</span>
            <br />
            <span className="text-white">BALLS</span>
          </h1>

          {/* Logo */}
          <div className="relative my-2 wobble-slow">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden logo-pulse border-4 border-[#F7931A]">
              <img src="/favicon.png" alt="BlackBalls" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -top-2 -right-2 bg-[#CCFF00] rounded-full p-0.5 border-2 border-black/20 shadow-lg">
              <img src={ROBINHOOD_CHAIN_LOGO} alt={CHAIN_NAME} className="w-9 h-9 rounded-full object-cover" />
            </div>
          </div>

          <p className="text-white/70 text-xl md:text-2xl max-w-2xl leading-relaxed font-medium">
            the dumbest, boldest, most{' '}
            <span className="text-[#F7931A] font-black">ballsy</span> meme coin on{' '}
            {CHAIN_NAME}. no roadmap. no utility. just vibes and{' '}
            <span className="text-[#F7931A] font-black">number go brrr</span>.
          </p>

          {/* CA Box */}
          <div className="meme-card flex flex-col sm:flex-row items-center gap-3 bg-[#111] p-4 w-full max-w-xl">
            <div className="flex-1 text-center sm:text-left">
              <div className="text-white/40 text-xs uppercase tracking-widest mb-1">contract (don&apos;t fumble)</div>
              <div className="text-white font-mono text-sm font-semibold break-all">{CA}</div>
            </div>
            <CopyButton text={CA} />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#how-to-buy" className="meme-btn meme-btn-orange px-8 py-4 text-lg btn-press flex items-center gap-2">
              <TrendingUp size={20} />
              APE IN NOW
            </a>
            <a href="#first-500" className="meme-btn meme-btn-ghost px-8 py-4 text-lg btn-press flex items-center gap-2">
              free tokens???
              <ChevronDown size={20} />
            </a>
          </div>

          {/* Stats bar */}
          <div className="flex flex-wrap justify-center gap-8 mt-4">
            {stats.map(s => (
              <div key={s.label} className="text-center">
                <div className="font-bangers text-2xl text-[#F7931A]">{s.value}</div>
                <div className="text-white/40 text-xs uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mascot */}
        <div className="relative flex justify-center items-end">
          <div className="w-64 md:w-96 lg:w-[32rem] drop-shadow-[0_30px_80px_rgba(247,147,26,0.35)] mascot-wrapper">
            <img src="/images/99.png" alt="Mascot" className="w-full h-full object-contain mascot-zoom" />
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
      icon: <Flame className="text-[#F7931A]" size={32} />,
      title: 'Born Unhinged',
      body: 'BlackBalls crawled out of the Robinhood Chain swamp with zero plan and maximum confidence. when markets burn, our balls don\'t shrink.',
    },
    {
      icon: <Zap className="text-[#F7931A]" size={32} />,
      title: 'Number Go Brrr',
      body: 'not financial advice. not even financial anything. just vibes, memes, and chart lines that only go up (probably).',
    },
    {
      icon: <Shield className="text-[#F7931A]" size={32} />,
      title: 'Diamond Nut Energy',
      body: 'zero tax. zero rug. zero brain cells required. hold like your portfolio depends on it — because it kinda does.',
    },
  ];

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a]" />
      <div className="orange-divider absolute top-0 left-0" />

      <div ref={ref} className={`relative z-10 max-w-7xl mx-auto px-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <span className="meme-badge bg-[#F7931A] text-black px-4 py-1 text-xs mb-3">wtf is this?</span>
          <h2 className="font-bangers text-5xl md:text-7xl text-white mt-2 meme-headline">
            ABOUT <span className="gradient-text">BLACKBALLS</span>
          </h2>
          <p className="text-white/55 text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
            one token. one chain. infinite stupidity. the bravest (or dumbest) degens on {CHAIN_NAME}.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {cards.map((c, i) => (
            <div
              key={i}
              className="meme-card card-hover bg-[#111] p-8"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="bg-[#F7931A]/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                {c.icon}
              </div>
              <h3 className="font-bangers text-2xl text-white mb-3">{c.title}</h3>
              <p className="text-white/60 leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>

        {/* Mascot feature */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="meme-card bg-gradient-to-br from-[#1a0d00] to-[#111] overflow-hidden flex flex-col md:flex-row items-center p-8 gap-6 card-hover">
            <img src="/images/939.png" alt="FireBalls" className="w-36 h-48 object-contain float" />
            <div>
              <div className="text-[#F7931A] text-xs font-black uppercase tracking-widest mb-2">the fire one</div>
              <h3 className="font-bangers text-3xl text-white mb-3">FIRE BALLS 🔥</h3>
              <p className="text-white/55 leading-relaxed">when charts get hot, fire balls get hotter. this is the energy your portfolio is missing (or doesn&apos;t need).</p>
            </div>
          </div>

          <div className="meme-card bg-gradient-to-br from-[#00101a] to-[#111] overflow-hidden flex flex-col md:flex-row items-center p-8 gap-6 card-hover">
            <img src="/images/645.png" alt="LightningBalls" className="w-36 h-48 object-contain float-alt" />
            <div>
              <div className="text-blue-400 text-xs font-black uppercase tracking-widest mb-2">the electric one</div>
              <h3 className="font-bangers text-3xl text-white mb-3">LIGHTNING BALLS ⚡</h3>
              <p className="text-white/55 leading-relaxed">already ten steps ahead while you&apos;re still reading this. number go brrr energy only.</p>
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
      <div className="absolute inset-0 bg-[#0d0d0d]" />
      <div className="orange-divider absolute top-0 left-0" />

      <div ref={ref} className={`relative z-10 max-w-7xl mx-auto px-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <span className="meme-badge bg-black text-[#F7931A] border-[#F7931A] px-4 py-1 text-xs mb-3">no tokenomics. just vibes.</span>
          <h2 className="font-bangers text-5xl md:text-7xl text-white mt-2 meme-headline">
            BALLS <span className="gradient-text">VIBE</span>
          </h2>
        </div>

        <div className="meme-card bg-[#111] p-8 sm:p-12 text-center max-w-4xl mx-auto">
          <h3 className="font-bangers text-2xl sm:text-3xl text-white mb-6">not a project. a cult with better memes.</h3>
          <p className="text-white/55 text-base sm:text-lg leading-relaxed mb-5">
            we&apos;re not building a protocol — we&apos;re building chaos on {CHAIN_NAME}.
            late-night energy, unhinged community, and balls of steel all in one package.
          </p>
          <p className="text-white/55 text-base sm:text-lg leading-relaxed mb-5">
            every holder is part of the lore. every meme is fuel. every pre-launch moment
            proves the degens are already winning before the token drops.
          </p>
          <p className="text-[#F7931A] font-black text-lg uppercase tracking-wide">
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
      icon: <Wallet size={24} className="text-[#F7931A]" />,
    },
    {
      num: '02',
      title: 'Pick Robinhood Chain',
      body: 'Open Phantom → switch network to Robinhood Chain. One tap. Welcome to degen paradise.',
      icon: <Shield size={24} className="text-[#F7931A]" />,
    },
    {
      num: '03',
      title: 'Grab Some ETH',
      body: 'Bridge or buy ETH on Robinhood Chain. You need gas. Even balls need fuel.',
      icon: <TrendingUp size={24} className="text-[#F7931A]" />,
    },
    {
      num: '04',
      title: 'Swap for $BLACKBALLS',
      body: 'Uniswap in Phantom → paste CA → set slippage 1-3% → smash swap. You now have balls. 🥜',
      icon: <Zap size={24} className="text-[#F7931A]" />,
    },
  ];

  return (
    <section id="how-to-buy" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      <div className="orange-divider absolute top-0 left-0" />

      <div ref={ref} className={`relative z-10 max-w-7xl mx-auto px-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <span className="meme-badge bg-black text-white border-white/30 px-4 py-1 text-xs mb-3">ez mode</span>
          <h2 className="font-bangers text-5xl md:text-7xl text-white mt-2 meme-headline">
            HOW TO <span className="gradient-text">APE</span>
          </h2>
          <p className="text-white/55 text-lg max-w-xl mx-auto mt-4">
            4 steps. phantom wallet. zero excuses. let&apos;s go.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((s, i) => (
            <div
              key={i}
              className="meme-card card-hover relative bg-[#111] p-6"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="font-bangers text-6xl text-[#F7931A]/10 absolute top-4 right-6 leading-none select-none">{s.num}</div>
              <div className="bg-[#F7931A]/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                {s.icon}
              </div>
              <h3 className="font-bangers text-xl text-white mb-2">{s.title}</h3>
              <p className="text-white/55 text-sm leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>

        {/* CA prominent display */}
        <div className="meme-card bg-gradient-to-r from-[#F7931A]/15 via-[#111] to-[#F7931A]/15 p-8 md:p-12 text-center">
          <div className="font-bangers text-3xl sm:text-4xl md:text-5xl text-white mb-2 meme-headline">Contract Address</div>
          <p className="text-white/40 text-sm mb-6">copy it. verify it. don&apos;t get rugged.</p>
          <div className="meme-input bg-black/50 p-4 md:p-6 max-w-2xl mx-auto mb-6">
            <p className="font-mono text-[#F7931A] text-base md:text-lg break-all font-bold">{CA}</p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <CopyButton text={CA} />
            <a href={CHAIN_EXPLORER} target="_blank" rel="noopener noreferrer" className="meme-btn meme-btn-ghost px-6 py-2.5 text-sm btn-press flex items-center gap-2">
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
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKQAAACUCAMAAAAqEXLeAAAAZlBMVEUAAAD///+Tk5Obm5v5+fn8/Px2dnbn5+dCQkLi4uLa2trt7e3x8fG7u7u4uLjV1dUpKSmLi4s2NjalpaVJSUkwMDBtbW3BwcEUFBQZGRnPz89hYWGurq5WVlbHx8eFhYULCwsiIiJh5IRJAAAHVUlEQVR4nO1cW3vaMAxdC+FS0kEpdyiE//8n95Wx1Tq6xLKd8MJ5XBZXJPLRkWTl168nnnjiicdjPfDgc1Pkj47EtT/0GwYvLhwL2Pgqrjz8Mm7ZuowcL7Nt3FSijeZLus5cVm53mTZ+yX/v0nJX7bLyM9PGsbjqoO2+D5eRL5bvtGMqrnlqfz/vLiPHk3QTd2dxyXPMrW8uK8/7ZCN/iwvOo/z82JNbforLxb6akcvIl0ROl52/jnafk8vINLccDaW1bIIkWMxdVh4av40r0cbKiIYME8ZfwxAYJU5uGyey37+6Ftng7YPN6AcXjBMjp43Kq/rtXAalxtsivHqBZzl2cvpBtHHrZbM9So0tuYz08dY41t4pBOln3CW+UuovGNA8bCkLwlkKSRxxFaIeJ/AbqhbhEkAmSK/H3IE/mPLhCNxytopclu3JG4aJArrB+E8jP3PLuFXTFKQBZEvqeLhFo9hyVYIgCVBq0KC1gt8Q45YKQfqjQQD0cep46JbD1v15TVeQBpDRqOOhW07bmE7O8w6LlttasDP5cOd0S5kg83NO3IxUp6zwN5gqRk6x4xWkDlTANSFdZPyhwZaygqyL1EFQAU/J1Xi2nIg2ZhAkAToekRoNJpfbRl5lJZN4a4odCVyeuiXqY0VcX+UcNIsgCdAtK+J4X/iHxc0qK8hMgiRAx5utw6u4acdrtsBOrjhM2X/MAOPD9zCB32MY4VmAkmLHCqc4TExOv6IQQblwEW2c5dWROJjjEfl3RHahfx5j/F84UuxYsDBN4gRL28LNo6gzT4odC5Qah711Ndi2a5nEMxSkjiW6JaE43S2XHShIHcwtSUXgCH5X351Wq0GmFwxtfKAdZHugPr6nbTJB5ipIHTuUrPPwKgvih+9/VVLs/K6FDnRLytqCWyo1yNIEScDIhNAIT9uUFLs8QRLgk6lJYMMgPpMJspCC1MGkhsmWIkopSAOmW+7lvgxBRJMmG6xKQtxy09q4mGsLF8UGohzdBm2Ni35s5G45Ju/PdsvCClJHgwqY5ABm46IqkGJHwlbASmnvG10TJAFydEUUsO6WXShIHcjaNYnFWj+tEwVpAPXX4RpcLNSkyQbrmBG3FFtyh64UpI4V5lZEAQvCYt70bqMgJggDMrec9kc+IVhiForta1LRvzzY9iAbA3tR7hZpIazwlRI7kC2TmnIFgMWTmnA6hvh5Z7mXDVYDDtkyoozVC1hrgtixQHfoM3IHWKPGJakBnpUzT/J1iAvElha3vGrrdAuWmBEFbLJUj8B6/bkJLu7RHR7Flig1iFtif6nb2oUOOzGzD8X0B6aAiR3Ilu+PMZK1aEhixoJ450UWGWvcPETyYBmrTMPTD2w+VGQToztMm8dYaSdmrFP1EBuvLPMim3iNIb7vtPEbe6EuTtwSWeoRbCnm2WQTs4SodxtjhhfYEcIeipQh5JMVoMRZp6rfios8YHF7WuF/+8KfUmIAJRZKc/MG0y3H/QXxiXW6nypgdMv3picbF/YEwjTkdBY8e+hC3CA3N39ApAbm6VU/bNl+sJ88LdYi7bLD+A8RA2VDIjVY5777amDUGAfpmC2QLTt3SwzI90eH24M0btZIqh27pdxkqF5Z547UgLGvnzMXFQG5EXJqS8xij9+VgEKQt0jITiqRTYw3Zo7rWZDP5t7LKHiRtCaw6F91lvLIBPmvLr5GoU4UMD7oaUftRpkgf87msgFNIjXwF6bMRbVDOXoW8DY+LXIAvemDLdkhJmajUAMOj1Ti6FVVvowVdTxuYaaxyQMosWCK6y+w8rhElzDdsvB5AuZQso1CWkEUsLn/c6FNdwl1ZnbgMuR0DKrDkm6pEGTUeWiigNEtS8wW3KEMWMh+35itiaxxPQsyQap6i43rhG65Q7csFMTlk0kGy7E0NnzkOIDiGNczkDDdZR64xM59XYAtFXVmkscCVSdxy/JsqZz+2Np3odQg77TBB53di5JT7NazuezAZUg1bAAl0y2V4QU+ioHAfIEMFeFcVNW+ngFFQUZk9w26MnmnJXtROd8HMN2Sde7TgzgedL8jMt6ykaPQLdfYmkytrirn+KIFNVLNW+h5+ACqNLZU1Fn8i2EdFHIrumXSgRLlKygeTmMn20iUYvUCv41Sk+bFK1rYgcvwnS7wJ/jZUiZI79EzJsyIAjYHPyIgN2ncdSY220EUMIYlWUSrkAmy8vc3zG9BsAEUV4uUDajdMEwJsSwCkkiQwZbKB1TS+JYp4OPkP5b4xuK/5VB2uot9C2I2DYAxLTaIa+eHmzQjtbqrgsgpW7kGeU7XKb7PTkV17mWCrHO6GjKfKagj3FJJsfNyeNdnp9rPrspNmtQPqPxHxFDRD9rcUhn+ya7YGNMbAmwxqDVpcm10fg3NLmPJnwk8NflGOt1S36YKQZY5c8RGjkzo9QLlAyqFWqrKpyYUaGUs+YWUa0673FLuRTVKil2wNe378Kr0cBYfrxJKnpDZy39CxqDPszlPPPHEI/AH9PRcZ7TntlcAAAAASUVORK5CYII="
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
      <div className="absolute inset-0 bg-[#0d0d0d]" />
      <div className="orange-divider absolute top-0 left-0" />

      <div ref={ref} className={`relative z-10 max-w-7xl mx-auto px-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <span className="meme-badge bg-cyan-500 text-black px-4 py-1 text-xs mb-3">join the cult</span>
          <h2 className="font-bangers text-5xl md:text-7xl text-white mt-2 meme-headline">
            BALLS <span className="gradient-text">ARMY</span>
          </h2>
          <p className="text-white/55 text-lg max-w-xl mx-auto mt-4">
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
              className={`meme-card card-hover bg-gradient-to-br ${s.color} border ${s.border} p-8 flex flex-col gap-4 transition-all duration-300`}
            >
              <div className={`${s.bg} w-16 h-16 rounded-2xl flex items-center justify-center ${s.iconColor}`}>
                {s.icon}
              </div>
              <div>
                <div className="font-bangers text-2xl text-white mb-1">{s.name}</div>
                <div className={`text-sm font-mono mb-3 ${s.iconColor}`}>{s.handle}</div>
                <p className="text-white/55 text-sm">{s.desc}</p>
              </div>
              <div className={`text-sm font-semibold flex items-center gap-2 ${s.iconColor}`}>
                Enter the chaos <ExternalLink size={14} />
              </div>
            </a>
          ))}
        </div>

        {/* Mascots CTA */}
        <div className="meme-card relative bg-gradient-to-r from-[#1a0900] via-[#111] to-[#001020] p-8 md:p-16 overflow-hidden text-center">
          <div className="relative z-10">
            <div className="font-bangers text-4xl sm:text-5xl md:text-7xl text-white mb-4 meme-headline">
              READY TO GROW <span className="gradient-text">YOUR BALLS?</span>
            </div>
            <p className="text-white/55 text-lg max-w-xl mx-auto mb-8">
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
    <footer className="relative bg-[#080808] border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/favicon.png" alt="BlackBalls" className="w-10 h-10 rounded-full object-cover border-2 border-[#F7931A]" />
            <div>
              <div className="font-bangers text-2xl text-white tracking-wider">BLACKBALLS</div>
              <div className="text-white/30 text-xs flex items-center gap-1.5">
                $BLACKBALLS on {CHAIN_NAME}
                <img src={ROBINHOOD_CHAIN_LOGO} alt={CHAIN_NAME} className="w-4 h-4 rounded-full object-cover inline" />
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-white/25 text-xs sm:text-sm max-w-xs italic">
              not financial advice. we&apos;re literally balls on a blockchain.
            </p>
          </div>

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

        <div className="orange-divider my-8" />

        <div className="text-center text-white/20 text-sm">
          BlackBalls. Built on {CHAIN_NAME}. Powered by stupidity. 💎🥜
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] relative">
      <LogoRain />
      <div className="relative z-[2]">
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
    </div>
  );
}
