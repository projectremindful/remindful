import React, { Component } from 'react';
import api from '../../api';
import MemoryCard from '../MemoryCard';
import { Link } from 'react-router'
// import api from '../../api';

class MemoryGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memories: [],
      selectedMemoryId: null,
    };
  }
  selectMemoryCard(memoryId) {
    this.setState({
      selectedMemoryId: memoryId
    });
  }
  render() {
    return (

      <div>
        <h1 className="m-4">Memory Gallery</h1>
        <hr />
        selectedMemoryId = {this.state.selectedMemoryId}
        <hr />
        <div className="memoryGallery">
          {this.state.memories.map(memory => (
            <MemoryCard
              key={memory._id}
              isSelected={
                !this.state.selectedMemoryId ||
                this.state.selectedMemoryId === memory._id
              }
              memory={memory}
              onSelect={() => this.selectMemoryCard(memory._id)}
            />
          ))}
        </div>
      </div>
    );
  }
  componentDidMount() {
    api.getMemories().then(memories => {
      this.setState({ memories });
    });
  }
}

export default MemoryGallery;
