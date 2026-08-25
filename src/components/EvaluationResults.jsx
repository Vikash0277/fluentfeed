import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  Lightbulb,
  RotateCcw,
  History,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import api from "../services/api";

const ScoreRing = ({ score, label, color }) => {
  const radius = 40;
  const stroke = 6;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getColor = (val) => {
    if (val >= 80) return { stroke: "#10b981", bg: "bg-emerald-50 dark:bg-emerald-950/60", text: "text-emerald-600 dark:text-emerald-400" };
    if (val >= 60) return { stroke: "#6366f1", bg: "bg-indigo-50 dark:bg-indigo-950/60", text: "text-indigo-600 dark:text-indigo-400" };
    if (val >= 40) return { stroke: "#f59e0b", bg: "bg-amber-50 dark:bg-amber-950/60", text: "text-amber-600 dark:text-amber-400" };
    return { stroke: "#ef4444", bg: "bg-rose-50 dark:bg-rose-950/60", text: "text-rose-600 dark:text-rose-400" };
  };

  const colors = getColor(score);

  return (
    <div className="flex flex-col items-center">
      <div className={`relative w-24 h-24 ${colors.bg} rounded-full flex items-center justify-center`}>
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-slate-100 dark:text-slate-800"
            strokeWidth={stroke / 4}
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            stroke={colors.stroke}
            strokeWidth={stroke / 4}
            strokeLinecap="round"
            strokeDasharray={`${strokeDashoffset}, ${circumference}`}
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-xl font-extrabold font-mono ${colors.text}`}>
            {score}
          </span>
        </div>
      </div>
      <span className="mt-2 text-xs font-bold text-slate-600 dark:text-slate-300">
        {label}
      </span>
    </div>
  );
};

export const EvaluationResults = ({ evaluation, onTryAgain, onBackToTopics }) => {
  const [history, setHistory] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const { results, topic, transcript, wordCount } = evaluation;

  const loadHistory = async () => {
    setLoadingHistory(true);
    try {
      const res = await api.getEvaluationHistory({ limit: 10 });
      setHistory(res.data.evaluations);
      setShowHistory(true);
    } catch {
    } finally {
      setLoadingHistory(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/25">
          <CheckCircle2 className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Evaluation Complete
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Topic: <span className="font-semibold text-indigo-600 dark:text-indigo-400">{topic}</span> · {wordCount} words
        </p>
      </div>

      {/* Score Rings */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-sm mb-6">
        <div className="flex items-center justify-around mb-8">
          <ScoreRing score={results.overallScore} label="Overall" />
          <ScoreRing score={results.grammar.score} label="Grammar" />
          <ScoreRing score={results.vocabulary.score} label="Vocabulary" />
        </div>

        {/* Feedback */}
        <div className="space-y-4 mb-6">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Grammar Feedback
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {results.grammar.feedback}
            </p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Vocabulary Feedback
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {results.vocabulary.feedback}
            </p>
          </div>
        </div>

        {/* Suggestions */}
        {results.suggestions?.length > 0 && (
          <div className="mb-6">
            <h4 className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              Suggestions for Improvement
            </h4>
            <div className="space-y-2">
              {results.suggestions.map((suggestion, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 bg-amber-50/50 dark:bg-amber-950/20 rounded-xl border border-amber-200/40 dark:border-amber-800/30"
                >
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 text-[10px] font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {suggestion}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Transcript */}
        <details className="group">
          <summary className="text-xs font-semibold text-slate-500 dark:text-slate-400 cursor-pointer hover:text-slate-700 dark:hover:text-white transition">
            View your transcript
          </summary>
          <div className="mt-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
              "{transcript}"
            </p>
          </div>
        </details>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onTryAgain}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-bold rounded-2xl shadow-lg shadow-indigo-500/20 transition transform hover:-translate-y-0.5 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          Try Another Topic
        </button>
        <button
          onClick={loadHistory}
          disabled={loadingHistory}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-2xl transition cursor-pointer"
        >
          {loadingHistory ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <History className="w-4 h-4" />
          )}
          View History
        </button>
      </div>

      {/* History Panel */}
      {showHistory && history && (
        <div className="mt-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
            Recent Evaluations
          </h3>
          {history.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-4">No history yet</p>
          ) : (
            <div className="space-y-2">
              {history.map((h) => (
                <div
                  key={h._id}
                  className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800"
                >
                  <div>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {h.topic}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {new Date(h.createdAt).toLocaleDateString()} · {h.wordCount} words
                    </p>
                  </div>
                  <span className={`text-sm font-extrabold font-mono ${
                    h.results.overallScore >= 80
                      ? "text-emerald-500"
                      : h.results.overallScore >= 60
                      ? "text-indigo-500"
                      : "text-amber-500"
                  }`}>
                    {h.results.overallScore}%
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EvaluationResults;
