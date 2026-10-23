import React, { useEffect, useMemo, useState } from 'react';
import { CitySidebar } from './components/CitySidebar';
import { CurrentWeather } from './components/CurrentWeather';
import { DailyForecast } from './components/DailyForecast';
import { ErrorView } from './components/ErrorView';
import { HourlyForecast } from './components/HourlyForecast';
import { SkeletonLoader } from './components/SkeletonLoader';
import { AveragesWidget } from './components/widgets/AveragesWidget';
import { FeelsLikeWidget } from './components/widgets/FeelsLikeWidget';
import { HumidityWidget } from './components/widgets/HumidityWidget';
import { MoonPhaseWidget } from './components/widgets/MoonPhaseWidget';
import { PrecipitationWidget } from './components/widgets/PrecipitationWidget';
import { PressureWidget } from './components/widgets/PressureWidget';
import { SunsetWidget } from './components/widgets/SunsetWidget';
import { UvIndexWidget } from './components/widgets/UvIndexWidget';
import { VisibilityWidget } from './components/widgets/VisibilityWidget';
import { WindWidget } from './components/widgets/WindWidget';
import { useGeolocation } from './hooks/useGeolocation';
import { useWeather } from './hooks/useWeather';
import type { SavedCity } from './types/city';
import type { TemperatureUnit } from './types/weather';
import {
  DEFAULT_CITIES,
  getSavedCities,
  getSavedSelectedCity,
  getSavedUnit,
  saveCities,
  saveSelectedCity,
  saveUnit,
} from './utils/storage';
import { getBackgroundGradient, getWeatherCodeInfo } from './utils/weatherCode';

export const App: React.FC = () => {
  // 1. Holatlar (States)
  const [savedCities, setSavedCities] = useState<SavedCity[]>(() => getSavedCities());
  const [unit, setUnit] = useState<TemperatureUnit>(() => getSavedUnit());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Tanlangan shahar: saqlanganidan yoki Toshkentdan
  const [selectedCity, setSelectedCity] = useState<SavedCity>(() => {
    const cached = getSavedSelectedCity();
    if (cached) return cached;
    const cities = getSavedCities();
    return cities[0] || DEFAULT_CITIES[0];
  });

  // 2. Geolokatsiya hooki
  const { coords: geoCoords, requestLocation } = useGeolocation();

  // Agar dastlab geolokatsiya aniqlansa va foydalanuvchi hali shahar tanlamagan bo'lsa
  useEffect(() => {
    if (geoCoords && !getSavedSelectedCity()) {
      const geoCity: SavedCity = {
        id: `geo_${geoCoords.latitude.toFixed(4)}_${geoCoords.longitude.toFixed(4)}`,
        name: 'Mening joylashuvim',
        latitude: geoCoords.latitude,
        longitude: geoCoords.longitude,
        isCurrentLocation: true,
      };
      setSelectedCity(geoCity);
      // Agar ro'yxatda yo'q bo'lsa boshiga qo'shish
      setSavedCities((prev) => {
        const exists = prev.some((c) => c.id === geoCity.id);
        if (exists) return prev;
        const updated = [geoCity, ...prev];
        saveCities(updated);
        return updated;
      });
    }
  }, [geoCoords]);

  // 3. Ob-havo hooki
  const { data: weather, loading, error, lastUpdated, refresh } = useWeather(
    selectedCity.latitude,
    selectedCity.longitude
  );

  // 4. Birlik (C/F) o'zgarganda saqlash
  const handleToggleUnit = (newUnit: TemperatureUnit) => {
    setUnit(newUnit);
    saveUnit(newUnit);
  };

  // 5. Shahar tanlanganda
  const handleSelectCity = (city: SavedCity) => {
    setSelectedCity(city);
    saveSelectedCity(city);
  };

  // 6. Shahar qo'shish
  const handleAddCity = (newCity: SavedCity) => {
    setSavedCities((prev) => {
      const filtered = prev.filter((c) => c.id !== newCity.id);
      const updated = [newCity, ...filtered];
      saveCities(updated);
      return updated;
    });
  };

  // 7. Shahar o'chirish
  const handleRemoveCity = (cityId: string) => {
    setSavedCities((prev) => {
      const updated = prev.filter((c) => c.id !== cityId);
      saveCities(updated);
      if (selectedCity.id === cityId && updated.length > 0) {
        setSelectedCity(updated[0]);
        saveSelectedCity(updated[0]);
      }
      return updated;
    });
  };

  // 8. Joriy shaharni saqlanganlarga qo'shish/o'chirish toggle
  const isCurrentCitySaved = useMemo(() => {
    return savedCities.some((c) => c.id === selectedCity.id);
  }, [savedCities, selectedCity]);

  const handleToggleSaveCurrentCity = () => {
    if (isCurrentCitySaved) {
      if (savedCities.length > 1) {
        handleRemoveCity(selectedCity.id);
      }
    } else {
      handleAddCity(selectedCity);
    }
  };

  // 9. Joylashuvim tugmasi
  const handleUseCurrentLocation = async () => {
    const loc = await requestLocation();
    if (loc) {
      const geoCity: SavedCity = {
        id: `geo_${loc.latitude.toFixed(4)}_${loc.longitude.toFixed(4)}`,
        name: 'Mening joylashuvim',
        latitude: loc.latitude,
        longitude: loc.longitude,
        isCurrentLocation: true,
      };
      handleAddCity(geoCity);
      handleSelectCity(geoCity);
    }
  };

  // 10. Fon gradientini ob-havo holatiga qarab hisoblash
  const bgGradient = useMemo(() => {
    if (!weather) {
      return 'from-[#0b1d3a] via-[#112a52] to-[#1b3a6b]'; // tungi/neytral ko'k
    }
    const info = getWeatherCodeInfo(
      weather.current.weatherCode,
      weather.current.isDay
    );
    return getBackgroundGradient(info.theme);
  }, [weather?.current?.weatherCode, weather?.current?.isDay]);

  // 11. O'rtacha harorat va xulosa matni hisoblash
  const { todayAvg, overallAvg, nextDaysPrecipSum, summaryText } = useMemo(() => {
    if (!weather) {
      return { todayAvg: 0, overallAvg: 0, nextDaysPrecipSum: 0, summaryText: '' };
    }

    const tMin = weather.current.tempMinToday;
    const tMax = weather.current.tempMaxToday;
    const tAvg = (tMin + tMax) / 2;

    const allAvgs = weather.daily.map((d) => (d.tempMin + d.tempMax) / 2);
    const oAvg =
      allAvgs.length > 0
        ? allAvgs.reduce((a, b) => a + b, 0) / allAvgs.length
        : tAvg;

    const nextPrecip = weather.daily
      .slice(1, 4)
      .reduce((sum, d) => sum + (d.precipitationSum || 0), 0);

    const info = getWeatherCodeInfo(
      weather.current.weatherCode,
      weather.current.isDay
    );

    return {
      todayAvg: tAvg,
      overallAvg: oAvg,
      nextDaysPrecipSum: nextPrecip,
      summaryText: info.summary,
    };
  }, [
    weather?.current?.tempMinToday,
    weather?.current?.tempMaxToday,
    weather?.daily,
    weather?.current?.weatherCode,
    weather?.current?.isDay,
  ]);

  return (
    <div
      className={`min-h-screen min-h-[100dvh] w-full flex bg-gradient-to-b ${bgGradient} text-white transition-colors duration-700 font-sans selection:bg-white/30`}
    >
      {/* Mobil menyu overlay */}
      {isMobileMenuOpen && (
        <div
          role="presentation"
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden transition-opacity"
        />
      )}

      {/* 1. Chap Sidebar */}
      <CitySidebar
        savedCities={savedCities}
        selectedCity={selectedCity}
        unit={unit}
        onSelectCity={handleSelectCity}
        onAddCity={handleAddCity}
        onRemoveCity={handleRemoveCity}
        onUseCurrentLocation={handleUseCurrentLocation}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* 2. Asosiy Kontent qismi */}
      <main className="flex-1 min-w-0 flex flex-col items-center px-3 sm:px-6 lg:px-8 py-4 sm:py-6 overflow-y-auto max-w-6xl mx-auto custom-scrollbar">
        {loading && !weather ? (
          <SkeletonLoader />
        ) : error && !weather ? (
          <ErrorView message={error} onRetry={refresh} />
        ) : weather ? (
          <div className="w-full max-w-4xl space-y-6 animate-fade-in pb-12">
            {/* Tepada markazda: Asosiy ob-havo kartasi */}
            <CurrentWeather
              city={selectedCity}
              weather={weather}
              unit={unit}
              lastUpdated={lastUpdated}
              onRefresh={refresh}
              onToggleUnit={handleToggleUnit}
              isSaved={isCurrentCitySaved}
              onToggleSaveCity={handleToggleSaveCurrentCity}
              onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
              isRefreshing={loading}
            />

            {/* Soatlik karta */}
            <HourlyForecast
              items={weather.hourly}
              unit={unit}
              summaryText={summaryText}
            />

            {/* Desktopda 2 ustunli tuzilma: Chapda 10 kunlik, o'ngda Vidjetlar */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* 10 kunlik bashorat kartasi */}
              <div className="w-full">
                <DailyForecast
                  items={weather.daily}
                  unit={unit}
                  minTemp10Day={weather.minTemp10Day}
                  maxTemp10Day={weather.maxTemp10Day}
                  currentTemp={weather.current.temperature}
                />
              </div>

              {/* Vidjetlar Grid'i (2 ustun kvadrat kartalar) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. UV INDEX */}
                <UvIndexWidget uvIndex={weather.daily[0]?.uvIndexMax ?? 0} />

                {/* 2. SUNSET */}
                <SunsetWidget
                  sunsetIso={weather.daily[0]?.sunset || ''}
                  sunriseIso={weather.daily[0]?.sunrise || ''}
                  timezone={weather.timezone}
                  isDay={weather.current.isDay}
                />

                {/* 3. WIND */}
                <WindWidget
                  windSpeed={weather.current.windSpeed}
                  windDirection={weather.current.windDirection}
                  windGusts={weather.current.windGusts}
                />

                {/* 4. MOON PHASE */}
                <MoonPhaseWidget />

                {/* 5. HUMIDITY */}
                <HumidityWidget
                  humidity={weather.current.humidity}
                  dewPoint={weather.current.dewPoint}
                  unit={unit}
                />

                {/* 6. VISIBILITY */}
                <VisibilityWidget
                  visibilityMeters={weather.hourly[0]?.visibility ?? 10000}
                />

                {/* 7. PRESSURE */}
                <PressureWidget pressureHpa={weather.current.pressure} />

                {/* 8. FEELS LIKE */}
                <FeelsLikeWidget
                  feelsLike={weather.current.feelsLike}
                  actualTemp={weather.current.temperature}
                  unit={unit}
                />

                {/* 9. PRECIPITATION */}
                <PrecipitationWidget
                  precipitationSumToday={weather.daily[0]?.precipitationSum ?? 0}
                  nextDaysPrecipitationSum={nextDaysPrecipSum}
                />

                {/* 10. AVERAGES */}
                <AveragesWidget
                  todayAvg={todayAvg}
                  overallAvg={overallAvg}
                  unit={unit}
                />
              </div>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
};

export default App;
