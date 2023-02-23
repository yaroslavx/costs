import { setAuth, setUsername } from "context/auth";
import { setCosts } from "context/costs";

export const removeUser = () => {
  localStorage.removeItem("auth");
  setAuth(false);
  setUsername("");
  setCosts([]);
};

export const getAuthDataFromLs = () => {
  try {
    const authData = JSON.parse(localStorage.getItem("auth")!);

    if (!authData) {
      removeUser();
      return;
    }

    return authData;
  } catch (err) {
    removeUser();
  }
};
