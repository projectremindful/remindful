import React, { Component } from "react";
import api from "../../api";
import QuillTextBox from "../QuillTextBox";
import { Form, Button } from "reactstrap";

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

  render() {
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
  }
}
