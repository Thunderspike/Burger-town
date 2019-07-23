import React from "react";
import plus from "icons/plus.svg";
import minus from "icons/minus.svg";
import { BuildDropdown } from "components/BuildControls/BuildDropdown";

export const BuildControl = props => {
  return (
    <div
      component
      className="flexrow"
      style={{ margin: "7px auto", justifyContent: "flex-start" }}
    >
      <div className="subtitle1" style={{ width: "55px" }}>
        {props.name}
      </div>
      <img
        className="link card -button -no-margin"
        src={plus}
        alt="plus sign icon"
        onClick={() => props.toppingsHandler(null, props.name, "plus")}
      />
      <img
        className="link card -button -no-margin"
        src={minus}
        alt="minus sign icon"
        onClick={() => props.toppingsHandler(null, props.name, "minus")}
      />
      <BuildDropdown />
    </div>
  );
};
