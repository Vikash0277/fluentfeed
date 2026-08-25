import React from "react";
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
} from "lucide-react";
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

const categoryBgs = {
  Lifestyle: "bg-rose-50 dark:bg-rose-950/40 border-rose-200/60 dark:border-rose-800/40 hover:border-rose-300 dark:hover:border-rose-700",
  Travel: "bg-sky-50 dark:bg-sky-950/40 border-sky-200/60 dark:border-sky-800/40 hover:border-sky-300 dark:hover:border-sky-700",
  Technology: "bg-violet-50 dark:bg-violet-950/40 border-violet-200/60 dark:border-violet-800/40 hover:border-violet-300 dark:hover:border-violet-700",
  Career: "bg-amber-50 dark:bg-amber-950/40 border-amber-200/60 dark:border-amber-800/40 hover:border-amber-300 dark:hover:border-amber-700",
  Society: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200/60 dark:border-emerald-800/40 hover:border-emerald-300 dark:hover:border-emerald-700",
  Culture: "bg-fuchsia-50 dark:bg-fuchsia-950/40 border-fuchsia-200/60 dark:border-fuchsia-800/40 hover:border-fuchsia-300 dark:hover:border-fuchsia-700",
  Health: "bg-red-50 dark:bg-red-950/40 border-red-200/60 dark:border-red-800/40 hover:border-red-300 dark:hover:border-red-700",
  Education: "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200/60 dark:border-indigo-800/40 hover:border-indigo-300 dark:hover:border-indigo-700",
};

export const TopicSelector = ({ topics, onSelect, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-36 rounded-3xl bg-slate-100 dark:bg-slate-800/50 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Choose a Topic
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Pick a topic and speak for 100-200 words. We'll evaluate your English.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map((topic) => {
          const Icon = iconMap[topic.icon] || Sparkles;
          return (
            <button
              key={topic.id}
              onClick={() => onSelect(topic)}
              className={`group text-left p-5 rounded-3xl border-2 transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-0.5 ${
                categoryBgs[topic.category] || categoryBgs.Lifestyle
              }`}
            >
              <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${categoryColors[topic.category] || "from-indigo-500 to-violet-500"} flex items-center justify-center text-white shadow-md mb-3 group-hover:scale-110 transition`}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                {topic.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                {topic.description}
              </p>
              <span className="inline-block mt-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-white/60 dark:bg-slate-900/40 text-slate-600 dark:text-slate-300 rounded-md">
                {topic.category}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TopicSelector;
