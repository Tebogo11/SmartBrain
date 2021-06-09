import React from "react";
import "./FormStyle.css";
const ImageLinkForm = ({ onInputChange, submit }) => {
  return (
    <div>
      <p className="f3">
        {"This Magic Brain will detach face in your Picture"}
      </p>
      <p className="f2">{"Give it a try"}</p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-70 center"
            type="tex"
            onChange={onInputChange}
          />
          <button
            className="w-30 grow f3 link ph3 pv2 dib white"
            style={{ background: "#1fa2ff" }}
            onClick={submit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
