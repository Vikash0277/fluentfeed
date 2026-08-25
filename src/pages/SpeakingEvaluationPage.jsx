import React, { useState, useEffect } from "react";
import { Mic, Loader2, ArrowLeft } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import TopicSelector from "../components/TopicSelector";
import AudioRecorder from "../components/AudioRecorder";
import EvaluationResults from "../components/EvaluationResults";
import { updateStreak } from "../components/DailyPracticeSection";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { TOPICS } from "../utils/constants";

const STEPS = {
  TOPIC: "topic",
  RECORD: "record",
  RESULTS: "results",
};

export const SpeakingEvaluationPage = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [step, setStep] = useState(STEPS.TOPIC);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [evaluation, setEvaluation] = useState(null);
  const [loadingTopics, setLoadingTopics] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTopics();
  }, []);

  useEffect(() => {
    const topicId = searchParams.get("topicId");
    if (topicId && topics.length > 0 && !selectedTopic) {
      const topic = topics.find((t) => t.id === Number(topicId));
      if (topic) {
        setSelectedTopic(topic);
        setStep(STEPS.RECORD);
      }
    }
  }, [searchParams, topics, selectedTopic]);

  const loadTopics = async () => {
    setLoadingTopics(true);
    try {
      const res = await api.getTopics();
      setTopics(res.data.topics);
    } catch (err) {
      setTopics(TOPICS);
    } finally {
      setLoadingTopics(false);
    }
  };

  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
    setStep(STEPS.RECORD);
    setError(null);
  };

  const handleSubmitEvaluation = async (data) => {
    setError(null);
    try {
      const res = await api.submitEvaluation(data);
      setEvaluation(res.data.evaluation);
      setStep(STEPS.RESULTS);
      if (user?._id) {
        updateStreak(user._id);
      }
    } catch (err) {
      setError(err.message || "Failed to evaluate. Please try again.");
      throw err;
    }
  };

  const handleTryAgain = () => {
    setSelectedTopic(null);
    setEvaluation(null);
    setStep(STEPS.TOPIC);
    setError(null);
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
    setStep(STEPS.TOPIC);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <Mic className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Speaking Practice
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Speak on a topic and get AI-powered feedback on your English
            </p>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-8">
          {[
            { key: STEPS.TOPIC, label: "Choose Topic" },
            { key: STEPS.RECORD, label: "Speak" },
            { key: STEPS.RESULTS, label: "Results" },
          ].map((s, i) => (
            <React.Fragment key={s.key}>
              {i > 0 && (
                <div className={`flex-1 h-0.5 rounded-full ${
                  ["topic", "record", "results"].indexOf(step) >= i
                    ? "bg-indigo-500"
                    : "bg-slate-200 dark:bg-slate-800"
                }`} />
              )}
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold ${
                  step === s.key
                    ? "bg-indigo-600 text-white"
                    : ["topic", "record", "results"].indexOf(step) > ["topic", "record", "results"].indexOf(s.key)
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                }`}>
                  {["topic", "record", "results"].indexOf(step) > ["topic", "record", "results"].indexOf(s.key) ? "✓" : i + 1}
                </div>
                <span className={`hidden sm:inline text-xs font-semibold ${
                  step === s.key ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400"
                }`}>
                  {s.label}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-2xl text-sm text-rose-600 dark:text-rose-400 text-center">
            {error}
          </div>
        )}

        {/* Content */}
        {step === STEPS.TOPIC && (
          <TopicSelector
            topics={topics}
            onSelect={handleSelectTopic}
            loading={loadingTopics}
          />
        )}

        {step === STEPS.RECORD && selectedTopic && (
          <AudioRecorder
            topic={selectedTopic}
            onSubmit={handleSubmitEvaluation}
            onBack={handleBackToTopics}
          />
        )}

        {step === STEPS.RESULTS && evaluation && (
          <EvaluationResults
            evaluation={evaluation}
            onTryAgain={handleTryAgain}
            onBackToTopics={handleBackToTopics}
          />
        )}
      </div>
    </div>
  );
};

export default SpeakingEvaluationPage;
