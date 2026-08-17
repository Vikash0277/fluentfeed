import React from "react";
import { X, Sparkles, Target, Award, Clock, Globe, Languages } from "lucide-react";
import { SCORING_CRITERIA } from "../utils/constants";

export const ScoringGuideModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const icons = [
    <Target className="w-5 h-5 text-indigo-500" />,
    <Award className="w-5 h-5 text-emerald-500" />,
    <Clock className="w-5 h-5 text-amber-500" />,
    <Globe className="w-5 h-5 text-sky-500" />,
    <Languages className="w-5 h-5 text-purple-500" />,
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Glow Header Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-emerald-500 to-violet-500" />

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-100 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 rounded-xl">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                How Matching Works
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                FluentFeed AI 100-Point Compatibility Score
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          Our algorithm pairs you with practice partners based on 5 key learning compatibility dimensions to ensure meaningful, productive speaking sessions:
        </p>

        <div className="space-y-3 mb-6">
          {SCORING_CRITERIA.map((item, idx) => (
            <div
              key={item.criteria}
              className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 rounded-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white dark:bg-slate-900 rounded-xl shadow-xs">
                  {icons[idx]}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                    {item.criteria}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {item.description}
                  </p>
                </div>
              </div>
              <span className="font-mono font-bold text-sm text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-lg border border-indigo-100 dark:border-indigo-900/50">
                +{item.points}
              </span>
            </div>
          ))}
        </div>

        <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl text-center mb-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Total Compatibility Score
          </span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-0.5 font-mono">
            100% Maximum
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-semibold rounded-xl transition cursor-pointer"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

export default ScoringGuideModal;
