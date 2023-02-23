import { setTotalCosts } from "context/costs";
import { ICost } from "types";

export const countTotalCosts = (costs: ICost[]) => {
  if (costs === undefined) return;
  setTotalCosts(costs.reduce((acc, cost) => acc + cost.price, 0));
};
