export interface SavedCity {
  id: string; // latitude_longitude or unique string
  name: string;
  country?: string;
  admin1?: string;
  latitude: number;
  longitude: number;
  timezone?: string;
  isCurrentLocation?: boolean;
}

export interface CityWeatherPreview {
  temp: number;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  localTime: string;
  conditionText: string;
}
