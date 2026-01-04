
const USER_KEY = "auth_user";

export type StoredUser = {
  id: string;
  fullname?: string;
  email: string;
  token: string;
};

export function saveUser(user: StoredUser) { 
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser(): StoredUser | null {
    const rawUserData = localStorage.getItem(USER_KEY);
    return rawUserData ? JSON.parse(rawUserData) as StoredUser : null;
}

export function clearUser() {
    localStorage.removeItem(USER_KEY);
}