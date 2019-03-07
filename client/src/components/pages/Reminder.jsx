import React, { Component } from "react";
import api from "../../api";
import QuillTextBox from "../QuillTextBox";
import { Form, Button, Col, Row, Container } from "reactstrap";
import Modal from "../Modal";
import { Link } from "react-router-dom";

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
    console.log(this.state.title);
    return this.state.title === "" ? (
      <div
        style={{
          margin: "10px",
          padding: "100px"
        }}
      >
        <h4>
          You don't have a daily memory because you haven't saved any memories
          to your gallery yet!!
        </h4>
        <Link to="/add-memory">
          <div className="show-image">
            <img
              id="add mem"
              src="/images/addSymbol.png"
              alt="add memory"
              style={{
                height: "380px",
                padding: "45px"
              }}
            />
            <input
              className="hovertitle"
              type="text"
              value="Add a memory to your collection"
              readOnly
            />
          </div>
        </Link>
      </div>
    ) : (
      <div
        style={{
          margin: "0",
          padding: "0"
        }}
      >
        <div
          style={{
            margin: "0 auto",
            padding: "100px 0px",
            width: "100%"
          }}
        >
          <Row style={{ margin: "0" }}>
            <Col sm="12" lg="8">
              <img
                style={{ width: "100%" }}
                src={this.state.imgUrl}
                alt="memory"
              />
              <br />
              <br />
              <br />
            </Col>
            <Col
              sm="12"
              lg="4"
              style={{ textAlign: "center", lineHeight: "1.5" }}
            >
              <h2>{this.state.title}</h2>
              <p>
                <i>{this.state.date}</i>
              </p>
              <br />
              <p>Try to imagine the event in every detail</p>
              <p>What does this moment mean to you?</p>
              <p>How did this experience change you?</p>
              <p>Did you share it with someone? What do they mean to you?</p>
              <p>What were you thinking about at the time?</p>
              <br />
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
                <Button onClick={this.handleNotesClick}>
                  Save your changes
                </Button>
                <br />
              {this.state.successMessage ? (
              <div>
                <p style={{ color: '#24f0a9' }}>
                  Your information has been successfully saved
                </p>
              </div>
              ) : (
              ' '
              )}
              </Form>
            </React.Fragment>
          </Modal>
        </div>
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
