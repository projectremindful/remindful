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
import api from "../api";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenMemory: null
    };
    this.updateCurrentUsersChosenMemory = this.updateCurrentUsersChosenMemory.bind(
      this
    );
    this.testAppMethod = this.testAppMethod.bind(this);
  }

  updateCurrentUsersChosenMemory(newId) {
    this.setState({
      chosenMemory: newId
    });
  }

  testAppMethod(info) {
    api.getUserMemories().then(memories => {
      var filteredMemories = memories.filter(memory => {
        var pref = memory._owner.preference;
        return memory[pref];
      });
      if (memories.length === 0) {
        this.setState({
          chosenMemory: null
        });
      } else if (filteredMemories.length === 0) {
        var randOne = Math.floor(Math.random() * memories.length);
        var chosenMem = memories[randOne]._id;
        this.setState({
          chosenMemory: chosenMem
        });
      } else {
        var rand = Math.floor(Math.random() * filteredMemories.length);
        var chosenMemory = filteredMemories[rand]._id;
        this.setState({
          chosenMemory: chosenMemory
        });
      }
    });
  }

  render() {
    return (
      <div className="App">
        <NavBar memId={this.state.chosenMemory} />
        <Switch>
          <Route
            path="/"
            exact
            render={props => <Home {...props} testProp={this.testAppMethod} />}
          />
          <Route path="/signup" component={Signup} />
          <Route
            path="/login"
            render={props => <Login {...props} testProp={this.testAppMethod} />}
          />
          <Route path="/logout" component={Logout} />
          <Route
            path="/profile"
            render={props => (
              <Profile {...props} testProp={this.testAppMethod} />
            )}
          />
          <Route path="/memory-gallery" component={MemoryGallery} />
          <Route path="/reminder/:id" component={Reminder} />
          <Route
            path="/add-memory"
            render={props => (
              <AddMemory {...props} testProp={this.testAppMethod} />
            )}
          />
          <Route path="/demo" component={Demo} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
