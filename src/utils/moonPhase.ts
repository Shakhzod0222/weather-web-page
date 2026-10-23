export interface MoonPhaseInfo {
  phaseValue: number; // 0..1 oralig'i (0 = yangi oy, 0.5 = to'lin oy)
  phaseNameUz: string;
  illuminationPct: number; // 0..100%
  daysUntilFullMoon: number;
  nextFullMoonDateString: string;
  isWaxing: boolean;
}

const SYNODIC_MONTH = 29.53058770576; // kun
// Ma'lum Yangi oy sanasi: 2000-01-06 18:14 UTC (timestamp: 947182440000)
const KNOWN_NEW_MOON_MS = Date.UTC(2000, 0, 6, 18, 14, 0);

export function calculateMoonPhase(date: Date = new Date()): MoonPhaseInfo {
  const diffMs = date.getTime() - KNOWN_NEW_MOON_MS;
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  const phaseValue = (diffDays % SYNODIC_MONTH + SYNODIC_MONTH) % SYNODIC_MONTH / SYNODIC_MONTH;

  // Yoritilganlik darajasi (0 - 100%)
  const illuminationPct = Math.round(
    ((1 - Math.cos(phaseValue * 2 * Math.PI)) / 2) * 100
  );

  let phaseNameUz = '';
  if (phaseValue < 0.03 || phaseValue >= 0.97) {
    phaseNameUz = 'Yangi oy';
  } else if (phaseValue < 0.22) {
    phaseNameUz = 'O\'suvchi hilol';
  } else if (phaseValue < 0.28) {
    phaseNameUz = 'Birinchi chorak';
  } else if (phaseValue < 0.47) {
    phaseNameUz = 'O\'suvchi bo\'rtiq oy';
  } else if (phaseValue < 0.53) {
    phaseNameUz = 'To\'lin oy';
  } else if (phaseValue < 0.72) {
    phaseNameUz = 'Kamayuvchi bo\'rtiq oy';
  } else if (phaseValue < 0.78) {
    phaseNameUz = 'Oxirgi chorak';
  } else {
    phaseNameUz = 'Kamayuvchi hilol';
  }

  // Keyingi to'lin oygacha kunlar
  let daysUntilFull: number;
  if (phaseValue <= 0.5) {
    daysUntilFull = (0.5 - phaseValue) * SYNODIC_MONTH;
  } else {
    daysUntilFull = (1.5 - phaseValue) * SYNODIC_MONTH;
  }
  const roundedDays = Math.max(1, Math.round(daysUntilFull));

  const nextFullDate = new Date(date.getTime() + roundedDays * 24 * 60 * 60 * 1000);
  const nextFullMoonDateString = new Intl.DateTimeFormat('uz-UZ', {
    day: 'numeric',
    month: 'long',
  }).format(nextFullDate);

  return {
    phaseValue,
    phaseNameUz,
    illuminationPct,
    daysUntilFullMoon: roundedDays,
    nextFullMoonDateString,
    isWaxing: phaseValue < 0.5,
  };
}
