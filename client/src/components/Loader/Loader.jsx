import React from "react";
import "./Loader.scss";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="gooey">
        <span className="dot"></span>
        <div className="dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
