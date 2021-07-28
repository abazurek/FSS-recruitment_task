import React from "react";

const LoadingComponent = () => (
  <div className="wrapper">
    <div className="loadingWrapper">
      <div className="dotsWrapper">
        <div className="dot" />
        <div className="dot _2" />
        <div className="dot _3" />
        <div className="dot _4" />
      </div>
      <div className="dotsWrapper _2">
        <div className="dot" />
        <div className="dot _2" />
        <div className="dot _3" />
        <div className="dot _4" />
      </div>
      <div className="loading-textBox">
        <p className="loading-paragraph">Loading . . .</p>
      </div>
    </div>
  </div>
);

export default LoadingComponent;
