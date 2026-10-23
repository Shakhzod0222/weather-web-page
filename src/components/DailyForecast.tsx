import type { DailyItem, TemperatureUnit } from '../types/weather';
import { formatTemp } from '../utils/temperature';
import { getWeatherCodeInfo } from '../utils/weatherCode';
import { CalendarIcon, WeatherIcon } from './icons/WeatherIcons';

interface DailyForecastProps {
  items: DailyItem[];
  unit: TemperatureUnit;
  minTemp10Day: number;
  maxTemp10Day: number;
  currentTemp: number;
}

export const DailyForecast: React.FC<DailyForecastProps> = ({
  items,
  unit,
  minTemp10Day,
  maxTemp10Day,
  currentTemp,
}) => {
  const tempRange = Math.max(1, maxTemp10Day - minTemp10Day);

  return (
    <section
      aria-label="10 kunlik ob-havo bashorati"
      className="w-full rounded-[18px] bg-white/15 backdrop-blur-2xl border border-white/20 p-4 shadow-lg text-white transition-all duration-300 hover:translate-y-[-2px]"
    >
      {/* Sarlavha */}
      <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/60 mb-3 border-b border-white/10 pb-2.5">
        <CalendarIcon size={14} />
        <span>10 KUNLIK BASHORAT</span>
      </div>

      {/* Kunlar ro'yxati */}
      <div className="space-y-3">
        {items.map((item, index) => {
          const isToday = index === 0;
          const info = getWeatherCodeInfo(item.weatherCode, true);

          // Bar foizlari
          const leftPct = Math.max(
            0,
            Math.min(100, ((item.tempMin - minTemp10Day) / tempRange) * 100)
          );
          const rightPct = Math.max(
            0,
            Math.min(100, ((item.tempMax - minTemp10Day) / tempRange) * 100)
          );
          const barWidthPct = Math.max(8, rightPct - leftPct);

          // Joriy harorat nuqtasi (faqat bugun uchun)
          const currentDotPct = Math.max(
            0,
            Math.min(100, ((currentTemp - minTemp10Day) / tempRange) * 100)
          );

          return (
            <div
              key={item.date}
              className="flex items-center justify-between gap-3 text-sm font-medium py-1 group"
            >
              {/* Kun nomi */}
              <span className={`w-14 truncate ${isToday ? 'font-bold text-white' : 'text-white/80'}`}>
                {item.dayName}
              </span>

              {/* Ikonka */}
              <div className="w-8 flex items-center justify-center shrink-0">
                <WeatherIcon type={info.iconType} size={22} />
              </div>

              {/* Min harorat */}
              <span className="w-9 text-right text-white/60 shrink-0 font-medium">
                {formatTemp(item.tempMin, unit)}
              </span>

              {/* Gradient diapazon chizig'i */}
              <div className="relative flex-1 h-1.5 rounded-full bg-black/25 overflow-hidden shrink min-w-[70px]">
                <div
                  className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-[#60a5fa] via-[#facc15] to-[#f97316]"
                  style={{
                    left: `${leftPct}%`,
                    width: `${barWidthPct}%`,
                  }}
                />

                {/* Bugungi joriy harorat nuqtasi */}
                {isToday && (
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white border border-black/40 shadow-sm z-10 -ml-1.25"
                    style={{
                      left: `${currentDotPct}%`,
                    }}
                    title={`Hozirgi harorat: ${formatTemp(currentTemp, unit)}`}
                  />
                )}
              </div>

              {/* Max harorat */}
              <span className="w-9 text-left text-white shrink-0 font-semibold">
                {formatTemp(item.tempMax, unit)}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
