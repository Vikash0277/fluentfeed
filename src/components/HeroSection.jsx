import React from "react";
import {
  Sparkles,
  Zap,
  Target,
  Users,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  HelpCircle,
} from "lucide-react";

export const HeroSection = ({
  currentUser,
  isProfileComplete,
  onOpenProfile,
  onOpenScoringGuide,
  totalMatchesCount = 0,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-violet-950 text-white p-6 sm:p-10 shadow-2xl border border-indigo-500/20 mb-8">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div className="max-w-2xl space-y-4">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-400/30 text-indigo-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
            <span>AI-Powered English Practice Partner Matching</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Find Your Ideal <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400">English Speaking Partner</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
            Connect with fellow learners worldwide who share your <strong className="text-white">learning goals</strong>, <strong className="text-white">fluency level</strong>, and <strong className="text-white">speaking hours</strong>.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onOpenProfile}
              className="px-5 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white text-xs sm:text-sm font-bold rounded-2xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
            >
              <span>{isProfileComplete ? "Edit Learning Profile" : "Complete Your Profile"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenScoringGuide}
              className="px-4 py-3 bg-white/10 hover:bg-white/15 border border-white/10 text-slate-200 text-xs sm:text-sm font-semibold rounded-2xl backdrop-blur-md transition flex items-center gap-2 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-indigo-300" />
              <span>How Matching Works</span>
            </button>
          </div>
        </div>

        {/* Live Metrics Widget */}
        <div className="w-full lg:w-auto grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md text-center">
            <div className="text-2xl sm:text-3xl font-black text-indigo-400 font-mono">
              {totalMatchesCount || 10}
            </div>
            <div className="text-[11px] font-semibold text-slate-400 mt-0.5">
              Matched Learners
            </div>
          </div>

          <div className="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md text-center">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
              100%
            </div>
            <div className="text-[11px] font-semibold text-slate-400 mt-0.5">
              Score Accuracy
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md text-center">
            <div className="text-lg sm:text-2xl font-black text-purple-400 font-mono truncate leading-tight">
              {currentUser?.englishLevel || "Intermediate"}
            </div>
            <div className="text-[11px] font-semibold text-slate-400 mt-0.5">
              Your Level
            </div>
          </div>
        </div>
      </div>

      {/* Incomplete profile warning */}
      {!isProfileComplete && (
        <div className="mt-6 p-4 bg-amber-500/15 border border-amber-500/30 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-200 text-xs">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
            <span>
              <strong>Your profile is not yet fully completed.</strong> Complete your learning goal & preferred time for 100% accurate match percentages.
            </span>
          </div>
          <button
            onClick={onOpenProfile}
            className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl whitespace-nowrap transition cursor-pointer"
          >
            Complete Now
          </button>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
