import type { TemperatureUnit } from '../types/weather';

interface UnitToggleProps {
  unit: TemperatureUnit;
  onChange: (unit: TemperatureUnit) => void;
}

export const UnitToggle: React.FC<UnitToggleProps> = ({ unit, onChange }) => {
  return (
    <div
      role="group"
      aria-label="Harorat birligini tanlash"
      className="inline-flex items-center p-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-sm"
    >
      <button
        type="button"
        onClick={() => onChange('C')}
        aria-pressed={unit === 'C'}
        className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
          unit === 'C'
            ? 'bg-white/30 text-white shadow-sm font-bold'
            : 'text-white/70 hover:text-white'
        }`}
      >
        °C
      </button>
      <button
        type="button"
        onClick={() => onChange('F')}
        aria-pressed={unit === 'F'}
        className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
          unit === 'F'
            ? 'bg-white/30 text-white shadow-sm font-bold'
            : 'text-white/70 hover:text-white'
        }`}
      >
        °F
      </button>
    </div>
  );
};
