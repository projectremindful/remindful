import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import api from '../api';

export default class Navbar extends Component {
  handleLogoutClick(e) {
    api.logout();
  }
  render() {
    return (
      <div>
        <NavLink to="/" exact>Home</NavLink>
        {!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}
        {!api.isLoggedIn() && <NavLink to="/login" >Login</NavLink>}
        {api.isLoggedIn() && (<NavLink to="/logout" onClick={e => this.handleLogoutClick(e)}>Logout</NavLink>)}
        {api.isLoggedIn() && <NavLink to="/allMemories">My memories</NavLink>}
        {api.isLoggedIn() && <NavLink to="/addMemory">Add Memory</NavLink>}
        {api.isLoggedIn() && <NavLink to="/profile/:id">Profile</NavLink>}
      </div>
    )
  }
}

// <NavLink to="/" exact> Home     </NavLink>
//           {!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}
//           {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
//           {api.isLoggedIn() && (
//             <Link to="/" onClick={e => this.handleLogoutClick(e)}>
//               Logout
//             </Link>
//           )} 
//           <NavLink to="/secret">Secret</NavLink>
