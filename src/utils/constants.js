export const TOPICS = [
  { id: 1, title: "My Daily Routine", description: "Describe your typical day from morning to night", icon: "sun", category: "Lifestyle" },
  { id: 2, title: "A Memorable Travel Experience", description: "Talk about a trip that left a lasting impression", icon: "plane", category: "Travel" },
  { id: 3, title: "Technology in My Life", description: "How technology has changed the way you live and work", icon: "laptop", category: "Technology" },
  { id: 4, title: "My Favorite Hobby", description: "Explain what you love doing in your free time", icon: "heart", category: "Lifestyle" },
  { id: 5, title: "Career Goals", description: "Where do you see yourself professionally in 5 years?", icon: "briefcase", category: "Career" },
  { id: 6, title: "The Importance of Education", description: "Why education matters and how it shapes society", icon: "book", category: "Society" },
  { id: 7, title: "A Book or Movie That Changed Me", description: "Share how a story influenced your perspective", icon: "film", category: "Culture" },
  { id: 8, title: "Healthy Living", description: "Tips and habits for maintaining a healthy lifestyle", icon: "heart-pulse", category: "Health" },
  { id: 9, title: "My Dream Vacation", description: "Describe your ideal getaway and what makes it special", icon: "palm-tree", category: "Travel" },
  { id: 10, title: "Environmental Challenges", description: "Discuss a pressing environmental issue and solutions", icon: "leaf", category: "Society" },
  { id: 11, title: "Learning English", description: "Your journey learning English - challenges and wins", icon: "languages", category: "Education" },
  { id: 12, title: "If I Could Change One Thing", description: "What would you change about the world and why?", icon: "sparkles", category: "Society" },
];

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


