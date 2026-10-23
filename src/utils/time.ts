export function formatTimeOnly(isoString: string, timezone?: string): string {
  try {
    const date = new Date(isoString);
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      ...(timezone ? { timeZone: timezone } : {}),
    };
    return new Intl.DateTimeFormat('uz-UZ', options).format(date);
  } catch {
    // Agar timezone noto'g'ri bo'lsa fallback
    const date = new Date(isoString);
    const h = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');
    return `${h}:${m}`;
  }
}

export function formatHourlyTime(isoString: string, isNow = false, timezone?: string): string {
  if (isNow) return 'Hozir';
  try {
    const date = new Date(isoString);
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      ...(timezone ? { timeZone: timezone } : {}),
    };
    return new Intl.DateTimeFormat('uz-UZ', options).format(date);
  } catch {
    const date = new Date(isoString);
    return `${String(date.getHours()).padStart(2, '0')}:00`;
  }
}

export function getDayName(isoDateString: string, isToday = false): string {
  if (isToday) return 'Bugun';
  try {
    const date = new Date(isoDateString + 'T12:00:00');
    const day = date.getDay();
    const daysUz = ['Yak', 'Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan'];
    return daysUz[day] || '';
  } catch {
    return isoDateString;
  }
}

export function getCityCurrentTime(timezone?: string): string {
  try {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      ...(timezone ? { timeZone: timezone } : {}),
    };
    return new Intl.DateTimeFormat('uz-UZ', options).format(now);
  } catch {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  }
}

export function formatRelativeTime(date: Date | null): string {
  if (!date) return 'Hali yangilanmadi';
  const now = new Date();
  const diffInSeconds = Math.max(0, Math.floor((now.getTime() - date.getTime()) / 1000));

  if (diffInSeconds < 30) {
    return 'Hozirgina';
  }
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 1) {
    return '1 daqiqa oldin';
  }
  if (diffInMinutes < 60) {
    return `${diffInMinutes} daqiqa oldin`;
  }
  const diffInHours = Math.floor(diffInMinutes / 60);
  return `${diffInHours} soat oldin`;
}
