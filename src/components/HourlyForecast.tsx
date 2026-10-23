import type { HourlyItem, TemperatureUnit } from '../types/weather';
import { formatTemp } from '../utils/temperature';
import { getWeatherCodeInfo } from '../utils/weatherCode';
import { ClockIcon, SunriseIcon, SunsetIcon, WeatherIcon } from './icons/WeatherIcons';

interface HourlyForecastProps {
  items: HourlyItem[];
  unit: TemperatureUnit;
  summaryText: string;
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({
  items,
  unit,
  summaryText,
}) => {
  return (
    <section
      aria-label="Soatlik ob-havo bashorati"
      className="w-full rounded-[18px] bg-white/15 backdrop-blur-2xl border border-white/20 p-4 shadow-lg text-white transition-all duration-300 hover:translate-y-[-2px]"
    >
      {/* Sarlavha va Xulosa */}
      <div className="border-b border-white/10 pb-3">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/60 mb-1.5">
          <ClockIcon size={14} />
          <span>SOATLIK BASHORAT</span>
        </div>
        <p className="text-sm font-medium text-white/90 leading-snug">
          {summaryText}
        </p>
      </div>

      {/* Gorizontal Scroll Ro'yxat */}
      <div className="flex items-center gap-6 overflow-x-auto pt-4 pb-2 px-1 custom-scrollbar scroll-smooth">
        {items.map((item, index) => {
          if (item.isSpecialSunEvent) {
            const isSunrise = item.isSpecialSunEvent === 'sunrise';
            return (
              <div
                key={`sun-${index}-${item.time}`}
                className="flex flex-col items-center justify-between shrink-0 min-w-[70px] space-y-2 py-1 px-2 rounded-xl bg-white/10 border border-white/20"
              >
                <span className="text-xs font-semibold text-amber-200">
                  {item.displayTime}
                </span>
                <div className="my-1">
                  {isSunrise ? (
                    <SunriseIcon size={28} />
                  ) : (
                    <SunsetIcon size={28} />
                  )}
                </div>
                <span className="text-[11px] font-medium text-white/80 text-center leading-tight">
                  {isSunrise ? 'Quyosh chiqishi' : 'Quyosh botishi'}
                </span>
              </div>
            );
          }

          const info = getWeatherCodeInfo(item.weatherCode, item.isDay);

          return (
            <div
              key={`hour-${index}-${item.time}`}
              className="flex flex-col items-center justify-between shrink-0 min-w-[54px] space-y-3 py-1 group"
            >
              <span className="text-xs font-medium text-white/80">
                {item.displayTime}
              </span>

              <div className="transition-transform duration-200 group-hover:scale-110">
                <WeatherIcon type={info.iconType} size={28} />
              </div>

              <span className="text-base font-semibold text-white tracking-tight">
                {formatTemp(item.temp, unit)}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
