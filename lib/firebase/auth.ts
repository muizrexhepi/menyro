import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./config";
import type {
  SignUpData,
  SignInData,
  OnboardingData,
  UserProfile,
} from "@/types/auth";

// Sign up with email and password
export const signUp = async ({
  email,
  password,
}: SignUpData): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Create initial user profile in Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      displayName: "",
      onboardingCompleted: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return user;
  } catch (error: any) {
    // Handle specific Firebase auth errors
    if (error.code === "auth/email-already-in-use") {
      throw new Error(
        "Email is already in use. Please use a different email or sign in."
      );
    } else if (error.code === "auth/weak-password") {
      throw new Error("Password is too weak. Please use a stronger password.");
    } else if (error.code === "auth/invalid-email") {
      throw new Error("Invalid email address. Please enter a valid email.");
    } else {
      throw new Error(
        error.message || "Failed to create account. Please try again."
      );
    }
  }
};

// Sign in with email and password
export const signIn = async ({
  email,
  password,
}: SignInData): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error: any) {
    // Handle specific Firebase auth errors
    if (error.code === "auth/user-not-found") {
      throw new Error("No account found with this email address.");
    } else if (error.code === "auth/wrong-password") {
      throw new Error("Incorrect password. Please try again.");
    } else if (error.code === "auth/invalid-email") {
      throw new Error("Invalid email address. Please enter a valid email.");
    } else if (error.code === "auth/user-disabled") {
      throw new Error(
        "This account has been disabled. Please contact support."
      );
    } else if (error.code === "auth/too-many-requests") {
      throw new Error("Too many failed attempts. Please try again later.");
    } else {
      throw new Error(error.message || "Failed to sign in. Please try again.");
    }
  }
};

// Sign out
export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
  } catch (error: any) {
    throw new Error(error.message || "Failed to sign out. Please try again.");
  }
};

// Get user profile from Firestore
export const getUserProfile = async (
  uid: string
): Promise<UserProfile | null> => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));

    if (userDoc.exists()) {
      const data = userDoc.data();

      // Convert Firestore timestamps to Date objects
      return {
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as UserProfile;
    }

    return null;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};

// Complete onboarding and update user profile
export const completeOnboarding = async (
  uid: string,
  data: OnboardingData
): Promise<void> => {
  try {
    // Generate a unique restaurant ID
    const restaurantId = `rest_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 9)}`;

    // Create restaurant document
    await setDoc(doc(db, "restaurants", restaurantId), {
      id: restaurantId,
      ...data.restaurant,
      ownerId: uid,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // Get current user data to preserve existing fields
    const currentUserDoc = await getDoc(doc(db, "users", uid));
    const currentUserData = currentUserDoc.exists()
      ? currentUserDoc.data()
      : {};

    // Update user profile with onboarding completion
    await setDoc(
      doc(db, "users", uid),
      {
        ...currentUserData,
        uid,
        email: auth.currentUser?.email || currentUserData.email,
        displayName: data.displayName,
        onboardingCompleted: true,
        restaurantId,
        restaurant: data.restaurant, // Store restaurant data in user profile
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Error completing onboarding:", error);
    throw new Error("Failed to complete onboarding. Please try again.");
  }
};

// Listen to auth state changes
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Get current user
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!auth.currentUser;
};
