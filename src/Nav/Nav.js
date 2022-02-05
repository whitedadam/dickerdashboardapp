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
import dickerLogoSquare from "../images/dickerLogoSquare.png";
import "./Nav.css";

function Nav({ userAuth, isAdmin }) {
    const location = {
        pathname: '/settings',
        state: { userAuth: userAuth, isAdmin: isAdmin } 
    }
  if (isAdmin === true && userAuth === true) {
    return (
      <Container className={"navbar"}>
        <Navbar color={"dark"} expand={"xl"}>
          <Collapse isOpen={true} navbar>
            <NavbarBrand>
              <img src={dickerLogoSquare} alt={"DICKER logo"} />
            </NavbarBrand>
            <NavItem>
              <NavLink href="/dashboard" >Dashboard</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/AdminDashboard">Admin Dashboard</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/AdminSettings">Admin Settings</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/settings">Settings</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">Logout</NavLink>
            </NavItem>
            <NavItem className={"navDivider"}>
              <p>______________________________________________________ </p>
            </NavItem>
            <NavbarText className={"merchantWelcome"}>
              Welcome, Merchant!
            </NavbarText>
          </Collapse>
        </Navbar>
      </Container>
    );
  } else if (userAuth === true) {
    return (
      <Container className={"navbar"}>
        <Navbar color={"dark"} expand={"xl"}>
          <Collapse isOpen={true} navbar>
            <NavbarBrand>
              <img src={dickerLogoSquare} alt={"DICKER logo"} />
            </NavbarBrand>
            <NavItem>
              <NavLink href="/dashboard">Dashboard</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/settings">Settings</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">Logout</NavLink>
            </NavItem>
            <NavItem className={"navDivider"}>
              <p>______________________________________________________ </p>
            </NavItem>
            <NavbarText className={"merchantWelcome"}>
              Welcome, Merchant!
            </NavbarText>
          </Collapse>
        </Navbar>
      </Container>
    );
  } else {
    return (
      <Container className={"navbar"}>
        <Navbar color={"dark"} expand={"xl"}>
          <Collapse isOpen={true} navbar>
            <NavbarBrand>
              <img src={dickerLogoSquare} alt={"DICKER logo"} />
            </NavbarBrand>
            <NavItem className={"navDivider"}></NavItem>
            <NavbarText className={"merchantWelcome"}>Welcome to the DICKER Dashboard App</NavbarText>
          </Collapse>
        </Navbar>
      </Container>
    );
  }
}

export default Nav;
