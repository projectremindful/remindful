import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import Home from './pages/Home';
import AllMemories from './pages/AllMemories';
import Login from './pages/Login';
import Reminder from './pages/Reminder';
import Signup from './pages/Signup';
import api from '../api';
import logo from '../images/logoonly.png';
import AddMemory from './pages/AddMemory';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: []
    };
    // api.loadUser();
  }

  handleLogoutClick(e) {
    api.logout();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <NavLink to="/" exact>
            Home
          </NavLink>
          {!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}
          {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
          {api.isLoggedIn() && (
            <Link to="/" onClick={e => this.handleLogoutClick(e)}>
              Logout
            </Link>
          )} */}
          {/* <NavLink to="/secret">Secret</NavLink> */}
          {api.isLoggedIn() && (
            <NavLink to="/" onClick={e => this.handleLogoutClick(e)}>
              Logout
            </NavLink>
          )}
          {api.isLoggedIn() && <NavLink to="/allMemories">My memories</NavLink>}
          {api.isLoggedIn() && <NavLink to="/AddMemory">Add Memory</NavLink>}
        </header>
        <img src={logo} className="App-logo" alt="logo" />
        <div class="spinner">
          <div class="bounce1" />
          <div class="bounce2" />
          <div class="bounce3" />
        </div>
        <div id="pt-main" class="pt-perspective">
          <div class="pt-page pt-page-1" />
        </div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/allMemories" component={AllMemories} />
          <Route path="/reminder/:id" component={Reminder} />
          <Route path="/AddMemory" component={AddMemory} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
