import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';

export default class Reminder extends Component {
constructor(props) {
  super(props)

  this.state = {
     memoryId : this.props.match.params.id,
     reminderDate: new Date(),
  }
}

onChange = reminderDate => this.setState({ reminderDate })

  render() {
    return (
      <div>
        <DateTimePicker
          onChange={this.onChange}
          value={this.state.reminderDate}
        />
        <p>Reminder.jsx - view of a single memory for reflection </p>
        <p>This memory's id is ... {this.state.memoryId}</p>
      </div>
    )
  }
}
