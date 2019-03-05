import React, { Component } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

export default class Reminder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      memoryId: this.props.match.params.id,
      reminderDate: "...",
      reminderWeekday: "..."
    };
  }

  // onChange = reminderDate => this.setState({ reminderDate });

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({[name]: value});
  }


  handleDateChange=(e) => {
    console.log("debug:", e.target.value)
    this.setState({reminderDate: e.target.value});
  }

  scheduleReminder(e) {
    e.preventDefault();
    let reminderDate = this.params.date
  }

  render() {
    console.log(JSON.stringify(this.state.reminderDate));
    return (
      <div className="reminderContainer col py-3 px-lg-5 border bg-light">
      <img id="reminderImg" src={this.props.imgUrl} alt="" />
      <p>When would you like to be reminded of this moment?</p>
        {/* <Form onSubmit={this.scheduleReminder.bind(this)}>> */}
        <Form>
        {/* <FormGroup>
          <Label for="exampleDate">Specific Date:</Label>
          <Input
            onChange={(e) => this.handleDateChange(e)}
            type="date"
            name="date"
            id="exampleDate"
            placeholder="date placeholder"
            onC
          />
        </FormGroup> */}
        <FormGroup className="weekDays-selector">
        <Label for="weekDays-selector">Once a week on:</Label><br />
          <Input type="checkbox" id="weekday-mon" class="weekday" 
          onChange={(e) => this.handleDateChange(e)}/>
          <Label for="weekday-mon">Mon</Label>
          <Input type="checkbox" id="weekday-tue" class="weekday" 
          onChange={(e) => this.handleDateChange(e)}/>
          <Label for="weekday-tue">Tue</Label>
          <Input type="checkbox" id="weekday-wed" class="weekday" 
          onChange={(e) => this.handleDateChange(e)}/>
          <Label for="weekday-wed">Wed</Label>
          <Input type="checkbox" id="weekday-thu" class="weekday" 
          onChange={(e) => this.handleDateChange(e)}/>
          <Label for="weekday-thu">Thu</Label>
          <Input type="checkbox" id="weekday-fri" class="weekday" 
          onChange={(e) => this.handleDateChange(e)}/>
          <Label for="weekday-fri">Fri</Label>
          <Input type="checkbox" id="weekday-sat" class="weekday" 
          onChange={(e) => this.handleDateChange(e)}/>
          <Label for="weekday-sat">Sat</Label>
          <Input type="checkbox" id="weekday-sun" class="weekday" 
          onChange={(e) => this.handleDateChange(e)}/>
          <Label for="weekday-sun">Sun</Label>
        </FormGroup>
        <button type="submit" className="btn btn-secondary align-content-center">
          Set Reminder
        </button>
        </Form>
      </div>
    );
  }
}
