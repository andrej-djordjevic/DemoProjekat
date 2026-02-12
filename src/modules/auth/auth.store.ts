import { makeAutoObservable, runInAction } from "mobx";
import { USER_PROFILE_MOCK } from "./auth.mocks";

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

    const ok =
      username === USER_PROFILE_MOCK.username &&
      password === USER_PROFILE_MOCK.password;

    runInAction(() => {
      this.isLoggedIn = ok;
      this.error = ok ? null : "Pogrešni kredencijali";
      this.loading = false;
    });

    return ok;
  }

  logout() {
    this.isLoggedIn = false;
  }
}

export const authStore = new AuthStore();
