import React, { Component } from "react";
import api from "../../api";
import QuillTextBox from "../QuillTextBox";
import {
  Form,
  Button,
  FormGroup,
  Col,
  Row,
  Container,
  Label,
  Input
} from "reactstrap";
import Modal from "../Modal";

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
      reflection: false,
      showModal: false
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

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  render() {
    return (
      <Container style={{ padding: "100px" }}>
        <Row>
          <Col>
            <img
              style={{ width: "400px" }}
              src={this.state.imgUrl}
              alt="memory"
            />
          </Col>
          <Col>
            <h2>{this.state.title}</h2>
            <p>{this.state.date}</p>
            <ul>
              <li>Try to imagine the event in every detail</li>
              <li>What does this moment mean to you?</li>
              <li>How did this experience change you?</li>
              <li>Did you share it with someone? What do they mean to you?</li>
              <li>What were you thinking about at the time?</li>
            </ul>
            <Button onClick={this.toggleModal}>Read your reflections</Button>
            {/* <p>Viewed: {this.state.viewed ? "true" : "false"}</p>
            <p>Nostalgia tag: {this.state.nostalgia ? "true" : "false"}</p>
            <p>Reflection tag: {this.state.reflection ? "true" : "false"}</p>
            <p>Motivation tag: {this.state.motivation ? "true" : "false"}</p>
            <Button
              active={this.state.viewed}
              outline
              color={this.state.viewed ? "danger" : "success"}
              onClick={this.handleViewClick}
            >
              I {this.state.viewed ? "won't" : "will"} see this memory again
            </Button> */}
          </Col>
        </Row>

        <Modal // show Quill box
          show={this.state.showModal}
          closeCallback={this.toggleModal}
          customClass="custom_modal_class"
        >
          <React.Fragment>
            <Form>
              <QuillTextBox
                text={this.state.notes}
                onChange={this.changeText}
                className="modal-content"
              />
              <Button onClick={this.handleNotesClick}>Save your changes</Button>
            </Form>
          </React.Fragment>
        </Modal>
      </Container>
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
