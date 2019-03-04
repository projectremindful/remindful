import React, { Component } from 'react'

export default class Reminder extends Component {
constructor(props) {
  super(props)
	console.log('TCL: Reminder -> constructor -> props', props)
  this.state = {
     memoryId : this.props.match.params.id
  }
}

  render() {
    return (
      <div>
        <p>Reminder.jsx - view of a single memory for reflection </p>
        <p>This memory's id is ... {this.state.memoryId}</p>
      </div>
    )
  }
}
