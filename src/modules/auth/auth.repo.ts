import axios from "axios";
import type { IUserPayload } from "./auth.types";

class AuthRepo {
  loginUser = (userPayload: IUserPayload) => {
    // if username and password is matching, allow user to log in

    return Promise.resolve();
  };

  logoutUser = () => {
    return Promise.resolve();
  };
}

export const authRepo = new AuthRepo();
