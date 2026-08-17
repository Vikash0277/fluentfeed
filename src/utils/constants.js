export const ENGLISH_LEVELS = ["Beginner", "Intermediate", "Advanced"];

export const LEARNING_GOALS = [
  "Job Interview",
  "Daily Communication",
  "Business English",
];

export const PREFERRED_SPEAKING_TIMES = [
  "Morning",
  "Afternoon",
  "Evening",
  "Night",
];

export const SPEAKING_TIME_DETAILS = {
  Morning: { label: "Morning", icon: "🌅", hours: "06:00 - 12:00" },
  Afternoon: { label: "Afternoon", icon: "☀️", hours: "12:00 - 17:00" },
  Evening: { label: "Evening", icon: "🌆", hours: "17:00 - 21:00" },
  Night: { label: "Night", icon: "🌙", hours: "21:00 - 02:00" },
};

export const COMMON_COUNTRIES = [
  "Germany",
  "India",
  "Japan",
  "United States",
  "France",
  "Brazil",
  "Spain",
  "Mexico",
  "United Kingdom",
  "United Arab Emirates",
  "South Korea",
  "Canada",
  "Italy",
  "Australia",
  "Turkey",
];

export const COMMON_LANGUAGES = [
  "Spanish",
  "Hindi",
  "Russian",
  "Japanese",
  "French",
  "Portuguese",
  "Arabic",
  "German",
  "Korean",
  "Mandarin",
  "Italian",
  "Turkish",
  "English",
];

export const SCORING_WEIGHTS = {
  LEARNING_GOAL: 40,
  ENGLISH_LEVEL: 25,
  SPEAKING_TIME: 20,
  COUNTRY: 10,
  NATIVE_LANGUAGE: 5,
};

export const SCORING_CRITERIA = [
  { criteria: "Same Learning Goal", points: 40, description: "Aligns your core practice objectives (e.g. Job Interview vs Business English)" },
  { criteria: "Same English Level", points: 25, description: "Pairs you with learners at an equal conversational fluency" },
  { criteria: "Same Preferred Speaking Time", points: 20, description: "Ensures you are free at matching hours of the day" },
  { criteria: "Same Country", points: 10, description: "Shares similar timezone and cultural references" },
  { criteria: "Same Native Language", points: 5, description: "Helps relate to common language-specific pronunciation habits" },
];


