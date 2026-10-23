import type { TemperatureUnit } from '../../types/weather';
import { formatTemp } from '../../utils/temperature';
import { ThermometerIcon } from '../icons/WeatherIcons';

interface FeelsLikeWidgetProps {
  feelsLike: number;
  actualTemp: number;
  unit: TemperatureUnit;
}

export const FeelsLikeWidget: React.FC<FeelsLikeWidgetProps> = ({
  feelsLike,
  actualTemp,
  unit,
}) => {
  const diff = Math.round(feelsLike - actualTemp);

  let desc = 'Haqiqiy harorat bilan bir xil sezilmoqda.';
  if (diff > 0) {
    desc = `Namlik tufayli haqiqiy haroratdan ${diff}° iliqroq tuyuladi.`;
  } else if (diff < 0) {
    desc = `Shamol esishi tufayli haqiqiy haroratdan ${Math.abs(diff)}° sovuqroq tuyuladi.`;
  }

  return (
    <article
      aria-label="Tuyuladigan harorat vidjeti"
      className="rounded-[18px] bg-white/15 backdrop-blur-2xl border border-white/20 p-4 shadow-lg text-white flex flex-col justify-between transition-all duration-300 hover:translate-y-[-2px] min-h-[160px]"
    >
      <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/60">
        <ThermometerIcon size={14} className="text-rose-300" />
        <span>TUYULISHI</span>
      </div>

      <div className="my-2">
        <div className="text-2xl sm:text-3xl font-semibold tracking-tight">
          {formatTemp(feelsLike, unit)}
        </div>
      </div>

      <p className="text-xs text-white/75 border-t border-white/10 pt-2 font-normal leading-relaxed">
        {desc}
      </p>
    </article>
  );
};
