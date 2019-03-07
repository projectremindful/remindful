import React, { Component } from 'react';
import api from '../api';
import QuillTextBox from '../components/QuillTextBox';
import { Form, Col, Row, Button } from 'reactstrap';
import Modal from './Modal.js';

export default class MemoryCard extends Component {
  constructor(props) {
    super(props);

    this.delete = this.delete.bind(this);
    this.state = {
      showModal: false,
      notes: '',
      date: '',
      title: ''
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
    console.log('notes from user', updatedNotes);
    api
      .updateMemory(this.state.memoryId, updatedNotes)
      .then(res => {
        console.log('memorynotes updated: ', res);
        // alert("Profile Picture successfully uploaded");
      })
      .catch(err => {
        console.log('Error while updating memory notes: ', err);
      });
    // console.log(this.state.notes);
  }

  handleViewClick() {
    this.setState(prevState => ({
      viewed: !prevState.viewed
    }));
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  delete() {
    api
      .delete(this.props.memory._id)
      .then(() => {
        console.log('Deleted');
        alert("Your memory was successfully deleted");
        window.location.reload();
      })
      .catch(err => console.log(err));
  }

  nextPath(path) {
    this.props.history.push(path);
  }

  render() {
    return (
      <div
        style={{
          margin: '10px'
        }}
      >
        <div className="show-image">
          <img
            id="memImg"
            src={this.props.memory.imgUrl}
            onClick={this.toggleModal}
            alt=""
            style={{
              height: '380px'
            }}
          />
          <input
            className="hovertitle"
            type="text"
            value={this.props.memory.title + ' - ' + this.props.memory.date}
            onClick={() => this.delete()}
          />
        </div>
        <Modal
          show={this.state.showModal}
          closeCallback={this.toggleModal}
          className=""
        >
          <React.Fragment>
            <Row style={{ margin: '0' }}>
              <Col sm="12" lg="8">
                <img
                  src={this.props.memory.imgUrl}
                  alt=""
                  className="modal-content"
                />
              </Col>
              <Col
                sm="12"
                lg="4"
                style={{ textAlign: 'center', lineHeight: '1.5' }}
              >
                <br />
                <h2>
                  <i>{this.state.title}</i>
                </h2>
                <p>
                  <i>{this.state.date}</i>
                </p>
                <Form>
                  <QuillTextBox
                    text={this.state.notes}
                    onChange={this.changeText}
                    className="quillmg"
                  />
                  <br />
                  <Button
                    style={{ backgroundColor: '#24f0a9', border: 'none' }}
                    onClick={this.handleNotesClick}
                  >
                    Add Notes
                  </Button>
                </Form>
              </Col>
            </Row>
            <br />
            <input
              className="delete"
              type="button"
              value="Delete"
              onClick={() => this.delete()}
            />
            {/* <Link variant="outline-info" to="/reminder/:id">
              Set Reminder
            </Link> */}
          </React.Fragment>
        </Modal>
      </div>
    );
  }
  componentDidMount() {
    console.log('Trying to get the memory', this.props.memory._id);
    api.getMemory(this.props.memory._id).then(memory => {
      console.log('memory is:   ', memory);
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
