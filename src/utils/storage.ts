import type { SavedCity } from '../types/city';
import type { TemperatureUnit } from '../types/weather';

const CITIES_KEY = 'weather_saved_cities_v1';
const UNIT_KEY = 'weather_temp_unit_v1';
const SELECTED_CITY_KEY = 'weather_selected_city_v1';

export const DEFAULT_CITIES: SavedCity[] = [
  {
    id: 'tashkent',
    name: 'Toshkent',
    country: 'Oʻzbekiston',
    latitude: 41.2995,
    longitude: 69.2401,
    timezone: 'Asia/Tashkent',
  },
  {
    id: 'samarkand',
    name: 'Samarqand',
    country: 'Oʻzbekiston',
    latitude: 39.6542,
    longitude: 66.9597,
    timezone: 'Asia/Samarkand',
  },
  {
    id: 'bukhara',
    name: 'Buxoro',
    country: 'Oʻzbekiston',
    latitude: 39.7747,
    longitude: 64.4286,
    timezone: 'Asia/Samarkand',
  },
];

export function getSavedCities(): SavedCity[] {
  try {
    const raw = localStorage.getItem(CITIES_KEY);
    if (!raw) return DEFAULT_CITIES;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return DEFAULT_CITIES;
  } catch {
    return DEFAULT_CITIES;
  }
}

export function saveCities(cities: SavedCity[]): void {
  try {
    localStorage.setItem(CITIES_KEY, JSON.stringify(cities));
  } catch (err) {
    console.error('Shahar ro\'yxatini saqlashda xatolik:', err);
  }
}

export function getSavedUnit(): TemperatureUnit {
  try {
    const raw = localStorage.getItem(UNIT_KEY);
    return raw === 'F' ? 'F' : 'C';
  } catch {
    return 'C';
  }
}

export function saveUnit(unit: TemperatureUnit): void {
  try {
    localStorage.setItem(UNIT_KEY, unit);
  } catch (err) {
    console.error('Birlikni saqlashda xatolik:', err);
  }
}

export function getSavedSelectedCity(): SavedCity | null {
  try {
    const raw = localStorage.getItem(SELECTED_CITY_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveSelectedCity(city: SavedCity): void {
  try {
    localStorage.setItem(SELECTED_CITY_KEY, JSON.stringify(city));
  } catch (err) {
    console.error('Tanlangan shaharni saqlashda xatolik:', err);
  }
}
