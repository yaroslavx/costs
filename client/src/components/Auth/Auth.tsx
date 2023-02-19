import React, { useState } from "react";
import "components/Auth/styles.css";
import { Link, useNavigate } from "react-router-dom";
import { $auth } from "context/auth";
import { useStore } from "effector-react";

type Props = {
  type: "signin" | "signup";
};

export const Auth = ({ type }: Props) => {
  const title = type === "signin" ? "Sign In" : "Sign Up";
  const navigate = useNavigate();
  const isLoggedIn = useStore($auth);

  if (isLoggedIn) {
    navigate("/");
  }

  return (
    <div className="container">
      <h1>{title}</h1>
      <form>
        <label className="auth-label">
          Enter your username and password
          <input type="text" className="form-control" />
        </label>
        <label className="auth-label">
          Enter your username and password
          <input type="text" className="form-control" />
        </label>
        <button className="btn btn-primary auth-btn">{title}</button>
      </form>
      {type === "signin" ? (
        <div>
          <span>
            Dont't have an account?
            <Link to="/signup">Signup</Link>
          </span>
        </div>
      ) : (
        <div>
          <span>
            Already have an account?
            <Link to="/signin">Signin</Link>
          </span>
        </div>
      )}
    </div>
  );
};
