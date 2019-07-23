import React from "react";
import { BuildControl } from "components/BuildControls/BuildControl";

export const BuildControls = props => {
  const toppingsOptions = Object.keys(props.burger).map(ings => {
    return (
      <BuildControl
        key={ings}
        name={ings}
        toppingsHandler={props.toppingsHandler}
      />
    );
  });
  return <div className="card">{toppingsOptions}</div>;
};
