import { Header } from "components/Header";
import { Auth } from "components/Auth/Auth";
import { Outlet } from "react-router-dom";

export const App = () => {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
};

// <Auth type="signin" />
