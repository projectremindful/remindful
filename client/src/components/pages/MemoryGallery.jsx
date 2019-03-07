import React, { Component } from "react";
import api from "../../api";
import MemoryCard from "../MemoryCard";
import { Link } from "react-router-dom";

class MemoryGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memories: [],
      selectedMemoryId: null,
      isMounted: false
    };
  }
  selectMemoryCard(memoryId) {
    this.setState({
      selectedMemoryId: memoryId
    });
  }

  handleClick() {
    console.log("clicked");
  }

  render() {
    return !this.state.isMounted
    ? ( <div>is not mounted</div>)
    : (this.state.memories.length > 0)
      ?(<div className="memoryGallery"> 
          {this.state.memories.map((memory, i) => (
              <MemoryCard
                isSelected={
                  !this.state.selectedMemoryId ||
                  this.state.selectedMemoryId === memory._id
                }
                memory={memory}
                onSelect={() => this.selectMemoryCard(memory._id)}
                key={i}
              />
          ))}
        </div>)
      :(<div style={{ padding: "100px" }}>
          Loading...
          <div style={{ margin: "10px" }}>
            <h4> It looks like you don't have any memories saved to your gallery yet!</h4>
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
      </div>)
  }

  componentDidMount() {
    api.getUserMemories().then(memories => {
      this.setState({
        memories: memories,
        isloading: false,
        isMounted: true
      });
    });
  }
}

export default MemoryGallery;
