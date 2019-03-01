import React, { Component } from 'react';
import api from '../../api';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
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
    api.login(this.state.username, this.state.password)
      .then(result => {
        console.log('LOGIN SUCCESS!', result)
        this.props.history.push("/all-memories") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  render() {
    return (
      <div className="forms">
        <h2>Login</h2><br />
        <Form>
          <FormGroup row>
          <Label for="username" sm={2}>Username:</Label>
          <Col sm={10}>
          <Input type="text" name="username" id="username" placeholder="Your username" value={this.state.username} onChange={(e) => this.handleInputChange("username", e)} /> <br />
          </Col>
          </FormGroup>
          <FormGroup row>
          <Label for="password" sm={2}>Password:</Label> 
          <Col sm={10}>
          <Input type="password" name="password" id="password" placeholder="Enter your password" value={this.state.password} onChange={(e) => this.handleInputChange("password", e)} /> <br />
          </Col>
          </FormGroup>
          <Button outline color="info" onClick={(e) => this.handleClick(e)}>Login</Button>
        </Form>
        {this.state.message && <div className="info info-danger">
          {this.state.message}
        </div>}
      </div>
    );
  }
}

export default Login;
