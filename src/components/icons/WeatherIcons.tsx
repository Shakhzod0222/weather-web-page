import type { WeatherIconType } from '../../utils/weatherCode';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
}

export const SunIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`text-amber-300 drop-shadow-[0_0_8px_rgba(252,211,77,0.5)] ${className}`}
    {...props}
  >
    <circle cx="12" cy="12" r="5" fill="#fde047" stroke="#fbbf24" />
    <line x1="12" y1="1" x2="12" y2="3" stroke="#fde047" />
    <line x1="12" y1="21" x2="12" y2="23" stroke="#fde047" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="#fde047" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="#fde047" />
    <line x1="1" y1="12" x2="3" y2="12" stroke="#fde047" />
    <line x1="21" y1="12" x2="23" y2="12" stroke="#fde047" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="#fde047" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="#fde047" />
  </svg>
);

export const MoonIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`text-slate-200 drop-shadow-[0_0_6px_rgba(226,232,240,0.5)] ${className}`}
    {...props}
  >
    <path
      d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
      fill="#e2e8f0"
      stroke="#cbd5e1"
    />
  </svg>
);

export const CloudyIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`text-slate-300 drop-shadow-sm ${className}`}
    {...props}
  >
    <path
      d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"
      fill="rgba(255, 255, 255, 0.85)"
      stroke="#cbd5e1"
    />
  </svg>
);

export const PartlyCloudyDayIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={`drop-shadow-sm ${className}`}
    {...props}
  >
    <circle cx="9" cy="8" r="4" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1.5" />
    <line x1="9" y1="1" x2="9" y2="2.5" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="3.5" y1="3.5" x2="4.5" y2="4.5" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="1" y1="9" x2="2.5" y2="9" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="3.5" y1="14.5" x2="4.5" y2="13.5" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
    <path
      d="M18 19H9.5a5.5 5.5 0 0 1 5.3-7 4 4 0 0 1 3.2 1.6A3.5 3.5 0 0 1 18 19Z"
      fill="rgba(255, 255, 255, 0.9)"
      stroke="#cbd5e1"
      strokeWidth="1.5"
    />
  </svg>
);

export const PartlyCloudyNightIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={`drop-shadow-sm ${className}`}
    {...props}
  >
    <path
      d="M13 3a5 5 0 0 0 6 6 5 5 0 0 1-6-6Z"
      fill="#e2e8f0"
      stroke="#cbd5e1"
      strokeWidth="1.5"
    />
    <path
      d="M18 20H8.5a5.5 5.5 0 0 1 5.3-7 4 4 0 0 1 4.2 7Z"
      fill="rgba(255, 255, 255, 0.85)"
      stroke="#cbd5e1"
      strokeWidth="1.5"
    />
  </svg>
);

export const RainIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={`drop-shadow-sm ${className}`}
    {...props}
  >
    <path
      d="M17.5 14H9a5 5 0 1 1 4.8-6.5A3.5 3.5 0 0 1 17.5 14Z"
      fill="rgba(255, 255, 255, 0.85)"
      stroke="#cbd5e1"
      strokeWidth="1.5"
    />
    <line x1="8" y1="16" x2="7" y2="20" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
    <line x1="12" y1="16" x2="11" y2="20" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
    <line x1="16" y1="16" x2="15" y2="20" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const HeavyRainIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={`drop-shadow-sm ${className}`}
    {...props}
  >
    <path
      d="M17.5 13H9a5 5 0 1 1 4.8-6.5A3.5 3.5 0 0 1 17.5 13Z"
      fill="#94a3b8"
      stroke="#64748b"
      strokeWidth="1.5"
    />
    <line x1="7" y1="15" x2="5.5" y2="21" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="11" y1="15" x2="9.5" y2="21" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="15" y1="15" x2="13.5" y2="21" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const DrizzleIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={`drop-shadow-sm ${className}`}
    {...props}
  >
    <path
      d="M17.5 14H9a5 5 0 1 1 4.8-6.5A3.5 3.5 0 0 1 17.5 14Z"
      fill="rgba(255, 255, 255, 0.85)"
      stroke="#cbd5e1"
      strokeWidth="1.5"
    />
    <line x1="9" y1="17" x2="9" y2="19" stroke="#7dd3fc" strokeWidth="2" strokeLinecap="round" />
    <line x1="13" y1="17" x2="13" y2="19" stroke="#7dd3fc" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const FreezingRainIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={`drop-shadow-sm ${className}`}
    {...props}
  >
    <path
      d="M17.5 13H9a5 5 0 1 1 4.8-6.5A3.5 3.5 0 0 1 17.5 13Z"
      fill="#cbd5e1"
      stroke="#94a3b8"
      strokeWidth="1.5"
    />
    <line x1="8" y1="16" x2="7" y2="20" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
    <circle cx="14" cy="18" r="1.5" fill="#bae6fd" />
  </svg>
);

export const SnowIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={`drop-shadow-sm ${className}`}
    {...props}
  >
    <path
      d="M17.5 13H9a5 5 0 1 1 4.8-6.5A3.5 3.5 0 0 1 17.5 13Z"
      fill="rgba(255, 255, 255, 0.9)"
      stroke="#cbd5e1"
      strokeWidth="1.5"
    />
    <circle cx="8" cy="17" r="1.5" fill="#ffffff" />
    <circle cx="12" cy="19" r="1.5" fill="#ffffff" />
    <circle cx="16" cy="17" r="1.5" fill="#ffffff" />
  </svg>
);

export const HeavySnowIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={`drop-shadow-sm ${className}`}
    {...props}
  >
    <path
      d="M17.5 12H9a5 5 0 1 1 4.8-6.5A3.5 3.5 0 0 1 17.5 12Z"
      fill="#e2e8f0"
      stroke="#cbd5e1"
      strokeWidth="1.5"
    />
    <line x1="8" y1="15" x2="8" y2="19" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
    <line x1="6" y1="17" x2="10" y2="17" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
    <line x1="14" y1="15" x2="14" y2="19" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
    <line x1="12" y1="17" x2="16" y2="17" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const ThunderstormIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={`drop-shadow-sm ${className}`}
    {...props}
  >
    <path
      d="M17.5 13H9a5 5 0 1 1 4.8-6.5A3.5 3.5 0 0 1 17.5 13Z"
      fill="#475569"
      stroke="#334155"
      strokeWidth="1.5"
    />
    <polygon points="13 13 9 18 12 18 10 22 15 16 12 16 13 13" fill="#facc15" stroke="#eab308" strokeWidth="0.5" />
  </svg>
);

export const ThunderstormRainIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={`drop-shadow-sm ${className}`}
    {...props}
  >
    <path
      d="M17.5 12H9a5 5 0 1 1 4.8-6.5A3.5 3.5 0 0 1 17.5 12Z"
      fill="#334155"
      stroke="#1e293b"
      strokeWidth="1.5"
    />
    <polygon points="12 12 9 17 11 17 10 21 14 16 12 16 12 12" fill="#facc15" />
    <line x1="6" y1="16" x2="5" y2="20" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
    <line x1="16" y1="16" x2="15" y2="20" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const FogIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    className={`text-slate-300 ${className}`}
    {...props}
  >
    <line x1="4" y1="8" x2="20" y2="8" stroke="rgba(255,255,255,0.7)" />
    <line x1="6" y1="12" x2="18" y2="12" stroke="rgba(255,255,255,0.9)" />
    <line x1="4" y1="16" x2="20" y2="16" stroke="rgba(255,255,255,0.7)" />
  </svg>
);

export const SunriseIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`text-amber-400 ${className}`}
    {...props}
  >
    <path d="M12 2v6m0 0-2-2m2 2 2-2" stroke="#f59e0b" />
    <path d="M4.93 10.93l1.41 1.41M2 18h2m16 0h2m-4.34-5.66l1.41-1.41" stroke="#f59e0b" />
    <path d="M6 18a6 6 0 0 1 12 0" fill="#fef08a" stroke="#f59e0b" />
    <line x1="2" y1="22" x2="22" y2="22" stroke="#e2e8f0" />
  </svg>
);

export const SunsetIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`text-orange-400 ${className}`}
    {...props}
  >
    <path d="M12 8V2m0 6-2-2m2 2 2-2" stroke="#ea580c" />
    <path d="M4.93 10.93l1.41 1.41M2 18h2m16 0h2m-4.34-5.66l1.41-1.41" stroke="#ea580c" />
    <path d="M6 18a6 6 0 0 1 12 0" fill="#fed7aa" stroke="#ea580c" />
    <line x1="2" y1="22" x2="22" y2="22" stroke="#e2e8f0" />
  </svg>
);

// General UI / Widget Icons
export const CompassIcon: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" opacity="0.3" />
  </svg>
);

export const WindIcon: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M17.7 7.7A2.5 2.5 0 1 1 19 12H2" />
    <path d="M9.5 4.2A2 2 0 1 1 11 7.5H2" />
    <path d="M14.7 16.5A2.5 2.5 0 1 0 13 20H2" />
  </svg>
);

export const DropletIcon: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
  </svg>
);

export const EyeIcon: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const GaugeIcon: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="m12 14 4-4" />
    <path d="M3.34 19a10 10 0 1 1 17.32 0" />
  </svg>
);

export const ThermometerIcon: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
  </svg>
);

export const UmbrellaIcon: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M22 12A10.02 10.02 0 0 0 12 2a10.02 10.02 0 0 0-10 10c0 .4.04.8.11 1.19A1 1 0 0 0 3.1 14h17.8a1 1 0 0 0 .99-.81c.07-.39.11-.79.11-1.19Z" />
    <path d="M12 14v6a2 2 0 0 0 4 0" />
  </svg>
);

export const SparklesIcon: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
  </svg>
);

export const CalendarIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export const ClockIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export const RefreshCwIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
    <path d="M3 21v-5h5" />
  </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ size = 18, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export const LocationIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <polygon points="3 11 22 2 13 21 11 13 3 11" fill="currentColor" opacity="0.3" />
  </svg>
);

export const TrashIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  </svg>
);

export const PlusIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const MenuIcon: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="18" x2="20" y2="18" />
  </svg>
);

/**
 * Universal Weather Icon render komponenti
 */
export const WeatherIcon: React.FC<{
  type: WeatherIconType;
  size?: number;
  className?: string;
}> = ({ type, size = 28, className = '' }) => {
  switch (type) {
    case 'sun':
      return <SunIcon size={size} className={className} />;
    case 'moon':
      return <MoonIcon size={size} className={className} />;
    case 'partly-cloudy-day':
      return <PartlyCloudyDayIcon size={size} className={className} />;
    case 'partly-cloudy-night':
      return <PartlyCloudyNightIcon size={size} className={className} />;
    case 'cloudy':
      return <CloudyIcon size={size} className={className} />;
    case 'fog':
      return <FogIcon size={size} className={className} />;
    case 'drizzle':
      return <DrizzleIcon size={size} className={className} />;
    case 'rain':
      return <RainIcon size={size} className={className} />;
    case 'heavy-rain':
      return <HeavyRainIcon size={size} className={className} />;
    case 'freezing-rain':
      return <FreezingRainIcon size={size} className={className} />;
    case 'snow':
      return <SnowIcon size={size} className={className} />;
    case 'heavy-snow':
      return <HeavySnowIcon size={size} className={className} />;
    case 'thunderstorm':
      return <ThunderstormIcon size={size} className={className} />;
    case 'thunderstorm-rain':
      return <ThunderstormRainIcon size={size} className={className} />;
    default:
      return <SunIcon size={size} className={className} />;
  }
};
