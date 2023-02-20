import { createDomain } from "effector";

const auth = createDomain();
export const setAuth = auth.createEvent<boolean>();
export const setUsername = auth.createEvent<string>();
export const $auth = auth.createStore<boolean>(false).on(setAuth, (_, v) => v);
export const $username = auth
  .createStore<string>("")
  .on(setUsername, (_, v) => v);
