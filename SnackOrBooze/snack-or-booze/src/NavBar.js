// navigation bar sits on top of app

import React from "react";
import "./NavBar.css";
import {Link} from "react-router-dom";
import {Navbar, Nav, NavItem} from "reactstrap";

function NavBar() {
  return (
    <div>
      <Navbar expand="md">
        <Link
          to="/"
          className="navbar-brand">
          Snack or Booze
        </Link>

        <Nav
          className="ml-auto"
          navbar>
          <NavItem>
            <Link to="/snacks">Snacks</Link>
          </NavItem>
          <NavItem>
            <Link to="/drinks">Drinks</Link>
          </NavItem>
          <NavItem>
            <Link
              to="/add"
              className="mr-0">
              Add Items
            </Link>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
