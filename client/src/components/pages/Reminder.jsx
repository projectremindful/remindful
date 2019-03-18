import React, { Component } from "react";
import api from "../../api";
import QuillTextBox from "../QuillTextBox";
import { Form, Button, Col, Row, Jumbotron } from "reactstrap";
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
      ownerId: null,
      nostalgia: false,
      motivation: false,
      reflection: false,
      showModal: false
    };
    this.changeText = this.changeText.bind(this);
    this.handleNotesClick = this.handleNotesClick.bind(this);
  }

  // handles changes to text in notes box
  changeText(newText) {
    this.setState({ notes: newText });
  }

  // on click updates and saves users notes for that memory
  handleNotesClick() {
    var updatedNotes = { updatedNotes: this.state.notes };
    api
      .updateMemory(this.state.memoryId, updatedNotes)
      .then(res => {
        console.log("memorynotes updated: ", res);
        // alert("Profile Picture successfully uploaded");
      })
      .catch(err => {
        console.log("Error while updating memory notes: ", err);
      });
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  render() {
    console.log(this.state.title);
    return this.state.title === "" ? (
      <Jumbotron style={{ height: "920px" }}>
        <Row style={{ margin: "0" }}>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <div
              style={{
                margin: "10px",
                padding: "100px"
              }}
            >
              <h1 className="">Whoops!</h1>
              <h4>
                You don't have a daily memory because you haven't saved any
                memories to your gallery yet!
              </h4>
              <br />
              <Link to="/add-memory">
                <div className="show-image">
                  <img
                    id="add mem"
                    src="/images/addmemory.png"
                    alt="add memory"
                    style={{
                      height: "380px"
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
          </Col>
        </Row>
      </Jumbotron>
    ) : (
      <div
        style={{
          margin: "0",
          padding: "0",
          backgroundColor: "white"
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
              <h2>
                <i>{this.state.title}</i>
              </h2>
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
            </Col>
          </Row>

          <Modal // show Quill box
            show={this.state.showModal}
            closeCallback={this.toggleModal}
          >
            <React.Fragment>
              <Form>
                <QuillTextBox
                  text={this.state.notes}
                  onChange={this.changeText}
                  className="modal-content"
                />
                <br />
                <Button onClick={this.handleNotesClick}>
                  Save your changes
                </Button>
                <br />
                {this.state.successMessage ? (
                  <div>
                    <p style={{ color: "#24f0a9" }}>
                      Your information has been successfully saved
                    </p>
                  </div>
                ) : (
                  " "
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
      this.setState({
        imgUrl: memory.imgUrl,
        date: memory.date,
        notes: memory.notes,
        title: memory.title,
        ownerId: memory._owner,
        nostalgia: memory.nostalgia,
        motivation: memory.motivation,
        reflection: memory.reflection
      });
    });
  }
}
