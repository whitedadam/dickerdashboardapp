import React, { useState } from "react";
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarText,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import dickerLogoSquare from "../images/dickerLogoSquare.png";
import "./Nav.css";

function Nav({ userAuth, isAdmin, setUserAuth, setIsAdmin }) {
  const handleLogout = (e) => {
    e.preventDefault();
    setUserAuth(false);
    setIsAdmin(false);
  };

  if (!userAuth) return null;

  return (
    <Container className={"navbar"}>
      <Navbar color={"dark"} expand={"xl"}>
        <Collapse isOpen={true} navbar>
          <NavbarBrand>
            <img src={dickerLogoSquare} alt={"DICKER logo"} />
          </NavbarBrand>
          {isAdmin ? (
            <>
              <NavItem>
                <NavLink tag={Link} to="/adminDashboard">
                  Admin Dashboard
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/adminSettings">
                  Admin Settings
                </NavLink>
              </NavItem>
            </>
          ) : (
            <>
              <NavItem>
                <NavLink tag={Link} to="/dashboard">
                  Dashboard
                </NavLink>
              </NavItem>
              <NavItem>
                {/* <NavLink to="/settings">Settings</NavLink> */}
                <NavLink tag={Link} to="/settings">
                  Settings
                </NavLink>
              </NavItem>
            </>
          )}
          <NavItem>
            <NavLink tag={Link} onClick={handleLogout}>
              Logout
            </NavLink>
          </NavItem>
          <NavItem className={"navDivider"}>
            <p>_____________________________ </p>
          </NavItem>
          <NavbarText className={"merchantWelcome"}>Welcome, Admin!</NavbarText>
        </Collapse>
      </Navbar>
    </Container>
  );
}

export default Nav;
