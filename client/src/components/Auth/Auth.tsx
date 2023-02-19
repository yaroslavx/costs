import React from "react";
import "components/Auth/styles.css";
import { Link } from "react-router-dom";

type Props = {
  type: "signin" | "signup";
};

export const Auth = ({ type }: Props) => {
  const title = type === "signin" ? "Sign In" : "Sign Up";
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
