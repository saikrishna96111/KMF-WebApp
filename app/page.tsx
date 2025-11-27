"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebaseConfig";
import { signInWithEmailAndPassword, AuthError } from "firebase/auth";
import { collection, query, where, getDocs, limit } from "firebase/firestore";

interface UserData {
  email: string;
  isActive: boolean;
}

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Ensure Firebase is initialized on the client
    if (!auth || !db) {
      setError("Unable to connect to Firebase. Please try again later.");
      setLoading(false);
      return;
    }

    try {
      // Step 1: Find user by username (case-insensitive)
      const q = query(
        collection(db as any, "users"),
        where("usernameLower", "==", username.trim().toLowerCase()),
        limit(1)
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setError("Invalid username or password");
        setLoading(false);
        return;
      }

      const userDoc = snapshot.docs[0];
      const userData = userDoc.data() as UserData;

      if (!userData.isActive) {
        setError("Your account is disabled. Contact admin.");
        setLoading(false);
        return;
      }

      // Step 2: Sign in using email
      await signInWithEmailAndPassword(auth as any, userData.email, password);

      router.push("/dashboard");
    } catch (err) {
      const authErr = err as AuthError;
      if (
        authErr.code === "auth/wrong-password" ||
        authErr.code === "auth/user-not-found" ||
        authErr.code === "auth/invalid-credential"
      ) {
        setError("Invalid username or password");
      } else if (authErr.code === "auth/too-many-requests") {
        setError("Too many attempts. Try again later.");
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-black">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          KMF LOGIN
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:bg-gray-100"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:bg-gray-100"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center font-medium bg-red-50 py-2 rounded">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    opacity="0.3"
                  />
                  <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 font-semibold hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}
