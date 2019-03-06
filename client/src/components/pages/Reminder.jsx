import React, { Component } from "react";
import api from "../../api";
import QuillTextBox from "../QuillTextBox";
import { Form, Button, FormGroup, Label, Input } from "reactstrap";

export default class Reminder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      memoryId: this.props.match.params.id,
      imgUrl: "",
      date: "",
      notes: "",
      title: "",
      viewed: false,
      ownerId: null,
      nostalgia: false,
      motivation: false,
      reflection: false
    };
    this.changeText = this.changeText.bind(this);
    this.handleNotesClick = this.handleNotesClick.bind(this);
    this.handleViewClick = this.handleViewClick.bind(this);
  }

  changeText(newText) {
    this.setState({ notes: newText });
  }

  handleNotesClick() {
    var updatedNotes = { updatedNotes: this.state.notes };
    console.log("notes from user", updatedNotes);
    api
      .updateMemory(this.state.memoryId, updatedNotes)
      .then(res => {
        console.log("memorynotes updated: ", res);
        // alert("Profile Picture successfully uploaded");
      })
      .catch(err => {
        console.log("Error while updating memory notes: ", err);
      });
    // console.log(this.state.notes);
  }

  handleViewClick() {
    this.setState(prevState => ({
      viewed: !prevState.viewed
    }));
  }

  // handleChange(event) {
  //   const { name, value } = event.target;
  //   this.setState({ [name]: value });
  // }

  // handleDateChange = e => {
  //   console.log("debug:", e.target.value);
  //   this.setState({ reminderDate: e.target.value });
  // };

  // scheduleReminder(e) {
  //   e.preventDefault();
  //   let reminderDate = this.params.date;
  // }

  render() {
    console.log(JSON.stringify(this.state.reminderDate));
    console.log(this.state.viewed);
    return (
      <div style={{ padding: "100px" }}>
        <Form>
          <QuillTextBox text={this.state.notes} onChange={this.changeText} />
          <Button onClick={this.handleNotesClick}>Update your thoughts</Button>
        </Form>
        <h2>Title: {this.state.title}</h2>
        <p>
          Image: <img src={this.state.imgUrl} alt="memory" />
        </p>
        <p>Date: {this.state.date}</p>
        <p>Notes: {this.state.notes}</p>
        <p>Viewed: {this.state.viewed ? "true" : "false"}</p>
        <p>OwnerId: {this.state.ownerId}</p>
        <p>Nostalgia tag: {this.state.nostalgia ? "true" : "false"}</p>
        <p>Reflection tag: {this.state.reflection ? "true" : "false"}</p>
        <p>Motivation tag: {this.state.motivation ? "true" : "false"}</p>
        <p>Memory id: {this.state.memoryId}</p>
        <Button
          active={this.state.viewed}
          outline
          color={this.state.viewed ? "danger" : "success"}
          onClick={this.handleViewClick}
        >
          I {this.state.viewed ? "won't" : "will"} see this memory again
        </Button>


        {/* <div className="reminderContainer col py-3 px-lg-5 pt-5 border bg-light">
          <img id="reminderImg" src={this.props.imgUrl} alt="" />
          <p>When would you like to be reminded of this moment?</p>
          <Form onSubmit={this.scheduleReminder.bind(this)}>>
          <Form>
            <FormGroup>
          <Label for="exampleDate">Specific Date:</Label>
          <Input
            onChange={(e) => this.handleDateChange(e)}
            type="date"
            name="date"
            id="exampleDate"
            placeholder="date placeholder"
            onC
          />
          </FormGroup>
            <FormGroup className="weekDays-selector">
              <Label for="weekDays-selector">Once a week on:</Label>
              <br />
              <Input
                type="checkbox"
                id="weekday-mon"
                class="weekday"
                onChange={e => this.handleDateChange(e)}
              />
              <Label for="weekday-mon">Mon</Label>
              <Input
                type="checkbox"
                id="weekday-tue"
                class="weekday"
                onChange={e => this.handleDateChange(e)}
              />
              <Label for="weekday-tue">Tue</Label>
              <Input
                type="checkbox"
                id="weekday-wed"
                class="weekday"
                onChange={e => this.handleDateChange(e)}
              />
              <Label for="weekday-wed">Wed</Label>
              <Input
                type="checkbox"
                id="weekday-thu"
                class="weekday"
                onChange={e => this.handleDateChange(e)}
              />
              <Label for="weekday-thu">Thu</Label>
              <Input
                type="checkbox"
                id="weekday-fri"
                class="weekday"
                onChange={e => this.handleDateChange(e)}
              />
              <Label for="weekday-fri">Fri</Label>
              <Input
                type="checkbox"
                id="weekday-sat"
                class="weekday"
                onChange={e => this.handleDateChange(e)}
              />
              <Label for="weekday-sat">Sat</Label>
              <Input
                type="checkbox"
                id="weekday-sun"
                class="weekday"
                onChange={e => this.handleDateChange(e)}
              />
              <Label for="weekday-sun">Sun</Label>
            </FormGroup>
            <button
              type="submit"
              className="btn btn-secondary align-content-center"
            >
              Set Reminder
            </button>
          </Form>
        </div> */}

      </div>
    );
  }

  componentDidMount() {
    api.getMemory(this.state.memoryId).then(memory => {
      console.log("memory is:   ", memory);
      this.setState({
        imgUrl: memory.imgUrl,
        date: memory.date,
        notes: memory.notes,
        title: memory.title,
        viewed: memory.viewed,
        ownerId: memory._owner,
        nostalgia: memory.nostalgia,
        motivation: memory.motivation,
        reflection: memory.reflection
      });
    });
  }

  componentWillUnmount() {
    console.log(this.state.viewed);
    // can saveupdate the memory here too to save the view to the database but
    // this involves editing the api method and call that also updates the notes.
    // reminderDate: "...",
    // reminderWeekday: "..."
  }
}

