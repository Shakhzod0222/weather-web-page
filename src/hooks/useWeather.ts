import { useCallback, useEffect, useRef, useState } from 'react';
import type {
  DailyItem,
  HourlyItem,
  OpenMeteoResponse,
  WeatherData,
} from '../types/weather';
import { formatHourlyTime, formatTimeOnly, getDayName } from '../utils/time';

const AUTO_REFRESH_INTERVAL_MS = 5 * 60 * 1000; // 5 daqiqa

export function useWeather(latitude: number | null, longitude: number | null) {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchWeather = useCallback(
    async (isBackground = false) => {
      if (latitude === null || longitude === null) return;

      if (!isBackground) {
        setLoading(true);
      }
      setError(null);

      // Oldingi so'rovni bekor qilish
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;

      const params = new URLSearchParams({
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        current: [
          'temperature_2m',
          'apparent_temperature',
          'relative_humidity_2m',
          'surface_pressure',
          'wind_speed_10m',
          'wind_direction_10m',
          'wind_gusts_10m',
          'dew_point_2m',
          'weather_code',
          'is_day',
        ].join(','),
        hourly: [
          'temperature_2m',
          'weather_code',
          'visibility',
          'is_day',
        ].join(','),
        daily: [
          'temperature_2m_max',
          'temperature_2m_min',
          'weather_code',
          'sunrise',
          'sunset',
          'uv_index_max',
          'precipitation_sum',
        ].join(','),
        timezone: 'auto',
        forecast_days: '10',
      });

      const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;

      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          throw new Error(`Ob-havo ma'lumotlarini yuklab bo'lmadi (Status: ${res.status})`);
        }
        const json: OpenMeteoResponse = await res.json();

        // 1. Hourly ma'lumotlarni saralash va quyosh chiqishi/botishi nuqtalarini qo'shish
        const now = new Date();
        const currentIsoHour = now.toISOString().slice(0, 13); // YYYY-MM-DDTHH

        // Boshlang'ich indeksni topish (hozirgi soatga eng yaqin)
        let startIndex = 0;
        for (let i = 0; i < json.hourly.time.length; i++) {
          if (json.hourly.time[i].slice(0, 13) >= currentIsoHour) {
            startIndex = i;
            break;
          }
        }

        const hourlySliceTimes = json.hourly.time.slice(startIndex, startIndex + 25);
        const hourlyItems: HourlyItem[] = [];

        // Quyosh chiqishi va botishi voqealari (bugun va keyingi 2 kun)
        const sunEvents: {
          time: string;
          type: 'sunrise' | 'sunset';
          label: string;
        }[] = [];

        for (let d = 0; d < Math.min(3, json.daily.time.length); d++) {
          if (json.daily.sunrise[d]) {
            sunEvents.push({
              time: json.daily.sunrise[d],
              type: 'sunrise',
              label: 'Quyosh chiqishi',
            });
          }
          if (json.daily.sunset[d]) {
            sunEvents.push({
              time: json.daily.sunset[d],
              type: 'sunset',
              label: 'Quyosh botishi',
            });
          }
        }

        hourlySliceTimes.forEach((isoTime, idx) => {
          const globalIdx = startIndex + idx;
          const isFirst = idx === 0;

          // Ushbu soatdan oldin o'tadigan sun event bormi?
          const currentSlotTime = new Date(isoTime).getTime();
          const prevSlotTime =
            idx > 0
              ? new Date(hourlySliceTimes[idx - 1]).getTime()
              : currentSlotTime - 60 * 60 * 1000;

          sunEvents.forEach((ev) => {
            const evTime = new Date(ev.time).getTime();
            if (evTime > prevSlotTime && evTime <= currentSlotTime) {
              hourlyItems.push({
                time: ev.time,
                displayTime: formatTimeOnly(ev.time, json.timezone),
                temp: json.hourly.temperature_2m[globalIdx],
                weatherCode: json.hourly.weather_code[globalIdx],
                isDay: ev.type === 'sunrise',
                visibility: json.hourly.visibility[globalIdx],
                isSpecialSunEvent: ev.type,
                specialLabel: ev.label,
              });
            }
          });

          hourlyItems.push({
            time: isoTime,
            displayTime: formatHourlyTime(isoTime, isFirst, json.timezone),
            temp: json.hourly.temperature_2m[globalIdx],
            weatherCode: json.hourly.weather_code[globalIdx],
            isDay: json.hourly.is_day[globalIdx] === 1,
            visibility: json.hourly.visibility[globalIdx],
          });
        });

        // 2. 10 kunlik ma'lumotlar
        let minTemp10Day = Infinity;
        let maxTemp10Day = -Infinity;

        const dailyItems: DailyItem[] = json.daily.time.map((dateStr, idx) => {
          const min = json.daily.temperature_2m_min[idx];
          const max = json.daily.temperature_2m_max[idx];
          if (min < minTemp10Day) minTemp10Day = min;
          if (max > maxTemp10Day) maxTemp10Day = max;

          return {
            date: dateStr,
            dayName: getDayName(dateStr, idx === 0),
            weatherCode: json.daily.weather_code[idx],
            tempMin: min,
            tempMax: max,
            sunrise: json.daily.sunrise[idx],
            sunset: json.daily.sunset[idx],
            uvIndexMax: json.daily.uv_index_max[idx],
            precipitationSum: json.daily.precipitation_sum[idx],
          };
        });

        const weatherResult: WeatherData = {
          latitude: json.latitude,
          longitude: json.longitude,
          timezone: json.timezone,
          current: {
            time: json.current.time,
            temperature: json.current.temperature_2m,
            feelsLike: json.current.apparent_temperature,
            humidity: json.current.relative_humidity_2m,
            pressure: json.current.surface_pressure,
            windSpeed: json.current.wind_speed_10m,
            windDirection: json.current.wind_direction_10m,
            windGusts: json.current.wind_gusts_10m,
            dewPoint: json.current.dew_point_2m,
            weatherCode: json.current.weather_code,
            isDay: json.current.is_day === 1,
            tempMinToday: json.daily.temperature_2m_min[0] ?? json.current.temperature_2m,
            tempMaxToday: json.daily.temperature_2m_max[0] ?? json.current.temperature_2m,
          },
          hourly: hourlyItems,
          daily: dailyItems,
          minTemp10Day: isFinite(minTemp10Day) ? minTemp10Day : 0,
          maxTemp10Day: isFinite(maxTemp10Day) ? maxTemp10Day : 30,
        };

        setData(weatherResult);
        setLastUpdated(new Date());
        setLoading(false);
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          // So'rov bekor qilingan, holatni o'zgartirmaymiz
          return;
        }
        console.error('Ob-havoni yuklashda xatolik:', err);
        setError(
          err instanceof Error
            ? err.message
            : 'Ob-havo ma\'lumotlarini yuklashda kutilmagan xatolik yuz berdi'
        );
        setLoading(false);
      }
    },
    [latitude, longitude]
  );

  // Koordinatalar o'zgarganda yuklash
  useEffect(() => {
    fetchWeather();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchWeather]);

  // Real vaqtda yangilanish: har 5 daqiqada avtomatik va visibilitychange da
  useEffect(() => {
    const timer = setInterval(() => {
      fetchWeather(true);
    }, AUTO_REFRESH_INTERVAL_MS);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchWeather(true);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchWeather]);

  return {
    data,
    loading,
    error,
    lastUpdated,
    refresh: () => fetchWeather(false),
  };
}
