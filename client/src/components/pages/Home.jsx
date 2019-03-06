import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="content">
        <div className="Home-image">
          <img
            src={'/images/Remindfulhome.png'}
            className="App-logo"
            alt="logo"
          />
        </div>
        <div className="wrapper">
          <div className="box">
            <h1>Intro</h1>
            <p>
              We all take pictures to remember and share events with friends via
              social platforms like facebook, Instagram, and twitter. But as
              time goes on, how often do we really look back at them? And when
              we do look back, what do we think about?{' '}
            </p>
            <p>
              We created Remindful because we believe our memories have untapped
              value if only we took the time to reflect on them. Inspired by
              mindfulness meditation, Remindful displays memories in an isolated
              viewer, giving you the headspace to explore your memories and a
              text editor to write down any thoughts as they appear.
            </p>
          </div>
          <div className="box">
            <img src={'/images/victoriaharbor.png'} className="homestyle" />
          </div>
        </div>
        <div className="wrapper">
          <div className="box">
            <img src={'/images/preferenceshome.png'} className="homestyle" />
          </div>
          <div className="textbox">
            <h1>How it Works</h1>
            <p>
              After assigning a title and date, each photo memory uploaded is
              given one (or all) of the tags Reflection, Nostalgia, or
              Motivation. Then, based on the tags selected, every day a new
              random memory from your memory gallery will alert you to take a
              few minutes to reflect.{' '}
            </p>
            <p>
              If you want to receive different memories, simply change the
              preferences on your profile and you’ll start to receive alerts
              from that new category.
            </p>
          </div>
        </div>
        {/* <img src={'../../images/demoralized.jpg'} alt="demoralized" /> */}
      </div>
    );
  }
}

export default Home;
