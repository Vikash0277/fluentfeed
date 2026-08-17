import React, { useState } from "react";
import {
  X,
  Users,
  UserCheck,
  Clock3,
  Check,
  PhoneCall,
  MessageSquare,
  Trash2,
  Sparkles,
} from "lucide-react";

export const ConnectionsDrawer = ({
  isOpen,
  onClose,
  connectionsData = {},
  onAccept,
  onReject,
  onCancel,
  onStartPractice,
}) => {
  const [activeTab, setActiveTab] = useState("partners"); // "partners" | "received" | "sent"

  if (!isOpen) return null;

  const {
    partners = [],
    receivedRequests = [],
    sentRequests = [],
  } = connectionsData;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div>
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 rounded-2xl">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Practice Connections
                  </h3>
                  <p className="text-xs text-slate-500">
                    Manage your language partners & requests
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

            {/* Navigation tabs */}
            <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveTab("partners")}
                className={`flex-1 py-2 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === "partners"
                    ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <span>Partners</span>
                <span className="px-1.5 py-0.2 bg-indigo-100 dark:bg-indigo-950 text-[10px] rounded-full">
                  {partners.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("received")}
                className={`flex-1 py-2 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === "received"
                    ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <span>Requests</span>
                {receivedRequests.length > 0 && (
                  <span className="px-1.5 py-0.2 bg-emerald-500 text-white text-[10px] font-bold rounded-full animate-pulse">
                    {receivedRequests.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab("sent")}
                className={`flex-1 py-2 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === "sent"
                    ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <span>Sent</span>
                <span className="px-1.5 py-0.2 bg-slate-200 dark:bg-slate-800 text-[10px] rounded-full">
                  {sentRequests.length}
                </span>
              </button>
            </div>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* 1. Active Connected Partners */}
            {activeTab === "partners" && (
              <>
                {partners.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 text-sm">
                    <Users className="w-10 h-10 mx-auto mb-2 opacity-30" />
                    <p className="font-semibold text-slate-700 dark:text-slate-300">No active practice partners yet</p>
                    <p className="text-xs text-slate-400 mt-1">Send a connection request to practice together!</p>
                  </div>
                ) : (
                  partners.map((item) => (
                    <div
                      key={item.connectionId}
                      className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 rounded-2xl flex items-center justify-between gap-3 hover:border-indigo-300 transition"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            item.partner?.profileImage ||
                            `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
                              item.partner?.fullName || "Buddy"
                            )}`
                          }
                          alt={item.partner?.fullName}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div>
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                            {item.partner?.fullName}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {item.partner?.englishLevel} • {item.partner?.country}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onStartPractice?.(item.partner)}
                          className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-xs transition"
                          title="Start English Practice Call"
                        >
                          <PhoneCall className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </>
            )}

            {/* 2. Received Requests */}
            {activeTab === "received" && (
              <>
                {receivedRequests.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 text-sm">
                    <UserCheck className="w-10 h-10 mx-auto mb-2 opacity-30" />
                    <p className="font-semibold text-slate-700 dark:text-slate-300">No pending requests</p>
                    <p className="text-xs text-slate-400 mt-1">When someone sends you a request, it will appear here.</p>
                  </div>
                ) : (
                  receivedRequests.map((req) => (
                    <div
                      key={req._id}
                      className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 rounded-2xl space-y-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            req.requester?.profileImage ||
                            `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
                              req.requester?.fullName || "User"
                            )}`
                          }
                          alt="Requester"
                          className="w-11 h-11 rounded-xl object-cover"
                        />
                        <div>
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                            {req.requester?.fullName}
                          </h4>
                          <p className="text-xs text-slate-500">
                            {req.requester?.englishLevel} • {req.requester?.country}
                          </p>
                        </div>
                      </div>

                      {req.message && (
                        <p className="text-xs text-slate-600 dark:text-slate-400 italic bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                          "{req.message}"
                        </p>
                      )}

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => onAccept(req._id)}
                          className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5" /> Accept
                        </button>
                        <button
                          onClick={() => onReject(req._id)}
                          className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl transition cursor-pointer"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </>
            )}

            {/* 3. Sent Requests */}
            {activeTab === "sent" && (
              <>
                {sentRequests.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 text-sm">
                    <Clock3 className="w-10 h-10 mx-auto mb-2 opacity-30" />
                    <p className="font-semibold text-slate-700 dark:text-slate-300">No sent requests</p>
                  </div>
                ) : (
                  sentRequests.map((req) => (
                    <div
                      key={req._id}
                      className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 rounded-2xl flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            req.recipient?.profileImage ||
                            `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
                              req.recipient?.fullName || "User"
                            )}`
                          }
                          alt="Recipient"
                          className="w-11 h-11 rounded-xl object-cover"
                        />
                        <div>
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                            {req.recipient?.fullName}
                          </h4>
                          <span className="text-[10px] text-amber-500 font-bold uppercase tracking-wider">
                            Pending Response
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => onCancel(req._id)}
                        className="text-xs text-rose-500 hover:text-rose-600 p-2 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition"
                        title="Cancel Request"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 text-center">
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionsDrawer;
