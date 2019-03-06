import React, { Component } from "react";
import Modal from "./Modal.js";
import { Link } from "react-router-dom";
import api from "../api";

export default class MemoryCard extends Component {
  constructor(props) {
    super(props);

    this.delete = this.delete.bind(this);
    this.state = {
      showModal: false
    };
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  delete() {
    api
      .delete(this.props.memory._id)
      .then(console.log("Deleted"))
      .catch(err => console.log(err));
  }

  nextPath(path) {
    this.props.history.push(path);
  }

  render() {
    return (
      <div
        style={{
          // border: "2px solid black",
          // opacity: this.props.isSelected ? 1 : 0.5,
          margin: "10px"
        }}
        onClick={this.props.onSelect}
      >
        <div className="show-image">
          <img
            id="memImg"
            src={this.props.memory.imgUrl}
            onClick={this.toggleModal}
            alt=""
            style={{
              height: "380px"
            }}
          />
          <input
            className="hovertitle"
            type="text"
            value={this.props.memory.title + " - " + this.props.memory.date}
            onClick={() => this.delete()}
          />
        </div>
        <Modal
          show={this.state.showModal}
          closeCallback={this.toggleModal}
          customClass="custom_modal_class"
        >
          <React.Fragment>
            <img
              src={this.props.memory.imgUrl}
              alt=""
              className="modal-content"
            />
            <input
              className="delete"
              type="button"
              value="Delete"
              onClick={() => this.delete()}
            />
            <Link variant="outline-info" to="/reminder/:id">
              Set Reminder
            </Link>
          </React.Fragment>
        </Modal>
      </div>
    );
  }
}
