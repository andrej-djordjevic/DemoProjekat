import { authRepo } from "./auth.repo";

class AuthService {
  // Akcije, uglavnom asyncx, cesto samo pozivaju .repo funkciju, po potrebi transformisu podatke
  loginUser = (username: string, password: string, dateOfBirth: string) => {
    const validDateFormat = formatDate(dateOfBirth);
    if (this.checkPasswordValidity(password)) {
      return authRepo.loginUser(username, password, validDateFormat);
    }
    return Promise.reject("Password not valid");
  };

  // helper metode
  private checkPasswordValidity = (password: string): boolean => {
    return password.length > 6;
  };
}

export const authService = new AuthService();
