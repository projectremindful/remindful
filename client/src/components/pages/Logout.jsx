import React, { Component } from 'react';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="logout">
      <p>You're logged out.</p>
      <p>Have a nice day!</p>
      </div>
    );
  }
}

export default Logout;
