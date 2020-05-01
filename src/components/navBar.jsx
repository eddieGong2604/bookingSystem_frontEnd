import React, { useState } from "react";

import { Drawer, Button } from "antd";
import RightMenu from "./rightMenu";
import LeftMenu from "./leftMenu";
import { Link } from "react-router-dom";
import SearchBar from "./searchBar";

const NavBar = ({ user }) => {
  const [state, setState] = useState({ current: "mail", visible: false });

  const showDrawer = () => {
    setState({
      current: "mail",
      visible: true,
    });
  };

  const onClose = () => {
    setState({
      current: "mail",
      visible: false,
    });
  };
  return (
    <nav className="menuBar">
      <div className="logo">
        <Link to="/" style={{ textDecoration: "none" }}>
          Home{" "}
        </Link>
      </div>
      <div className="menuCon">
        <div className="leftMenu">{user && <LeftMenu user={user} />}</div>
        <div className="rightMenu">
          <RightMenu user={user} />
        </div>
        <Button className="barsMenu" type="primary" onClick={showDrawer}>
          <span className="barsBtn"></span>
        </Button>
        <Drawer
          title="Welcome"
          placement="right"
          closable={false}
          onClose={onClose}
          visible={state.visible}
        >
          {user && <LeftMenu />}
          <RightMenu />
        </Drawer>
      </div>
    </nav>
  );
};

export default NavBar;
