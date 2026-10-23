import type { TemperatureUnit } from '../../types/weather';
import { SparklesIcon } from '../icons/WeatherIcons';

interface AveragesWidgetProps {
  todayAvg: number;
  overallAvg: number;
  unit: TemperatureUnit;
}

export const AveragesWidget: React.FC<AveragesWidgetProps> = ({
  todayAvg,
  overallAvg,
  unit,
}) => {
  // Farq (Celsiyda)
  let diff = Math.round(todayAvg - overallAvg);
  if (unit === 'F') {
    diff = Math.round((diff * 9) / 5);
  }

  const sign = diff > 0 ? '+' : '';
  let desc = 'Bugungi harorat odatdagi o\'rtacha ko\'rsatkich bilan bir xil.';

  if (diff > 0) {
    desc = `Bugungi o'rtacha harorat davr me'yoridan ${diff}° yuqoriroq (iliqroq).`;
  } else if (diff < 0) {
    desc = `Bugungi o'rtacha harorat me'yordan ${Math.abs(diff)}° pastroq (salqinroq).`;
  }

  return (
    <article
      aria-label="O'rtacha ko'rsatkichlar vidjeti"
      className="rounded-[18px] bg-white/15 backdrop-blur-2xl border border-white/20 p-4 shadow-lg text-white flex flex-col justify-between transition-all duration-300 hover:translate-y-[-2px] min-h-[160px]"
    >
      <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/60">
        <SparklesIcon size={14} className="text-amber-300" />
        <span>O'RTACHALAR</span>
      </div>

      <div className="my-2">
        <div className="text-2xl sm:text-3xl font-semibold tracking-tight">
          {sign}{diff}°
        </div>
        <p className="text-xs text-white/80 mt-1">Me'yorga nisbatan farq</p>
      </div>

      <p className="text-xs text-white/75 border-t border-white/10 pt-2 font-normal leading-relaxed">
        {desc}
      </p>
    </article>
  );
};
