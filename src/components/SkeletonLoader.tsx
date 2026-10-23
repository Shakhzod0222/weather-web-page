import React from 'react';

export const SkeletonLoader: React.FC = () => {
  return (
    <div className="w-full space-y-6 animate-pulse" aria-busy="true" aria-label="Ma'lumotlar yuklanmoqda...">
      {/* Header Skeleton */}
      <div className="flex flex-col items-center justify-center space-y-3 pt-6">
        <div className="h-8 w-48 bg-white/20 rounded-lg" />
        <div className="h-24 w-36 bg-white/20 rounded-2xl" />
        <div className="h-5 w-32 bg-white/20 rounded-md" />
        <div className="h-4 w-40 bg-white/15 rounded-md" />
      </div>

      {/* Hourly Skeleton */}
      <div className="rounded-[18px] bg-white/10 border border-white/20 backdrop-blur-xl p-5 space-y-4">
        <div className="h-4 w-52 bg-white/20 rounded" />
        <div className="flex gap-4 overflow-hidden pt-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center space-y-3 shrink-0 w-14">
              <div className="h-3 w-8 bg-white/20 rounded" />
              <div className="w-8 h-8 rounded-full bg-white/20" />
              <div className="h-4 w-6 bg-white/20 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-[18px] bg-white/10 border border-white/20 backdrop-blur-xl p-5 space-y-4 h-96">
          <div className="h-4 w-40 bg-white/20 rounded" />
          <div className="space-y-4 pt-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between gap-3">
                <div className="h-4 w-12 bg-white/20 rounded" />
                <div className="w-6 h-6 rounded-full bg-white/20" />
                <div className="h-2.5 flex-1 bg-white/15 rounded-full" />
                <div className="h-4 w-12 bg-white/20 rounded" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-[18px] bg-white/10 border border-white/20 backdrop-blur-xl p-4 h-44 space-y-3"
            >
              <div className="h-3 w-20 bg-white/20 rounded" />
              <div className="h-8 w-16 bg-white/20 rounded" />
              <div className="h-3 w-24 bg-white/15 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
