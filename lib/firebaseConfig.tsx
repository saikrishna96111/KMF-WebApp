// Firebase has been removed; export empty stubs for backwards compatibility
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
const app = null as any;
const auth = null as any;
const db = null as any;

export { auth, app, db };