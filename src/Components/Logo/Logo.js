import React from "react";
import Tilt from "react-parallax-tilt";
import "./Logo.css";
import Brain from "./brain.png";
const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt
        className="Tilt br2 shadow-2"
        style={{ width: "150px", height: "150px" }}
      >
        <div className="Tilt-inner pa3" style={{ height: "300px" }}>
          <img style={{ width: "100%" }} alt="logo" src={Brain} />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
