import React, { useState, useEffect, useMemo } from "react";
import {
  Sparkles,
  Flame,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Calendar as CalendarIcon,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { TOPICS } from "../utils/constants";

function getDayOfYear() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function formatDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getTodayStr() {
  return formatDateKey(new Date());
}

function getYesterdayStr() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return formatDateKey(d);
}

function getStreak(userId) {
  try {
    const raw = localStorage.getItem(`fluentfeed_streak_${userId}`);
    if (!raw) return { streak: 0, lastPracticeDate: null, monthHistory: [], bestStreak: 0 };
    const parsed = JSON.parse(raw);
    return {
      streak: parsed.streak || 0,
      lastPracticeDate: parsed.lastPracticeDate || null,
      monthHistory: parsed.monthHistory || [],
      bestStreak: parsed.bestStreak || parsed.streak || 0,
    };
  } catch {
    return { streak: 0, lastPracticeDate: null, monthHistory: [], bestStreak: 0 };
  }
}

function updateStreak(userId) {
  const today = getTodayStr();
  const streakData = getStreak(userId);

  if (streakData.lastPracticeDate === today) {
    return streakData;
  }

  const yesterday = getYesterdayStr();
  let newStreak = 1;
  if (streakData.lastPracticeDate === yesterday) {
    newStreak = (streakData.streak || 0) + 1;
  }

  const historySet = new Set(streakData.monthHistory || []);
  historySet.add(today);
  const monthHistory = Array.from(historySet);
  const bestStreak = Math.max(streakData.bestStreak || 0, newStreak);

  const updated = { streak: newStreak, lastPracticeDate: today, monthHistory, bestStreak };
  localStorage.setItem(`fluentfeed_streak_${userId}`, JSON.stringify(updated));
  return updated;
}

export { updateStreak, getStreak };

export const DailyPracticeSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [streakData, setStreakData] = useState({ streak: 0, lastPracticeDate: null, monthHistory: [], bestStreak: 0 });

  const now = new Date();
  const [viewDate, setViewDate] = useState({
    year: now.getFullYear(),
    month: now.getMonth(),
  });

  const dailyTopic = TOPICS[getDayOfYear() % TOPICS.length];
  const today = getTodayStr();
  const practicedToday = streakData.lastPracticeDate === today;

  useEffect(() => {
    if (user?._id) {
      setStreakData(getStreak(user._id));
    }
  }, [user?._id]);

  const handleStartSpeaking = () => {
    navigate(`/evaluation?topicId=${dailyTopic.id}`);
  };

  const handlePrevMonth = () => {
    setViewDate((prev) => {
      if (prev.month === 0) return { year: prev.year - 1, month: 11 };
      return { year: prev.year, month: prev.month - 1 };
    });
  };

  const handleNextMonth = () => {
    setViewDate((prev) => {
      if (prev.month === 11) return { year: prev.year + 1, month: 0 };
      return { year: prev.year, month: prev.month + 1 };
    });
  };

  const handleResetToCurrentMonth = () => {
    const current = new Date();
    setViewDate({ year: current.getFullYear(), month: current.getMonth() });
  };

  const isCurrentMonthView =
    viewDate.year === now.getFullYear() && viewDate.month === now.getMonth();

  const monthName = new Date(viewDate.year, viewDate.month, 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  // Calendar cells generation
  const calendarDays = useMemo(() => {
    const totalDaysInMonth = new Date(viewDate.year, viewDate.month + 1, 0).getDate();
    const firstDayOfWeek = new Date(viewDate.year, viewDate.month, 1).getDay(); // 0 = Sun
    const totalDaysInPrevMonth = new Date(viewDate.year, viewDate.month, 0).getDate();

    const days = [];

    // Leading days from previous month
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const prevDate = totalDaysInPrevMonth - i;
      days.push({
        day: prevDate,
        dateStr: null,
        isCurrentMonth: false,
        isPast: true,
        isToday: false,
        practiced: false,
      });
    }

    // Current month days
    for (let day = 1; day <= totalDaysInMonth; day++) {
      const mStr = String(viewDate.month + 1).padStart(2, "0");
      const dStr = String(day).padStart(2, "0");
      const dateStr = `${viewDate.year}-${mStr}-${dStr}`;

      const cellDate = new Date(viewDate.year, viewDate.month, day);
      const isToday = dateStr === today;
      const isPast = cellDate < new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const isFuture = cellDate > new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const practiced = Boolean(streakData.monthHistory?.includes(dateStr));

      days.push({
        day,
        dateStr,
        isCurrentMonth: true,
        isPast,
        isToday,
        isFuture,
        practiced,
      });
    }

    // Trailing days from next month to complete the row
    const remainingSlots = (7 - (days.length % 7)) % 7;
    for (let i = 1; i <= remainingSlots; i++) {
      days.push({
        day: i,
        dateStr: null,
        isCurrentMonth: false,
        isPast: false,
        isToday: false,
        practiced: false,
      });
    }

    return days;
  }, [viewDate, streakData.monthHistory, today, now]);

  const practicedCountThisMonth = useMemo(() => {
    const mStr = String(viewDate.month + 1).padStart(2, "0");
    const prefix = `${viewDate.year}-${mStr}`;
    return (streakData.monthHistory || []).filter((d) => d.startsWith(prefix)).length;
  }, [streakData.monthHistory, viewDate]);

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-5 sm:p-6 shadow-xs mb-8">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
        {/* Left Column: Streak Info & Today's Speaking Topic */}
        <div className="flex-1 flex flex-col justify-between space-y-3.5 py-1">
          {/* Top Row: Streak Badges & Best Streak */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-200/60 dark:border-amber-800/40">
                <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                {streakData.streak} {streakData.streak === 1 ? "Day Streak" : "Days Streak"}
              </div>

              {practicedToday ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 rounded-full border border-emerald-200/80 dark:border-emerald-800/50">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Done Today
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 rounded-full border border-amber-200/70 dark:border-amber-800/40">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  Practice Today
                </span>
              )}
            </div>

            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              Best: <strong className="text-slate-700 dark:text-slate-200">{streakData.bestStreak || streakData.streak || 0}d</strong>
            </span>
          </div>

          {/* Today's Speaking Topic Preview Box */}
          <div className="bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 rounded-xl p-3.5">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Topic of the Day
              </div>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 rounded-md border border-indigo-200/60 dark:border-indigo-800/40">
                {dailyTopic.category}
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
              {dailyTopic.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">
              {dailyTopic.description}
            </p>
          </div>

          {/* Action CTA Button */}
          <div className="flex items-center justify-between gap-3 pt-0.5">
            <button
              onClick={handleStartSpeaking}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-indigo-500/20 transition transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              Speak on this Topic (1 Min)
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
              {practicedToday ? "🔥 Streak preserved for today!" : "⚡ Practice to keep streak alive!"}
            </p>
          </div>
        </div>

        {/* Right Column: Compact Streak Calendar Matrix */}
        <div className="w-full lg:w-[290px] xl:w-[310px] bg-slate-50/70 dark:bg-slate-800/40 rounded-xl p-3 border border-slate-200/60 dark:border-slate-800/60">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <CalendarIcon className="w-3 h-3 text-indigo-500" />
              <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
                {monthName}
              </span>
              {!isCurrentMonthView && (
                <button
                  onClick={handleResetToCurrentMonth}
                  className="text-[9px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer ml-0.5"
                >
                  Today
                </button>
              )}
            </div>

            <div className="flex items-center gap-1">
              <span className="text-[9px] font-semibold px-1.5 py-0.5 bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 rounded mr-0.5">
                {practicedCountThisMonth} {practicedCountThisMonth === 1 ? "day" : "days"}
              </span>
              <button
                onClick={handlePrevMonth}
                aria-label="Previous Month"
                className="w-5 h-5 flex items-center justify-center rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition cursor-pointer"
              >
                <ChevronLeft className="w-3 h-3" />
              </button>
              <button
                onClick={handleNextMonth}
                aria-label="Next Month"
                className="w-5 h-5 flex items-center justify-center rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition cursor-pointer"
              >
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 gap-1 text-center mb-1">
            {["S", "M", "T", "W", "T", "F", "S"].map((dayName, idx) => (
              <div
                key={idx}
                className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider"
              >
                {dayName}
              </div>
            ))}
          </div>

          {/* Calendar Grid Matrix */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((cell, idx) => {
              if (!cell.isCurrentMonth) {
                return (
                  <div
                    key={idx}
                    className="h-6 flex items-center justify-center rounded text-[9px] text-slate-300 dark:text-slate-700 select-none"
                  >
                    {cell.day}
                  </div>
                );
              }

              if (cell.practiced) {
                return (
                  <div
                    key={idx}
                    className={`h-6 flex items-center justify-center rounded text-[10px] font-bold bg-linear-to-br from-amber-500 to-orange-500 text-white shadow-xs shadow-orange-500/25 transition-transform hover:scale-110 cursor-pointer ${
                      cell.isToday ? "ring-2 ring-indigo-500 ring-offset-1 dark:ring-offset-slate-900" : ""
                    }`}
                    title={`${cell.dateStr}: Practiced! 🔥`}
                  >
                    {cell.day}
                  </div>
                );
              }

              if (cell.isToday) {
                return (
                  <div
                    key={idx}
                    className="h-6 flex items-center justify-center rounded text-[10px] font-bold border border-dashed border-amber-500/80 bg-amber-500/10 text-amber-600 dark:text-amber-400 transition-transform hover:scale-110 cursor-pointer"
                    title="Today: Practice to keep streak!"
                  >
                    {cell.day}
                  </div>
                );
              }

              return (
                <div
                  key={idx}
                  className={`h-6 flex items-center justify-center rounded text-[10px] transition-colors ${
                    cell.isPast
                      ? "text-slate-400 dark:text-slate-500 hover:bg-slate-200/50 dark:hover:bg-slate-700/40"
                      : "text-slate-300 dark:text-slate-600"
                  }`}
                  title={cell.dateStr ? `${cell.dateStr}: No practice` : ""}
                >
                  {cell.day}
                </div>
              );
            })}
          </div>

          {/* Calendar Mini Legend */}
          <div className="flex items-center justify-between pt-2 mt-1.5 border-t border-slate-200/60 dark:border-slate-800/60 text-[9px] text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-xs bg-linear-to-br from-amber-500 to-orange-500" />
              <span>Practiced</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-xs border border-dashed border-amber-500 bg-amber-500/10" />
              <span>Today</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-xs bg-slate-200 dark:bg-slate-700" />
              <span>Inactive</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyPracticeSection;

