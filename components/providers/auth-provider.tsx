// src/components/auth/AuthProvider.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { onAuthStateChange, getUserProfile } from "@/lib/firebase/auth";
import { useAuthStore } from "@/lib/stores/auth-store";
import { AuthUser, UserProfile } from "@/types/auth";

interface AuthContextType {
  user: AuthUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
});

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (firebaseUser: User | null) => {
      if (firebaseUser) {
        const authUser = firebaseUser as AuthUser;
        const profile = await getUserProfile(firebaseUser.uid);

        setUser(authUser);
        setUserProfile(profile);

        // Update Zustand store
        useAuthStore.setState({
          user: authUser,
          userProfile: profile,
        });
      } else {
        setUser(null);
        setUserProfile(null);
        useAuthStore.setState({
          user: null,
          userProfile: null,
        });
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    userProfile,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
