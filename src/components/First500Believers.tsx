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
  isValidWalletAddress,
  usingRemoteStorage,
} from '../lib/believers';

type CompletedTasks = { task1: boolean; task2: boolean; task3: boolean };

const TASK_BY_STEP: Record<number, keyof CompletedTasks | undefined> = {
  1: 'task1',
  2: 'task2',
  3: 'task3',
};

const STEPS = [
  {
    num: 1,
    text: 'Like + RT the launch post (actually do it)',
    link: LAUNCH_POST_URL,
    linkLabel: 'smash that post',
    icon: <Heart size={18} className="text-pink-500" />,
    accent: 'step-pill-pink',
  },
  {
    num: 2,
    text: `Follow ${X_HANDLE} (we post bangers)`,
    link: X_PROFILE_URL,
    linkLabel: X_HANDLE,
    icon: <UserPlus size={18} className="text-sky-600" />,
    accent: 'step-pill-sky',
  },
  {
    num: 3,
    text: 'Join the Telegram war room',
    link: TELEGRAM_URL,
    linkLabel: 'enter the chaos',
    icon: <MessageCircle size={18} className="text-sky-600" />,
    accent: 'step-pill-sky',
  },
  {
    num: 4,
    text: 'Drop your wallet (0x... only)',
    icon: <Wallet size={18} className="text-[#FF9B3B]" />,
    accent: 'step-pill-yellow',
  },
  {
    num: 5,
    text: 'Optional: X handle (so we know who you are)',
    icon: <AtSign size={18} className="text-black/50" />,
    accent: 'step-pill-lime',
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
  const [completedTasks, setCompletedTasks] = useState<CompletedTasks>({
    task1: false,
    task2: false,
    task3: false,
  });

  const markTaskComplete = (task: keyof CompletedTasks) => {
    setCompletedTasks((prev) => ({ ...prev, [task]: true }));
  };

  const allSocialTasksComplete =
    completedTasks.task1 && completedTasks.task2 && completedTasks.task3;

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

    if (!allSocialTasksComplete) {
      setError('⚠️ You must complete Steps 1, 2, and 3 first!');
      return;
    }

    if (!isValidWalletAddress(wallet)) {
      setError('⚠️ Enter a valid 0x wallet address.');
      return;
    }

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
      invalid_wallet: '⚠️ Enter a valid 0x wallet address.',
      duplicate: '⚠️ This wallet address has already been submitted!',
      duplicate_ip: '⚠️ This IP address has already submitted a wallet!',
      full: '500/500 gone. You slept. Skill issue.',
      network: 'Something broke. Blame the chain, retry.',
      already_submitted: 'You already qualified. Patience.',
      server_misconfigured: 'Submission API not configured. Contact support.',
    };
    setError(messages[result.error] ?? 'Submission failed. Please try again.');
  };

  return (
    <section
      id="first-500"
      className="relative pt-28 pb-16 overflow-hidden"
    >
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Banner */}
        <div className="meme-card believers-banner relative overflow-hidden mb-8 bg-yellow-50">
          <div className="relative px-6 py-8 sm:px-10 sm:py-10 text-center">
            <div className="meme-badge inline-flex items-center gap-2 bg-red-400 text-black px-4 py-1 text-xs mb-4">
              <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
              live drop!!!
              <Sparkles size={12} className="animate-pulse" />
            </div>

            <h2 className="font-bangers text-3xl sm:text-5xl md:text-6xl leading-tight mb-2">
              <span className="cartoon-title">FIRST 500 </span>
              <span className="cartoon-title-orange">BALLS</span>
            </h2>
            <p className="text-base sm:text-xl font-black text-black/85 mb-1">
              free <span className="text-[#FF9B3B]">$BLACKBALLS</span> for early degens 🥜
            </p>
            <p className="text-black/55 text-sm max-w-md mx-auto font-semibold">
              do the tasks. drop wallet. get tokens before normies wake up. FOMO is real.
            </p>

            <div className="mt-6 max-w-md mx-auto">
              <div className="flex justify-between text-xs uppercase tracking-widest mb-2 font-black">
                <span className="text-[#FF9B3B]">{count} / {MAX_BELIEVERS} aped in</span>
                <span className="text-sky-600">{spotsLeft} left</span>
              </div>
              <div className="progress-track h-4 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#FF9B3B] via-[#ffb347] to-lime-300 rounded-full transition-all duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-black/40 text-xs mt-2 italic font-semibold">number go brrr...</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Steps */}
          <div className="space-y-3">
            <h3 className="font-bangers text-2xl text-black mb-3 flex items-center gap-2">
              <Zap size={22} className="text-[#FF9B3B]" />
              how to qualify (ez)
            </h3>
            {STEPS.map((step) => {
              const taskKey = TASK_BY_STEP[step.num];
              const isComplete = taskKey ? completedTasks[taskKey] : false;

              return (
              <div
                key={step.num}
                className={`meme-card believers-step flex items-start gap-3 p-4 ${step.accent} ${
                  isComplete ? 'border-green-500 ring-2 ring-green-400' : ''
                }`}
              >
                <div className={`flex-shrink-0 w-9 h-9 rounded-full border-2 border-black flex items-center justify-center font-bangers text-lg shadow-[2px_2px_0_#000] ${
                  isComplete ? 'bg-green-500 text-white' : 'bg-[#FF9B3B] text-black'
                }`}>
                  {isComplete ? <CheckCircle2 size={20} /> : step.num}
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    {step.icon}
                    <span className="text-black/85 text-sm sm:text-base font-semibold">
                      {step.text}
                      {step.optional && (
                        <span className="ml-1 text-black/40 text-xs">(optional lol)</span>
                      )}
                    </span>
                    {isComplete && (
                      <span className="text-green-600 font-black text-sm">✓</span>
                    )}
                  </div>
                  {step.link && (
                    <a
                      href={step.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => taskKey && markTaskComplete(taskKey)}
                      className="inline-flex items-center gap-1.5 mt-2 text-xs sm:text-sm text-sky-700 hover:text-sky-900 transition-colors font-bold"
                    >
                      {step.num === 1 && <Repeat2 size={14} />}
                      {step.linkLabel}
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            );})}
          </div>

          {/* Form */}
          <div className="meme-card believers-form p-6 sm:p-8 bg-white">
            {qualified ? (
              <div className="flex flex-col items-center justify-center text-center py-6 sm:py-10 gap-5">
                <img src="/logo.png" alt="Qualified" className="w-20 h-20 object-contain believers-success-pulse logo-pulse" />
                <div>
                  <h3 className="font-bangers text-3xl sm:text-4xl mb-2 leading-tight">
                    <span className="cartoon-title">YOU&apos;RE </span>
                    <span className="cartoon-title-orange">IN!!!</span>
                  </h3>
                  <p className="text-black/65 text-base max-w-sm mx-auto font-semibold">
                    free <span className="text-[#FF9B3B] font-black">$BLACKBALLS</span> incoming.
                    don&apos;t paper hand before they arrive.
                  </p>
                </div>
                <div className="text-black/45 text-xs font-mono break-all max-w-full px-2 font-bold">
                  {wallet}
                </div>
              </div>
            ) : (
              <>
                <h3 className="font-bangers text-2xl text-black mb-1">drop your wallet</h3>
                <p className="text-black/55 text-sm mb-5 font-semibold">
                  finish steps 1–3 or the balls god rejects you.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="wallet" className="block text-black/60 text-xs uppercase tracking-widest mb-2 font-bold">
                      Wallet Address <span className="text-[#FF9B3B]">*</span>
                    </label>
                    <div className="relative">
                      <Wallet size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FF9B3B]/70" />
                      <input
                        id="wallet"
                        type="text"
                        value={wallet}
                        onChange={(e) => setWallet(e.target.value)}
                        placeholder="0xYourWalletAddress"
                        required
                        className="meme-input w-full pl-11 pr-4 py-3.5 font-mono text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="username" className="block text-black/60 text-xs uppercase tracking-widest mb-2 font-bold">
                      X Username <span className="text-black/35">(optional)</span>
                    </label>
                    <div className="relative">
                      <AtSign size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/35" />
                      <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="@YourHandle"
                        className="meme-input w-full pl-11 pr-4 py-3.5 text-sm"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-start gap-2 bg-red-100 border-2 border-black rounded-xl px-4 py-3 text-red-700 text-sm shadow-[3px_3px_0_#000]">
                      <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                      {error}
                    </div>
                  )}

                  {spotsLeft === 0 && (
                    <div className="flex items-start gap-2 bg-amber-100 border-2 border-black rounded-xl px-4 py-3 text-amber-800 text-sm shadow-[3px_3px_0_#000]">
                      <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                      All 500 spots gone. Skill issue.
                    </div>
                  )}

.old_string
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
                  <p className="mt-4 text-black/35 text-xs text-center font-medium">
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
