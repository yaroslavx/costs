import React, { FormEvent, MutableRefObject, useRef, useState } from "react";
import "components/Auth/styles.css";
import { Link, useNavigate } from "react-router-dom";
import { $auth } from "context/auth";
import { useStore } from "effector-react";
import { AuthApi } from "api/authApi";

type Props = {
  type: "signin" | "signup";
};

export const Auth = ({ type }: Props) => {
  const title = type === "signin" ? "Sign In" : "Sign Up";
  const usernameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;
  const navigate = useNavigate();
  const isLoggedIn = useStore($auth);

  if (isLoggedIn) {
    navigate("/");
  }

  const handleLogin = async (username: string, password: string) => {
    if (!username || !password) return;
    const isSuccess = await AuthApi.login(username, password);
    if (!isSuccess) return;
    navigate("/");
  };

  const handleRegistration = async (username: string, password: string) => {
    if (!username || !password) return;
    if (password.length < 8) return;
    const isSuccess = await AuthApi.register(username, password);
    if (!isSuccess) return;
    navigate("/signin");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    type === "signin"
      ? handleLogin(usernameRef.current.value, passwordRef.current.value)
      : handleRegistration(
          usernameRef.current.value,
          passwordRef.current.value
        );
  };

  return (
    <div className="container">
      <h1>{title}</h1>
      <form onSubmit={handleSubmit}>
        <label className="auth-label">
          Enter your username
          <input ref={usernameRef} type="text" className="form-control" />
        </label>
        <label className="auth-label">
          Enter your password
          <input ref={passwordRef} type="text" className="form-control" />
        </label>
        <button className="btn btn-primary auth-btn">{title}</button>
      </form>
      {type === "signin" ? (
        <div>
          <span>
            Dont't have an account?
            <Link to="/signup"> Signup</Link>
          </span>
        </div>
      ) : (
        <div>
          <span>
            Already have an account?
            <Link to="/signin"> Signin</Link>
          </span>
        </div>
      )}
    </div>
  );
};
