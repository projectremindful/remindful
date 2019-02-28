import React, { Component } from "react";
import { Col, Button, Form, FormGroup, Label, Input } from "reactstrap";

// import the service file since we need it to send (and get) the data to(from) server
import Service from "../../service";

class AddMemory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      notes: "",
      imgUrl: ""
    };
    this.service = new Service();
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  // this method handles just the file upload
  handleFileUpload = e => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    // imgUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new memory in '/api/memories/create' POST route
    uploadData.append("imgUrl", e.target.files[0]);
    this.service
      .handleUpload(uploadData)
      .then(response => {
        // console.log('response is: ', response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        this.setState({ imgUrl: response.secure_url });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  };

  // this method submits the form
  handleSubmit = e => {
    e.preventDefault();
    this.service
      .saveNewMemory(this.state)
      .then(res => {
        console.log("added: ", res);
        alert("Image successfully uploaded");
      })
      .catch(err => {
        console.log("Error while adding the memory: ", err);
      });
  };

  render() {
    return (
      <div className="forms">
        <h2 className="pb-4">New Memory</h2>
        <Form onSubmit={e => this.handleSubmit(e)}>
          <FormGroup row>
            <Label for="title" sm={2} className="pr-4">
              Title
            </Label>
            <Col sm={10}>
              <Input
                className="p-2"
                type="text"
                name="title"
                placeholder="Memory Title"
                value={this.state.title}
                onChange={e => this.handleChange(e)}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="notes" sm={2} className="pr-4">
              Notes
            </Label>
            <Col sm={10}>
              <Input
                className="p-2"
                type="textarea"
                name="notes"
                value={this.state.notes}
                onChange={e => this.handleChange(e)}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={10}>
              <Input type="file" onChange={e => this.handleFileUpload(e)} />
            </Col>
          </FormGroup>
          <Button outline color="info" type="submit">
            Save new memory
          </Button>
        </Form>
      </div>
    );
  }
}

export default AddMemory;
