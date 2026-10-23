import React from 'react';
import { GaugeIcon } from '../icons/WeatherIcons';

interface PressureWidgetProps {
  pressureHpa: number; // hPa
}

export const PressureWidget: React.FC<PressureWidgetProps> = ({ pressureHpa }) => {
  const rounded = Math.round(pressureHpa);

  // Normal: 1013 hPa
  // Min: 980, Max: 1040 (diapazon 60 hPa)
  const percent = Math.max(0, Math.min(1, (rounded - 980) / 60));
  // Gauge burchagi: -180 deg dan 0 deg gacha (yarim doira)
  const angle = Math.PI * (1 - percent);
  const cx = 50;
  const cy = 40;
  const r = 30;
  const needleX = cx + r * Math.cos(angle);
  const needleY = cy - r * Math.sin(angle);

  let desc = 'Barqaror atmosfera bosimi';
  if (rounded > 1020) {
    desc = 'Yuqori bosim, havo ochiq va tinch';
  } else if (rounded < 1005) {
    desc = 'Past bosim, yog\'ingarchilik ehtimoli bor';
  }

  return (
    <article
      aria-label="Atmosfera bosimi vidjeti"
      className="rounded-[18px] bg-white/15 backdrop-blur-2xl border border-white/20 p-4 shadow-lg text-white flex flex-col justify-between transition-all duration-300 hover:translate-y-[-2px] min-h-[160px]"
    >
      <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/60">
        <GaugeIcon size={14} className="text-teal-200" />
        <span>BOSIM</span>
      </div>

      <div className="flex items-center justify-between my-2">
        <div>
          <div className="text-2xl sm:text-3xl font-semibold tracking-tight">
            {rounded}{' '}
            <span className="text-sm font-normal text-white/70">hPa</span>
          </div>
          <div className="text-xs text-white/80 mt-0.5">
            {rounded > 1013 ? 'Ko\'tarilgan' : rounded < 1013 ? 'Pasaygan' : 'Me\'yoriy'}
          </div>
        </div>

        {/* SVG Yarim Doira Gauge */}
        <div className="w-20 h-12 flex items-center justify-center">
          <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
            {/* Yarim doira yoyi */}
            <path
              d="M 20 40 A 30 30 0 0 1 80 40"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M 20 40 A 30 30 0 0 1 80 40"
              fill="none"
              stroke="#2dd4bf"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="94.2"
              strokeDashoffset={94.2 * (1 - percent)}
            />
            {/* Markaziy nuqta va strelka */}
            <circle cx="50" cy="40" r="3.5" fill="#ffffff" />
            <line
              x1="50"
              y1="40"
              x2={needleX}
              y2={needleY}
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      <p className="text-xs text-white/75 border-t border-white/10 pt-2 font-normal">
        {desc}
      </p>
    </article>
  );
};
