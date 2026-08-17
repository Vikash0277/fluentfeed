import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FilterBar from "./components/FilterBar";
import PartnerCard from "./components/PartnerCard";
import SkeletonCard from "./components/SkeletonCard";
import EmptyState from "./components/EmptyState";
import ProfileModal from "./components/ProfileModal";
import MatchDetailModal from "./components/MatchDetailModal";
import ConnectionsDrawer from "./components/ConnectionsDrawer";
import ScoringGuideModal from "./components/ScoringGuideModal";
import Toast from "./components/Toast";
import api from "./services/api";
import confetti from "canvas-confetti";

export function App() {
  const { user, isProfileComplete, updateProfile } = useAuth();
  
  // State
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("top_matches"); // "top_matches" | "all_partners"
  const [filters, setFilters] = useState({
    search: "",
    englishLevel: "All",
    learningGoal: "All",
    preferredSpeakingTime: "All",
    country: "All",
    sortBy: "compatibility",
  });

  // Modal States
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isScoringGuideOpen, setIsScoringGuideOpen] = useState(false);
  const [isConnectionsDrawerOpen, setIsConnectionsDrawerOpen] = useState(false);
  const [selectedPartnerDetail, setSelectedPartnerDetail] = useState(null);

  // Toast State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const [error, setError] = useState(null);

  const loadMatches = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await api.getMatches({
        ...filters,
        limit: viewMode === "top_matches" ? 5 : 50,
      });

      if (res.data?.matches) {
        setMatches(res.data.matches);
      }
    } catch (err) {
      console.error("Failed to load matches:", err.message);
      setError("User not available yet");
      setMatches([]);
    } finally {
      setIsLoading(false);
    }
  }, [filters, viewMode]);

  useEffect(() => {
    loadMatches();
  }, [loadMatches]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: "",
      englishLevel: "All",
      learningGoal: "All",
      preferredSpeakingTime: "All",
      country: "All",
      sortBy: "compatibility",
    });
  };

  /**
   * Handle sending / accepting connection request (Optimistic update)
   */
  const handleConnect = async (partnerId, connectionId, currentStatus) => {
    setMatches((prev) =>
      prev.map((item) => {
        if (item.user._id === partnerId) {
          return {
            ...item,
            connectionStatus: currentStatus === "pending_received" ? "connected" : "pending_sent",
          };
        }
        return item;
      })
    );

    const partner = matches.find((m) => m.user._id === partnerId)?.user;

    try {
      if (currentStatus === "pending_received" && connectionId) {
        await api.respondToConnection(connectionId, "accept");
        showToast(`Connected with ${partner?.fullName}! You can now practice together.`, "success");
      } else {
        await api.sendConnectionRequest(partnerId);
        showToast(`Connection request sent to ${partner?.fullName}!`, "success");
      }
    } catch (err) {
      showToast(err.message || "Something went wrong. Please try again.", "error");
      setMatches((prev) =>
        prev.map((item) => {
          if (item.user._id === partnerId) {
            return { ...item, connectionStatus: "none" };
          }
          return item;
        })
      );
    }
  };

  const handleSaveProfile = async (profileData) => {
    await updateProfile(profileData);
    showToast("Profile updated successfully! Matches recalculated.", "success");
    confetti({ particleCount: 40, spread: 50 });
  };

  const pendingRequestsCount = 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors selection:bg-indigo-500 selection:text-white">
      {/* Toast notifications */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Global Navbar */}
      <Navbar
        currentUser={user}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenConnections={() => setIsConnectionsDrawerOpen(true)}
        pendingRequestsCount={pendingRequestsCount}
      />

      {/* Main Page Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <HeroSection
          currentUser={user}
          isProfileComplete={isProfileComplete}
          onOpenProfile={() => setIsProfileModalOpen(true)}
          onOpenScoringGuide={() => setIsScoringGuideOpen(true)}
          totalMatchesCount={matches.length}
        />

        {/* Dynamic Filters & Search Bar */}
        <div className="mb-8">
          <FilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            totalResults={matches.length}
          />
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {viewMode === "top_matches" ? "🎯 Top 5 Compatible Partners" : "🌐 All Practice Partners"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              {viewMode === "top_matches"
                ? "Highest compatibility score ranked by goal, level, time, and location"
                : `Showing ${matches.length} English learners worldwide`}
            </p>
          </div>

          <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1.5 rounded-xl border border-indigo-100 dark:border-indigo-900/50">
            {matches.length} {matches.length === 1 ? "Partner" : "Partners"} Found
          </div>
        </div>

        {/* Partners Grid / Skeleton / Empty State */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <SkeletonCard key={idx} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-sm text-rose-500 dark:text-rose-400 mb-4">{error}</p>
            <button
              onClick={loadMatches}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition cursor-pointer"
            >
              Retry
            </button>
          </div>
        ) : matches.length === 0 ? (
          <EmptyState
            type="no_matches"
            onReset={handleResetFilters}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
            {matches.map((matchItem) => (
              <PartnerCard
                key={matchItem.user._id}
                matchData={matchItem}
                onConnect={handleConnect}
                onViewDetails={(partner, data) =>
                  setSelectedPartnerDetail({ partner, matchData: data })
                }
              />
            ))}
          </div>
        )}
      </main>

      {/* Modals & Slide-over Drawers */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentUser={user}
        onSave={handleSaveProfile}
      />

      <ScoringGuideModal
        isOpen={isScoringGuideOpen}
        onClose={() => setIsScoringGuideOpen(false)}
      />

      <ConnectionsDrawer
        isOpen={isConnectionsDrawerOpen}
        onClose={() => setIsConnectionsDrawerOpen(false)}
        connectionsData={{ partners: [], receivedRequests: [], sentRequests: [] }}
        onAccept={(reqId) => {
          showToast("Connection accepted!", "success");
        }}
        onReject={(reqId) => {
          showToast("Request declined", "info");
        }}
        onCancel={(reqId) => {
          showToast("Request cancelled", "info");
        }}
        onStartPractice={(partner) => {
          showToast(`Initiating practice voice call with ${partner.fullName}...`, "info");
        }}
      />

      {selectedPartnerDetail && (
        <MatchDetailModal
          isOpen={Boolean(selectedPartnerDetail)}
          onClose={() => setSelectedPartnerDetail(null)}
          currentUser={user}
          partner={selectedPartnerDetail.partner}
          matchData={selectedPartnerDetail.matchData}
          onConnect={handleConnect}
        />
      )}
    </div>
  );
}

export default App;
