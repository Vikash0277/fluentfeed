import React, { useState } from "react";
import {
  Sparkles,
  MapPin,
  Clock,
  Target,
  Languages,
  UserCheck,
  UserPlus,
  Clock3,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Check,
} from "lucide-react";
import confetti from "canvas-confetti";
import { SPEAKING_TIME_DETAILS } from "../utils/constants";

export const PartnerCard = ({
  matchData,
  onConnect,
  onViewDetails,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const {
    user,
    compatibilityScore = 0,
    matchPercentage = 0,
    matchBreakdown = {},
    connectionStatus = "none",
    connectionId,
  } = matchData;

  const score = Math.round(matchPercentage || compatibilityScore || 0);

  // Level badge styling
  const levelStyles = {
    Beginner: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60",
    Intermediate: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/60",
    Advanced: "bg-purple-50 text-purple-700 dark:bg-purple-950/70 dark:text-purple-300 border-purple-200 dark:border-purple-800/60",
  };

  // Score color ring & badge
  const getScoreColor = (val) => {
    if (val >= 80) return "text-emerald-500 stroke-emerald-500 bg-emerald-50 dark:bg-emerald-950/60";
    if (val >= 50) return "text-indigo-500 stroke-indigo-500 bg-indigo-50 dark:bg-indigo-950/60";
    return "text-amber-500 stroke-amber-500 bg-amber-50 dark:bg-amber-950/60";
  };

  const handleConnectClick = async (e) => {
    e.stopPropagation();
    if (connectionStatus === "connected" || connectionStatus === "pending_sent") return;

    setIsSending(true);
    try {
      await onConnect(user._id, connectionId, connectionStatus);
      if (score >= 80) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
        });
      }
    } finally {
      setIsSending(false);
    }
  };

  const timeInfo = SPEAKING_TIME_DETAILS[user.preferredSpeakingTime] || {
    icon: "⏰",
    label: user.preferredSpeakingTime || "Flexible",
  };

  return (
    <div className="group relative bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 hover:border-indigo-300 dark:hover:border-indigo-600/60 rounded-3xl p-6 shadow-sm hover:shadow-xl dark:hover:shadow-indigo-950/30 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Top highlight indicator */}
      {score >= 85 && (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-emerald-500 to-indigo-600 text-[11px] font-bold text-white uppercase tracking-wider px-3.5 py-1 rounded-bl-2xl shadow-sm flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> Top Match
        </div>
      )}

      <div>
        {/* User Header & Score Circle */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src={
                  user.profileImage ||
                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
                    user.fullName || "User"
                  )}`
                }
                alt={user.fullName}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-100 dark:border-slate-800 shadow-sm group-hover:scale-105 transition duration-300"
              />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
            </div>

            <div>
              <h3
                onClick={() => onViewDetails?.(user, matchData)}
                className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition cursor-pointer line-clamp-1"
              >
                {user.fullName}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{user.country || "Global"}</span>
                {user.nativeLanguage && (
                  <>
                    <span>•</span>
                    <span>{user.nativeLanguage}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Circular Match Gauge */}
          <div
            onClick={() => onViewDetails?.(user, matchData)}
            className="flex flex-col items-center justify-center cursor-pointer group/score"
            title="Click to view compatibility breakdown"
          >
            <div className="relative w-13 h-13 flex items-center justify-center">
              {/* SVG Circle */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100 dark:text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={`${getScoreColor(score)} transition-all duration-1000 ease-out`}
                  strokeDasharray={`${score}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-extrabold text-xs text-slate-900 dark:text-white font-mono">
                  {score}%
                </span>
              </div>
            </div>
            <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-tight mt-0.5">
              Match
            </span>
          </div>
        </div>

        {/* Primary Attribute Badges */}
        <div className="flex flex-wrap gap-2 my-3.5">
          {/* English Level */}
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-xl border flex items-center gap-1.5 ${
              levelStyles[user.englishLevel] || levelStyles.Intermediate
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {user.englishLevel || "Intermediate"}
          </span>

          {/* Learning Goal */}
          <span className="px-3 py-1 text-xs font-medium rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-indigo-500" />
            {user.learningGoal || "Daily Communication"}
          </span>

          {/* Preferred Speaking Time */}
          {user.preferredSpeakingTime && (
            <span className="px-3 py-1 text-xs font-medium rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/40 flex items-center gap-1">
              <span>{timeInfo.icon}</span>
              {user.preferredSpeakingTime}
            </span>
          )}
        </div>

        {/* Bio preview */}
        {user.bio && (
          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-2.5 leading-relaxed">
            "{user.bio}"
          </p>
        )}

        {/* Expandable Match Breakdown */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
          >
            <span>Why you matched:</span>
            <div className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400">
              <span>{isExpanded ? "Hide" : "Details"}</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </div>
          </button>

          {isExpanded && (
            <div className="mt-2.5 space-y-1.5 text-xs animate-in fade-in duration-200 bg-slate-50 dark:bg-slate-950/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400">Same Learning Goal (+40)</span>
                <span className={matchBreakdown.learningGoal ? "text-emerald-500 font-bold" : "text-slate-400"}>
                  {matchBreakdown.learningGoal ? "✓ Matched" : "—"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400">Same English Level (+25)</span>
                <span className={matchBreakdown.englishLevel ? "text-emerald-500 font-bold" : "text-slate-400"}>
                  {matchBreakdown.englishLevel ? "✓ Matched" : "—"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400">Preferred Speaking Time (+20)</span>
                <span className={matchBreakdown.preferredSpeakingTime ? "text-emerald-500 font-bold" : "text-slate-400"}>
                  {matchBreakdown.preferredSpeakingTime ? "✓ Matched" : "—"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400">Same Country (+10)</span>
                <span className={matchBreakdown.country ? "text-emerald-500 font-bold" : "text-slate-400"}>
                  {matchBreakdown.country ? "✓ Matched" : "—"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400">Same Native Language (+5)</span>
                <span className={matchBreakdown.nativeLanguage ? "text-emerald-500 font-bold" : "text-slate-400"}>
                  {matchBreakdown.nativeLanguage ? "✓ Matched" : "—"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer: Action & Connect Button */}
      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
        <button
          onClick={() => onViewDetails?.(user, matchData)}
          className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white px-2 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          View Profile
        </button>

        {/* Dynamic Connect Button */}
        {connectionStatus === "connected" ? (
          <div className="flex items-center gap-1.5 px-4 py-2 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold rounded-xl">
            <Check className="w-4 h-4" /> Connected
          </div>
        ) : connectionStatus === "pending_sent" ? (
          <div className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 text-amber-700 dark:text-amber-300 text-xs font-semibold rounded-xl">
            <Clock3 className="w-4 h-4 animate-spin text-amber-500" /> Request Pending
          </div>
        ) : connectionStatus === "pending_received" ? (
          <button
            onClick={handleConnectClick}
            disabled={isSending}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-xl shadow-md transition transform hover:-translate-y-0.5 cursor-pointer"
          >
            <UserCheck className="w-4 h-4" /> Accept Request
          </button>
        ) : (
          <button
            onClick={handleConnectClick}
            disabled={isSending}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 transition transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
          >
            {isSending ? (
              <Clock3 className="w-4 h-4 animate-spin" />
            ) : (
              <UserPlus className="w-4 h-4" />
            )}
            <span>Connect</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default PartnerCard;
