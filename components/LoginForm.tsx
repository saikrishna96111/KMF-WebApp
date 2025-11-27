import { authService } from "@/lib/authService";

async function login(identifier: string, password: string): Promise<void> {
  try {
    const user = await authService.login(identifier, password);
    console.log("User signed in:", user);
  } catch (err) {
    console.error("Error logging in:", (err as Error).message);
    throw err;
  }
}

export default login;
