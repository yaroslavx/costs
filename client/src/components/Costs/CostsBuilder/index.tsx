import React, { useEffect } from "react";

export const CostsBuilder = () => {
  useEffect(() => {}, []);
  return (
    <div className="container">
      <h2>Cost Tracker</h2>
      <form className="d-flex mb-3">
        <div className="form-item">
          <span className="mb-3">On what?</span>
          <input type="text" />
        </div>
        <div className="form-item">
          <span className="mb-3">How much?</span>
          <input type="text" />
        </div>
        <div className="form-item">
          <span className="mb-3">When?</span>
          <input type="text" />
        </div>
        <button className="btn btn-primary auth-btn">Create</button>
      </form>
      <div>
        Summary $<span></span>
      </div>
    </div>
  );
};
