import React from 'react';
import { RefreshCwIcon } from './icons/WeatherIcons';

interface ErrorViewProps {
  message: string;
  onRetry: () => void;
}

export const ErrorView: React.FC<ErrorViewProps> = ({ message, onRetry }) => {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center p-8 text-center rounded-[18px] bg-white/10 backdrop-blur-xl border border-white/20 text-white max-w-md mx-auto my-12 shadow-xl"
    >
      <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center text-red-300 mb-4 border border-red-500/30">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>

      <h3 className="text-lg font-semibold mb-2">Ma'lumot yuklanmadi</h3>
      <p className="text-sm text-white/80 mb-6 leading-relaxed">
        {message || 'Ob-havo ma\'lumotlarini olishda xatolik yuz berdi. Internet aloqasini tekshiring.'}
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-sm font-medium transition-all duration-200 border border-white/30 cursor-pointer active:scale-95 shadow-md"
      >
        <RefreshCwIcon size={16} />
        Qayta urinish
      </button>
    </div>
  );
};
