import React from 'react';
import { formatTimeOnly } from '../../utils/time';
import { SunsetIcon } from '../icons/WeatherIcons';

interface SunsetWidgetProps {
  sunsetIso: string;
  sunriseIso: string;
  timezone: string;
  isDay: boolean;
}

export const SunsetWidget: React.FC<SunsetWidgetProps> = ({
  sunsetIso,
  sunriseIso,
  timezone,
  isDay,
}) => {
  const sunsetTime = formatTimeOnly(sunsetIso, timezone);
  const sunriseTime = formatTimeOnly(sunriseIso, timezone);

  // SVG Yoy (Arc) parametrlarini hisoblash
  // viewBox="0 0 100 45"
  // Arc: M 10,40 A 40,40 0 0,1 90,40
  // Quyosh ayni paytda qayerdaligini ko'rsatish:
  const now = new Date();
  const sunrise = new Date(sunriseIso);
  const sunset = new Date(sunsetIso);

  let progress = 0.5; // default
  if (now >= sunrise && now <= sunset) {
    const totalDayMs = sunset.getTime() - sunrise.getTime();
    const currentMs = now.getTime() - sunrise.getTime();
    progress = Math.max(0, Math.min(1, currentMs / totalDayMs));
  } else if (now > sunset) {
    progress = 0.95;
  } else {
    progress = 0.05;
  }

  // Yoydagi nuqta (x, y) = R=40, cx=50, cy=40, theta = PI * (1 - progress)
  const angle = Math.PI * (1 - progress);
  const sunX = 50 + 40 * Math.cos(angle);
  const sunY = 40 - 40 * Math.sin(angle);

  return (
    <article
      aria-label="Quyosh botishi va chiqishi vidjeti"
      className="rounded-[18px] bg-white/15 backdrop-blur-2xl border border-white/20 p-4 shadow-lg text-white flex flex-col justify-between transition-all duration-300 hover:translate-y-[-2px] min-h-[160px]"
    >
      <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/60">
        <SunsetIcon size={14} className="text-orange-300" />
        <span>QUYOSH BOTISHI</span>
      </div>

      <div className="space-y-1">
        <div className="text-2xl sm:text-3xl font-semibold tracking-tight">
          {sunsetTime}
        </div>

        {/* SVG Yoy */}
        <div className="w-full flex justify-center py-1">
          <svg
            viewBox="0 0 100 45"
            className="w-36 h-14 overflow-visible"
            aria-hidden="true"
          >
            {/* Ufq chizig'i */}
            <line
              x1="5"
              y1="40"
              x2="95"
              y2="40"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1.5"
              strokeDasharray="2 2"
            />
            {/* Traektoriya yoyi */}
            <path
              d="M 10 40 A 40 40 0 0 1 90 40"
              fill="none"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="2.5"
            />
            {/* O'tilgan qism yoyi */}
            <path
              d="M 10 40 A 40 40 0 0 1 90 40"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="2.5"
              strokeDasharray="125.6"
              strokeDashoffset={125.6 * (1 - progress)}
            />
            {/* Quyosh doirasi */}
            <circle
              cx={sunX}
              cy={sunY}
              r="4.5"
              fill="#fde047"
              stroke="#f59e0b"
              strokeWidth="1.5"
              className="drop-shadow-[0_0_6px_rgba(253,224,71,0.8)]"
            />
          </svg>
        </div>
      </div>

      <div className="text-xs text-white/70 font-normal border-t border-white/10 pt-2 flex items-center justify-between">
        <span>{isDay ? 'Quyosh chiqishi:' : 'Ertangi quyosh chiqishi:'}</span>
        <span className="font-medium text-white/90">{sunriseTime}</span>
      </div>
    </article>
  );
};
