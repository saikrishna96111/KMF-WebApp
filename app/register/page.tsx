"use client";

import { useState, FormEvent } from "react";
import { auth, db } from "../../lib/firebaseConfig";
import { createUserWithEmailAndPassword, AuthError } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Signup() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !email.trim() || !password) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);

    // Ensure Firebase is initialized on the client
    if (!auth || !db) {
      setError("Unable to connect to Firebase. Please try again later.");
      setLoading(false);
      return;
    }

    try {
      const usernameLower = username.toLowerCase();

      // Check if username exists
      const usernameDoc = await getDoc(doc(db as any, "usernames", usernameLower));
      if (usernameDoc.exists()) {
        setError("Username already taken.");
        setLoading(false);
        return;
      }

      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth as any, email, password);
      const uid = userCredential.user.uid;

      // Save username → email mapping
      await setDoc(doc(db as any, "usernames", usernameLower), {
        uid,
        email,
        createdAt: new Date(),
      });

      // Save full user record
      await setDoc(doc(db as any, "users", uid), {
        username,
        email,
        isActive: true,
        role: "user",
        createdAt: new Date(),
      });

      router.push("/dashboard");
    } catch (err) {
      const authErr = err as AuthError;
      if (authErr.code === "auth/email-already-in-use") setError("Email already in use.");
      else if (authErr.code === "auth/invalid-email") setError("Invalid email.");
      else if (authErr.code === "auth/weak-password") setError("Password too weak.");
      else setError("Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-black to-purple-800 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md bg-black/60 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-purple-500/40"
      >
        <h1 className="text-4xl font-extrabold text-center text-purple-300 mb-6 drop-shadow-lg">
          Create Account
        </h1>

        <AnimatePresence>
          {error && (
            <motion.p
              key="error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-red-400 text-center mb-4"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <form onSubmit={handleSignup} className="space-y-5">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
            className="w-full p-3 rounded-lg bg-black/50 border border-purple-500/40 text-purple-100 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            autoComplete="username"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="w-full p-3 rounded-lg bg-black/50 border border-purple-500/40 text-purple-100 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            autoComplete="email"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            className="w-full p-3 rounded-lg bg-black/50 border border-purple-500/40 text-purple-100 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            autoComplete="current-password"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-lg text-white font-semibold shadow-lg transition-all duration-300 ${
              loading
                ? "bg-purple-700/70 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-purple-800 hover:scale-[1.02] hover:shadow-purple-500/50"
            }`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-purple-300 text-sm">
          Already have an account?{" "}
          <span
            className="font-semibold text-purple-400 hover:text-purple-300 cursor-pointer underline-offset-2 hover:underline"
            onClick={() => router.push("/login")}
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
}
