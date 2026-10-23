# Apple Weather Uslubidagi Ob-Havo Web Sahifasi

Ushbu loyiha **React + TypeScript (Vite)** va zamonaviy **Tailwind CSS** yordamida yaratilgan, to'liq frontendli, real vaqtda ishlovchi ob-havo veb-ilovasidir. Hech qanday backend yoki pullik API kalit talab etilmaydi.

## 🚀 Texnologiyalar va Imkoniyatlar

- **Asosiy Stack**: React 19, TypeScript (Strict rejim, `verbatimModuleSyntax`), Vite 8, Tailwind CSS v4.
- **Dizayn**: Apple Weather / macOS uslubidagi premium glassmorphism (`backdrop-filter: blur(20px)`, `rounded-[18px]`, ingichka yorug' chegaralar, 96px yupqa harorat shrifti).
- **Dinamik fon**: Havo holati (ochiq havo, bulutli, yomg'irli, qorli, momaqaldiroqli) va kun/tun vaqtiga qarab silliq o'zgaruvchi gradientlar.
- **Ma'lumot manbasi**:
  - [Open-Meteo Forecast API](https://open-meteo.com/) — 10 kunlik bashorat, joriy ko'rsatkichlar va soatlik ma'lumotlar.
  - [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) — Shaharlarni qidirish va koordinatalarni aniqlash.
  - **Astronomik Oy Fazasi**: Sinodik oy formulasi (~29.53 kun) orqali to'g'ridan-to'g'ri formulada hisoblanadi (API'siz).

## 🌟 Asosiy Funksiyalar

1. **Shahar qidiruvi**: 400ms debounce, to'liq klaviatura bilan boshqarish (Up/Down/Enter/Escape), autocomplete ro'yxat.
2. **Geolokatsiya**: Birinchi yuklanishda avtomatik joylashuv so'raladi; rad etilsa Toshkent shahri boshlang'ich shahar sifatida ochiladi.
3. **Real Vaqt yangilanishi**:
   - Har 5 daqiqada avtomatik qayta yangilanish (`setInterval` va unmount'da xotira tozalanishi).
   - Foydalanuvchi tab'ga qaytganida (`visibilitychange`) darhol yangilanish.
   - Qo'lda yangilash tugmasi va "Oxirgi yangilanish: X daqiqa oldin" indikatori.
4. **Harorat birliklari**: °C va °F almashtirgich (tanlov `localStorage`da saqlanadi).
5. **Saqlangan shaharlar**: Shaharlarni ro'yxatga qo'shish, o'chirish, tezkor tanlash (`localStorage`da doimiy saqlanadi).
6. **WMO Ob-havo kodlari**: Barcha kodlar o'zbekcha matn va maxsus SVG ikonkalar bilan ifodalanadi.
7. **Apple uslubidagi Vidjetlar Grid'i**:
   - **SOATLIK BASHORAT**: Bir qatorli xulosa, gorizontal scroll, Quyosh chiqishi va Quyosh botishi alohida ustun bo'lib vaqt jadvaliga joylashadi.
   - **10 KUNLIK BASHORAT**: Harorat gradient chizig'i va bugungi kun uchun joriy harorat nuqtasi.
   - **UB INDEKSI**: Daraja (Past/O'rtacha/Yuqori/Ekstremal), rangli gradient va nuqta.
   - **QUYOSH BOTISHI**: Katta vaqt, SVG quyosh yoyi (arc) va chiqish vaqti.
   - **SHAMOL**: SVG kompas, tezlik, shiddat (gust) va yo'nalish strelkasi.
   - **OY FAZASI**: Oyning yoritilganlik shakli (SVG), foizi va keyingi to'lin oy sanasi.
   - **NAMLiK**: Foiz, shudring nuqtasi va qulaylik darajasi.
   - **KO'RISH MASOFASI**: km va atmosfera musaffoligi izohi.
   - **BOSIM**: SVG yarim doira gauge manometri (hPa).
   - **TUYULISHI**: Shamol/namlikka qarab haqiqiy haroratdan iliqroq yoki sovuqroq tuyulish izohi.
   - **YOG'INGARCHILIK**: So'nggi 24 soatlik yog'in va keyingi kunlar ehtimoli.
   - **O'RTACHALAR**: Davr me'yoriga nisbatan bugungi harorat farqi.

## 🛠 Ishga tushirish

Loyiha papkasida terminal orqali quyidagi buyruqlarni ishga tushiring:

```bash
# Rivojlanish (development) serverini ishga tushirish:
npm run dev

# Loyihani tekshirish va production uchun yig'ish:
npm run build

# Yig'ilgan loyihani ko'rish (preview):
npm run preview
```
# weather-web-page
