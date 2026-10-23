import React from 'react';
import type { SavedCity } from '../types/city';
import type { TemperatureUnit, WeatherData } from '../types/weather';
import { formatTemp } from '../utils/temperature';
import { formatRelativeTime } from '../utils/time';
import { getWeatherCodeInfo } from '../utils/weatherCode';
import {
  CheckIcon,
  MenuIcon,
  PlusIcon,
  RefreshCwIcon,
  WeatherIcon,
} from './icons/WeatherIcons';
import { UnitToggle } from './UnitToggle';

interface CurrentWeatherProps {
  city: SavedCity;
  weather: WeatherData;
  unit: TemperatureUnit;
  lastUpdated: Date | null;
  onRefresh: () => void;
  onToggleUnit: (unit: TemperatureUnit) => void;
  isSaved: boolean;
  onToggleSaveCity: () => void;
  onOpenMobileMenu: () => void;
  isRefreshing?: boolean;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  city,
  weather,
  unit,
  lastUpdated,
  onRefresh,
  onToggleUnit,
  isSaved,
  onToggleSaveCity,
  onOpenMobileMenu,
  isRefreshing = false,
}) => {
  const info = getWeatherCodeInfo(
    weather.current.weatherCode,
    weather.current.isDay
  );

  return (
    <header className="relative w-full pt-4 pb-6 flex flex-col items-center text-center text-white select-none">
      {/* Yuqori boshqaruv paneli */}
      <div className="w-full flex items-center justify-between px-2 sm:px-4 mb-6">
        <div className="flex items-center gap-2">
          {/* Mobil menyu tugmasi */}
          <button
            type="button"
            onClick={onOpenMobileMenu}
            aria-label="Shaharlar menyusini ochish"
            className="lg:hidden p-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-all duration-200 cursor-pointer active:scale-95"
          >
            <MenuIcon size={20} />
          </button>

          {/* Shaharni saqlash tugmasi */}
          <button
            type="button"
            onClick={onToggleSaveCity}
            aria-label={isSaved ? "Shahar saqlangan" : "Shaharni saqlash"}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border backdrop-blur-md transition-all duration-200 cursor-pointer ${
              isSaved
                ? 'bg-white/25 border-white/40 text-white'
                : 'bg-white/10 hover:bg-white/20 border-white/20 text-white/80 hover:text-white'
            }`}
          >
            {isSaved ? (
              <>
                <CheckIcon size={14} className="text-emerald-300" />
                <span>Saqlangan</span>
              </>
            ) : (
              <>
                <PlusIcon size={14} />
                <span>Saqlash</span>
              </>
            )}
          </button>
        </div>

        <div className="flex items-center gap-3">
          <UnitToggle unit={unit} onChange={onToggleUnit} />

          {/* Yangilash tugmasi */}
          <button
            type="button"
            onClick={onRefresh}
            aria-label="Ob-havoni yangilash"
            title="Yangilash"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-all duration-200 cursor-pointer active:scale-95"
          >
            <RefreshCwIcon
              size={16}
              className={isRefreshing ? 'animate-spin' : ''}
            />
          </button>
        </div>
      </div>

      {/* Shahar nomi va joylashuv */}
      <div className="space-y-1">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white drop-shadow-md">
          {city.name}
        </h1>
        <p className="text-xs sm:text-sm text-white/70 font-normal">
          {[city.admin1, city.country].filter(Boolean).join(', ')}
        </p>
      </div>

      {/* Juda katta harorat (96px, yengil vazn) */}
      <div className="my-2 flex items-center justify-center">
        <span className="text-[80px] sm:text-[96px] md:text-[104px] font-thin leading-none tracking-tighter text-white drop-shadow-lg">
          {formatTemp(weather.current.temperature, unit, false)}
        </span>
        <span className="text-4xl sm:text-5xl font-extralight text-white/80 self-start mt-2">
          °
        </span>
      </div>

      {/* Holat matni va Ikonka */}
      <div className="flex items-center justify-center gap-2 text-lg sm:text-xl font-medium text-white/90 drop-shadow">
        <WeatherIcon type={info.iconType} size={24} />
        <span>{info.labelUz}</span>
      </div>

      {/* Yuqori / Past harorat */}
      <div className="mt-2 text-sm sm:text-base font-normal text-white/80 flex items-center gap-3">
        <span>Yu: {formatTemp(weather.current.tempMaxToday, unit)}</span>
        <span className="w-1 h-1 rounded-full bg-white/40" />
        <span>Pa: {formatTemp(weather.current.tempMinToday, unit)}</span>
      </div>

      {/* Oxirgi yangilanish vaqti */}
      <div className="mt-3 text-xs text-white/60 font-light flex items-center gap-1.5">
        <span>Oxirgi yangilanish: {formatRelativeTime(lastUpdated)}</span>
      </div>
    </header>
  );
};
