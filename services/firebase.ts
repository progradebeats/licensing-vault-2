
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

/**
 * FIREBASE CONFIGURATION
 * Replace these placeholder strings with the actual values from your 
 * Firebase Console (Project Settings > Your Apps > SDK setup).
 */
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Check if the user has replaced the placeholders
export const isFirebaseSetup = 
  firebaseConfig.projectId !== "YOUR_PROJECT_ID" && 
  firebaseConfig.apiKey !== "YOUR_API_KEY";

// Initialize Firebase only if keys are present to avoid console errors
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
