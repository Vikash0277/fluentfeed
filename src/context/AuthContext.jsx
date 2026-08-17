import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("fluentfeed_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("fluentfeed_token") || "");
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const savedToken = localStorage.getItem("fluentfeed_token");
      if (savedToken) {
        try {
          setIsLoading(true);
          const res = await api.getMe();
          if (res.data?.user) {
            setUser(res.data.user);
            localStorage.setItem("fluentfeed_user", JSON.stringify(res.data.user));
          }
        } catch (err) {
          console.warn("Session expired or server unreachable:", err.message);
          setUser(null);
          setToken("");
          localStorage.removeItem("fluentfeed_token");
          localStorage.removeItem("fluentfeed_user");
        } finally {
          setIsLoading(false);
        }
      }
    };
    loadUser();
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const res = await api.login({ email, password });
      if (res.data) {
        setUser(res.data.user);
        setToken(res.data.token);
        localStorage.setItem("fluentfeed_token", res.data.token);
        localStorage.setItem("fluentfeed_user", JSON.stringify(res.data.user));
        return { success: true, user: res.data.user };
      }
    } catch (err) {
      const raw = err.message || "Failed to login. Please check your credentials.";
      const friendly = raw.includes("next is not a function")
        ? "Something went wrong. Please try again."
        : raw;
      setAuthError(friendly);
      return { success: false, error: friendly };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const res = await api.register(userData);
      if (res.data) {
        setUser(res.data.user);
        setToken(res.data.token);
        localStorage.setItem("fluentfeed_token", res.data.token);
        localStorage.setItem("fluentfeed_user", JSON.stringify(res.data.user));
        return { success: true, user: res.data.user };
      }
    } catch (err) {
      const raw = err.message || "Registration failed. Please try again.";
      const friendly = raw.includes("next is not a function")
        ? "Something went wrong. Please try again."
        : raw;
      setAuthError(friendly);
      return { success: false, error: friendly };
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (updatedData) => {
    setIsLoading(true);
    try {
      const res = await api.updateProfile(updatedData);
      if (res.data?.user) {
        setUser(res.data.user);
        localStorage.setItem("fluentfeed_user", JSON.stringify(res.data.user));
        return { success: true, user: res.data.user };
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("fluentfeed_token");
    localStorage.removeItem("fluentfeed_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(user),
        isProfileComplete: Boolean(user?.isProfileComplete),
        isLoading,
        authError,
        login,
        register,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
