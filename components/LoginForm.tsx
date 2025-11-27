import { auth } from "@/lib/firebaseConfig";
import { signInWithEmailAndPassword, AuthError } from "firebase/auth";

async function login(email: string, password: string): Promise<void> {
  try {
    if (!auth) {
      throw new Error("Firebase Auth is not initialized");
    }
    const userCredential = await signInWithEmailAndPassword(auth as any, email, password);
    console.log("User signed in:", userCredential.user);
  } catch (err) {
    const error = err as AuthError;
    console.error("Error logging in:", error.message || error.code);
  }
}

export default login;
