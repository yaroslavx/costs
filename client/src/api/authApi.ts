import { api } from "api/rootApi";
import { setAuth, setUsername } from "context/auth";
import { createEffect } from "effector";
import { IRefreshToken } from "types";
import { removeUser } from "utils/authUtils";

export class AuthApi {
  static async login(username: string, password: string): Promise<boolean> {
    try {
      const res = await api.post("auth/login", { username, password });
      console.log(res);
      if (res.status === 200) {
        setAuth(true);
        setUsername(res.data.username);
        localStorage.setItem("auth", JSON.stringify(res.data));
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  static async register(username: string, password: string): Promise<boolean> {
    try {
      const res = await api.post("auth/registration", {
        username,
        password,
      });
      console.log(res);
      if (res.status === 201) {
        setAuth(false);
        localStorage.setItem("auth", JSON.stringify(res.data));
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

export const refreshTokenFx = createEffect(
  async ({ url, token, username }: IRefreshToken) => {
    try {
      const res = await api.post(url, { refresh_token: token, username });

      if (res.status === 200) {
        localStorage.setItem("auth", JSON.stringify({ ...res.data, username }));
        return res.data.access_token;
      } else {
        removeUser();
      }
    } catch (err) {}
  }
);
