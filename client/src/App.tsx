import { Header } from "components/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getAuthDataFromLs, removeUser } from "utils/authUtils";
import { setAuth, setUsername } from "context/auth";

export const App = () => {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
};
