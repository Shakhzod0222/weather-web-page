import type { TemperatureUnit } from '../../types/weather';
import { formatTemp } from '../../utils/temperature';
import { DropletIcon } from '../icons/WeatherIcons';

interface HumidityWidgetProps {
  humidity: number; // %
  dewPoint: number; // °C
  unit: TemperatureUnit;
}

export const HumidityWidget: React.FC<HumidityWidgetProps> = ({
  humidity,
  dewPoint,
  unit,
}) => {
  let comment = 'Havo qulay va me\'yoriy darajada.';
  if (humidity > 70) {
    comment = 'Havo ancha nam, dimlik sezilishi mumkin.';
  } else if (humidity < 30) {
    comment = 'Havo juda quruq, yetarlicha suv iching.';
  }

  return (
    <article
      aria-label="Namlik vidjeti"
      className="rounded-[18px] bg-white/15 backdrop-blur-2xl border border-white/20 p-4 shadow-lg text-white flex flex-col justify-between transition-all duration-300 hover:translate-y-[-2px] min-h-[160px]"
    >
      <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/60">
        <DropletIcon size={14} className="text-sky-300" />
        <span>NAMLiK</span>
      </div>

      <div className="my-2">
        <div className="text-2xl sm:text-3xl font-semibold tracking-tight">
          {Math.round(humidity)}%
        </div>
        <p className="text-xs text-white/80 mt-1">{comment}</p>
      </div>

      <div className="text-xs text-white/70 border-t border-white/10 pt-2 flex items-center justify-between">
        <span>Shudring nuqtasi:</span>
        <span className="font-medium text-white/90">
          {formatTemp(dewPoint, unit)}
        </span>
      </div>
    </article>
  );
};
