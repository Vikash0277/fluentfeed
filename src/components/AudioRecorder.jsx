import React, { useState, useEffect, useRef, useCallback } from "react";
import { Mic, MicOff, Square, Send, RotateCcw, Loader2 } from "lucide-react";

const MIN_WORDS = 20;
const TARGET_WORDS_MIN = 100;
const TARGET_WORDS_MAX = 200;

export const AudioRecorder = ({ topic, onSubmit, onBack }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [duration, setDuration] = useState(0);
  const [isSupported, setIsSupported] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [interimTranscript, setInterimTranscript] = useState("");

  const recognitionRef = useRef(null);
  const timerRef = useRef(null);
  const transcriptRef = useRef("");

  const wordCount = transcript.trim() ? transcript.trim().split(/\s+/).length : 0;
  const canSubmit = wordCount >= MIN_WORDS && !isSubmitting;

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let finalText = "";
      let interimText = "";

      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalText += result[0].transcript + " ";
        } else {
          interimText += result[0].transcript;
        }
      }

      transcriptRef.current = finalText;
      setTranscript(finalText);
      setInterimTranscript(interimText);
    };

    recognition.onerror = (event) => {
      if (event.error !== "no-speech" && event.error !== "aborted") {
        setError(`Speech recognition error: ${event.error}`);
      }
    };

    recognition.onend = () => {
      if (recognitionRef.current && isRecording) {
        try {
          recognition.start();
        } catch {}
      }
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
      recognitionRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setDuration((d) => d + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRecording]);

  const toggleRecording = useCallback(() => {
    if (!recognitionRef.current) return;

    setError(null);
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      setTranscript("");
      setInterimTranscript("");
      transcriptRef.current = "";
      setDuration(0);
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (e) {
        setError("Could not start speech recognition. Please try again.");
      }
    }
  }, [isRecording]);

  const resetRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
    setTranscript("");
    setInterimTranscript("");
    transcriptRef.current = "";
    setDuration(0);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setIsSubmitting(true);
    try {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
      await onSubmit({
        topic: topic.title,
        transcript: transcript.trim(),
        audioDuration: duration,
      });
    } catch (e) {
      setError(e.message || "Failed to submit evaluation");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const getWordCountColor = () => {
    if (wordCount < MIN_WORDS) return "text-rose-500 dark:text-rose-400";
    if (wordCount < TARGET_WORDS_MIN) return "text-amber-500 dark:text-amber-400";
    if (wordCount <= TARGET_WORDS_MAX) return "text-emerald-500 dark:text-emerald-400";
    return "text-indigo-500 dark:text-indigo-400";
  };

  if (!isSupported) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-rose-100 dark:bg-rose-950/60 flex items-center justify-center">
          <MicOff className="w-8 h-8 text-rose-500" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
          Speech Recognition Not Supported
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
          Your browser doesn't support the Web Speech API. Please use Chrome, Edge, or Safari to use the speaking evaluation feature.
        </p>
        <button
          onClick={onBack}
          className="px-5 py-2.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-xl transition cursor-pointer"
        >
          Choose Another Topic
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white mb-6 transition cursor-pointer"
      >
        ← Back to Topics
      </button>

      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="text-center mb-6">
          <span className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-xl border border-indigo-200/60 dark:border-indigo-800/40 mb-3">
            {topic.category}
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            {topic.title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {topic.description}
          </p>
        </div>

        <div className="text-center mb-6">
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">
            Speak naturally into your microphone. Aim for 100-200 words.
          </p>
        </div>

        {/* Recording Controls */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={resetRecording}
              disabled={isRecording || (!transcript && duration === 0)}
              className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              title="Reset"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            <button
              onClick={toggleRecording}
              className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg ${
                isRecording
                  ? "bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/30 animate-pulse"
                  : "bg-gradient-to-br from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-indigo-500/30"
              }`}
            >
              {isRecording ? (
                <Square className="w-7 h-7" fill="currentColor" />
              ) : (
                <Mic className="w-8 h-8" />
              )}
            </button>

            <div className="w-12" />
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-slate-500 dark:text-slate-400">
              {formatTime(duration)}
            </span>
            <span className={`font-bold ${getWordCountColor()}`}>
              {wordCount} words
            </span>
            {isRecording && (
              <span className="flex items-center gap-1.5 text-rose-500">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                Recording
              </span>
            )}
          </div>
        </div>

        {/* Transcript Display */}
        {(transcript || interimTranscript || isRecording) && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Live Transcript
              </span>
              <span className={`text-[10px] font-semibold ${
                wordCount >= TARGET_WORDS_MIN && wordCount <= TARGET_WORDS_MAX
                  ? "text-emerald-500"
                  : wordCount >= MIN_WORDS
                  ? "text-amber-500"
                  : "text-slate-400"
              }`}>
                {wordCount < MIN_WORDS
                  ? `Need ${MIN_WORDS - wordCount} more words`
                  : wordCount < TARGET_WORDS_MIN
                  ? `${TARGET_WORDS_MIN - wordCount} more for target`
                  : wordCount <= TARGET_WORDS_MAX
                  ? "Perfect length!"
                  : `${wordCount - TARGET_WORDS_MAX} over target`}
              </span>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 min-h-[120px] max-h-[300px] overflow-y-auto">
              {transcript && (
                <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                  {transcript}
                </p>
              )}
              {interimTranscript && (
                <span className="text-sm text-slate-400 dark:text-slate-500 italic">
                  {interimTranscript}
                </span>
              )}
              {!transcript && !interimTranscript && isRecording && (
                <p className="text-sm text-slate-400 dark:text-slate-500 italic animate-pulse">
                  Listening... Start speaking now
                </p>
              )}
            </div>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-xs text-rose-600 dark:text-rose-400 text-center">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-bold rounded-2xl shadow-lg shadow-indigo-500/20 transition transform hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Analyzing with AI...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Submit for Evaluation
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AudioRecorder;
