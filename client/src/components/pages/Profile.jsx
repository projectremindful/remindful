import React, { Component } from "react";
import api from "../../api";
import {
  Button,
  CustomInput,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

// import the service file since we need it to send (and get) the data to(from) server
import Service from "../../service";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      username: "",
      email: "",
      profileUrl: "",
      preference: "",
      chosenMem: ""
    };
    this.service = new Service();
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handlePrefChange = this.handlePrefChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handlePrefChange(name) {
    this.setState(() => ({
      preference: `${name}`
    }));
  }

  // this method handles just the file upload
  handleFileUpload = e => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    // imgUrl => this name has to be the same as in the model since we pass
    uploadData.append("imgUrl", e.target.files[0]);
    this.service
      .handleUpload(uploadData)
      .then(response => {
        // console.log('response is: ', response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        this.setState({ profileUrl: response.secure_url });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  };

  // this method submits the form updating the users profile informaiton
  handleSubmit = e => {
    e.preventDefault();
    this.service
      .updateProfile(this.state)
      .then(res => {
        console.log("added: ", res);
        alert("Profile Picture successfully uploaded");
      })
      .catch(err => {
        console.log("Error while updating Profile Picture: ", err);
      });
  };

  handleClick() {
    var preferences = this.state.preference;
    api
      .getUserMemories()
      .then(memories => {
        var filteredMemories = memories.filter(memory => {
          return memory[preferences] && !memory.viewed;
        });
        var rand = Math.floor(Math.random() * filteredMemories.length);
        var chosenMem = filteredMemories[rand]._id;
        return (preferences = {
          username: this.state.username,
          email: this.state.email,
          profileUrl: this.state.profileUrl,
          preference: this.state.preference,
          chosenMem: chosenMem
        });
      })
      .then(preferences => {
        api.updateUserPreferences(this.state._id, preferences).then(res => {});
      });
  }

  render() {
    return this.state.username ? (
      // when user information has loaded render this
      <Container className="forms">
        <Row style={{ margin: "30px 0" }}>
          <Col xs="4">
            <img
              style={{ height: "100px" }}
              src={this.state.profileUrl}
              alt="profile pic"
            />
          </Col>
          <Col xs="8" align="left">
            <h4>{this.state.username}</h4>
            <p>{this.state.email}</p>
          </Col>
        </Row>
        <hr />
        <h4 className="p-2">Edit your Details</h4>
        <Form onSubmit={e => this.handleSubmit(e)}>
          <FormGroup row>
            <Label for="username" sm={2} size="sm">
              Username
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="Enter new Username"
                value={this.state.username}
                onChange={e => this.handleChange(e)}
                bsSize="sm"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="email" sm={2} size="sm">
              Email
            </Label>
            <Col sm={10}>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Enter new Email"
                value={this.state.email}
                onChange={e => this.handleChange(e)}
                bsSize="sm"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="profileUrl" sm={2} size="sm">
              Upload Profile Picture
            </Label>
            <Col sm={10}>
              <Input
                type="file"
                name="profileUrl"
                id="file"
                onChange={e => this.handleFileUpload(e)}
                bsSize="sm"
              />
            </Col>
          </FormGroup>
          <Button outline color="success" onClick={this.handleClick}>
            Submit Changes
          </Button>
        </Form>
        <hr />
        <h4 className="p-2">Your Memory Preferences</h4>
        <div>
          <CustomInput
            checked={this.state.preference === "reflection"}
            onChange={e => this.handlePrefChange("reflection")}
            type="switch"
            id="reflection"
            name="reflection"
            label="reflection"
          />
          <CustomInput
            checked={this.state.preference === "motivation"}
            onChange={e => this.handlePrefChange("motivation")}
            type="switch"
            id="motivation"
            name="motivation"
            label="motivation"
          />
          <CustomInput
            checked={this.state.preference === "nostalgia"}
            onChange={e => this.handlePrefChange("nostalgia")}
            type="switch"
            id="nostalgia"
            name="nostalgia"
            label="nostalgia"
          />
          <br />
          <Button outline color="success" onClick={this.handleClick}>
            Save
          </Button>
        </div>
      </Container>
    ) : (
      // if user information has not yet loaded render this
      <div>Loading</div>
    );
  }

  componentDidMount() {
    api.getProfile().then(user => {
      this.setState({
        _id: user._id,
        username: user.username,
        email: user.email,
        profileUrl: user.profileUrl,
        preference: user.preference
      });
    });
  }
}
