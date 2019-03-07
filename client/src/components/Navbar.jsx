import React, { Component } from "react";
import api from "../api";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  NavItem
} from "reactstrap";
import { NavLink as NLink } from "react-router-dom";

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      chosenMemory: null
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleLogoutClick(e) {
    api.logout();
  }

  render() {
    var loggedInUserChosenMemory = this.props.memId;
    return (
      <Navbar className="navbar py-0 px-0 pl-3" expand="md" color="#fff" light>
        <NavbarToggler onClick={this.toggle} />
        <NavbarBrand tag={NLink} to="/">
          {" "}
          <img src={"/images/Remindful.png"} alt="logo" />
        </NavbarBrand>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {api.isLoggedIn() && (
              <NavLink tag={NLink} to="/profile">
                Profile
              </NavLink>
            )}
            <NavItem>
              {!api.isLoggedIn() && (
                <NavLink tag={NLink} to="/signup">
                  Signup
                </NavLink>
              )}
            </NavItem>
            <NavItem>
              {!api.isLoggedIn() && (
                <NavLink tag={NLink} to="/login">
                  Login
                </NavLink>
              )}
            </NavItem>
            <NavItem>
              {api.isLoggedIn() && (
                <NavLink
                  tag={NLink}
                  to="/logout"
                  onClick={e => this.handleLogoutClick(e)}
                >
                  Logout
                </NavLink>
              )}
            </NavItem>
            <NavItem>
              {api.isLoggedIn() && (
                <NavLink tag={NLink} to="/memory-gallery">
                  Memory Gallery
                </NavLink>
              )}
            </NavItem>
            <NavItem>
              {api.isLoggedIn() && (
                <NavLink tag={NLink} to="/add-memory">
                  Add Memory
                </NavLink>
              )}
            </NavItem>
          </Nav>
          <div className="add-memory">
            {api.isLoggedIn() && (
              <div id="test">
                <NavLink
                  style={{ marginBottom: "0", color: "white" }}
                  tag={NLink}
                  to={`/reminder/${loggedInUserChosenMemory}`}
                >
                  Daily Memory
                </NavLink>
              </div>
            )}
          </div>
        </Collapse>
      </Navbar>
    );
  }

  componentDidMount() {
    api.getProfile().then(user => {
      this.setState({
        chosenMemory: user.chosenMemory
      });
    });
  }
}
