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
import users from '../mock-data.json'

function Nav({ userAuth, isAdmin, setUserAuth, setIsAdmin }) {
  const [userInfo] = useState(users);

  const handleLogout = (e) => {
    e.preventDefault();
    setUserAuth(false);
    setIsAdmin(false);
  };

  // const fetchUserInfo = async () => {
  //   const res = await fetch(`http://localhost:5000/user`);
  //   const data = await res.json();

  //   return data;
  // };

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
            <p>__________________________________________________ </p>
          </NavItem>
          <NavbarText className={"merchantWelcome"}>Welcome, {isAdmin ? userInfo[1].firstName : userInfo[2].firstName}!</NavbarText>
        </Collapse>
      </Navbar>
    </Container>
  );
}

export default Nav;
