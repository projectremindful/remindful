import React, { Component } from 'react'
import api from '../../api';

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user : null
    }
  }
  
  render() {
    console.log(this.state.profileUrl)
    return this.state.user ? 
    ( // when user information has loaded render this
      <div>
        <img src={this.state.profileUrl} alt="profile pic"/>
        <p>{this.state.user.username}'s profile</p>
        <p>And the rst of his user information here</p>
      </div>
    ) : // if user information has not yet loaded render this
    (
      <div>Loading</div>
    )
  }

  componentDidMount() {
    api.getProfile()
    .then(user => {
      this.setState({user})
    })
  }

}

