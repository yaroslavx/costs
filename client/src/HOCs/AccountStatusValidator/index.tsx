import { $auth, setAuth, setUsername } from "context/auth";
import { useStore } from "effector-react";
import { Auth } from "components/Auth/Auth";
import { Navigate } from "react-router-dom";
import { useEffect, useLayoutEffect } from "react";
import { getAuthDataFromLs, removeUser } from "utils/authUtils";

type Props = {
  protectedPage: JSX.Element;
};

export const AccountStatusValidator = ({ protectedPage }: Props) => {
  const authData = getAuthDataFromLs();

  if (!authData || !authData.access_token || !authData.refresh_token) {
    removeUser();
  } else {
    setAuth(true);
    setUsername(authData.username);
  }
  const isLoggedIn = useStore($auth);
  return isLoggedIn ? protectedPage : <Navigate to="signin" />;
};
