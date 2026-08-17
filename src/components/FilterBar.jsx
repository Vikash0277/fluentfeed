import React, { useState, useEffect } from "react";
import {
  Search,
  SlidersHorizontal,
  X,
  Sparkles,
  Users,
  RotateCcw,
} from "lucide-react";
import {
  ENGLISH_LEVELS,
  LEARNING_GOALS,
  PREFERRED_SPEAKING_TIMES,
  COMMON_COUNTRIES,
} from "../utils/constants";

export const FilterBar = ({
  filters,
  onFilterChange,
  onResetFilters,
  viewMode, // "top_matches" | "all_partners"
  onViewModeChange,
  totalResults = 0,
}) => {
  const [searchTerm, setSearchTerm] = useState(filters.search || "");

  // Debounced search trigger (300ms delay)
  useEffect(() => {
    const handler = setTimeout(() => {
      onFilterChange("search", searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const hasActiveFilters = Boolean(
    filters.search ||
    filters.englishLevel !== "All" ||
    filters.learningGoal !== "All" ||
    filters.preferredSpeakingTime !== "All" ||
    filters.country !== "All"
  );

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-5 shadow-sm space-y-4">
      {/* Top row: Search input + View switcher + Sort selector */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Search bar */}
        <div className="relative w-full lg:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, country, or language..."
            className="w-full pl-10 pr-9 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* View Mode Switcher (Top 5 Matches vs All Partners) */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl w-full sm:w-auto">
          <button
            onClick={() => onViewModeChange("top_matches")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition cursor-pointer ${
              viewMode === "top_matches"
                ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Top 5 Matches</span>
          </button>
          <button
            onClick={() => onViewModeChange("all_partners")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition cursor-pointer ${
              viewMode === "all_partners"
                ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Browse All Partners</span>
          </button>
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Sort by:</span>
          <select
            value={filters.sortBy || "compatibility"}
            onChange={(e) => onFilterChange("sortBy", e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="compatibility">Highest Compatibility</option>
            <option value="newest">Recently Joined</option>
          </select>
        </div>
      </div>

      {/* Filter Dropdowns Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/60">
        {/* English Level Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            English Level
          </label>
          <select
            value={filters.englishLevel || "All"}
            onChange={(e) => onFilterChange("englishLevel", e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/70 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="All">All Levels</option>
            {ENGLISH_LEVELS.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>
        </div>

        {/* Learning Goal Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            Learning Goal
          </label>
          <select
            value={filters.learningGoal || "All"}
            onChange={(e) => onFilterChange("learningGoal", e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/70 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="All">All Goals</option>
            {LEARNING_GOALS.map((goal) => (
              <option key={goal} value={goal}>
                {goal}
              </option>
            ))}
          </select>
        </div>

        {/* Preferred Speaking Time */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            Speaking Time
          </label>
          <select
            value={filters.preferredSpeakingTime || "All"}
            onChange={(e) => onFilterChange("preferredSpeakingTime", e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/70 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="All">All Times</option>
            {PREFERRED_SPEAKING_TIMES.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        {/* Country Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            Country
          </label>
          <select
            value={filters.country || "All"}
            onChange={(e) => onFilterChange("country", e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/70 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="All">All Countries</option>
            {COMMON_COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filter Chips & Summary */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Active Filters:</span>
            {filters.englishLevel !== "All" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 rounded-lg border border-indigo-200 dark:border-indigo-800/50">
                Level: {filters.englishLevel}
                <button onClick={() => onFilterChange("englishLevel", "All")}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.learningGoal !== "All" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 rounded-lg border border-indigo-200 dark:border-indigo-800/50">
                Goal: {filters.learningGoal}
                <button onClick={() => onFilterChange("learningGoal", "All")}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.preferredSpeakingTime !== "All" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 rounded-lg border border-amber-200 dark:border-amber-800/50">
                Time: {filters.preferredSpeakingTime}
                <button onClick={() => onFilterChange("preferredSpeakingTime", "All")}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.country !== "All" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 rounded-lg border border-sky-200 dark:border-sky-800/50">
                Country: {filters.country}
                <button onClick={() => onFilterChange("country", "All")}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>

          <button
            onClick={() => {
              setSearchTerm("");
              onResetFilters();
            }}
            className="flex items-center gap-1 text-slate-500 hover:text-rose-500 dark:text-slate-400 dark:hover:text-rose-400 font-semibold transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
