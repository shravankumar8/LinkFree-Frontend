import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Define User type
interface User {
  id: string;
  name: string;
  email: string;
  username?: string;
  displayName?: string;
  profilePic?: string;
  bio?: string;
  isSetupComplete: boolean;
}

// Define Context Type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Create context with default values
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// AuthProvider Props Type
interface AuthProviderProps {
  children: ReactNode;
}
const API_URL = import.meta.env.VITE_API_URL;
// AuthProvider Component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Check auth status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get<{
          isAuthenticated: boolean;
          user?: User;
        }>(`${API_URL}/api/user/isAuthenticated`, {
          withCredentials: true,
        });

          console.log(response.data);
        if (response.data.isAuthenticated && response.data.user) {
          setUser(response.data.user);
          if (!response.data.user.isSetupComplete) {
            navigate("/setup");
          }
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Login Function
  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await axios.post<{ user: User }>(
        `${API_URL}/api/user/login`,
        { email, password },
        { withCredentials: true }
      );
      setUser(response.data.user);
      navigate(response.data.user.isSetupComplete ? "/dashboard" : "/setup");
    } catch (err: any) {
      throw new Error(err.response?.data?.error || "Login failed");
    }
  };

  // Logout Function
  const logout = async (): Promise<void> => {
    try {
      await axios.get(`${API_URL}/api/user/logout`, {
        withCredentials: true,
      });
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };


  const value: AuthContextType = { user, loading, login, logout };

return (
  <AuthContext.Provider value={value}>
    {!loading && children}
  </AuthContext.Provider>
);
};
