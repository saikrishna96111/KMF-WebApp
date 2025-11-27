import { authService } from "@/lib/authService";

async function signup(username: string, email: string, password: string): Promise<void> {
  try {
    const user = await authService.signup(username, email, password);
    console.log("User signed up:", user);
  } catch (err) {
    console.error("Error signing up:", (err as Error).message);
    throw err;
  }
}

export default signup;
