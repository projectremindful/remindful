import React, { Component } from "react";
// import ReactDOM from 'react-dom';
import $ from "jquery";
import {
  Col,
  CustomInput,
  Button,
  FormFeedback,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

// import the service file since we need it to send (and get) the data to(from) server
import api from "../../api";

class AddMemory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      date: "",
      notes: "",
      reflection: false,
      motivation: false,
      nostalgia: false,
      viewed: false,
      imgUrl: "",
      _owner: ""
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handlePrefChange(name) {
    this.setState(prevState => ({
      [name]: !prevState[name]
    }));
  }

  // this method handles just the file upload
  handleFileUpload = e => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    // imgUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new memory in '/api/memories/create' POST route
    uploadData.append("imgUrl", e.target.files[0]);
    api
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
    api
      .saveNewMemory(this.state)
      .then(res => {
        console.log("added: ", res);
        setTimeout(function() {
          alert("Image successfully uploaded");
          this.props.history.push("/memory-gallery");
        }.bind(this), 2000);
      })
      .catch(err => {
        console.log("Error while adding the memory: ", err);
      });
  };

  test = () => {
    console.log('Test executed');
    var current_progress = 0;
    var interval = setInterval(function() {
      current_progress += 10;
      $("#dynamic")
        .css("width", current_progress + "%")
        .attr("aria-valuenow", current_progress)
        .text(current_progress + "% uploaded");
      if (current_progress >= 100) clearInterval(interval);
    }, 100);
  };

  render() {
    console.log(this.state.reflection);
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
                invalid={false}
              />
              <FormFeedback invalid>
                Please give your memory a title
              </FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="title" sm={2} className="pr-4">
              Date
            </Label>
            <Col sm={10}>
              <Input
                className="p-2"
                type="text"
                name="date"
                placeholder="Ex. February 2019"
                value={this.state.date}
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
                placeholder="Add what you'd like to reflect on in this memory, note you thoughts or memories."
                value={this.state.notes}
                onChange={e => this.handleChange(e)}
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="tag" sm={2} className="pr-4">
              tag
            </Label>

            <Col sm={10}>
              <CustomInput
                checked={this.state.reflection}
                onChange={e => this.handlePrefChange("reflection")}
                type="switch"
                id="reflection"
                name="reflection"
                label="reflection"
              />
              <CustomInput
                checked={this.state.nostalgia}
                onChange={e => this.handlePrefChange("nostalgia")}
                type="switch"
                id="nostalgia"
                name="nostalgia"
                label="nostalgia"
              />
              <CustomInput
                checked={this.state.motivation}
                onChange={e => this.handlePrefChange("motivation")}
                type="switch"
                id="motivation"
                name="motivation"
                label="motivation"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={10}>
              <Input type="file" onChange={e => this.handleFileUpload(e)} />
            </Col>
          </FormGroup>
          <Button outline color="info" type="submit" onClick={() => this.test()}>
            Save new memory
          </Button>
          <div className="progress" id="target">
            <div
              id="dynamic"
              className="progress-bar progress-bar-info progress-bar-striped active"
              role="progressbar"
              aria-valuenow="0"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{width: '0%'}}
            >
              <span id="current-progress" />
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

export default AddMemory;
