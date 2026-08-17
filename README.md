# 🌐 FluentFeed Frontend

> **AI-Powered English Practice Platform — Practice Partner Matching UI**

A responsive web application built with **React**, **Vite**, **Tailwind CSS v4**, and modern UX patterns to help English language learners discover compatible practice partners worldwide based on learning goals, fluency levels, speaking times, and native locations.

---

## ✨ Features

- **🎯 Practice Partner Matching**:
  - Automatically calculates real-time compatibility scores based on the 100-point rubric (+40 Goal, +25 Level, +20 Time, +10 Country, +5 Language).
  - Displays Top 5 highest compatible partners or allows browsing all learners.
  - Interactive circular SVG match percentage gauge with gradient color indicators.
  - Detailed *"Why you matched"* dropdown explaining exact scoring dimensions.
- **👤 English Learning Profile**:
  - Full profile completion and editing with live avatar presets, level badges, goal selections, and speaking time slots.
  - Profile completeness indicator banner with 1-click onboarding.
- **🔍 Dynamic Real-Time Search & Filters**:
  - Debounced search input (by name, country, language, bio).
  - Filters for English Level (*Beginner*, *Intermediate*, *Advanced*), Learning Goal (*Job Interview*, *Daily Communication*, *Business English*), Preferred Speaking Time (*Morning*, *Afternoon*, *Evening*, *Night*), and Country.
  - Sort by *Highest Compatibility* or *Recently Joined*.
  - Active filter tags with 1-click clear.
- **🤝 Connections Management**:
  - Optimistic UI updates on Connect button actions.
  - Slide-over drawer to view active practice partners, incoming connection requests (with 1-click Accept/Decline), and sent requests.
- **🎨 Premium UI / UX & Aesthetics**:
  - Dark Mode / Light Mode with instant transition and localStorage persistence.
  - Responsive layout for Mobile, Tablet, and Desktop.
  - Shimmer Skeleton loading states during data retrieval.
  - Confetti celebration effect upon sending connection requests or achieving high match scores.
  - Perspective Switcher: 1-click demo persona switcher (*John Doe*, *Elena*, *Aarav*, *Kenji*) to test matching from different user viewpoints!

---

## 🛠 Tech Stack

- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`) + Custom Glassmorphism
- **Icons**: `lucide-react`
- **Animations & Effects**: `canvas-confetti`, Tailwind keyframes
- **State & Context**: React Context API (`AuthContext`, `ThemeContext`)

---

## 📁 Folder Structure

```
fluentfeed/
├── index.html                   # HTML template with Google Fonts (Inter + Outfit)
├── vite.config.js               # Vite config with Tailwind CSS v4 & API Proxy
├── package.json                 # Dependencies and npm scripts
└── src/
    ├── main.jsx                 # React root render wrapped in Theme & Auth providers
    ├── App.jsx                  # Master application container
    ├── index.css                # Tailwind CSS v4 imports, glassmorphism & typography
    ├── components/
    │   ├── Navbar.jsx           # Top navigation, demo switcher, theme toggle & profile trigger
    │   ├── HeroSection.jsx      # Metrics banner, statistics & profile warnings
    │   ├── FilterBar.jsx        # Debounced search, dropdown filters, & view mode toggle
    │   ├── PartnerCard.jsx      # High-fidelity partner card with match gauge & connect button
    │   ├── ProfileModal.jsx     # Onboarding & profile edit modal with validation
    │   ├── MatchDetailModal.jsx # 1-on-1 dimension comparison breakdown & icebreakers
    │   ├── ConnectionsDrawer.jsx# Slide-over panel for incoming/outgoing connection requests
    │   ├── ScoringGuideModal.jsx# 100-point matching formula breakdown guide
    │   ├── SkeletonCard.jsx     # Shimmer skeleton loader
    │   ├── EmptyState.jsx       # Empty search/filter state illustrations
    │   └── Toast.jsx            # Non-intrusive floating toast notifications
    ├── context/
    │   ├── AuthContext.jsx      # User authentication, profile state, and demo switcher
    │   └── ThemeContext.jsx     # Dark & light mode theme manager
    ├── services/
    │   └── api.js               # API service layer with JWT headers & fallback resilience
    └── utils/
        └── constants.js         # Presets for levels, goals, speaking times, languages & countries
```

---

## 🚀 Getting Started & Installation

### 1. Navigate to Frontend Directory
```bash
cd fluentfeed
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

The app will be running at `http://localhost:5173`.

### 4. Build for Production
```bash
npm run build
```

---

## 🧪 Evaluation & Demo Testing

1. **Switch Demo Perspectives**:
   - Use the **"Perspective"** dropdown in the top navbar to instantly test the matching algorithm from different users (e.g. *John Doe* in Germany vs *Aarav* in India vs *Kenji* in Japan).
2. **Test Search & Filters**:
   - Type in the search box to see debounced real-time filtering by name, country, or language.
   - Filter by *Beginner*, *Intermediate*, or *Advanced* to see dynamic partner updates.
3. **Test Connections**:
   - Click the **Connect** button on any partner card to see optimistic UI updates, toast alerts, and confetti.
   - Open the **Connections** icon in the navbar to manage requests.
4. **Edit Profile**:
   - Click your profile avatar to modify your English level, learning goal, or speaking time and watch match percentages automatically recalculate!
