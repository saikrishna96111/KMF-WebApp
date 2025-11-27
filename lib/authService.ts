// Local authentication service using localStorage

import type { User } from "../types/user";

const HARDCODED_USER: User = {
  uid: "hardcoded-sai-uid",
  username: "sai",
  email: "sai@gmail.com",
  isActive: true,
};

const USERS_KEY = "kmf_users"; // mapping of usernameLower => user record with password
const CURRENT_USER_KEY = "kmf_current_user";

interface StoredUserRecord extends User {
  usernameLower: string;
  password: string; // stored in plain text for simplicity (do NOT use in production)
}

export const authService = {
  initialize() {
    // initialize users store with default user if it doesn't exist
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) {
      const defaultUser: StoredUserRecord = {
        ...HARDCODED_USER,
        usernameLower: (HARDCODED_USER.username || "").toLowerCase(),
        password: "1234",
      };
      const users: Record<string, StoredUserRecord> = {};
      users[defaultUser.usernameLower] = defaultUser;
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } else {
      // Ensure default exists
      try {
        const users = JSON.parse(raw) as Record<string, StoredUserRecord>;
        const lower = (HARDCODED_USER.username || "").toLowerCase();
        if (!users[lower]) {
          const defaultUser: StoredUserRecord = {
            ...HARDCODED_USER,
            usernameLower: lower,
            password: "1234",
          };
          users[lower] = defaultUser;
          localStorage.setItem(USERS_KEY, JSON.stringify(users));
        }
      } catch (e) {
        localStorage.removeItem(USERS_KEY);
        // Try again to initialize
        this.initialize();
      }
    }
  },

  getUsers(): Record<string, StoredUserRecord> {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return {};
    try {
      return JSON.parse(raw) as Record<string, StoredUserRecord>;
    } catch (e) {
      localStorage.removeItem(USERS_KEY);
      return {};
    }
  },

  saveUsers(users: Record<string, StoredUserRecord>) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  getCurrentUser(): User | null {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch (e) {
      localStorage.removeItem(CURRENT_USER_KEY);
      return null;
    }
  },

  setCurrentUser(user: User | null) {
    if (!user) {
      localStorage.removeItem(CURRENT_USER_KEY);
    } else {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    }
  },

  findUserByIdentifier(identifier: string): StoredUserRecord | null {
    const users = this.getUsers();
    const id = identifier.trim().toLowerCase();
    // If identifier looks like an email, search by email
    if (id.includes("@")) {
      for (const k of Object.keys(users)) {
        const u = users[k];
        if (u.email.toLowerCase() === id) return u;
      }
      return null;
    }
    // else treat as usernameLower
    return users[id] || null;
  },

  async login(identifier: string, password: string): Promise<User> {
    const user = this.findUserByIdentifier(identifier);
    if (!user) throw new Error("Invalid username or password");
    if (!user.isActive) throw new Error("Your account is disabled. Contact admin.");
    if (user.password !== password) throw new Error("Invalid username or password");
    const { password: _p, usernameLower, ...rest } = user;
    this.setCurrentUser(rest as User);
    return rest as User;
  },

  async signup(username: string, email: string, password: string): Promise<User> {
    const usernameLower = username.trim().toLowerCase();
    const users = this.getUsers();
    if (users[usernameLower]) throw new Error("Username already taken.");
    // Check email conflict
    for (const k of Object.keys(users)) {
      if (users[k].email.toLowerCase() === email.trim().toLowerCase()) {
        throw new Error("Email already in use.");
      }
    }
    const uid = "local-" + Math.random().toString(36).slice(2, 9);
    const newUser: StoredUserRecord = {
      uid,
      username,
      usernameLower,
      email,
      isActive: true,
      password,
    };
    users[usernameLower] = newUser;
    this.saveUsers(users);
    const { password: _p, usernameLower: _ul, ...saved } = newUser;
    this.setCurrentUser(saved as User);
    return saved as User;
  },

  async logout(): Promise<void> {
    this.setCurrentUser(null);
  },
};
