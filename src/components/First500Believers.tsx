import { useState, useEffect, FormEvent } from 'react';
import {
  Sparkles,
  Heart,
  Repeat2,
  UserPlus,
  MessageCircle,
  Wallet,
  AtSign,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Zap,
} from 'lucide-react';
import {
  LAUNCH_POST_URL,
  X_HANDLE,
  X_PROFILE_URL,
  TELEGRAM_URL,
  MAX_BELIEVERS,
  MASCOT_FULL,
  CHAIN_NAME,
} from '../lib/constants';
import {
  getSubmissionCount,
  getLocalSubmittedWallet,
  submitBeliever,
  usingRemoteStorage,
} from '../lib/believers';

const STEPS = [
  {
    num: 1,
    text: 'Like + RT the launch post (yes, actually do it)',
    link: LAUNCH_POST_URL,
    linkLabel: 'go smash that post',
    icon: <Heart size={18} className="text-pink-400" />,
    accent: 'from-pink-500/15 to-transparent',
  },
  {
    num: 2,
    text: `Follow ${X_HANDLE} (we post bangers)`,
    link: X_PROFILE_URL,
    linkLabel: X_HANDLE,
    icon: <UserPlus size={18} className="text-cyan-400" />,
    accent: 'from-cyan-500/15 to-transparent',
  },
  {
    num: 3,
    text: 'Join the Telegram war room',
    link: TELEGRAM_URL,
    linkLabel: 'enter the chaos',
    icon: <MessageCircle size={18} className="text-cyan-400" />,
    accent: 'from-cyan-500/15 to-transparent',
  },
  {
    num: 4,
    text: 'Drop your wallet (0x... format)',
    icon: <Wallet size={18} className="text-[#F7931A]" />,
    accent: 'from-[#F7931A]/15 to-transparent',
  },
  {
    num: 5,
    text: 'Optional: your X handle (so we know who you are)',
    icon: <AtSign size={18} className="text-white/60" />,
    accent: 'from-white/5 to-transparent',
    optional: true,
  },
];

export default function First500Believers() {
  const [wallet, setWallet] = useState('');
  const [username, setUsername] = useState('');
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [qualified, setQualified] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = getLocalSubmittedWallet();
    if (stored) {
      setWallet(stored);
      setQualified(true);
    }
    getSubmissionCount()
      .then(setCount)
      .catch(() => setCount(0));
  }, []);

  const spotsLeft = Math.max(0, MAX_BELIEVERS - count);
  const progress = Math.min(100, (count / MAX_BELIEVERS) * 100);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await submitBeliever(wallet, username);
    setLoading(false);

    if (result.ok) {
      setQualified(true);
      try {
        setCount(await getSubmissionCount());
      } catch {
        setCount((c) => Math.min(MAX_BELIEVERS, c + 1));
      }
      return;
    }

    const messages: Record<string, string> = {
      invalid_wallet: 'That wallet looks fake. Drop a real 0x address, degen.',
      duplicate: 'This wallet already claimed. Nice try, ballsy.',
      full: 'All 500 spots gone. You slept. We won.',
      network: 'Something broke. Blame the chain, try again.',
      already_submitted: 'You already qualified. Patience, ball holder.',
    };
    setError(messages[result.error] ?? 'Submission failed. Try again.');
  };

  return (
    <section id="first-500" className="relative pt-24 sm:pt-28 pb-16 overflow-hidden believers-section">
      <div className="absolute inset-0 pointer-events-none">
        <div className="degen-blob w-[600px] h-[400px] bg-[#F7931A]/10 top-0 left-1/2 -translate-x-1/2" />
        <div className="degen-blob w-[300px] h-[300px] bg-pink-500/5 bottom-0 right-0" style={{ animationDelay: '3s' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Banner with mascot peek */}
        <div className="degen-card believers-banner relative overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0d00] via-[#0d0d0d] to-[#001018]" />

          <div className="relative flex flex-col sm:flex-row items-center gap-4 sm:gap-6 px-6 py-8 sm:px-10 sm:py-10">
            <div className="flex-shrink-0 hidden sm:block w-28 lg:w-36 -mb-4 self-end">
              <img src={MASCOT_FULL} alt="BlackBalls mascot" className="w-full object-contain float mascot-glow" />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="degen-badge inline-flex items-center gap-2 bg-red-500 text-white px-4 py-1 text-xs mb-4">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                live drop!!!
                <Sparkles size={12} />
              </div>

              <h2 className="font-bangers text-3xl sm:text-5xl md:text-6xl text-white leading-tight mb-2 degen-headline">
                FIRST 500 <span className="gradient-text">BALLS</span>
              </h2>
              <p className="text-base sm:text-xl font-black text-white/90 mb-1">
                free <span className="text-[#F7931A]">$BLACKBALLS</span> for early degens
              </p>
              <p className="text-white/45 text-sm max-w-md">
                do the tasks. drop your wallet. get free tokens before the normies wake up.
              </p>

              <div className="mt-6 max-w-md mx-auto sm:mx-0">
                <div className="flex justify-between text-xs uppercase tracking-widest mb-2 font-black">
                  <span className="text-[#F7931A]">{count} / {MAX_BELIEVERS} aped in</span>
                  <span className="text-cyan-400">{spotsLeft} spots left</span>
                </div>
                <div className="h-4 bg-black/60 rounded-full overflow-hidden border-2 border-black degen-shadow">
                  <div
                    className="h-full bg-gradient-to-r from-[#F7931A] via-[#ffb347] to-[#CCFF00] rounded-full transition-all duration-700"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-white/30 text-xs mt-2 italic">FOMO loading...</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Steps */}
          <div className="space-y-3">
            <h3 className="font-bangers text-2xl text-white mb-3 flex items-center gap-2 degen-headline">
              <Zap size={22} className="text-[#F7931A]" />
              how to qualify (ez)
            </h3>
            {STEPS.map((step) => (
              <div
                key={step.num}
                className={`degen-card believers-step flex items-start gap-3 sm:gap-4 bg-[#111] p-4 bg-gradient-to-r ${step.accent}`}
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#F7931A] border-2 border-black flex items-center justify-center font-bangers text-lg text-black degen-shadow">
                  {step.num}
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    {step.icon}
                    <span className="text-white/90 text-sm font-medium">
                      {step.text}
                      {step.optional && (
                        <span className="ml-1 text-white/35 text-xs">(optional lol)</span>
                      )}
                    </span>
                  </div>
                  {step.link && (
                    <a
                      href={step.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-2 text-xs sm:text-sm text-cyan-400 hover:text-cyan-300 font-black transition-colors"
                    >
                      {step.num === 1 && <Repeat2 size={14} />}
                      {step.linkLabel}
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="degen-card believers-form bg-[#111] p-6 sm:p-8">
            {qualified ? (
              <div className="flex flex-col items-center justify-center text-center py-6 sm:py-10 gap-5">
                <img src={MASCOT_FULL} alt="Qualified!" className="w-24 h-24 object-cover object-top rounded-full border-3 border-[#F7931A] degen-shadow believers-success-pulse" />
                <div>
                  <h3 className="font-bangers text-3xl sm:text-4xl text-white mb-2 degen-headline">
                    YOU&apos;RE <span className="gradient-text">IN!!!</span>
                  </h3>
                  <p className="text-white/65 text-base max-w-sm mx-auto leading-relaxed">
                    free <span className="text-[#F7931A] font-black">$BLACKBALLS</span> incoming.
                    don&apos;t paper hand before they even arrive.
                  </p>
                </div>
                <div className="degen-input bg-black/40 px-4 py-2 text-white/40 text-xs font-mono break-all max-w-full">
                  {wallet}
                </div>
              </div>
            ) : (
              <>
                <h3 className="font-bangers text-2xl text-white mb-1 degen-headline">drop your wallet</h3>
                <p className="text-white/45 text-sm mb-5">
                  finish steps 1–3 first or the balls god will reject you.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="wallet" className="block text-white/50 text-xs uppercase tracking-widest mb-2 font-black">
                      Wallet (0x...) <span className="text-[#F7931A]">*</span>
                    </label>
                    <div className="relative">
                      <Wallet size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#F7931A]/60" />
                      <input
                        id="wallet"
                        type="text"
                        value={wallet}
                        onChange={(e) => setWallet(e.target.value)}
                        placeholder="0xYourWalletAddress"
                        required
                        className="degen-input w-full bg-black/50 pl-11 pr-4 py-3.5 text-white placeholder:text-white/20 font-mono text-sm"
                      />
                    </div>
                    <p className="text-white/25 text-xs mt-1.5">{CHAIN_NAME} · Phantom ready</p>
                  </div>

                  <div>
                    <label htmlFor="username" className="block text-white/50 text-xs uppercase tracking-widest mb-2 font-black">
                      X Handle <span className="text-white/25">(optional)</span>
                    </label>
                    <div className="relative">
                      <AtSign size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                      <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="@YourHandle"
                        className="degen-input w-full bg-black/50 pl-11 pr-4 py-3.5 text-white placeholder:text-white/20 text-sm"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-start gap-2 bg-red-500/10 border-2 border-red-500/40 rounded-xl px-4 py-3 text-red-300 text-sm degen-shadow">
                      <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                      {error}
                    </div>
                  )}

                  {spotsLeft === 0 && (
                    <div className="flex items-start gap-2 bg-amber-500/10 border-2 border-amber-500/40 rounded-xl px-4 py-3 text-amber-300 text-sm">
                      <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                      500/500 filled. you missed it. skill issue.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading || spotsLeft === 0}
                    className="degen-btn degen-btn-primary w-full py-4 text-lg btn-press flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <span className="believers-spinner w-5 h-5 border-2 border-black/30 border-t-black rounded-full" />
                        checking your balls...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={20} />
                        verify &amp; qualify 🥜
                      </>
                    )}
                  </button>
                </form>

                {!usingRemoteStorage() && (
                  <p className="mt-3 text-white/20 text-xs text-center">
                    demo mode — configure Supabase for real storage
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
