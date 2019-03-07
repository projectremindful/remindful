import React, { Component } from 'react';
import { Jumbotron, Button, Row, Col } from 'reactstrap';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <div className="Home-image">
          <img
            src={'/images/Remindfulhome.png'}
            className="App-logo"
            alt="logo"
          />
        </div>
        <Jumbotron>
          <Row>
            <Col>
              <h1 className="display-3">A New Way of Looking at the Past</h1>
              <hr className="my-2" />

              <p className="lead .col-6">
                We all take pictures to remember and share events with friends
                via social platforms like facebook, Instagram, and twitter. But
                as time goes on, how often do we really look back at them? And
                when we do look back, what do we think about?{' '}
              </p>
              <p className="lead">
                We created <span className="homefont">Remindful</span> because
                we believe our memories have untapped value if only we took the
                time to reflect on them. Inspired by mindfulness meditation,
                Remindful displays memories in an isolated viewer, giving you
                the headspace to explore your memories and a text editor to
                write down any thoughts as they appear.
              </p>
            </Col>
            <Col>
              <img src={'/images/victoriaharbor.png'} className="homepicture" />
            </Col>
          </Row>
        </Jumbotron>
        <Jumbotron>
          <Row>
            <Col>
              <img
                src={'/images/preferenceshome.png'}
                className="homepicture"
              />
            </Col>
            <Col>
              <h1 className="display-3">Making Time for Your Memories</h1>
              <hr className="my-2" />

              <p className="lead">
                After assigning a title and date, each photo memory uploaded is
                given one (or all) of the tags{' '}
                <span className="homefont">
                  Reflection, Nostalgia, or Motivation.
                </span>{' '}
                Then, based on the tags selected, every day a new random memory
                from your memory gallery will alert you to take a few minutes to
                reflect.{' '}
              </p>
              <p className="lead">
                If you want to receive different memories, simply change the
                preferences on your profile and you’ll start to receive alerts
                from that new category.
              </p>
            </Col>
          </Row>
        </Jumbotron>
      </div>
    );
  }
}

export default Home;
