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
import api from "../api";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dailyMemory: null
    };
    this.updateUsersDailyMemory = this.updateUsersDailyMemory.bind(this);
    this.usersDailyMemory = this.usersDailyMemory.bind(this);
  }
  // so daily memory is updated and available from the highest level.
  updateUsersDailyMemory(newId) {
    this.setState({
      dailyMemory: newId
    });
  }

  usersDailyMemory() {
    // get all the users memories and filter to an array with tags matching the users preference
    api.getUserMemories().then(memories => {
      var filteredMemories = memories.filter(memory => {
        var pref = memory._owner.preference;
        return memory[pref];
      });
      // if the user has not memories at all keep state at null
      if (memories.length === 0) {
        this.setState({
          dailyMemory: null
        });
        // if the user has not meemories that match their preference - pick a random one from all their memories
      } else if (filteredMemories.length === 0) {
        var randOne = Math.floor(Math.random() * memories.length);
        var dailyMem = memories[randOne]._id;
        this.setState({
          dailyMemory: dailyMem
        });
        // otherwise - take a random memory from the filtered memories
      } else {
        var rand = Math.floor(Math.random() * filteredMemories.length);
        var dailyMemory = filteredMemories[rand]._id;
        this.setState({
          dailyMemory: dailyMemory
        });
      }
      // then save the daily memory id to the User's data object
      var usersDailyMemory = { dailyMemory: this.state.dailyMemory };
      api.updateUserMemory(usersDailyMemory).then(res => {
        console.log("in the update user api", res);
      });
    });
  }

  render() {
    return (
      <div className="App">
        <NavBar dailyMemoryId={this.state.dailyMemory} />
        <Switch>
          <Route
            path="/"
            exact
            render={props => (
              <Home {...props} dailyMemory={this.usersDailyMemory} />
            )}
          />
          <Route path="/signup" component={Signup} />
          <Route
            path="/login"
            render={props => (
              <Login {...props} dailyMemory={this.usersDailyMemory} />
            )}
          />
          <Route path="/logout" component={Logout} />
          <Route
            path="/profile"
            render={props => (
              <Profile {...props} dailyMemory={this.usersDailyMemory} />
            )}
          />
          <Route path="/memory-gallery" component={MemoryGallery} />
          <Route path="/reminder/:id" component={Reminder} />
          <Route
            path="/add-memory"
            render={props => (
              <AddMemory {...props} dailyMemory={this.usersDailyMemory} />
            )}
          />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
