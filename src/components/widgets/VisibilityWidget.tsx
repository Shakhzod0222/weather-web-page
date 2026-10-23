import React from 'react';
import { EyeIcon } from '../icons/WeatherIcons';

interface VisibilityWidgetProps {
  visibilityMeters: number; // Masalan 10000 m
}

export const VisibilityWidget: React.FC<VisibilityWidgetProps> = ({
  visibilityMeters,
}) => {
  const km = Math.round(visibilityMeters / 1000);

  let desc = 'Mukammal ko\'rinish, osmon tiniq.';
  if (km < 1) {
    desc = 'Qalin tuman, ko\'rish masofasi juda qisqa.';
  } else if (km < 4) {
    desc = 'Tuman yoki chang tufayli ko\'rinish pasaygan.';
  } else if (km < 9) {
    desc = 'Yaxshi ko\'rinish, yengil xiralik bo\'lishi mumkin.';
  }

  return (
    <article
      aria-label="Ko'rish masofasi vidjeti"
      className="rounded-[18px] bg-white/15 backdrop-blur-2xl border border-white/20 p-4 shadow-lg text-white flex flex-col justify-between transition-all duration-300 hover:translate-y-[-2px] min-h-[160px]"
    >
      <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/60">
        <EyeIcon size={14} className="text-blue-200" />
        <span>KO'RISH MASOFASI</span>
      </div>

      <div className="my-2">
        <div className="text-2xl sm:text-3xl font-semibold tracking-tight">
          {km} <span className="text-sm font-normal text-white/70">km</span>
        </div>
      </div>

      <p className="text-xs text-white/75 leading-relaxed font-normal border-t border-white/10 pt-2">
        {desc}
      </p>
    </article>
  );
};
