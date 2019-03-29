import React, { Component } from 'react';
import api from '../../api';
import {
  Col,
  Button,
  Form,
  FormGroup,
  Container,
  Label,
  Input
} from 'reactstrap';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      message: null
    };
  }

  // changes to login input fields
  handleInputChange(stateFieldName, event) {
    this.setState({
      [stateFieldName]: event.target.value
    });
  }

  // login button click event
  handleClick(e) {
    e.preventDefault();
    api
      .login(this.state.username, this.state.password)
      .then(result => {
        this.props.dailyMemory();
        this.props.history.push("/memory-gallery"); // Redirect to memory gallery page
      })
      .catch(err => this.setState({ message: err.toString() }));
  }

  render() {
    return (
      <div
        style={{
          backgroundImage: 'linear-gradient(to bottom, #14343f, #3a8186 100vh)',
          height: '800px'
        }}
      >
        <Container className="forms">
          <div className="li-box">
            <h2 className="p-2">Login</h2>
            <Form onSubmit={e => this.handleSubmit(e)}>
              <FormGroup row>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={e => this.handleInputChange('username', e)}
                  />{' '}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    value={this.state.password}
                    onChange={e => this.handleInputChange('password', e)}
                  />{' '}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                  <Button
                    style={{
                      backgroundColor: '#24f0a9',
                      color: 'white',
                      border: 'white',
                      width: '275px'
                    }}
                    onClick={e => this.handleClick(e)}
                  >
                    Login
                  </Button>
                </Col>
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
