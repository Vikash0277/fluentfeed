const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("fluentfeed_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

/**
 * Robust fetch wrapper with JSON parsing and fallback error handling
 */
const request = async (endpoint, options = {}) => {
  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`;
  const headers = options.isFormData
    ? {
        ...(localStorage.getItem("fluentfeed_token")
          ? { Authorization: `Bearer ${localStorage.getItem("fluentfeed_token")}` }
          : {}),
      }
    : {
        ...getAuthHeaders(),
        ...options.headers,
      };

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });

    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error("Server is unavailable. Please try again later.");
    }

    if (!res.ok) {
      throw new Error(data.message || `Request failed with status ${res.status}`);
    }
    return data;
  } catch (error) {
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error("Cannot connect to server. Please make sure the backend is running.");
    }
    throw error;
  }
};

export const api = {
  // Authentication
  register: (userData) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    }),

  login: (credentials) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  getMe: () => request("/auth/me"),

  // User Profile
  updateProfile: (profileData) =>
    request("/users/profile", {
      method: "PUT",
      body: JSON.stringify(profileData),
    }),

  completeProfile: (profileData) =>
    request("/users/profile/complete", {
      method: "POST",
      body: JSON.stringify(profileData),
    }),

  uploadAvatar: (formData) =>
    request("/users/profile/image", {
      method: "POST",
      body: formData,
      isFormData: true,
    }),

  getUserById: (id) => request(`/users/${id}`),

  searchUsers: (params = {}) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "" && value !== "All") {
        searchParams.append(key, value);
      }
    });
    return request(`/users/search?${searchParams.toString()}`);
  },

  // Matching
  getMatches: (params = {}) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "" && value !== "All") {
        searchParams.append(key, value);
      }
    });
    return request(`/matches?${searchParams.toString()}`);
  },

  getMatchDetail: (targetUserId) => request(`/matches/${targetUserId}`),

  // Connections
  getMyConnections: () => request("/connections"),

  sendConnectionRequest: (recipientId, message) =>
    request(`/connections/request/${recipientId}`, {
      method: "POST",
      body: JSON.stringify({ message }),
    }),

  respondToConnection: (connectionId, action) =>
    request(`/connections/${connectionId}/respond`, {
      method: "PUT",
      body: JSON.stringify({ action }),
    }),

  removeConnection: (connectionId) =>
    request(`/connections/${connectionId}`, {
      method: "DELETE",
    }),

  // Speaking Evaluation
  getTopics: () => request("/evaluations/topics"),

  submitEvaluation: (data) =>
    request("/evaluations", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getEvaluationHistory: (params = {}) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.append(key, value);
      }
    });
    return request(`/evaluations/history?${searchParams.toString()}`);
  },

  getEvaluationById: (id) => request(`/evaluations/${id}`),
};

export default api;
