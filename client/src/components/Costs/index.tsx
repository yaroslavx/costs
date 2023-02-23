import { CostsBuilder } from "components/Costs/CostsBuilder";
import { useEffect } from "react";
import { getAuthDataFromLs } from "utils/authUtils";
import { getCostsFx } from "api/costsApi";
import { $costs, setCosts } from "context/costs";
import { useStore } from "effector-react";

export const Costs = () => {
  const costs = useStore($costs);
  useEffect(() => {
    (async () => {
      await handleGetCosts();
    })();
    console.log(costs);
  }, []);

  const handleGetCosts = async (): Promise<void> => {
    const authData = getAuthDataFromLs();

    const costs = await getCostsFx({
      url: "/costs",
      token: authData.access_token,
    });

    setCosts(costs);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Costs</h1>
      <CostsBuilder costs={[]} />
    </div>
  );
};
