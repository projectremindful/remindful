import React, { Component } from "react";
import Service from "../service";
import Modal from './Modal.js';
import { Link } from 'react-router-dom';


export default class MemoryCard extends Component {
  constructor(props) {
    super(props);

    
    this.delete = this.delete.bind(this);
    this.service = new Service();
    this.state = {
      showModal: false
    };
  }
 
  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  delete() {
    this.service
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

        <h3>{this.props.memory.title}</h3>
       
        
        <div className="show-image">
      
          <img
            id="memImg"
            src={this.props.memory.imgUrl}
            onClick={this.toggleModal}
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
            <Modal
          show={this.state.showModal}
          closeCallback={this.toggleModal}
          customClass="custom_modal_class"
        >
        <React.Fragment>
          <img 
          src={this.props.memory.imgUrl} 
          alt="" 
          className="modal-content" />
          <Link variant="outline-info" to="/reminder/:id"
          >Set Reminder</Link>
       
        </React.Fragment>

      </Modal>
          
        

       
    
        {/* <!-- Modal -->
        <div
          className="modal fade"
          id="myModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>

                {/* <div id="myModal" className="modal">
        <span className="close">&times;</span>
        <img className="modal-content" id="img01" />
        <div id="caption"></div>
        </div>    */}
                {/* <pre>{JSON.stringify(this.props.memory, null, 2)}</pre> */}
              {/* </div>
            </div>
          </div>
        </div> */}
      </div>
    );
  }

}