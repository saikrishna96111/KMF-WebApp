import { auth } from "@/lib/firebaseConfig";
import { createUserWithEmailAndPassword, AuthError } from "firebase/auth";

async function signup(email: string, password: string): Promise<void> {
  try {
    if (!auth) {
      // Firebase isn't initialized — probably running during build or env vars are missing.
      throw new Error("Firebase Auth is not initialized");
    }
    const userCredential = await createUserWithEmailAndPassword(auth as any, email, password);
    console.log("User signed up:", userCredential.user);
  } catch (err) {
    const error = err as AuthError;
    console.error("Error signing up:", error.message || error.code);
  }
}

export default signup;
