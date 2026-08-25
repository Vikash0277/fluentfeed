import React, { useState, useEffect } from "react";
import {
  Sun,
  Plane,
  Laptop,
  Heart,
  Briefcase,
  BookOpen,
  Film,
  HeartPulse,
  Palmtree,
  Leaf,
  Languages,
  Sparkles,
  Flame,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { TOPICS } from "../utils/constants";

const iconMap = {
  sun: Sun,
  plane: Plane,
  laptop: Laptop,
  heart: Heart,
  briefcase: Briefcase,
  book: BookOpen,
  film: Film,
  "heart-pulse": HeartPulse,
  "palm-tree": Palmtree,
  leaf: Leaf,
  languages: Languages,
  sparkles: Sparkles,
};

const categoryColors = {
  Lifestyle: "from-rose-500 to-pink-500",
  Travel: "from-sky-500 to-blue-500",
  Technology: "from-violet-500 to-purple-500",
  Career: "from-amber-500 to-orange-500",
  Society: "from-emerald-500 to-teal-500",
  Culture: "from-fuchsia-500 to-pink-500",
  Health: "from-red-500 to-rose-500",
  Education: "from-indigo-500 to-blue-500",
};

function getDayOfYear() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function getTodayStr() {
  return new Date().toISOString().split("T")[0];
}

function getYesterdayStr() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
}

function getStreak(userId) {
  try {
    const raw = localStorage.getItem(`fluentfeed_streak_${userId}`);
    if (!raw) return { streak: 0, lastPracticeDate: null, monthHistory: [] };
    return JSON.parse(raw);
  } catch {
    return { streak: 0, lastPracticeDate: null, monthHistory: [] };
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
    newStreak = streakData.streak + 1;
  }

  const monthHistory = [...(streakData.monthHistory || []), today]
    .filter((d) => {
      const date = new Date(d);
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - 30);
      return date >= cutoff;
    });

  const updated = { streak: newStreak, lastPracticeDate: today, monthHistory };
  localStorage.setItem(`fluentfeed_streak_${userId}`, JSON.stringify(updated));
  return updated;
}

function getLast30Days() {
  const days = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().split("T")[0]);
  }
  return days;
}

export { updateStreak, getStreak };

export const DailyPracticeSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [streakData, setStreakData] = useState({ streak: 0, lastPracticeDate: null, monthHistory: [] });

  const dailyTopic = TOPICS[getDayOfYear() % TOPICS.length];
  const Icon = iconMap[dailyTopic.icon] || Sparkles;
  const today = getTodayStr();
  const practicedToday = streakData.lastPracticeDate === today;
  const last30 = getLast30Days();

  useEffect(() => {
    if (user?._id) {
      setStreakData(getStreak(user._id));
    }
  }, [user?._id]);

  const handleStartSpeaking = () => {
    navigate(`/evaluation?topicId=${dailyTopic.id}`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-4 mb-8">
      {/* Topic of the Day */}
      <div className="relative overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-5 sm:p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold uppercase tracking-wider border border-indigo-200/60 dark:border-indigo-800/40 mb-3">
              <Sparkles className="w-3 h-3" />
              Topic of the Day
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1 leading-tight">
              {dailyTopic.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">
              {dailyTopic.description}
            </p>
            <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md">
              {dailyTopic.category}
            </span>
          </div>
          <div className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${categoryColors[dailyTopic.category] || "from-indigo-500 to-violet-500"} flex items-center justify-center text-white shadow-lg`}>
            <Icon className="w-7 h-7" />
          </div>
        </div>
        <button
          onClick={handleStartSpeaking}
          className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-500/20 transition transform hover:-translate-y-0.5 cursor-pointer"
        >
          Start Speaking
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Daily Streak */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 text-[10px] font-bold uppercase tracking-wider border border-amber-200/60 dark:border-amber-800/40">
            <Flame className="w-3 h-3" />
            Daily Streak
          </div>
          {practicedToday && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 rounded-full border border-emerald-200/60 dark:border-emerald-800/40">
              <CheckCircle2 className="w-3 h-3" />
              Done Today
            </span>
          )}
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-extrabold text-slate-900 dark:text-white font-mono leading-none">
              {streakData.streak}
            </span>
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              {streakData.streak === 1 ? "day" : "days"}
            </span>
          </div>
          {streakData.streak >= 3 && (
            <div className="flex items-center gap-1 px-2 py-1 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200/50 dark:border-amber-800/30">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">
                {streakData.streak >= 7 ? "On Fire!" : "Keep Going!"}
              </span>
            </div>
          )}
        </div>

        {/* Last 30 days - month grid */}
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-sm bg-amber-400 dark:bg-amber-500" />
                <span className="text-[9px] text-slate-400 dark:text-slate-500">Done</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-sm bg-slate-200 dark:bg-slate-700" />
                <span className="text-[9px] text-slate-400 dark:text-slate-500">Missed</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            {last30.map((day) => {
              const practiced = streakData.monthHistory?.includes(day);
              return (
                <div
                  key={day}
                  className={`w-3 h-3 rounded-sm transition ${
                    practiced
                      ? "bg-amber-400 dark:bg-amber-500"
                      : "bg-slate-200 dark:bg-slate-700"
                  }`}
                  title={day}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyPracticeSection;
