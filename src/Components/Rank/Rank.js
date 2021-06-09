import React from "react";

const Rank = ({ name, count }) => {
  return (
    <div>
      <div className="white f3">{`${name}, your rank is `}</div>
      <div className="white f1">
        <p>{`${count}`}</p>
      </div>
    </div>
  );
};

export default Rank;
