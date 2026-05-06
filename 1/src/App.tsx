import { useState, useEffect } from 'react';

const TARGET_DATE = new Date('2027-01-31T00:00:00');
const START_DATE = new Date('2026-01-01T00:00:00');

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const now = new Date();
  const difference = TARGET_DATE.getTime() - now.getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function App() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const r = requestAnimationFrame(() => setReady(true));
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => {
      cancelAnimationFrame(r);
      clearInterval(timer);
    };
  }, []);

  // Progress
  const now = new Date();
  const totalDuration = TARGET_DATE.getTime() - START_DATE.getTime();
  const elapsed = now.getTime() - START_DATE.getTime();
  const progress = Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 selection:bg-white selection:text-black">

      {/* 頂部標籤 */}
      <div
        className={`transition-all duration-1000 delay-200 ${ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
      >
        <p className="text-xs tracking-[0.3em] uppercase text-neutral-500 font-light mb-8">
          DSE 2027 · 開始日
        </p>
      </div>

      {/* 倒數數字 */}
      <div
        className={`transition-all duration-1000 delay-500 ${ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        <div className="flex items-baseline gap-1 sm:gap-3">
          {/* 日 */}
          <div className="text-right">
            <span className="text-7xl sm:text-8xl md:text-9xl font-extralight tracking-tighter text-white tabular-nums leading-none">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-neutral-600 ml-1">Days</span>
          </div>

          {/* 分隔 */}
          <span className="text-5xl sm:text-6xl text-neutral-700 font-extralight pb-1">:</span>

          {/* 時 */}
          <div className="text-right">
            <span className="text-7xl sm:text-8xl md:text-9xl font-extralight tracking-tighter text-white tabular-nums leading-none">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-neutral-600 ml-1">Hrs</span>
          </div>

          {/* 分隔 */}
          <span className="text-5xl sm:text-6xl text-neutral-700 font-extralight pb-1">:</span>

          {/* 分 */}
          <div className="text-right">
            <span className="text-7xl sm:text-8xl md:text-9xl font-extralight tracking-tighter text-white tabular-nums leading-none">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-neutral-600 ml-1">Min</span>
          </div>

          {/* 分隔 */}
          <span className="text-5xl sm:text-6xl text-neutral-700 font-extralight pb-1">:</span>

          {/* 秒 */}
          <div className="text-right">
            <span className="text-7xl sm:text-8xl md:text-9xl font-extralight tracking-tighter text-neutral-400 tabular-nums leading-none">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-neutral-700 ml-1">Sec</span>
          </div>
        </div>
      </div>

      {/* 目標日期 */}
      <div
        className={`mt-10 sm:mt-14 transition-all duration-1000 delay-700 ${ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
      >
        <div className="h-px w-12 bg-neutral-800 mx-auto mb-4" />
        <p className="text-sm tracking-[0.15em] text-neutral-500 font-light text-center">
          31 · 01 · 2027
        </p>
      </div>

      {/* 進度條 */}
      <div
        className={`mt-12 sm:mt-16 w-full max-w-xs transition-all duration-1000 delay-1000 ${ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
      >
        <div className="flex justify-between text-[10px] tracking-[0.2em] text-neutral-700 uppercase mb-2">
          <span>Progress</span>
          <span>{progress.toFixed(1)}%</span>
        </div>
        <div className="h-px bg-neutral-800 w-full relative">
          <div
            className="absolute left-0 top-0 h-full bg-white transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

    </div>
  );
}
