import React, { Component } from "react";
import api from "../../api";
import {
  Col,
  Button,
  Form,
  FormGroup,
  Container,
  Label,
  Input
} from "reactstrap";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      name: "",
      password: "",
      message: null,
      email: ""
    };
  }

  //--METHODS FOR RGISTERING SERVICE WORKER AND ALLOWING NOTIFICATIONS-----
  // checks that there is a service worker and push API, logs an error if not
  check = () => {
    if (!("serviceWorker" in navigator)) {
      throw new Error("No Service Worker support!");
    }
    if (!("PushManager" in window)) {
      throw new Error("No Push API Support!");
    }
  };

  // registers service.js as our service worker
  registerServiceWorker = async () => {
    console.log("registering service worker");
    const swRegistration = await navigator.serviceWorker.register("service.js");
    return swRegistration;
  };

  // sends a pop up message asking the user to allow notifications
  requestNotificationPermission = async () => {
    console.log("requesting permission to send notifications");
    const permission = await window.Notification.requestPermission();
    // value of permission from the user can be 'granted', 'default', 'denied'
    if (permission !== "granted") {
      throw new Error("Permission not granted for Notification");
    }
    console.log("permission status is", permission);
  };

  // function to call the above three methods on button click by the user
  main = async () => {
    console.log("main() called on button click");
    this.check();
    await this.requestNotificationPermission();
    await this.registerServiceWorker();
  };

  //------METHODS FOR SIGNUP------
  handleInputChange(stateFieldName, event) {
    this.setState({
      [stateFieldName]: event.target.value
    });
  }

  handleClick(e) {
    e.preventDefault();
    let data = {
      username: this.state.username,
      name: this.state.name,
      password: this.state.password,
      email: this.state.email
    };
    api
      .signup(data)
      .then(result => {
        console.log("SIGNUP SUCCESS!");
        // running main() only after user is logged in
        this.main();
        this.props.history.push("/memory-gallery"); // Redirect to memory gallery page
      })
      .catch(err => this.setState({ message: err.toString() }));
  }

  render() {
    return (
      <div
        style={{
          backgroundImage: "linear-gradient(to bottom, #14343f, #3a8186 100vh)",
          height: "800px"
        }}
      >
        <Container className="forms">
          <Form className="sl-box">
            <h4 className="p-2">Signup</h4>
            <div onSubmit={e => this.handleSubmit(e)}>
              <FormGroup row>
                <Label for="username" sm={2} size="sm">
                  Username
                </Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Your username"
                    value={this.state.username}
                    onChange={e => this.handleInputChange("username", e)}
                  />{" "}
                  <br />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="email" sm={2} size="sm">
                  Email
                </Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    value={this.state.email}
                    onChange={e => this.handleInputChange("email", e)}
                  />{" "}
                  <br />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="password" sm={2} size="sm">
                  Password
                </Label>
                <Col sm={10}>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    value={this.state.password}
                    onChange={e => this.handleInputChange("password", e)}
                  />{" "}
                  <br />
                </Col>
                <div style={{ width: "100%" }}>
                  <Button
                    style={{
                      backgroundColor: "#24f0a9",
                      color: "white",
                      border: "white"
                    }}
                    onClick={e => this.handleClick(e)}
                  >
                    Signup
                  </Button>
                </div>
              </FormGroup>
            </div>
          </Form>
        </Container>
        {this.state.message && (
          <div className="info info-danger">{this.state.message}</div>
        )}
      </div>
    );
  }
}

export default Signup;
