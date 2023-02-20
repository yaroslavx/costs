import React from "react";
import { useTheme } from "hooks/useTheme";
import { $username } from "context/auth";
import { useStore } from "effector-react";

export const Header = () => {
  const [theme, switchTheme] = useTheme();
  const username = useStore($username);

  return (
    <header
      className={`navbar navbar-dark bg-${
        theme === "dark" ? "dark" : "primary"
      }`}
    >
      <div className="container">
        <h1 style={{ color: "white" }}>Costs</h1>
        {username && <h2 style={{ color: "white" }}>{username}</h2>}
        <button onClick={switchTheme} className={`btn btn-${theme}`}>
          {theme === "dark" ? "Go light" : "Go dark"}
        </button>
      </div>
    </header>
  );
};
