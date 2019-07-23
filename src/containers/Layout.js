import React from "react";
import ToolBar from "containers/Header/Toolbar";
import BurgerBuilder from "containers/Pages/BurgerBuilder";

const Layout = props => {
  return (
    <div className="root theme--light">
      <ToolBar />
      <BurgerBuilder />
    </div>
  );
};

export default Layout;
