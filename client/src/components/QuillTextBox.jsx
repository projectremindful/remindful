import React, { Component } from "react";
import ReactQuill from "react-quill";

class QuillTextBox extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const newText = e;
    this.props.onChange(newText);
  }

  render() {
    return (
      <div>
        <ReactQuill
          value={this.props.text}
          onChange={e => this.handleChange(e)}
        />
      </div>
    );
  }
}

export default QuillTextBox;
