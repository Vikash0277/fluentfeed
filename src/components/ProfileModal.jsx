import React, { useState, useEffect } from "react";
import {
  X,
  User,
  Image,
  Target,
  Award,
  Clock,
  Globe,
  Languages,
  CheckCircle2,
  Sparkles,
  Camera,
} from "lucide-react";
import {
  ENGLISH_LEVELS,
  LEARNING_GOALS,
  PREFERRED_SPEAKING_TIMES,
  COMMON_COUNTRIES,
  COMMON_LANGUAGES,
  SPEAKING_TIME_DETAILS,
} from "../utils/constants";

export const ProfileModal = ({
  isOpen,
  onClose,
  currentUser,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    profileImage: "",
    englishLevel: "Intermediate",
    learningGoal: "Job Interview",
    preferredSpeakingTime: "Evening",
    nativeLanguage: "Spanish",
    country: "Germany",
    bio: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (currentUser) {
      setFormData({
        fullName: currentUser.fullName || "",
        profileImage: currentUser.profileImage || "",
        englishLevel: currentUser.englishLevel || "Intermediate",
        learningGoal: currentUser.learningGoal || "Job Interview",
        preferredSpeakingTime: currentUser.preferredSpeakingTime || "Evening",
        nativeLanguage: currentUser.nativeLanguage || "Spanish",
        country: currentUser.country || "Germany",
        bio: currentUser.bio || "",
      });
    }
  }, [currentUser, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName?.trim()) newErrors.fullName = "Full name is required";
    if (!formData.englishLevel) newErrors.englishLevel = "English level is required";
    if (!formData.learningGoal) newErrors.learningGoal = "Learning goal is required";
    if (!formData.preferredSpeakingTime) newErrors.preferredSpeakingTime = "Preferred speaking time is required";
    if (!formData.nativeLanguage?.trim()) newErrors.nativeLanguage = "Native language is required";
    if (!formData.country?.trim()) newErrors.country = "Country is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSaving(true);
    try {
      await onSave(formData);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const avatarPresets = [
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(formData.fullName || "Alex")}`,
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-8 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8">

        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 rounded-2xl">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                English Learning Profile
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Complete your details to find your most compatible practice partners
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

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar and Name */}
          <div className="flex flex-col sm:flex-row items-center gap-5 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
            <div className="relative group">
              <img
                src={formData.profileImage || avatarPresets[0]}
                alt="Avatar"
                className="w-20 h-20 rounded-2xl object-cover border-2 border-indigo-500/50 shadow-md"
              />
            </div>

            <div className="flex-1 w-full space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                {errors.fullName && <p className="text-[11px] text-rose-500 mt-1">{errors.fullName}</p>}
              </div>

              {/* Avatar presets */}
              <div>
                <span className="text-[11px] text-slate-500 font-medium block mb-1.5">Choose Avatar:</span>
                <div className="flex items-center gap-2">
                  {avatarPresets.map((preset, idx) => (
                    <img
                      key={idx}
                      src={preset}
                      alt="Preset"
                      onClick={() => setFormData({ ...formData, profileImage: preset })}
                      className={`w-7 h-7 rounded-lg object-cover cursor-pointer transition transform hover:scale-110 border ${
                        formData.profileImage === preset ? "border-indigo-500 ring-2 ring-indigo-500/30" : "border-slate-200 dark:border-slate-700 opacity-70"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 1. English Level */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-indigo-500" />
              <span>English Level * (+25% Match)</span>
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {ENGLISH_LEVELS.map((lvl) => (
                <button
                  type="button"
                  key={lvl}
                  onClick={() => setFormData({ ...formData, englishLevel: lvl })}
                  className={`p-3 rounded-2xl border text-xs font-bold text-center transition cursor-pointer flex flex-col items-center gap-1 ${
                    formData.englishLevel === lvl
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/25"
                      : "bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700/80 hover:border-indigo-300"
                  }`}
                >
                  <span>{lvl}</span>
                  <span className={`text-[10px] font-normal ${formData.englishLevel === lvl ? "text-indigo-100" : "text-slate-400"}`}>
                    {lvl === "Beginner" ? "A1 - A2" : lvl === "Intermediate" ? "B1 - B2" : "C1 - C2"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Learning Goal */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-emerald-500" />
              <span>Learning Goal * (+40% Match)</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {LEARNING_GOALS.map((goal) => (
                <button
                  type="button"
                  key={goal}
                  onClick={() => setFormData({ ...formData, learningGoal: goal })}
                  className={`p-3 rounded-2xl border text-xs font-bold text-left transition cursor-pointer flex items-center gap-2.5 ${
                    formData.learningGoal === goal
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-500/25"
                      : "bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700/80 hover:border-emerald-300"
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${formData.learningGoal === goal ? "bg-white" : "bg-emerald-500"}`} />
                  <span>{goal}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Preferred Speaking Time */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>Preferred Speaking Time * (+20% Match)</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {PREFERRED_SPEAKING_TIMES.map((time) => {
                const info = SPEAKING_TIME_DETAILS[time];
                const isSelected = formData.preferredSpeakingTime === time;
                return (
                  <button
                    type="button"
                    key={time}
                    onClick={() => setFormData({ ...formData, preferredSpeakingTime: time })}
                    className={`p-3 rounded-2xl border text-xs font-bold text-center transition cursor-pointer flex flex-col items-center gap-1 ${
                      isSelected
                        ? "bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/25"
                        : "bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700/80 hover:border-amber-300"
                    }`}
                  >
                    <span className="text-base">{info.icon}</span>
                    <span>{time}</span>
                    <span className={`text-[10px] font-normal ${isSelected ? "text-amber-100" : "text-slate-400"}`}>
                      {info.hours}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Country & Native Language */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Country */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-sky-500" />
                <span>Country * (+10% Match)</span>
              </label>
              <input
                type="text"
                list="country-suggestions"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                placeholder="e.g. Germany"
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <datalist id="country-suggestions">
                {COMMON_COUNTRIES.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
              {errors.country && <p className="text-[11px] text-rose-500 mt-1">{errors.country}</p>}
            </div>

            {/* Native Language */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                <Languages className="w-3.5 h-3.5 text-purple-500" />
                <span>Native Language * (+5% Match)</span>
              </label>
              <input
                type="text"
                list="language-suggestions"
                value={formData.nativeLanguage}
                onChange={(e) => setFormData({ ...formData, nativeLanguage: e.target.value })}
                placeholder="e.g. Spanish"
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <datalist id="language-suggestions">
                {COMMON_LANGUAGES.map((lang) => (
                  <option key={lang} value={lang} />
                ))}
              </datalist>
              {errors.nativeLanguage && <p className="text-[11px] text-rose-500 mt-1">{errors.nativeLanguage}</p>}
            </div>
          </div>

          {/* 5. Short Bio */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Short Introduction (Bio)
            </label>
            <textarea
              rows={2}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Tell practice partners a bit about yourself, interests, and what you like to talk about..."
              maxLength={300}
              className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
            />
          </div>

          {/* Footer Save Button */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-500/25 transition transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
            >
              {isSaving ? "Saving Profile..." : "Save Profile & Update Matches"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
