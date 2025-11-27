import { authService } from "@/lib/authService";

async function logout(): Promise<void> {
  try {
    await authService.logout();
    console.log("User signed out");
  } catch (err) {
    console.error("Error signing out:", (err as Error).message);
    throw err;
  }
}

export default logout;
