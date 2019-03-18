import React, { Component } from "react";

class Logout extends Component {
  render() {
    return (
      <div className="Logout-image">
        <div className="logout">
          <h1>Until next time...</h1>
          <br />
          <br />
          <br />
          <img
            src={"/images/logoonly (1).png"}
            alt="victoria harbour"
            className="App-logo"
          />
        </div>
      </div>
    );
  }
}

export default Logout;
