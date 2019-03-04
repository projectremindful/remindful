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
      <img
            id="reminderImg"
            src={this.props.imgUrl}
            alt=""
          />
      <div className="reminderContainer col py-3 px-lg-5 border bg-light">
      <p>When would you like to be reminded of this moment?</p>
        <DateTimePicker
          onChange={this.onChange}
          value={this.state.reminderDate}
        />
        
        {/* <p>This memory's id is ... {this.state.memoryId}</p> */}
      </div>
      </div>
    )
  }
}
