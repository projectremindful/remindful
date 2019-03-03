import React, { Component } from "react";
import Service from "../service";

export default class MemoryCard extends Component {
  constructor(props) {
    super(props);

    this.delete = this.delete.bind(this);
    this.service = new Service();
  }
  delete() {
    this.service
      .delete(this.props.memory._id)
      .then(console.log("Deleted"))
      .catch(err => console.log(err));
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
        <h3>{this.props.memory.title}</h3>
        <div className="show-image">
          <img
            src={this.props.memory.imgUrl}
            alt=""
            style={{
              height: "250px"
            }}
          />
          <input
            className="delete"
            type="button"
            value="Delete"
            onClick={() => this.delete()}
          />
        </div>
        {/* <pre>{JSON.stringify(this.props.memory, null, 2)}</pre> */}
      </div>
    );
  }
}
