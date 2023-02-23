import { createEffect } from "effector";
import { ICreateCost, IGetCosts } from "types";
import { api } from "api/rootApi";
import { handleError } from "utils/errorUtils";

export const createCostFx = createEffect(
  async ({ url, cost, token }: ICreateCost) => {
    try {
      const { data } = await api.post(
        url,
        { ...cost },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getCostsFx = createEffect(async ({ url, token }: IGetCosts) => {
  try {
    const { data } = await api.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    await handleError(err, { type: "get" });
  }
});
