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
    text: 'Like + Retweet our launch post',
    link: LAUNCH_POST_URL,
    linkLabel: 'Open launch post',
    icon: <Heart size={18} className="text-pink-400" />,
    accent: 'from-pink-500/20 to-transparent',
  },
  {
    num: 2,
    text: `Follow ${X_HANDLE}`,
    link: X_PROFILE_URL,
    linkLabel: X_HANDLE,
    icon: <UserPlus size={18} className="text-cyan-400" />,
    accent: 'from-cyan-500/20 to-transparent',
  },
  {
    num: 3,
    text: 'Join our Telegram group',
    link: TELEGRAM_URL,
    linkLabel: 'Join Telegram',
    icon: <MessageCircle size={18} className="text-cyan-400" />,
    accent: 'from-cyan-500/20 to-transparent',
  },
  {
    num: 4,
    text: 'Submit your wallet address',
    icon: <Wallet size={18} className="text-[#F7931A]" />,
    accent: 'from-[#F7931A]/20 to-transparent',
  },
  {
    num: 5,
    text: 'Optional: Your X username',
    icon: <AtSign size={18} className="text-white/60" />,
    accent: 'from-white/10 to-transparent',
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
      invalid_wallet: 'Please enter a valid EVM wallet address (0x...).',
      duplicate: 'This wallet has already been registered.',
      full: 'All 500 spots have been claimed. Stay tuned for the next drop!',
      network: 'Something went wrong. Please try again.',
      already_submitted: 'You have already qualified with this wallet.',
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
        <div className="believers-banner relative rounded-3xl overflow-hidden mb-8 scanlines">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0d00] via-[#0d0d0d] to-[#001018]" />
          <div className="absolute inset-0 border border-[#F7931A]/40 rounded-3xl believers-border-glow" />

          <div className="relative px-6 py-10 sm:px-10 sm:py-12 text-center">
            <div className="inline-flex items-center gap-2 bg-[#F7931A]/15 border border-[#F7931A]/40 rounded-full px-4 py-1.5 text-[#F7931A] text-xs sm:text-sm font-bold uppercase tracking-[0.2em] mb-5">
              <Sparkles size={14} className="animate-pulse" />
              Limited Drop
              <Sparkles size={14} className="animate-pulse" />
            </div>

            <h2 className="font-bangers text-3xl sm:text-5xl md:text-6xl text-white leading-tight mb-3">
              FIRST 500 <span className="gradient-text text-glow">BELIEVERS</span>
            </h2>
            <p className="text-lg sm:text-2xl font-bold text-white/90 mb-2">
              Get Free <span className="text-[#F7931A]">$BLACKBALLS</span> Beta Tokens
            </p>
            <p className="text-white/50 text-sm sm:text-base max-w-xl mx-auto">
              Complete the steps below, submit your wallet, and secure your spot before they&apos;re gone.
            </p>

            {/* Spots counter */}
            <div className="mt-8 max-w-md mx-auto">
              <div className="flex justify-between text-xs uppercase tracking-widest mb-2">
                <span className="text-[#F7931A] font-bold">{count} / {MAX_BELIEVERS} claimed</span>
                <span className="text-cyan-400/80">{spotsLeft} spots left</span>
              </div>
              <div className="h-2.5 bg-black/60 rounded-full overflow-hidden border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-[#F7931A] via-[#ffb347] to-cyan-400 rounded-full transition-all duration-700 believers-progress"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Steps */}
          <div className="space-y-3">
            <h3 className="font-bangers text-2xl text-white mb-4 flex items-center gap-2">
              <Zap size={22} className="text-[#F7931A]" />
              HOW TO QUALIFY
            </h3>
            {STEPS.map((step) => (
              <div
                key={step.num}
                className={`believers-step flex items-start gap-4 bg-[#111]/80 border border-white/5 hover:border-[#F7931A]/25 rounded-xl p-4 transition-all duration-300 bg-gradient-to-r ${step.accent}`}
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#F7931A]/15 border border-[#F7931A]/30 flex items-center justify-center font-bangers text-lg text-[#F7931A]">
                  {step.num}
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    {step.icon}
                    <span className="text-white/90 text-sm sm:text-base font-medium">
                      {step.text}
                      {step.optional && (
                        <span className="ml-2 text-white/40 text-xs uppercase tracking-wider">(optional)</span>
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
          <div className="believers-form bg-[#111]/90 border border-[#F7931A]/20 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            {qualified ? (
              <div className="flex flex-col items-center justify-center text-center py-8 sm:py-12 gap-5">
                <div className="w-20 h-20 rounded-full bg-[#F7931A]/15 border-2 border-[#F7931A]/50 flex items-center justify-center orange-glow-sm believers-success-pulse">
                  <CheckCircle2 size={40} className="text-[#F7931A]" />
                </div>
                <div>
                  <h3 className="font-bangers text-3xl sm:text-4xl text-white mb-2">
                    YOU ARE <span className="gradient-text">QUALIFIED!</span>
                  </h3>
                  <p className="text-white/70 text-base sm:text-lg max-w-sm mx-auto leading-relaxed">
                    You will receive free <span className="text-[#F7931A] font-bold">$BLACKBALLS</span> soon.
                  </p>
                </div>
                <div className="text-white/40 text-xs font-mono break-all max-w-full px-2">
                  {wallet}
                </div>
              </div>
            ) : (
              <>
                <h3 className="font-bangers text-2xl text-white mb-1">SUBMIT YOUR WALLET</h3>
                <p className="text-white/50 text-sm mb-6">
                  Make sure you completed steps 1–3 before verifying.
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
                        className="w-full bg-black/50 border border-white/10 focus:border-[#F7931A]/60 focus:ring-2 focus:ring-[#F7931A]/20 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder:text-white/25 font-mono text-sm outline-none transition-all"
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
                        className="w-full bg-black/50 border border-white/10 focus:border-cyan-500/40 focus:ring-2 focus:ring-cyan-500/15 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder:text-white/25 text-sm outline-none transition-all"
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
                      All 500 spots have been claimed.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading || spotsLeft === 0}
                    className="w-full bg-[#F7931A] hover:bg-[#ffb347] disabled:bg-[#F7931A]/40 disabled:cursor-not-allowed text-black font-black py-4 rounded-xl btn-press transition-all duration-200 text-lg uppercase tracking-wider orange-glow flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <span className="believers-spinner w-5 h-5 border-2 border-black/30 border-t-black rounded-full" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={20} />
                        Verify &amp; Qualify
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
