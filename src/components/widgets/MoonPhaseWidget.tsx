import React from 'react';
import { calculateMoonPhase } from '../../utils/moonPhase';
import { MoonIcon } from '../icons/WeatherIcons';

interface MoonPhaseWidgetProps {
  date?: Date;
}

export const MoonPhaseWidget: React.FC<MoonPhaseWidgetProps> = ({
  date = new Date(),
}) => {
  const moon = calculateMoonPhase(date);

  // Oy SVG tasviri: 0..1 faza bo'yicha yoritilgan qismni chizish
  // phaseValue: 0=yangi oy, 0.25=birinchi chorak, 0.5=to'lin oy, 0.75=oxirgi chorak
  const renderMoonSvg = () => {
    // R = 28, center = 32, 32
    // Oy diski (qorong'i baza)
    // Yoritilgan qismi fazaga bog'liq
    const p = moon.phaseValue;
    return (
      <svg viewBox="0 0 64 64" className="w-14 h-14 shrink-0 drop-shadow-md">
        <defs>
          <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="85%" stopColor="#cbd5e1" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.4" />
          </radialGradient>
        </defs>
        {/* Qorong'i oy foni */}
        <circle cx="32" cy="32" r="26" fill="#1e293b" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        
        {/* Oy yuzasidagi yorug'lik fazasi */}
        {p >= 0.47 && p <= 0.53 ? (
          // To'lin oy
          <circle cx="32" cy="32" r="26" fill="url(#moonGlow)" />
        ) : p < 0.03 || p >= 0.97 ? (
          // Yangi oy
          <circle cx="32" cy="32" r="26" fill="#0f172a" />
        ) : (
          // Fazalar (hilol / chorak / bo'rtiq oy)
          <path
            d={
              p < 0.5
                ? `M 32 6 A 26 26 0 0 1 32 58 A ${Math.abs(26 * (1 - 4 * Math.abs(p - 0.25)))} 26 0 0 ${p < 0.25 ? '1' : '0'} 32 6`
                : `M 32 6 A 26 26 0 0 0 32 58 A ${Math.abs(26 * (1 - 4 * Math.abs(p - 0.75)))} 26 0 0 ${p < 0.75 ? '0' : '1'} 32 6`
            }
            fill="url(#moonGlow)"
          />
        )}
      </svg>
    );
  };

  return (
    <article
      aria-label="Oy fazasi vidjeti"
      className="rounded-[18px] bg-white/15 backdrop-blur-2xl border border-white/20 p-4 shadow-lg text-white flex flex-col justify-between transition-all duration-300 hover:translate-y-[-2px] min-h-[160px]"
    >
      <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/60">
        <MoonIcon size={14} className="text-slate-200" />
        <span>OY FAZASI</span>
      </div>

      <div className="flex items-center justify-between my-2">
        <div>
          <div className="text-xl sm:text-2xl font-semibold tracking-tight">
            {moon.phaseNameUz}
          </div>
          <div className="text-xs text-white/75 mt-0.5">
            Yoritilganlik: <span className="font-medium text-white">{moon.illuminationPct}%</span>
          </div>
        </div>

        {renderMoonSvg()}
      </div>

      <div className="text-xs text-white/70 border-t border-white/10 pt-2 flex items-center justify-between">
        <span>To'lin oy:</span>
        <span className="font-medium text-white/90">
          {moon.daysUntilFullMoon === 0
            ? 'Bugun'
            : `${moon.daysUntilFullMoon} kundan so'ng`}
        </span>
      </div>
    </article>
  );
};
