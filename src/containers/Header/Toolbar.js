import React, { Component } from "react";
import burger from "icons/burger.svg";

class ToolBar extends Component {
  state = {
    appBarShadow: false
  };

  render() {
    let { appBarShadow } = this.state;
    return (
      <div className={`appbar ${appBarShadow && "appbar--shadow"}`}>
        <div className="content flexrow">
          <img src={burger} alt="burger icon" />
          <div className="spacer" />

          <div className="body1 link">Builder</div>
          <div className="body1 link">Order</div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    window.addEventListener("scroll", () => {
      setTimeout(() => {
        if (window.pageYOffset > 60 && !this.state.appBarShadow) {
          this.setState({ appBarShadow: true });
        } else if (window.pageYOffset <= 60 && this.state.appBarShadow) {
          this.setState({ appBarShadow: false });
        }
      }, 20);
    });
  }
}
export default ToolBar;
