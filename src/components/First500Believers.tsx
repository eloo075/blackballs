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
    text: 'Like + RT the launch post (actually do it)',
    link: LAUNCH_POST_URL,
    linkLabel: 'smash that post',
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
    text: 'Drop your wallet (0x... only)',
    icon: <Wallet size={18} className="text-[#F7931A]" />,
    accent: 'from-[#F7931A]/15 to-transparent',
  },
  {
    num: 5,
    text: 'Optional: X handle (so we know who you are)',
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
      invalid_wallet: 'Fake wallet detected. Drop a real 0x address, degen.',
      duplicate: 'Already claimed. Nice try, ballsy.',
      full: '500/500 gone. You slept. Skill issue.',
      network: 'Something broke. Blame the chain, retry.',
      already_submitted: 'You already qualified. Patience.',
    };
    setError(messages[result.error] ?? 'Submission failed. Please try again.');
  };

  return (
    <section
      id="first-500"
      className="relative pt-28 pb-16 overflow-hidden believers-section"
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#F7931A]/8 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-cyan-500/5 blur-[100px] rounded-full" />
        <div className="cyber-grid absolute inset-0 opacity-30" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Banner */}
        <div className="meme-card believers-banner relative overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0d00] via-[#0d0d0d] to-[#001018]" />

          <div className="relative px-6 py-8 sm:px-10 sm:py-10 text-center">
            <div className="meme-badge inline-flex items-center gap-2 bg-red-500 text-white px-4 py-1 text-xs mb-4">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              live drop!!!
              <Sparkles size={12} className="animate-pulse" />
            </div>

            <h2 className="font-bangers text-3xl sm:text-5xl md:text-6xl text-white leading-tight mb-2 meme-headline">
              FIRST 500 <span className="gradient-text">BALLS</span>
            </h2>
            <p className="text-base sm:text-xl font-black text-white/90 mb-1">
              free <span className="text-[#F7931A]">$BLACKBALLS</span> for early degens 🥜
            </p>
            <p className="text-white/45 text-sm max-w-md mx-auto">
              do the tasks. drop wallet. get tokens before normies wake up. FOMO is real.
            </p>

            <div className="mt-6 max-w-md mx-auto">
              <div className="flex justify-between text-xs uppercase tracking-widest mb-2 font-black">
                <span className="text-[#F7931A]">{count} / {MAX_BELIEVERS} aped in</span>
                <span className="text-cyan-400">{spotsLeft} left</span>
              </div>
              <div className="h-4 bg-black/60 rounded-full overflow-hidden border-2 border-black" style={{ boxShadow: '3px 3px 0 #000' }}>
                <div
                  className="h-full bg-gradient-to-r from-[#F7931A] via-[#ffb347] to-[#CCFF00] rounded-full transition-all duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-white/30 text-xs mt-2 italic">number go brrr...</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Steps */}
          <div className="space-y-3">
            <h3 className="font-bangers text-2xl text-white mb-3 flex items-center gap-2 meme-headline">
              <Zap size={22} className="text-[#F7931A]" />
              how to qualify (ez)
            </h3>
            {STEPS.map((step) => (
              <div
                key={step.num}
                className={`meme-card believers-step flex items-start gap-3 bg-[#111] p-4 bg-gradient-to-r ${step.accent}`}
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#F7931A] border-2 border-black flex items-center justify-center font-bangers text-lg text-black" style={{ boxShadow: '2px 2px 0 #000' }}>
                  {step.num}
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    {step.icon}
                    <span className="text-white/90 text-sm sm:text-base font-medium">
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
                      className="inline-flex items-center gap-1.5 mt-2 text-xs sm:text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-semibold"
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
          <div className="meme-card believers-form bg-[#111] p-6 sm:p-8">
            {qualified ? (
              <div className="flex flex-col items-center justify-center text-center py-6 sm:py-10 gap-5">
                <img src="/favicon.png" alt="Qualified" className="w-20 h-20 rounded-full border-3 border-[#F7931A] believers-success-pulse" style={{ boxShadow: '4px 4px 0 #F7931A' }} />
                <div>
                  <h3 className="font-bangers text-3xl sm:text-4xl text-white mb-2 meme-headline">
                    YOU&apos;RE <span className="gradient-text">IN!!!</span>
                  </h3>
                  <p className="text-white/65 text-base max-w-sm mx-auto">
                    free <span className="text-[#F7931A] font-black">$BLACKBALLS</span> incoming.
                    don&apos;t paper hand before they arrive.
                  </p>
                </div>
                <div className="text-white/40 text-xs font-mono break-all max-w-full px-2">
                  {wallet}
                </div>
              </div>
            ) : (
              <>
                <h3 className="font-bangers text-2xl text-white mb-1 meme-headline">drop your wallet</h3>
                <p className="text-white/45 text-sm mb-5">
                  finish steps 1–3 or the balls god rejects you.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="wallet" className="block text-white/60 text-xs uppercase tracking-widest mb-2">
                      Wallet Address <span className="text-[#F7931A]">*</span>
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
                        className="meme-input w-full bg-black/50 pl-11 pr-4 py-3.5 text-white placeholder:text-white/20 font-mono text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="username" className="block text-white/60 text-xs uppercase tracking-widest mb-2">
                      X Username <span className="text-white/30">(optional)</span>
                    </label>
                    <div className="relative">
                      <AtSign size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                      <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="@YourHandle"
                        className="meme-input w-full bg-black/50 pl-11 pr-4 py-3.5 text-white placeholder:text-white/20 text-sm"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-300 text-sm">
                      <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                      {error}
                    </div>
                  )}

                  {spotsLeft === 0 && (
                    <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-3 text-amber-300 text-sm">
                      <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                      All 500 spots gone. Skill issue.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading || spotsLeft === 0}
                    className="meme-btn meme-btn-orange w-full py-4 text-lg btn-press flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
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
                  <p className="mt-4 text-white/25 text-xs text-center">
                    Demo mode: submissions stored locally. Configure Supabase for production.
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
