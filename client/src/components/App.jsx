import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import MemoryGallery from "./pages/MemoryGallery";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Reminder from "./pages/Reminder";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import AddMemory from "./pages/AddMemory.jsx";
import NavBar from "./Navbar.jsx";
import Demo from "./Demo.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenMemory: null
    };
    this.updateCurrentUsersChosenMemory = this.updateCurrentUsersChosenMemory.bind(
      this
    );
  }

  updateCurrentUsersChosenMemory(newId) {
    this.setState({
      chosenMemory: newId
    });
  }

  render() {
    return (
      <div className="App">
        <NavBar memId={this.state.chosenMemory} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" component={Signup} />
          <Route
            path="/login"
            render={props => (
              <Login {...props} newUser={this.updateCurrentUsersChosenMemory} />
            )}
          />
          <Route path="/logout" component={Logout} />
          <Route path="/profile" component={Profile} />
          <Route path="/memory-gallery" component={MemoryGallery} />
          <Route path="/reminder/:id" component={Reminder} />
          <Route path="/add-memory" component={AddMemory} />
          <Route path="/demo" component={Demo} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
