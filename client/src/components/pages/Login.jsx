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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      message: null
    };
  }

  handleInputChange(stateFieldName, event) {
    this.setState({
      [stateFieldName]: event.target.value
    });
  }

  handleClick(e) {
    e.preventDefault();
    api
      .login(this.state.username, this.state.password)
      .then(result => {
        console.log("LOGIN SUCCESS!", result);
        // this.props.newUser(result.chosenMemory);
        this.props.testProp("test from Login");
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
          <div className="li-box">
            <h4 className="p-2">Login</h4>
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
                    placeholder="Your username"
                    value={this.state.username}
                    onChange={e => this.handleInputChange("username", e)}
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
                <Form style={{ width: "100%" }}>
                  <Button
                    style={{
                      backgroundColor: "#24f0a9",
                      color: "white",
                      border: "white"
                    }}
                    onClick={e => this.handleClick(e)}
                  >
                    Login
                  </Button>
                </Form>
              </FormGroup>
            </Form>
          </div>
        </Container>
        {this.state.message && (
          <div className="info info-danger">{this.state.message}</div>
        )}
      </div>
    );
  }
}

export default Login;
