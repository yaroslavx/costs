import { createDomain } from "effector";

const costs = createDomain();

export const setTotal = costs.createEvent<number>();

export const $totalCosts = costs
  .createStore<number>(0)
  .on(setTotal, (state, payload) => (state += payload));
