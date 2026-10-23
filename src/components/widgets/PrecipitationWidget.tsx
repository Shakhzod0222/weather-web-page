import React from 'react';
import { UmbrellaIcon } from '../icons/WeatherIcons';

interface PrecipitationWidgetProps {
  precipitationSumToday: number; // mm
  nextDaysPrecipitationSum?: number; // mm (keyingi kunlar)
}

export const PrecipitationWidget: React.FC<PrecipitationWidgetProps> = ({
  precipitationSumToday,
  nextDaysPrecipitationSum = 0,
}) => {
  const todayMm = Math.round(precipitationSumToday * 10) / 10;
  const nextMm = Math.round(nextDaysPrecipitationSum * 10) / 10;

  let desc = 'Yaqin vaqt ichida yog\'ingarchilik kutilmaydi.';
  if (todayMm > 0) {
    desc = `Bugun ${todayMm} mm yog'in yog'di. Keyingi kunlarda: ${nextMm} mm kutilmoqda.`;
  } else if (nextMm > 0) {
    desc = `Keyingi kunlarda taxminan ${nextMm} mm yog'ingarchilik kutilmoqda.`;
  }

  return (
    <article
      aria-label="Yog'ingarchilik miqdori vidjeti"
      className="rounded-[18px] bg-white/15 backdrop-blur-2xl border border-white/20 p-4 shadow-lg text-white flex flex-col justify-between transition-all duration-300 hover:translate-y-[-2px] min-h-[160px]"
    >
      <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/60">
        <UmbrellaIcon size={14} className="text-cyan-300" />
        <span>YOG'INGARCHILIK</span>
      </div>

      <div className="my-2">
        <div className="text-2xl sm:text-3xl font-semibold tracking-tight">
          {todayMm} <span className="text-sm font-normal text-white/70">mm</span>
        </div>
        <p className="text-xs text-white/80 mt-1">So'nggi 24 soat ichida</p>
      </div>

      <p className="text-xs text-white/75 border-t border-white/10 pt-2 font-normal leading-relaxed">
        {desc}
      </p>
    </article>
  );
};
