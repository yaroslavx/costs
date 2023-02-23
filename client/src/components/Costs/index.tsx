import { CostsBuilder } from "components/Costs/CostsBuilder";

export const Costs = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Costs</h1>
      <CostsBuilder costs={[]} />
    </div>
  );
};
