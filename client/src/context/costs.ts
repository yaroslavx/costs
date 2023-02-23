import { createDomain } from "effector";
import { ICost } from "types";

const costs = createDomain();

export const setCosts = costs.createEvent<ICost[]>();
export const createCost = costs.createEvent<ICost>();
export const updatedCost = costs.createEvent<ICost>();
export const removeCost = costs.createEvent<string | number>();
export const setTotalCosts = costs.createEvent<number>();

export const $costs = costs
  .createStore<ICost[]>([])
  .on(createCost, (state, payload) => [...state, payload])
  .on(setCosts, (_, payload) => payload);

export const $totalCosts = costs
  .createStore<number>(0)
  .on(setTotalCosts, (_, payload) => payload);
