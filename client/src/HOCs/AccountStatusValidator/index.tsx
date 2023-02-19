import { $auth } from "context/auth";
import { useStore } from "effector-react";
import { Navigate } from "react-router-dom";

type Props = {
  protectedPage: JSX.Element;
};

export const AccountStatusValidator = ({ protectedPage }: Props) => {
  const isLoggedIn = useStore($auth);
  return isLoggedIn ? protectedPage : <Navigate to="/signin" />;
};
