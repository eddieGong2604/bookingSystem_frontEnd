import React, { Component } from "react";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import SearchBar from "./searchBar";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const RightMenu = ({ user }) => {
  return (
    <Menu mode="horizontal">
      <Menu.Item>
        {" "}
        <SearchBar />
      </Menu.Item>
      <Menu.Item key="mail">
        {user ? (
          <Link to="/logout" style={{ textDecoration: "none" }}>
            {" "}
            Logout{" "}
          </Link>
        ) : (
          <Link to="/login" style={{ textDecoration: "none" }}>
            Login{" "}
          </Link>
        )}
      </Menu.Item>
      <Menu.Item key="app">
        {user ? (
          <Link to="/profile" style={{ textDecoration: "none" }}>
            {" "}
            User Profile{" "}
          </Link>
        ) : (
          <Link to="/signup" style={{ textDecoration: "none" }}>
            SignUp{" "}
          </Link>
        )}
      </Menu.Item>
    </Menu>
  );
};
export default RightMenu;
