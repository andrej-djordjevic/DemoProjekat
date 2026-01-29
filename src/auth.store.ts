import { makeAutoObservable, runInAction } from "mobx";

export class AuthStore {
  isLoggedIn = false;
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async login(username: string, password: string): Promise<boolean> {
    this.loading = true;
    this.error = null;

    await new Promise((res) => setTimeout(res, 600));

    const ok = username === "admin" && password === "admin";

    runInAction(() => {
      this.isLoggedIn = ok;              // ✅ uvek postavi
      this.error = ok ? null : "Pogrešan username ili password";
      this.loading = false;
    });

    return ok;
  }

  logout() {
    this.isLoggedIn = false;
  }
}

export const authStore = new AuthStore();
