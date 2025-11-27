import { auth } from "@/lib/firebaseConfig";
import { signOut, AuthError } from "firebase/auth";

async function logout(): Promise<void> {
  try {
    if (!auth) {
      throw new Error("Firebase Auth is not initialized");
    }
    await signOut(auth);
    console.log("User signed out");
  } catch (err) {
    const error = err as AuthError;
    console.error("Error signing out:", error.message || error.code);
  }
}

export default logout;
