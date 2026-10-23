export type WeatherIconType =
  | 'sun'
  | 'moon'
  | 'partly-cloudy-day'
  | 'partly-cloudy-night'
  | 'cloudy'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'heavy-rain'
  | 'freezing-rain'
  | 'snow'
  | 'heavy-snow'
  | 'thunderstorm'
  | 'thunderstorm-rain';

export type WeatherTheme =
  | 'clear-day'
  | 'clear-night'
  | 'cloudy-day'
  | 'cloudy-night'
  | 'rain'
  | 'heavy-rain'
  | 'snow'
  | 'thunder'
  | 'fog';

export interface WeatherCodeInfo {
  labelUz: string;
  iconType: WeatherIconType;
  theme: WeatherTheme;
  summary: string;
}

export function getWeatherCodeInfo(code: number, isDay = true): WeatherCodeInfo {
  switch (code) {
    case 0:
      return {
        labelUz: isDay ? 'Musaffo ochiq havo' : 'Ochiq tun',
        iconType: isDay ? 'sun' : 'moon',
        theme: isDay ? 'clear-day' : 'clear-night',
        summary: isDay
          ? 'Quyoshli va musaffo ob-havo davom etadi.'
          : 'Musaffo va ochiq osmonli tun kutilmoqda.',
      };
    case 1:
      return {
        labelUz: isDay ? 'Asosan ochiq' : 'Asosan musaffo tun',
        iconType: isDay ? 'sun' : 'moon',
        theme: isDay ? 'clear-day' : 'clear-night',
        summary: 'Ob-havo barqaror va deyarli bulutsiz bo\'ladi.',
      };
    case 2:
      return {
        labelUz: 'Qisman bulutli',
        iconType: isDay ? 'partly-cloudy-day' : 'partly-cloudy-night',
        theme: isDay ? 'cloudy-day' : 'cloudy-night',
        summary: 'Vaqti-vaqti bilan yengil bulutlar ko\'rinadi.',
      };
    case 3:
      return {
        labelUz: 'Bulutli',
        iconType: 'cloudy',
        theme: isDay ? 'cloudy-day' : 'cloudy-night',
        summary: 'Osmonni qalin bulut qoplaydi, havo iliq saqlanadi.',
      };
    case 45:
    case 48:
      return {
        labelUz: 'Tumanli',
        iconType: 'fog',
        theme: 'fog',
        summary: 'Tuman tushishi tufayli ko\'rish masofasi cheklangan.',
      };
    case 51:
    case 53:
    case 55:
      return {
        labelUz: 'Mayda yomg\'ir (shivalama)',
        iconType: 'drizzle',
        theme: 'rain',
        summary: 'Kuchsiz mayda yomg\'ir yog\'ishi kutilmoqda.',
      };
    case 56:
    case 57:
      return {
        labelUz: 'Muzlovchi shivalama yomg\'ir',
        iconType: 'freezing-rain',
        theme: 'rain',
        summary: 'Muzlovchi mayda yomg\'ir, yo\'llarda ehtiyot bo\'ling.',
      };
    case 61:
      return {
        labelUz: 'Yengil yomg\'ir',
        iconType: 'rain',
        theme: 'rain',
        summary: 'Yengil yomg\'ir kutilmoqda, soyabon olib yurish tavsiya etiladi.',
      };
    case 63:
      return {
        labelUz: 'Yomg\'irli',
        iconType: 'rain',
        theme: 'rain',
        summary: 'Yomg\'irli ob-havo davom etishi kutilmoqda.',
      };
    case 65:
      return {
        labelUz: 'Kuchli yomg\'ir',
        iconType: 'heavy-rain',
        theme: 'heavy-rain',
        summary: 'Kuchli jala yomg\'ir yog\'ishi kutilmoqda.',
      };
    case 66:
    case 67:
      return {
        labelUz: 'Muzlovchi yomg\'ir',
        iconType: 'freezing-rain',
        theme: 'rain',
        summary: 'Muzlovchi sovuq yomg\'ir yog\'moqda.',
      };
    case 71:
      return {
        labelUz: 'Yengil qor',
        iconType: 'snow',
        theme: 'snow',
        summary: 'Yengil qor yog\'ishi kutilmoqda.',
      };
    case 73:
      return {
        labelUz: 'Qorli',
        iconType: 'snow',
        theme: 'snow',
        summary: 'O\'rtacha qor yog\'ishi davom etadi.',
      };
    case 75:
      return {
        labelUz: 'Kuchli qor',
        iconType: 'heavy-snow',
        theme: 'snow',
        summary: 'Kuchli qor bo\'roni va sovuq havo kutilmoqda.',
      };
    case 77:
      return {
        labelUz: 'Qor donachalari',
        iconType: 'snow',
        theme: 'snow',
        summary: 'Qor donachalari yog\'ishi kutilmoqda.',
      };
    case 80:
    case 81:
      return {
        labelUz: 'Qisqa muddatli yomg\'ir',
        iconType: 'rain',
        theme: 'rain',
        summary: 'Qisqa muddatli shiddatli yomg\'ir yog\'ib o\'tishi mumkin.',
      };
    case 82:
      return {
        labelUz: 'Kuchli jala',
        iconType: 'heavy-rain',
        theme: 'heavy-rain',
        summary: 'Shiddatli kuchli jala yomg\'ir kutilmoqda.',
      };
    case 85:
    case 86:
      return {
        labelUz: 'Qor bo\'roni',
        iconType: 'heavy-snow',
        theme: 'snow',
        summary: 'Shiddatli qor yog\'ishi kutilmoqda.',
      };
    case 95:
      return {
        labelUz: 'Momaqaldiroq',
        iconType: 'thunderstorm',
        theme: 'thunder',
        summary: 'Momaqaldiroq bo\'lishi va chaqmoq chaqishi kutilmoqda.',
      };
    case 96:
    case 99:
      return {
        labelUz: 'Do\'lli momaqaldiroq',
        iconType: 'thunderstorm-rain',
        theme: 'thunder',
        summary: 'Momaqaldiroq va do\'l yog\'ishi xavfi mavjud.',
      };
    default:
      return {
        labelUz: isDay ? 'Ochiq havo' : 'Tungi osmon',
        iconType: isDay ? 'sun' : 'moon',
        theme: isDay ? 'clear-day' : 'clear-night',
        summary: 'Ob-havo sharoiti me\'yoriy darajada.',
      };
  }
}

/**
 * Fon gradientlari: Apple Weather uslubidagi silliq atmosfera gradientlari
 */
export function getBackgroundGradient(theme: WeatherTheme): string {
  switch (theme) {
    case 'clear-day':
      // Kunduzi ochiq: #4aa3df -> #1d6fb8
      return 'from-[#4aa3df] via-[#3a8ecf] to-[#1d6fb8]';
    case 'clear-night':
      // Tunda: #0b1d3a -> #1b3a6b
      return 'from-[#0b1d3a] via-[#112a52] to-[#1b3a6b]';
    case 'cloudy-day':
      // Bulutli kunduz: kulrang-ko'k
      return 'from-[#52718e] via-[#415a73] to-[#2c3e50]';
    case 'cloudy-night':
      return 'from-[#141d26] via-[#1e2b38] to-[#253749]';
    case 'rain':
    case 'heavy-rain':
      // Yomg'irli to'q kulrang-ko'k
      return 'from-[#37474f] via-[#263238] to-[#1a2327]';
    case 'thunder':
      // Momaqaldiroq: to'q binafsha-ko'k
      return 'from-[#231b38] via-[#1a1429] to-[#0f0c19]';
    case 'snow':
      // Sovuq muzli moviy-kulrang
      return 'from-[#4b6584] via-[#3d526b] to-[#283747]';
    case 'fog':
      return 'from-[#607274] via-[#4d5b5d] to-[#364143]';
  }
}
