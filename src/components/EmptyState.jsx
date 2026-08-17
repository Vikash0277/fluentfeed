import React from "react";
import { Users, FilterX, Sparkles, UserCheck } from "lucide-react";

export const EmptyState = ({
  type = "no_matches",
  onReset,
  onCompleteProfile,
}) => {
  if (type === "profile_incomplete") {
    return (
      <div className="text-center py-16 px-6 glass-panel rounded-3xl max-w-xl mx-auto my-8">
        <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-950/60 rounded-2xl flex items-center justify-center mx-auto mb-5 text-indigo-600 dark:text-indigo-400">
          <Sparkles className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Complete Your English Profile
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 max-w-md mx-auto">
          To calculate your personalized compatibility percentage and discover the Top 5 best practice partners, complete your learning goals and preferred speaking time.
        </p>
        <button
          onClick={onCompleteProfile}
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium rounded-xl shadow-lg shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
        >
          Complete Profile (1 Min)
        </button>
      </div>
    );
  }

  return (
    <div className="text-center py-16 px-6 glass-panel rounded-3xl max-w-xl mx-auto my-8">
      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-500">
        <FilterX className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
        User not available yet
      </h3>
      <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 max-w-md mx-auto">
        No practice partners are available right now. Please check back later or adjust your filters.
      </p>
      {onReset && (
        <button
          onClick={onReset}
          className="px-5 py-2.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium rounded-xl transition cursor-pointer"
        >
          Reset All Filters
        </button>
      )}
    </div>
  );
};

export default EmptyState;
