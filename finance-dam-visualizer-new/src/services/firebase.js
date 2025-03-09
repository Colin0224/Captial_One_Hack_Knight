import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';

// Your Firebase configuration
// IMPORTANT: Replace this with your actual Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services (no auth)
export const db = getFirestore(app);
export const functions = getFunctions(app);

// Example function to call a Firebase Cloud Function
export const generateScenarios = httpsCallable(functions, 'generateScenarios');
export const calculateFinancialInsights = httpsCallable(functions, 'calculateFinancialInsights');

export default app;