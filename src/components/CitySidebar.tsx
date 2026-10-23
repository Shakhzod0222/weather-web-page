import React, { useEffect, useState } from 'react';
import type { CityWeatherPreview, SavedCity } from '../types/city';
import type { GeocodingResult } from '../types/geocoding';
import type { TemperatureUnit } from '../types/weather';
import { formatTemp } from '../utils/temperature';
import { getCityCurrentTime } from '../utils/time';
import { getWeatherCodeInfo } from '../utils/weatherCode';
import { LocationIcon, TrashIcon, WeatherIcon } from './icons/WeatherIcons';
import { SearchBar } from './SearchBar';

interface CitySidebarProps {
  savedCities: SavedCity[];
  selectedCity: SavedCity;
  unit: TemperatureUnit;
  onSelectCity: (city: SavedCity) => void;
  onAddCity: (city: SavedCity) => void;
  onRemoveCity: (cityId: string) => void;
  onUseCurrentLocation: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const CitySidebar: React.FC<CitySidebarProps> = ({
  savedCities,
  selectedCity,
  unit,
  onSelectCity,
  onAddCity,
  onRemoveCity,
  onUseCurrentLocation,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const [previews, setPreviews] = useState<Record<string, CityWeatherPreview>>({});

  // Saqlangan shaharlar uchun tezkor ob-havo preview yuklash
  useEffect(() => {
    let isMounted = true;

    savedCities.forEach((city) => {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,weather_code,is_day&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1`;

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (!isMounted) return;
          if (data && data.current && data.daily) {
            const isDay = data.current.is_day === 1;
            const info = getWeatherCodeInfo(data.current.weather_code, isDay);
            setPreviews((prev) => ({
              ...prev,
              [city.id]: {
                temp: data.current.temperature_2m,
                weatherCode: data.current.weather_code,
                tempMax: data.daily.temperature_2m_max[0] ?? data.current.temperature_2m,
                tempMin: data.daily.temperature_2m_min[0] ?? data.current.temperature_2m,
                localTime: getCityCurrentTime(city.timezone || data.timezone),
                conditionText: info.labelUz,
              },
            }));
          }
        })
        .catch((err) => {
          console.warn(`Preview fetch xatosi (${city.name}):`, err);
        });
    });

    return () => {
      isMounted = false;
    };
  }, [savedCities]);

  const handleSearchResultSelect = (result: GeocodingResult) => {
    const newCity: SavedCity = {
      id: `${result.latitude.toFixed(4)}_${result.longitude.toFixed(4)}`,
      name: result.name,
      country: result.country,
      admin1: result.admin1,
      latitude: result.latitude,
      longitude: result.longitude,
      timezone: result.timezone,
    };
    onAddCity(newCity);
    onSelectCity(newCity);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-40 w-80 sm:w-88 shrink-0 flex flex-col p-4 gap-4 bg-black/40 lg:bg-white/10 backdrop-blur-2xl border-r border-white/15 transition-transform duration-300 ease-in-out ${
        isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
      aria-label="Shaharlar paneli"
    >
      {/* Tepada Qidiruv inputi */}
      <div className="pt-2">
        <div className="flex items-center justify-between pb-3">
          <h2 className="text-white font-semibold text-lg tracking-tight">Ob-havo</h2>
          <button
            type="button"
            onClick={onUseCurrentLocation}
            title="Mening joylashuvim"
            aria-label="Mening joylashuvim"
            className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-all duration-200 cursor-pointer active:scale-95 border border-white/20"
          >
            <LocationIcon size={16} />
          </button>
        </div>
        <SearchBar onSelectCity={handleSearchResultSelect} />
      </div>

      {/* Saqlangan shaharlar ro'yxati */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 pt-1 custom-scrollbar">
        <div className="text-[11px] font-medium tracking-wider text-white/50 uppercase px-1">
          Saqlangan shaharlar ({savedCities.length})
        </div>

        {savedCities.map((city) => {
          const isSelected = selectedCity.id === city.id;
          const preview = previews[city.id];
          const info = preview
            ? getWeatherCodeInfo(preview.weatherCode, true)
            : null;

          return (
            <div
              key={city.id}
              onClick={() => {
                onSelectCity(city);
                if (onCloseMobile) onCloseMobile();
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onSelectCity(city);
                  if (onCloseMobile) onCloseMobile();
                }
              }}
              aria-selected={isSelected}
              className={`group relative p-4 rounded-[18px] cursor-pointer transition-all duration-250 select-none border text-left ${
                isSelected
                  ? 'bg-white/25 border-white/40 shadow-lg shadow-black/20 ring-1 ring-white/40 translate-y-[-1px]'
                  : 'bg-white/10 hover:bg-white/15 border-white/15 hover:border-white/25 hover:translate-y-[-1px]'
              }`}
            >
              {/* O'chirish tugmasi */}
              {savedCities.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveCity(city.id);
                  }}
                  aria-label={`${city.name} shahrini o'chirish`}
                  className="absolute top-3 right-3 p-1.5 rounded-full text-white/40 hover:text-white hover:bg-black/20 opacity-80 md:opacity-0 md:group-hover:opacity-100 transition-all duration-200 cursor-pointer"
                >
                  <TrashIcon size={14} />
                </button>
              )}

              <div className="flex justify-between items-start pr-6">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-white font-semibold text-base leading-tight">
                      {city.name}
                    </h3>
                    {city.isCurrentLocation && (
                      <span title="Joriy joylashuv">
                        <LocationIcon size={12} className="text-blue-300" />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white/60 pt-0.5">
                    {preview ? preview.localTime : city.country || 'Oʻzbekiston'}
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-light text-white tracking-tight">
                    {preview ? formatTemp(preview.temp, unit) : '--°'}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-end mt-4 pt-1 border-t border-white/10 text-xs text-white/75">
                <span className="truncate max-w-[140px]">
                  {preview ? preview.conditionText : 'Yuklanmoqda...'}
                </span>
                <div className="flex items-center gap-1.5 shrink-0 text-white/80">
                  {info && (
                    <WeatherIcon type={info.iconType} size={16} className="inline" />
                  )}
                  <span>
                    Yu:{preview ? formatTemp(preview.tempMax, unit) : '--'} Pa:
                    {preview ? formatTemp(preview.tempMin, unit) : '--'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pastki qism */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
        <span>Open-Meteo API</span>
        <span>Avtomatik yangilanish</span>
      </div>
    </aside>
  );
};
