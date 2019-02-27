import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import api from '../api';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
import userLogo from '../images/user.png'
import addLogo from '../images/plus-button.png'
import logo from '../images/house-outline.png'


export default class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
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
      <div>
        <Navbar color="light" light expand="lg">
          <NavbarToggler onClick={this.toggle} />
          <NavItem>
            <NavbarBrand href="/"> <img src={logo} alt="home"/></NavbarBrand>
            <NavbarBrand href="/add-memory"> <img src={addLogo} alt="addlogo"/></NavbarBrand>
            <NavbarBrand href="/profile"> <img src={userLogo} alt="userlogo"/></NavbarBrand>
          </NavItem>
          
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="md-auto" navbar>
              <NavItem>
                {!api.isLoggedIn() && <NavLink style={{textAlign: "left"}} to="/signup">Signup</NavLink>} 
              </NavItem>
              <NavItem>
               {!api.isLoggedIn() && <NavLink to="/login" >Login</NavLink>}
              </NavItem>
              <NavItem>
                {api.isLoggedIn() && (<NavLink to="/logout" onClick={e => this.handleLogoutClick(e)}>Logout</NavLink>)}
              </NavItem>
              <NavItem>
                {api.isLoggedIn() && <NavLink to="/allMemories">My memories</NavLink>}
              </NavItem>
              <NavItem>
                {api.isLoggedIn() && <NavLink to="/addMemory">Add Memory</NavLink>}
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}
