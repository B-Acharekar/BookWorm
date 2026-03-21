import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { loginWithGoogle, logout, loginWithEmail } from "../firebase/auth";

const AuthContext = createContext();

// Use dynamic base URL for the backend
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        try {
          // Fetch role with fallback
          const roleRes = await axios.get(`${API_URL}/api/admin/role/${currentUser.uid}`);
          setRole(roleRes.data.role || 'user');
        } catch (e) {
          console.error("Auth: Role fetch failed, defaulting to 'user'", e);
          setRole('user');
        }
      } else {
        setRole('user');
      }
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    user,
    role,
    isAdmin: role === 'admin',
    loginWithGoogle,
    loginWithEmail,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
