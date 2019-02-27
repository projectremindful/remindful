import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import AllMemories from './pages/AllMemories';
import Login from './pages/Login';
import Reminder from './pages/Reminder';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import AddMemory from './pages/AddMemory';
import Navbar from './Navbar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: []
    };
    // api.loadUser();
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/all-memories" component={AllMemories} />
          <Route path="/reminder/:id" component={Reminder} />
          <Route path="/add-memory" component={AddMemory} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
        
      </div>
    );
  }
}

export default App;
