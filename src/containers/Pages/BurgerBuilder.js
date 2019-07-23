import React, { Component } from "react";
import Grid from "layout/Grid";

import { BuildControls } from "components/BuildControls/BuildControls";

export default class BurgerBuilder extends Component {
  state = {
    burger: {
      meat: 1,
      salad: 1,
      cheese: 1
    },
    price: 9.5
  };

  toppingsHandler = (e, name, action) => {
    // alert(name + " - " + action);
  };

  render() {
    const { burger, price } = this.state;

    return (
      <div
        className="burger-hero"
        style={{ boxSizing: "border-box", paddingTop: 90 }}
      >
        <div className="content">
          <div
            style={{
              height: "750px",
              backgroundColor: "crimson",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Grid
              item
              style={{
                backgroundColor: "white",
                width: "85%",
                flexBasis: "80%"
              }}
            />
            <div className="body1" style={{ marginTop: "25px" }}>
              <p className="button -large -raised -c-white -icon">{`Total: $${price}`}</p>
            </div>
          </div>

          <div className="horizCenter">
            <Grid item md={6} className="content-narrow">
              <BuildControls
                burger={burger}
                toppingsHandler={this.toppingsHandler}
              />
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}
