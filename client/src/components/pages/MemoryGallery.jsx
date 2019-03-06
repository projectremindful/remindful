import React, { Component } from "react";
import api from "../../api";
import MemoryCard from "../MemoryCard";

class MemoryGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memories: [],
      selectedMemoryId: null
    };
  }
  selectMemoryCard(memoryId) {
    this.setState({
      selectedMemoryId: memoryId
    });
  }
  render() {
    return this.state.memories.length > 0 ? (
      <div className="memoryGallery">
        {this.state.memories.map(memory => (
          <MemoryCard
            isSelected={
              !this.state.selectedMemoryId ||
              this.state.selectedMemoryId === memory._id
            }
            memory={memory}
            onSelect={() => this.selectMemoryCard(memory._id)}
          />
        ))}
      </div>
    ) : (
      <div style={{ padding: "100px" }}>
        You don't have any memories uploaded yet!
      </div>
    );
  }
  componentDidMount() {
    api.getUserMemories().then(memories => {
      this.setState({ memories });
    });
  }
}

export default MemoryGallery;
