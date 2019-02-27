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
    return this.state.user ? 
    ( // when user information has loaded render this
      <div>
        
        <p>{this.state.user.username}</p>
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

