import React from "react";
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarText,
  NavItem,
} from "reactstrap";
import dickerLogoSquare from "../images/dickerLogoSquare.png";
import "./NavEmpty.css";

function NavEmpty() {
  return (
    <Container className={"navbar"}>
      <Navbar color={"dark"} expand={"xl"}>
        <Collapse isOpen={true} navbar>
          <NavbarBrand>
            <img src={dickerLogoSquare} alt={"DICKER logo"} />
          </NavbarBrand>
          <NavItem className={"navDivider"}>
          </NavItem>
          <NavbarText className={"merchantWelcome"}>
          </NavbarText>
        </Collapse>
      </Navbar>
    </Container>
  );
}

export default NavEmpty;
