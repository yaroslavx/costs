import { instance } from "api/rootApi";
import { setAuth } from "context/auth";

export class AuthApi {
  static async login(username: string, password: string): Promise<boolean> {
    try {
      const res = await instance.post("auth/login", { username, password });
      console.log(res);
      if (res.status === 200) {
        setAuth(true);
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
      const res = await instance.post("auth/registration", {
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
