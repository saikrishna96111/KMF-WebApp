// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// We read the values from env vars below. In production (e.g. Vercel) these
// might be unset during static prerender/build time. To avoid runtime errors
// (like auth/invalid-api-key) while prerendering on the server, we only
// initialize Firebase in the browser (client-side) and only if an API key
// is present.
// NOTE: If you prefer to keep the API keys strictly private, set them in
// server-side environment variables and avoid exposing them as NEXT_PUBLIC.
const firebaseConfig = {
  // Commented out the literal API variables — use environment variables.
  // apiKey: "YOUR_API_KEY",
  // authDomain: "YOUR_AUTH_DOMAIN",
  // projectId: "YOUR_PROJECT_ID",
  // storageBucket: "YOUR_STORAGE_BUCKET",
  // messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  // appId: "YOUR_APP_ID",
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase only on the client and only if the apiKey exists.
// This prevents the server-side prerender during `next build` from throwing
// an 'auth/invalid-api-key' error when the env vars aren't set in the build.
let app = null as ReturnType<typeof initializeApp> | null;
let auth = null as ReturnType<typeof getAuth> | null;
let db = null as ReturnType<typeof getFirestore> | null;

if (typeof window !== "undefined" && firebaseConfig.apiKey) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (e) {
    // If initialization fails for any reason, keep app/auth/db as null and
    // let client-side code handle missing instances gracefully.
    // We intentionally do not rethrow here to avoid build failures.
    // eslint-disable-next-line no-console
    console.warn("Firebase initialization skipped:", (e as Error).message);
  }
}

export { auth, app, db };