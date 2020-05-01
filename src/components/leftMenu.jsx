import React, { Component } from "react";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import SearchBar from "./searchBar";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class LeftMenu extends Component {
  render() {
    return (
      <Menu mode="horizontal">
        <Menu.Item>
          {this.props.user.aud === "ROLE_USER" && (
            <Link to="/dashboard" style={{ textDecoration: "none" }}>
              Dashboard
            </Link>
          )}

          {this.props.user.aud === "ROLE_STAFF" && (
            <Link to="/createEvent" style={{ textDecoration: "none" }}>
              Create Events
            </Link>
          )}

          {this.props.user.aud === "ROLE_ADMIN" && (
            <Link to="/admin/updateEvent" style={{ textDecoration: "none" }}>
              Update Events
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {this.props.user.aud === "ROLE_STAFF" && (
            <Link to="/staff/updateEvent" style={{ textDecoration: "none" }}>
              Update Events
            </Link>
          )}
        </Menu.Item>
        {/* <SubMenu title={<span>Blogs</span>}>
          <MenuItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
        <Menu.Item key="alipay"></Menu.Item> */}
      </Menu>
    );
  }
}

export default LeftMenu;
