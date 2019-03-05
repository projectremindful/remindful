import React, { Component } from "react";
import logo from "../../images/logoonly (1).png";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="content">
        <div className="Home-image">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      </div>
    );
  }
}

export default Home;
