import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import Home from './pages/Home';
import AllMemories from './pages/AllMemories';
import Login from './pages/Login';
import Reminder from './pages/Reminder';
import Signup from './pages/Signup';
import api from '../api';
import logo from '../logo.svg';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: []
    }
    // api.loadUser();
  }

  handleLogoutClick(e) {
    api.logout()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">MERN Boilerplate</h1>
          <NavLink to="/" exact>Home</NavLink>
          {!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}
          {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
          {api.isLoggedIn() && <NavLink to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</NavLink>}
          {api.isLoggedIn() && <NavLink to="/allMemories">My memories</NavLink>}
          
        </header>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/allMemories" component={AllMemories} />
          <Route path="/reminder/:id" component={Reminder} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
