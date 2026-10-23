import { useCallback, useEffect, useState } from 'react';

export interface GeolocationCoords {
  latitude: number;
  longitude: number;
}

export interface GeolocationState {
  coords: GeolocationCoords | null;
  loading: boolean;
  error: string | null;
  denied: boolean;
  requestLocation: () => Promise<GeolocationCoords | null>;
}

export const TASHKENT_DEFAULT: GeolocationCoords = {
  latitude: 41.2995,
  longitude: 69.2401,
};

export function useGeolocation(): GeolocationState {
  const [coords, setCoords] = useState<GeolocationCoords | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [denied, setDenied] = useState<boolean>(false);

  const requestLocation = useCallback((): Promise<GeolocationCoords | null> => {
    setLoading(true);
    setError(null);

    return new Promise((resolve) => {
      if (!('geolocation' in navigator)) {
        setError('Geolokatsiya ushbu brauzerda qo\'llab-quvvatlanmaydi');
        setLoading(false);
        setCoords(TASHKENT_DEFAULT);
        resolve(TASHKENT_DEFAULT);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newCoords: GeolocationCoords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setCoords(newCoords);
          setLoading(false);
          setDenied(false);
          resolve(newCoords);
        },
        (err) => {
          console.warn('Geolokatsiya so\'rovi rad etildi yoki xatolik:', err.message);
          setDenied(err.code === err.PERMISSION_DENIED);
          setError(
            err.code === err.PERMISSION_DENIED
              ? 'Joylashuvga ruxsat berilmadi. Toshkent shahri ko\'rsatilmoqda.'
              : 'Joylashuvni aniqlashda xatolik yuz berdi.'
          );
          setLoading(false);
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000,
        }
      );
    });
  }, []);

  useEffect(() => {
    // Sahifa birinchi marta ochilganda geolokatsiyani so'rash
    let mounted = true;

    if (!('geolocation' in navigator)) {
      setError('Geolokatsiya ushbu brauzerda qo\'llab-quvvatlanmaydi');
      setLoading(false);
      setCoords(TASHKENT_DEFAULT);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (!mounted) return;
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        if (!mounted) return;
        setDenied(err.code === err.PERMISSION_DENIED);
        setError('Joylashuv olinmadi, standart shahar faollashtirildi.');
        setLoading(false);
      },
      { timeout: 7000 }
    );

    return () => {
      mounted = false;
    };
  }, []);

  return {
    coords,
    loading,
    error,
    denied,
    requestLocation,
  };
}
