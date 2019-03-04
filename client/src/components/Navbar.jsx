import React, { Component } from 'react';
import api from '../api';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  NavItem
} from 'reactstrap';
import logo from '../images/Remindful.png';
import { NavLink as NLink } from 'react-router-dom';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
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
    return (
      <Navbar className="navbar" expand="md" color="white" light>
        <NavbarToggler onClick={this.toggle} />
        <NavItem>
          <NavbarBrand tag={NLink} to="/">
            {' '}
            <img src={logo} alt="logo" />
          </NavbarBrand>
          {/* {api.isLoggedIn() && (
              <NavbarBrand tag={NLink} to="/add-memory">
                {' '}
                <img src={addLogo} alt="addlogo" />
              </NavbarBrand>
            )} */}
        </NavItem>
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
          </Nav>
          <div className="add-memory">
            {api.isLoggedIn() && (
              <NavLink tag={NLink} to="/add-memory">
                Add Memory
              </NavLink>
            )}
          </div>
        </Collapse>
      </Navbar>
    );
  }
}
