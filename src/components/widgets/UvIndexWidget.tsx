import React from 'react';
import { SunIcon } from '../icons/WeatherIcons';

interface UvIndexWidgetProps {
  uvIndex: number;
}

export const UvIndexWidget: React.FC<UvIndexWidgetProps> = ({ uvIndex }) => {
  const roundedUv = Math.round(uvIndex);

  let category = 'Past';
  let advice = 'Quyoshdan maxsus himoya talab etilmaydi.';

  if (roundedUv >= 11) {
    category = 'Ekstremal';
    advice = 'Quyosh ostida qolish xavfli, soyada bo\'ling.';
  } else if (roundedUv >= 8) {
    category = 'Juda yuqori';
    advice = 'Soat 11:00-16:00 oralig\'ida quyoshdan saqlaning.';
  } else if (roundedUv >= 6) {
    category = 'Yuqori';
    advice = 'Bosh kiyim kiying va quyoshdan saqlovchi krem surting.';
  } else if (roundedUv >= 3) {
    category = 'O\'rtacha';
    advice = 'Peshin vaqtida quyosh ostida uzoq qolmang.';
  }

  // Nuqta pozitsiyasi (0 dan 12 gacha)
  const dotPercent = Math.min(100, Math.max(0, (roundedUv / 11) * 100));

  return (
    <article
      aria-label="UB indeksi vidjeti"
      className="rounded-[18px] bg-white/15 backdrop-blur-2xl border border-white/20 p-4 shadow-lg text-white flex flex-col justify-between transition-all duration-300 hover:translate-y-[-2px] min-h-[160px]"
    >
      <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/60">
        <SunIcon size={14} className="text-amber-200" />
        <span>UB INDEKSI</span>
      </div>

      <div className="my-2">
        <div className="text-2xl sm:text-3xl font-semibold tracking-tight">
          {roundedUv}
        </div>
        <div className="text-sm font-medium text-white/90">{category}</div>

        {/* Gradient chiziq va nuqta */}
        <div className="relative mt-2.5 h-1.5 w-full rounded-full bg-black/20 overflow-visible">
          <div className="h-full w-full rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 via-orange-500 to-purple-600" />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border border-black/30 shadow-md -ml-1.5"
            style={{ left: `${dotPercent}%` }}
          />
        </div>
      </div>

      <p className="text-xs text-white/70 leading-relaxed font-normal">
        {advice}
      </p>
    </article>
  );
};
