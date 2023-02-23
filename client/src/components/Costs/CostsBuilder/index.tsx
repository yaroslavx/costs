import React, { useEffect } from "react";
import { countTotalCosts } from "utils/arrayUtils";
import { ICost } from "types";
import { $totalCosts } from "context/costs";
import { useStore } from "effector-react";
import "./style.css";

export const CostsBuilder = ({ costs }: { costs: ICost[] }) => {
  const totalCosts = useStore($totalCosts);

  useEffect(() => {
    countTotalCosts(costs);
  }, [costs]);
  return (
    <div className="container">
      <h2>Cost Tracker</h2>
      <form className="d-flex mb-3">
        <div className="form-item mr-3">
          <span className="mb-3">On what?</span>
          <input type="text" className="form-control" />
        </div>
        <div className="form-item mr-3">
          <span className="mb-3">How much?</span>
          <input type="text" className="form-control" />
        </div>
        <div className="form-item mr-3">
          <span className="mb-3">When?</span>
          <input type="text" className="form-control" />
        </div>
        <button className="btn btn-primary add-btn">Create</button>
      </form>
      <div>
        Summary $
        <span>
          {isNaN(parseInt(String(totalCosts)))
            ? 0
            : parseInt(String(totalCosts))}
        </span>
      </div>
    </div>
  );
};
