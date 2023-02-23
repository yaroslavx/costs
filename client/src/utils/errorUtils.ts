import { IHandleAxiosErrorPayload } from "types";
import { AxiosError } from "axios";
import { getAuthDataFromLs, removeUser } from "utils/authUtils";
import { refreshTokenFx } from "api/authApi";
import { getCostsFx } from "api/costsApi";
import { setCosts } from "context/costs";

export const handleError = async (
  error: unknown,
  payload: IHandleAxiosErrorPayload | null = null
) => {
  const message =
    ((error as AxiosError).response?.data as { message: string }).message ||
    ((error as AxiosError).response?.data as { error: string }).error;

  if (message) {
    if (message === "jwt expired") {
      const payloadData = payload as IHandleAxiosErrorPayload;
      const authData = getAuthDataFromLs();

      await refreshTokenFx({
        url: "/auth/refresh",
        token: authData.refresh_token,
        username: authData.username,
      });

      if (payload !== null) {
        switch (payloadData.type) {
          case "get":
            const costs = await getCostsFx({
              url: "/costs",
              token: authData.access_token,
            });
            setCosts(costs);
            break;
          default:
            break;
        }
      }
    } else {
      removeUser();
    }
  } else {
    console.log("error");
  }
};
