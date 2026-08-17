import React from "react";

export const SkeletonCard = () => {
  return (
    <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm animate-pulse flex flex-col justify-between h-[360px]">
      <div>
        {/* Header with avatar & score */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
            <div className="space-y-2">
              <div className="w-32 h-5 bg-slate-200 dark:bg-slate-800 rounded-md" />
              <div className="w-20 h-4 bg-slate-100 dark:bg-slate-800/60 rounded-md" />
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 my-4">
          <div className="w-24 h-6 bg-slate-200 dark:bg-slate-800 rounded-full" />
          <div className="w-32 h-6 bg-slate-200 dark:bg-slate-800 rounded-full" />
          <div className="w-20 h-6 bg-slate-200 dark:bg-slate-800 rounded-full" />
        </div>

        {/* Bio preview */}
        <div className="space-y-2 my-4">
          <div className="w-full h-3 bg-slate-100 dark:bg-slate-800/60 rounded" />
          <div className="w-4/5 h-3 bg-slate-100 dark:bg-slate-800/60 rounded" />
        </div>
      </div>

      {/* Button footer */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
        <div className="w-24 h-4 bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="w-28 h-9 bg-slate-200 dark:bg-slate-800 rounded-xl" />
      </div>
    </div>
  );
};

export default SkeletonCard;
