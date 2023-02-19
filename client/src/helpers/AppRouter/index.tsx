import { RouteObject, useRoutes } from "react-router-dom";
import { App } from "App";
import { Auth } from "components/Auth/Auth";
import { Main } from "components/Main";
import { AccountStatusValidator } from "HOCs/AccountStatusValidator";

export const AppRouter = () => {
  const routes: RouteObject[] = [
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <AccountStatusValidator protectedPage={<Main />} />,
        },
        { path: "signin", element: <Auth type="signin" /> },
        { path: "signup", element: <Auth type="signup" /> },
      ],
    },
  ];

  return useRoutes(routes);
};
