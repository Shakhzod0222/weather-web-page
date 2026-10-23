import React from 'react';
import { CompassIcon } from '../icons/WeatherIcons';

interface WindWidgetProps {
  windSpeed: number; // km/h
  windDirection: number; // 0..360 deg
  windGusts: number; // km/h
}

export const WindWidget: React.FC<WindWidgetProps> = ({
  windSpeed,
  windDirection,
  windGusts,
}) => {
  // Yo'nalish matni (O'zbekcha)
  const getDirectionText = (deg: number): string => {
    const directions = [
      'Shimoliy',
      'Shimoli-sharqiy',
      'Sharqiy',
      'Janubi-sharqiy',
      'Janubiy',
      'Janubi-g\'arbiy',
      'G\'arbiy',
      'Shimoli-g\'arbiy',
    ];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  };

  return (
    <article
      aria-label="Shamol ma'lumotlari vidjeti"
      className="rounded-[18px] bg-white/15 backdrop-blur-2xl border border-white/20 p-4 shadow-lg text-white flex flex-col justify-between transition-all duration-300 hover:translate-y-[-2px] min-h-[160px]"
    >
      <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/60">
        <CompassIcon size={14} />
        <span>SHAMOL</span>
      </div>

      <div className="flex items-center justify-between my-2">
        <div>
          <div className="text-2xl sm:text-3xl font-semibold tracking-tight">
            {Math.round(windSpeed)}{' '}
            <span className="text-sm font-normal text-white/70">km/soat</span>
          </div>
          <div className="text-xs font-medium text-white/80 mt-0.5">
            {getDirectionText(windDirection)}
          </div>
        </div>

        {/* SVG Kompas */}
        <div className="relative w-18 h-18 shrink-0 flex items-center justify-center">
          <svg viewBox="0 0 80 80" className="w-full h-full" aria-hidden="true">
            {/* Tashqi doira */}
            <circle
              cx="40"
              cy="40"
              r="36"
              fill="rgba(0,0,0,0.2)"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="2"
            />
            {/* Kompas ko'rsatkichlari: N, E, S, W */}
            <text x="40" y="14" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="9" fontWeight="bold">
              N
            </text>
            <text x="68" y="43" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
              E
            </text>
            <text x="40" y="72" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
              S
            </text>
            <text x="12" y="43" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
              W
            </text>

            {/* Aylanuvchi strelka */}
            <g
              transform={`rotate(${windDirection} 40 40)`}
              className="transition-transform duration-500 ease-out"
            >
              <polygon
                points="40,16 35,40 40,36 45,40"
                fill="#38bdf8"
              />
              <polygon
                points="40,64 35,40 40,36 45,40"
                fill="rgba(255,255,255,0.4)"
              />
              <circle cx="40" cy="40" r="3" fill="#ffffff" />
            </g>
          </svg>
        </div>
      </div>

      <div className="text-xs text-white/70 border-t border-white/10 pt-2 flex items-center justify-between">
        <span>Shiddat (gust):</span>
        <span className="font-medium text-white/90">
          {Math.round(windGusts)} km/soat
        </span>
      </div>
    </article>
  );
};
