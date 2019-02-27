import React, { Component } from 'react';
import logo from '../../images/logoonly.png';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return (
      <div className="Home">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="spinner">
          <div className="bounce1" />
          <div className="bounce2" />
          <div className="bounce3" />
        </div>
        <div id="pt-main" className="pt-perspective">
          <div className="pt-page pt-page-1"/>
        </div>
      </div>
    );
  }
}

export default Home;
