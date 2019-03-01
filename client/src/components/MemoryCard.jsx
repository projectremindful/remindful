import React, { Component } from 'react';

export default class MemoryCard extends Component {
  render() {
    return (
      <div
        style={{
          border: '2px solid black',
          opacity: this.props.isSelected ? 1 : 0.5
        }}
        onClick={this.props.onSelect}
      >
        <h3>MemoryCard</h3>
        <img src={this.props.memory.imgUrl} alt="" />
        <pre>{JSON.stringify(this.props.memory, null, 2)}</pre>
      </div>
    );
  }
}
