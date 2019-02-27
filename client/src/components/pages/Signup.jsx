import React, { Component } from 'react';
import api from '../../api';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      name: "",
      password: "",
      message: null
    }
  }

  handleInputChange(stateFieldName, event) {
    this.setState({
      [stateFieldName]: event.target.value
    })
  }

  handleClick(e) {
    e.preventDefault()
    let data = {
      username: this.state.username,
      name: this.state.name,
      password: this.state.password,
    }
    api.signup(data)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  render() {
    return (
      <div className="forms">
        <h2>Signup</h2><br />
        <Form>
          <FormGroup row>
          <Label for="username" sm={2}>Username:</Label>
          <Col sm={10}>
          <Input type="text" name="username" id="username" placeholder="Your username" value={this.state.username} onChange={(e) => this.handleInputChange("username", e)} /> <br />
          </Col>
          </FormGroup>
          <FormGroup row>
          <Label for="email" sm={2}>Email:</Label>
          <Col sm={10}>
          <Input type="email" name="email" id="email" placeholder="Enter your email" value={this.state.email} onChange={(e) => this.handleInputChange("email", e)} /> <br />
          </Col>
          </FormGroup>
          <FormGroup row>
          <Label for="password" sm={2}>Password:</Label>
          <Col sm={10}>
          <Input type="password" name="password" id="password" placeholder="Choose a password" value={this.state.password} onChange={(e) => this.handleInputChange("password", e)} /> <br />
          </Col>
          </FormGroup>
          <Button outline color="info" onClick={(e) => this.handleClick(e)}>Signup</Button>
        </Form>
        {this.state.message && <div className="info info-danger">
          {this.state.message}
        </div>}
      </div>
    );
  }
}

export default Signup;
