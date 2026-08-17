import React from "react";
import {
  X,
  Sparkles,
  MapPin,
  Clock,
  Target,
  Award,
  Languages,
  CheckCircle2,
  XCircle,
  MessageSquare,
  UserCheck,
  UserPlus,
  Share2,
} from "lucide-react";
import { SCORING_WEIGHTS } from "../utils/constants";

export const MatchDetailModal = ({
  isOpen,
  onClose,
  currentUser,
  partner,
  matchData,
  onConnect,
}) => {
  if (!isOpen || !partner) return null;

  const score = Math.round(matchData?.matchPercentage || matchData?.compatibilityScore || 0);
  const breakdown = matchData?.matchBreakdown || {};

  const dimensions = [
    {
      title: "Learning Goal",
      userVal: currentUser?.learningGoal || "Not set",
      partnerVal: partner?.learningGoal || "Not set",
      matched: Boolean(breakdown.learningGoal),
      points: 40,
    },
    {
      title: "English Level",
      userVal: currentUser?.englishLevel || "Not set",
      partnerVal: partner?.englishLevel || "Not set",
      matched: Boolean(breakdown.englishLevel),
      points: 25,
    },
    {
      title: "Speaking Time",
      userVal: currentUser?.preferredSpeakingTime || "Not set",
      partnerVal: partner?.preferredSpeakingTime || "Not set",
      matched: Boolean(breakdown.preferredSpeakingTime),
      points: 20,
    },
    {
      title: "Country & Timezone",
      userVal: currentUser?.country || "Not set",
      partnerVal: partner?.country || "Not set",
      matched: Boolean(breakdown.country),
      points: 10,
    },
    {
      title: "Native Language",
      userVal: currentUser?.nativeLanguage || "Not set",
      partnerVal: partner?.nativeLanguage || "Not set",
      matched: Boolean(breakdown.nativeLanguage),
      points: 5,
    },
  ];

  const icebreakers = [
    `"Hey ${partner.fullName?.split(" ")[0]}! Noticed we're both targeting ${partner.learningGoal || "English practice"}. Want to do a 15-min mock speaking session this week?"`,
    `"Hi ${partner.fullName?.split(" ")[0]}! I'm also free during the ${partner.preferredSpeakingTime || "evening"} time slot. Let's connect!"`,
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-xl">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Compatibility Breakdown
              </h3>
              <p className="text-xs text-slate-500">
                Detailed comparison with {partner.fullName}
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

        {/* Partner Profile Summary Card */}
        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 mb-6">
          <div className="flex items-center gap-3.5">
            <img
              src={
                partner.profileImage ||
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(partner.fullName)}`
              }
              alt={partner.fullName}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-indigo-500/30"
            />
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base">
                {partner.fullName}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5" />
                {partner.country} • Native: {partner.nativeLanguage}
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
              {score}%
            </span>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-tight">
              Match Score
            </span>
          </div>
        </div>

        {/* Dimension by dimension comparison */}
        <div className="space-y-3 mb-6">
          <h5 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Matching Criteria Analysis
          </h5>

          {dimensions.map((dim) => (
            <div
              key={dim.title}
              className={`p-3.5 rounded-2xl border transition ${
                dim.matched
                  ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200/60 dark:border-emerald-800/40"
                  : "bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  {dim.matched ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-slate-400" />
                  )}
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {dim.title}
                  </span>
                </div>
                <span
                  className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                    dim.matched
                      ? "bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {dim.matched ? `+${dim.points} pts` : "0 pts"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] mt-2 pt-2 border-t border-slate-200/50 dark:border-slate-700/50">
                <div>
                  <span className="text-slate-400 block text-[10px]">You:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {dim.userVal}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">{partner.fullName?.split(" ")[0]}:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {dim.partnerVal}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Icebreaker suggestions */}
        <div className="mb-6">
          <h5 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-indigo-500" />
            <span>Suggested Conversation Starter</span>
          </h5>
          <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 rounded-2xl text-xs text-indigo-900 dark:text-indigo-200 italic leading-relaxed">
            {icebreakers[0]}
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl transition"
          >
            Close
          </button>
          <button
            onClick={() => {
              onConnect(partner._id, matchData?.connectionId, matchData?.connectionStatus);
              onClose();
            }}
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-500/25 transition transform hover:-translate-y-0.5 cursor-pointer"
          >
            {matchData?.connectionStatus === "connected"
              ? "Already Connected"
              : matchData?.connectionStatus === "pending_sent"
              ? "Request Pending"
              : "Send Connection Request"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchDetailModal;
