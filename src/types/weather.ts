export interface CurrentWeatherRaw {
  time: string;
  interval?: number;
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  surface_pressure: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  wind_gusts_10m: number;
  dew_point_2m: number;
  weather_code: number;
  is_day: number;
}

export interface HourlyForecastRaw {
  time: string[];
  temperature_2m: number[];
  weather_code: number[];
  visibility: number[];
  is_day: number[];
}

export interface DailyForecastRaw {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weather_code: number[];
  sunrise: string[];
  sunset: string[];
  uv_index_max: number[];
  precipitation_sum: number[];
}

export interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current: CurrentWeatherRaw;
  hourly: HourlyForecastRaw;
  daily: DailyForecastRaw;
}

export type TemperatureUnit = 'C' | 'F';

export interface HourlyItem {
  time: string; // ISO
  displayTime: string;
  temp: number;
  weatherCode: number;
  isDay: boolean;
  visibility: number;
  isSpecialSunEvent?: 'sunrise' | 'sunset';
  specialLabel?: string;
}

export interface DailyItem {
  date: string; // YYYY-MM-DD
  dayName: string;
  weatherCode: number;
  tempMin: number;
  tempMax: number;
  sunrise: string;
  sunset: string;
  uvIndexMax: number;
  precipitationSum: number;
}

export interface WeatherData {
  latitude: number;
  longitude: number;
  timezone: string;
  current: {
    time: string;
    temperature: number;
    feelsLike: number;
    humidity: number;
    pressure: number;
    windSpeed: number;
    windDirection: number;
    windGusts: number;
    dewPoint: number;
    weatherCode: number;
    isDay: boolean;
    tempMinToday: number;
    tempMaxToday: number;
  };
  hourly: HourlyItem[];
  daily: DailyItem[];
  minTemp10Day: number;
  maxTemp10Day: number;
}
