import React, { Component } from 'react'
import api from '../../api';
import { Button, CustomInput, Form, FormGroup, Label, Input } from 'reactstrap'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      _id: "",
      username: '',
      profileUrl: "",
      tranquility: null,
      empowerment: null,
      amusement: null,
      inspiration: null,
      selfGrowth: null,
      motivation: null,
      nostalgia: null,
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange() {
    this.setState(prevState => ({
      tranquility : !prevState.tranquility
    }))
  }

  // switches load based on the user profile
  // two things - one is to make the switches look differnet 
  // other is to update the user on save
  
  
  render() {
    console.log(this.state.tranquility)
    return this.state.username ? 
    ( // when user information has loaded render this
      // console.log(this.state.user.profileUrl)
      <div>
        <div>
          <img style={{height:"50px"}} src={this.state.profileUrl} alt="profile pic"/>
          <h2>{this.state.username}'s profile</h2>
          <p>And the rest of his user information here</p>
        </div>
        <hr/>
        <h2>Your Memory Preferences</h2>
        <p></p>
        <Form>
          <FormGroup check>
            <Label check>
              <Input type="checkbox"/>{' '}Calm
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="checkbox"/>{' '}Nostaligic
            </Label>
          </FormGroup>
          <FormGroup>
          <Label for="exampleCheckbox">Select the type of memories you want to reflect on</Label>
          <div>
            <CustomInput checked={this.state.tranquility} onChange={e => this.handleChange("tranquility")} type="switch" id="exampleCustomSwitch" name="tranquility" label="tranquility" />
            <CustomInput type="switch" id="exampleCustomSwitch2" name="customSwitch" label="Nostaliga" />
            <CustomInput type="switch" id="exampleCustomSwitch3" label="But not this disabled one" disabled />
          </div>
        </FormGroup>
          <Button>Save</Button>
        </Form>
      </div>

    ) : // if user information has not yet loaded render this
    (
      <div>Loading</div>
    )
  }

  componentDidMount() {
    api.getProfile()
    .then(user => {
      this.setState({
        username: user.username,
        tranquility: user.tranquility,
        empowerment: user.empowerment,
        amusement: user.amusement,
        inspiration: user.inspiration,
        selfGrowth: user.selfGrowth,
        motivation: user.motivation,
        nostalgia: user.nostalgia,
        })
    })
  }

}

