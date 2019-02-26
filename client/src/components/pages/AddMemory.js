import React, { Component } from "react";

// import the service file since we need it to send (and get) the data to(from) server
import Service from '../../service';

class AddMemory extends Component {
    constructor(props) {
        super(props);
        this.state = {
          title: "",
          notes: "",
          imageUrl: ""
        };
        this.service = new Service();
    }
    
    handleChange = e => {  
        const { title, value } = e.target;
        this.setState({ [title]: value });
    }

    // this method handles just the file upload
    handleFileUpload = e => {
        console.log("The file to be uploaded is: ", e.target.files[0]);

        const uploadData = new FormData();
        // imageUrl => this name has to be the same as in the model since we pass
        // req.body to .create() method when creating a new memory in '/api/memories/create' POST route
        uploadData.append("imageUrl", e.target.files[0]);
        this.service.handleUpload(uploadData)
        .then(response => {
            // console.log('response is: ', response);
            // after the console.log we can see that response carries 'secure_url' which we can use to update the state 
            this.setState({ imageUrl: response.secure_url });
          })
          .catch(err => {
            console.log("Error while uploading the file: ", err);
          });
    }

    // this method submits the form
    handleSubmit = e => {
        e.preventDefault();
        this.service.saveNewMemory(this.state)
        .then(res => {
            console.log('added: ', res);
            // here you would redirect to some other page 
        })
        .catch(err => {
            console.log("Error while adding the memory: ", err);
        });
    }  
    
    render() {
        return (
          <div>
            <h2>New Memory</h2>
            <form onSubmit={e => this.handleSubmit(e)}>
                <label>Title</label>
                <input 
                    type="text" 
                    name="title" 
                    value={ this.state.title } 
                    onChange={ e => this.handleChange(e)} />
                <label>Notes</label>
                <textarea 
                    type="text" 
                    name="notes" 
                    value={ this.state.notes } 
                    onChange={ e => this.handleChange(e)} />
                <input 
                    type="file" 
                    onChange={(e) => this.handleFileUpload(e)} /> 
                <button type="submit">Save new memory</button>
            </form>
          </div>
        );
    }
}

export default AddMemory;