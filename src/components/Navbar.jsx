import React from "react";
import {
  Sparkles,
  Users,
  Mic,
  Sun,
  Moon,
  LogOut,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

export const Navbar = ({
  currentUser,
  onOpenProfile,
  onOpenConnections,
  pendingRequestsCount = 0,
}) => {
  const { isDark, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isEvaluationPage = location.pathname === "/evaluation";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl tracking-tight text-slate-900 dark:text-white">
                Fluent<span className="text-indigo-600 dark:text-indigo-400">Feed</span>
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 rounded-md border border-indigo-200 dark:border-indigo-800/60">
                Partner Match
              </span>
            </div>
            <p className="hidden md:block text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              AI-Powered English Practice Community
            </p>
          </div>
        </div>

        {/* Right Tools */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Speaking Practice */}
          <button
            onClick={() => navigate(isEvaluationPage ? "/" : "/evaluation")}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              isEvaluationPage
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
                : "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-950/80 border border-indigo-200/60 dark:border-indigo-800/40"
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isEvaluationPage ? "Dashboard" : "Speaking"}</span>
          </button>

          {/* Connections Drawer Button */}
          <button
            onClick={onOpenConnections}
            className="relative p-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl transition cursor-pointer"
            title="My Connections"
          >
            <Users className="w-4 h-4" />
            {pendingRequestsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-white text-[10px] font-extrabold flex items-center justify-center rounded-full shadow-xs">
                {pendingRequestsCount}
              </span>
            )}
          </button>

          {/* Theme Toggle (Dark/Light) */}
          <button
            onClick={toggleTheme}
            className="p-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl transition cursor-pointer"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="p-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl transition cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>

          {/* Current User Profile Avatar */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 p-1 pl-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 transition cursor-pointer"
          >
            <span className="hidden md:inline text-xs font-bold text-slate-800 dark:text-slate-200">
              Profile
            </span>
            <img
              src={
                currentUser?.profileImage ||
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
                  currentUser?.fullName || "User"
                )}`
              }
              alt="Avatar"
              className="w-7 h-7 rounded-xl object-cover border border-indigo-500/40"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
