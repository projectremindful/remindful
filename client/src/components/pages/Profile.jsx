import React, { Component } from 'react';
import api from '../../api';
import { Button, CustomInput, Container, Row, Col } from 'reactstrap';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      username: '',
      email: '',
      profileUrl: '',
      tranquility: null,
      empowerment: null,
      amusement: null,
      inspiration: null,
      selfGrowth: null,
      motivation: null,
      nostalgia: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(key) {
    this.setState(prevState => ({
      [key]: !prevState[key]
    }));
  }

  handleClick() {
    const preferences = {
      tranquility: this.state.tranquility,
      empowerment: this.state.empowerment,
      amusement: this.state.amusement,
      inspiration: this.state.inspiration,
      selfGrowth: this.state.selfGrowth,
      motivation: this.state.motivation,
      nostalgia: this.state.nostalgia
    };
    api.updateUserPreferences(this.state._id, preferences).then(res => {});
  }

  render() {
    return this.state.username ? (
      // when user information has loaded render this
      <Container>
        <Row>
          <Col xs="4">
            <img
              style={{ height: '100px' }}
              src={this.state.profileUrl}
              alt="profile pic"
            />
          </Col>
          <Col xs="8" align="left">
            <h4>{this.state.username}</h4>
            <p>{this.state.email}</p>
          </Col>
        </Row>
        <hr />
        <h2>Your Memory Preferences</h2>
        <div>
          <CustomInput
            checked={this.state.tranquility}
            onChange={e => this.handleChange('tranquility')}
            type="switch"
            id="tranquility"
            name="tranquility"
            label="tranquility"
          />
          <CustomInput
            checked={this.state.empowerment}
            onChange={e => this.handleChange('empowerment')}
            type="switch"
            id="empowerment"
            name="empowerment"
            label="empowerment"
          />
          <CustomInput
            checked={this.state.amusement}
            onChange={e => this.handleChange('amusement')}
            type="switch"
            id="amusement"
            name="amusement"
            label="amusement"
          />
          <CustomInput
            checked={this.state.inspiration}
            onChange={e => this.handleChange('inspiration')}
            type="switch"
            id="inspiration"
            name="inspiration"
            label="inspiration"
          />
          <CustomInput
            checked={this.state.selfGrowth}
            onChange={e => this.handleChange('selfGrowth')}
            type="switch"
            id="selfGrowth"
            name="selfGrowth"
            label="selfGrowth"
          />
          <CustomInput
            checked={this.state.motivation}
            onChange={e => this.handleChange('motivation')}
            type="switch"
            id="motivation"
            name="motivation"
            label="motivation"
          />
          <CustomInput
            checked={this.state.nostalgia}
            onChange={e => this.handleChange('nostalgia')}
            type="switch"
            id="nostalgia"
            name="nostalgia"
            label="nostalgia"
          />
          <br />
          <Button outline color="success" onClick={this.handleClick}>
            Save
          </Button>
        </div>
      </Container>
    ) : (
      // if user information has not yet loaded render this
      <div>Loading</div>
    );
  }

  componentDidMount() {
    api.getProfile().then(user => {
      this.setState({
        _id: user._id,
        username: user.username,
        email: user.email,
        profileUrl: user.profileUrl,
        tranquility: user.tranquility,
        empowerment: user.empowerment,
        amusement: user.amusement,
        inspiration: user.inspiration,
        selfGrowth: user.selfGrowth,
        motivation: user.motivation,
        nostalgia: user.nostalgia
      });
    });
  }
}
