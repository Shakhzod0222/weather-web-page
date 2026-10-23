import type { TemperatureUnit } from '../types/weather';

export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

export function formatTemp(
  celsius: number,
  unit: TemperatureUnit,
  includeSymbol = true
): string {
  const value = unit === 'F' ? celsiusToFahrenheit(celsius) : celsius;
  const rounded = Math.round(value);
  return includeSymbol ? `${rounded}°` : `${rounded}`;
}
