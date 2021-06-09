import React from "react";

const Navigation = (props) => {
  if (props.isSignedIn) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          value="signout"
          onClick={() => props.onRouteChange("signout")}
          className="f3 link dim black underline pa3 pointer"
        >
          Sign out
        </p>
      </nav>
    );
  } else {
    return (
      <div>
        <nav style={{ display: "flex", justifyContent: "flex-end" }}>
          <p
            value="signin"
            onClick={() => props.onRouteChange("signin")}
            className="f3 link dim black underline pa3 pointer"
          >
            Sign in
          </p>
          <p
            value="signin"
            onClick={() => props.onRouteChange("registor")}
            className="f3 link dim black underline pa3 pointer"
          >
            Registor
          </p>
        </nav>
      </div>
    );
  }
};

export default Navigation;
