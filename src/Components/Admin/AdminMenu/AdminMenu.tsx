import React, { Component } from "react";
import "./AdminMenu.scss";

class AdminMenu extends Component {
  render() {
    return (
      <div className="Container--AdminMenu AdminMenu">
        <div className="heading">
          <div className="heading__header">Admin Dashboard</div>
          <button className="heading__addButton addButton">
            <div className="logo--container">
              <div className="addButton__logo">&nbsp;</div>
            </div>
            New Department
          </button>
        </div>

        <div className="menu">
          <ul className="menu__items">
            <li className="menu__items--dep menu__items--single">
              Departments
            </li>
            <li className="menu__items--users menu__items--single">Users</li>
            <li className="menu__items--sop menu__items--single">
              Sop Documents
            </li>
          </ul>
          <input
            className="menu__search"
            placeholder="Search Users"
            type="text"
          />
        </div>
      </div>
    );
  }
}

export default AdminMenu;