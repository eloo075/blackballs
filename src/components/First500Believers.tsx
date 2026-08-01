import { useState, useEffect } from 'react';
import {
  Sparkles,
  Heart,
  Repeat2,
  UserPlus,
  MessageCircle,
  Camera,
  Wallet,
  Lock,
  CheckCircle2,
  ExternalLink,
  Zap,
  ImageIcon,
  Globe,
  Award,
} from 'lucide-react';
import {
  LAUNCH_POST_URL,
  X_HANDLE,
  X_PROFILE_URL,
  TELEGRAM_URL,
  MAX_BELIEVERS,
  GAME_URL,
} from '../lib/constants';
import { getSubmissionCount } from '../lib/believers';

type CompletedTasks = { task1: boolean; task2: boolean; task3: boolean };

const SOCIAL_SUBTASKS = [
  {
    taskKey: 'task1' as const,
    text: 'Like + RT the launch post',
    link: LAUNCH_POST_URL,
    linkLabel: 'smash that post',
    icon: <Heart size={16} className="text-pink-500" />,
  },
  {
    taskKey: 'task2' as const,
    text: `Follow ${X_HANDLE}`,
    link: X_PROFILE_URL,
    linkLabel: X_HANDLE,
    icon: <UserPlus size={16} className="text-sky-600" />,
  },
  {
    taskKey: 'task3' as const,
    text: 'Join the Telegram war room',
    link: TELEGRAM_URL,
    linkLabel: 'enter the chaos',
    icon: <MessageCircle size={16} className="text-sky-600" />,
  },
];

const STEPS = [
  {
    num: 2,
    text: 'Go to the game site (engine locked — blurred chart tease only)',
    link: GAME_URL,
    linkLabel: 'open game site',
    icon: <Globe size={18} className="text-sky-600" />,
    accent: 'step-pill-sky',
  },
  {
    num: 3,
    text: 'Submit your wallet on the game site',
    link: GAME_URL,
    linkLabel: 'submit wallet',
    icon: <Wallet size={18} className="text-[#FF9B3B]" />,
    accent: 'step-pill-yellow',
  },
  {
    num: 4,
    text: 'Unlock your Congratulations Card',
    icon: <Award size={18} className="text-lime-600" />,
    accent: 'step-pill-lime',
  },
  {
    num: 5,
    text: 'Screenshot your Congratulations Card (this is your proof)',
    icon: <Camera size={18} className="text-[#FF9B3B]" />,
    accent: 'step-pill-yellow',
  },
  {
    num: 6,
    text: 'Reply to the launch post on X with your screenshot',
    link: LAUNCH_POST_URL,
    linkLabel: 'post your proof on X',
    icon: <ImageIcon size={18} className="text-pink-500" />,
    accent: 'step-pill-pink',
  },
];

export default function First500Believers() {
  const [count, setCount] = useState(0);
  const [completedTasks, setCompletedTasks] = useState<CompletedTasks>({
    task1: false,
    task2: false,
    task3: false,
  });

  const markTaskComplete = (task: keyof CompletedTasks) => {
    setCompletedTasks((prev) => ({ ...prev, [task]: true }));
  };

  const allSocialComplete =
    completedTasks.task1 && completedTasks.task2 && completedTasks.task3;

  useEffect(() => {
    getSubmissionCount()
      .then(setCount)
      .catch(() => setCount(0));
  }, []);

  const spotsLeft = Math.max(0, MAX_BELIEVERS - count);
  const progress = Math.min(100, (count / MAX_BELIEVERS) * 100);

  return (
    <section id="first-500" className="relative pt-28 pb-16 overflow-hidden">
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
            <p className="text-black/55 text-sm max-w-xl mx-auto font-semibold">
              game&apos;s locked for now — you&apos;re only here to submit your wallet, unlock your proof card,
              screenshot it, and reply on X. no screenshot = no balls.
            </p>

            <div className="mt-4 inline-flex items-center gap-2 meme-badge bg-zinc-800 text-lime-400 px-4 py-1.5 text-xs font-black">
              <Lock size={12} />
              crash game locked · wallet + proof card only
            </div>

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
              <p className="text-black/40 text-xs mt-2 italic font-semibold">spots vanishing in real time...</p>
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

            {/* Step 1 — social tasks */}
            <div
              className={`meme-card believers-step flex items-start gap-3 p-4 step-pill-pink ${
                allSocialComplete ? 'border-green-500 ring-2 ring-green-400' : ''
              }`}
            >
              <div
                className={`flex-shrink-0 w-9 h-9 rounded-full border-2 border-black flex items-center justify-center font-bangers text-lg shadow-[2px_2px_0_#000] ${
                  allSocialComplete ? 'bg-green-500 text-white' : 'bg-[#FF9B3B] text-black'
                }`}
              >
                {allSocialComplete ? <CheckCircle2 size={20} /> : 1}
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <span className="text-black/85 text-sm sm:text-base font-semibold">
                  Do the social tasks
                </span>
                <ul className="mt-3 space-y-2.5">
                  {SOCIAL_SUBTASKS.map((sub) => {
                    const done = completedTasks[sub.taskKey];
                    return (
                      <li key={sub.taskKey} className="flex items-start gap-2">
                        {sub.icon}
                        <div className="min-w-0">
                          <span className={`text-xs sm:text-sm font-semibold ${done ? 'text-green-700' : 'text-black/75'}`}>
                            {sub.text}
                            {done && <span className="ml-1 font-black">✓</span>}
                          </span>
                          <a
                            href={sub.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => markTaskComplete(sub.taskKey)}
                            className="inline-flex items-center gap-1.5 mt-1 text-xs text-sky-700 hover:text-sky-900 transition-colors font-bold"
                          >
                            {sub.taskKey === 'task1' && <Repeat2 size={12} />}
                            {sub.linkLabel}
                            <ExternalLink size={11} />
                          </a>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {STEPS.map((step) => (
              <div
                key={step.num}
                className={`meme-card believers-step flex items-start gap-3 p-4 ${step.accent}`}
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-full border-2 border-black flex items-center justify-center font-bangers text-lg shadow-[2px_2px_0_#000] bg-[#FF9B3B] text-black">
                  {step.num}
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    {step.icon}
                    <span className="text-black/85 text-sm sm:text-base font-semibold">
                      {step.text}
                    </span>
                  </div>
                  {step.link && (
                    <a
                      href={step.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-2 text-xs sm:text-sm text-sky-700 hover:text-sky-900 transition-colors font-bold"
                    >
                      {step.linkLabel}
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Proof flow */}
          <div className="meme-card believers-form p-6 sm:p-8 bg-white flex flex-col">
            <div className="meme-badge inline-flex self-start items-center gap-2 bg-lime-300 text-black px-3 py-1 text-xs mb-4 font-black">
              <Camera size={12} />
              screenshot = your ticket
            </div>

            <h3 className="font-bangers text-2xl sm:text-3xl text-black mb-2 leading-tight">
              <span className="cartoon-title">PROOF </span>
              <span className="cartoon-title-orange">OR GTFO</span>
            </h3>
            <p className="text-black/55 text-sm mb-4 font-semibold">
              the game site is open for wallet submission only. you&apos;ll see a locked crash chart in the
              background — that&apos;s FOMO. submit your wallet to unlock your Congratulations Card.
            </p>

            <div className="flex items-start gap-2 bg-zinc-100 border-2 border-black rounded-xl px-4 py-3 text-black/70 text-xs sm:text-sm shadow-[3px_3px_0_#000] mb-6 font-semibold">
              <Lock size={16} className="flex-shrink-0 mt-0.5 text-zinc-600" />
              not playable yet — proof card unlock only
            </div>

            {/* Mock congrats card preview */}
            <div className="bg-zinc-900 border-4 border-black rounded-2xl p-5 sm:p-6 mb-6 shadow-[6px_6px_0_#000] text-center">
              <div className="meme-badge inline-flex items-center gap-1.5 bg-lime-400 text-black px-3 py-1 text-[10px] sm:text-xs mb-3 font-black">
                <CheckCircle2 size={12} />
                example proof card
              </div>
              <img
                src="/logo.png"
                alt="BlackBalls"
                className="w-14 h-14 mx-auto mb-3 object-contain logo-pulse"
              />
              <p className="font-bangers text-xl sm:text-2xl text-lime-400 mb-1">
                CONGRATS, DEGEN!
              </p>
              <p className="text-zinc-400 text-xs sm:text-sm font-bold mb-3">
                you&apos;re in the first 500 balls club 🥜
              </p>
              <div className="bg-black border-2 border-[#FF9B3B] rounded-xl px-3 py-2 font-mono text-[10px] sm:text-xs text-[#FF9B3B] break-all">
                0xYourWallet...ProofCard
              </div>
              <p className="text-zinc-500 text-[10px] sm:text-xs mt-3 font-semibold italic">
                ↑ screenshot THIS card after wallet submit ↑
              </p>
            </div>

            <div className="space-y-3 mt-auto">
              <a
                href={GAME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="meme-btn meme-btn-orange w-full py-4 text-base sm:text-lg btn-press flex items-center justify-center gap-2"
              >
                <Wallet size={22} />
                🔓 SUBMIT WALLET &amp; UNLOCK CARD
              </a>

              <a
                href={LAUNCH_POST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="meme-btn meme-btn-sky w-full py-4 text-base sm:text-lg btn-press flex items-center justify-center gap-2"
              >
                <Camera size={20} />
                📸 REPLY ON X WITH SCREENSHOT
              </a>
            </div>

            <p className="mt-5 text-black/40 text-xs text-center font-semibold leading-relaxed">
              step 1 = social cred. steps 2–6 = mandatory. no proof card screenshot on the launch post = you&apos;re ngmi.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
