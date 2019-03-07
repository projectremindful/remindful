import React, { Component } from 'react';
import api from '../../api';
import {
  Button,
  CustomInput,
  Container,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      username: '',
      email: '',
      profileUrl: '',
      preference: 'none',
      chosenMemory: null,
      requiredFields: false,
      successMessage: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handlePrefChange = this.handlePrefChange.bind(this);
    this.oldNumbers = [-1, -1, -1];
    this.bgImages = [];
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      successMessage: false
    });
  }

  handlePrefChange(name) {
    console.log(typeof this.state.preference);
    this.setState(() => ({
      preference: `${name}`,
      successMessage: false
    }));
  }

  // this method handles just the file upload
  handleFileUpload = e => {
    console.log('The file to be uploaded is: ', e.target.files[0]);

    const uploadData = new FormData();
    // imgUrl => this name has to be the same as in the model since we pass
    uploadData.append('imgUrl', e.target.files[0]);
    api
      .handleUpload(uploadData)
      .then(response => {
        // console.log('response is: ', response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        this.setState({ profileUrl: response.secure_url });
      })
      .catch(err => {
        console.log('Error while uploading the file: ', err);
      });
  };

  handleClick() {
    console.log(
      'in the handleclick ',
      this.state.username.length,
      this.state.preference
    );
    if (
      this.state.username.length > 1 &&
      this.state.preference.length > 4 &&
      this.state.email.includes('@')
    ) {
      console.log('in the if block');
      var preferences = {
        username: this.state.username,
        email: this.state.email,
        profileUrl: this.state.profileUrl,
        preference: this.state.preference,
        chosenMemory: null
      };
      api
        .getUserMemories()
        .then(memories => {
          console.log('in the first .then');
          if (memories.length === 0) return preferences;
          var filteredMemories = memories.filter(memory => {
            return memory[preferences.preference] && !memory.viewed;
          });
          if (filteredMemories.length === 0) return preferences;
          var rand = Math.floor(Math.random() * filteredMemories.length);
          var chosenMemory = filteredMemories[rand]._id;
          return (preferences = {
            username: this.state.username,
            email: this.state.email,
            profileUrl: this.state.profileUrl,
            preference: this.state.preference,
            chosenMemory: chosenMemory
          });
        })
        .then(preferences => {
          api.updateUserPreferences(preferences).then(res => {
            console.log('in the .then after saving', this.props.history);
            this.setState({
              requiredFields: false,
              successMessage: true
            });
          });
        });
    } else {
      console.log('in the else statement');
      this.setState(prevState => ({
        requiredFields: !prevState.requiredFields
      }));
    }
  }

  render() {
    return this.state._id ? (
      // when user information has loaded render this
      <div>
        <div className="box-gallery">
          <div className="mosaic-images">
            <img
              className="child gray"
              alt="profilebackground"
              src="./mosaic-images/IMG_2904.jpg"
            />
            <img
              className="child"
              alt="profilebackground"
              src="./mosaic-images/IMG_2463.jpg"
            />
            <img
              className="child gray"
              alt="profilebackground"
              src="./mosaic-images/IMG_1869.jpg"
            />
            <img
              className="child gray"
              alt="profilebackground"
              src="./mosaic-images/IMG_2616.jpg"
            />
            <img
              className="child"
              alt="profilebackground"
              src="./mosaic-images/IMG_1675.jpg"
            />
            <img
              className="child gray"
              alt="profilebackground"
              src="./mosaic-images/IMG_1882.jpg"
            />
            <img
              className="child gray"
              alt="profilebackground"
              src="./mosaic-images/IMG_1732.jpg"
            />
            <img
              className="child gray"
              alt="profilebackground"
              src="./mosaic-images/IMG_1698.jpg"
            />
            <img
              className="child gray"
              alt="profilebackground"
              src="./mosaic-images/IMG_1871.jpg"
            />
            <img
              className="child gray"
              alt="profilebackground"
              src="./mosaic-images/IMG_1663.jpg"
            />
            <img
              className="child"
              alt="profilebackground"
              src="./mosaic-images/IMG_3045.jpg"
            />
            <img
              className="child gray"
              alt="profilebackground"
              src="./mosaic-images/IMG_2728.jpg"
            />
          </div>
        </div>
        <Container className="forms">
          <div className="profilebox">
            <h4 className="p-2">Profile Preferences</h4>
            {this.state.requiredFields ? (
              <p style={{ color: 'red' }}>Please fill out required fields</p>
            ) : (
              ' '
            )}
            <Form onSubmit={e => this.handleSubmit(e)}>
              <FormFeedback valid={this.state.successMessage}>
                Your
              </FormFeedback>
              <FormGroup row>
                <Label for="username" sm={2} size="sm">
                  Username
                  {this.state.requiredFields ? (
                    <span style={{ color: 'red' }}>*</span>
                  ) : (
                    ' '
                  )}
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
                  {this.state.requiredFields ? (
                    <span style={{ color: 'red' }}>*</span>
                  ) : (
                    ' '
                  )}
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
              <br />
              <FormGroup row className="preferences">
                <Col sm={10}>
                  <Label>
                    What would you like to get out of using Remindful?
                    {this.state.requiredFields ? (
                      <span style={{ color: 'red' }}>*</span>
                    ) : (
                      ' '
                    )}
                  </Label>
                  <CustomInput
                    checked={this.state.preference === 'reflection'}
                    onChange={e => this.handlePrefChange('reflection')}
                    type="switch"
                    id="reflection"
                    name="reflection"
                    label="To gain insight from my experiences"
                  />
                  <CustomInput
                    checked={this.state.preference === 'nostalgia'}
                    onChange={e => this.handlePrefChange('nostalgia')}
                    type="switch"
                    id="nostalgia"
                    name="nostalgia"
                    label="To enjoy happy memories"
                  />
                  <CustomInput
                    checked={this.state.preference === 'motivation'}
                    onChange={e => this.handlePrefChange('motivation')}
                    type="switch"
                    id="motivation"
                    name="motivation"
                    label="For motivation"
                  />
                </Col>
              </FormGroup>
              <p>
                These preferences will determine what memories you are reminded
                of
              </p>
              <br />
              <Button
                style={{
                  backgroundColor: '#24f0a9',
                  color: 'white',
                  border: 'white'
                }}
                onClick={this.handleClick}
              >
                Save Changes
              </Button>
            </Form>
            <br />
            {this.state.successMessage ? (
              <div>
                <p style={{ color: '#24f0a9' }}>
                  Your information has been successfully saved
                </p>
                {/* <Link to="/reminder/:id">Set Reminder</Link> */}
              </div>
            ) : (
              ' '
            )}
            {/* <Link to={`/reminder/${this.state.chosenMemory}`}>
              Reflection view for users chosen memory
            </Link> */}
          </div>
        </Container>
      </div>
    ) : (
      // if user information has not yet loaded render this
      <div>Loading</div>
    );
  }

  // 3 random mosaic images light up every 4 seconds
  componentDidMount() {
    api.getProfile().then(user => {
      this.setState({
        _id: user._id,
        username: user.username,
        email: user.email,
        profileUrl: user.profileUrl,
        preference: user.preference,
        chosenMemory: user.chosenMemory
      });
    });

    setTimeout(() => {
      this.bgImages = document.querySelectorAll('.mosaic-images img');
    }, 100);

    //const bgImages = document.querySelectorAll('.mosaic-images img');
    var that = this;
    function setAllToGrayScale() {
      for (var i = 0; i < that.bgImages.length; i++) {
        // this.bgImages[i].style.filter = 'grayscale(100%)';
        // this.bgImages[i].style.filter = 'brightness(50%)';
        that.bgImages[i].classList.add('gray');
      }
    }

    setInterval(function() {
      setAllToGrayScale();

      const randomNum = (max, min, except, except2, except3) => {
        let num = Math.floor(Math.random() * (max - min)) + min;
        return num === except || num === except2 || num === except3
          ? randomNum(max, min, except, except2, except3)
          : num;
      };

      const randomNumber = randomNum(0, 4, -1, -2, that.oldNumbers[0]);

      const randomNumber2 = randomNum(
        4,
        8,
        randomNumber + 4,
        -3,
        that.oldNumbers[1]
      );

      // random generated number between 8 and 12, except from aligning items over and the old number
      const randomNumber3 = randomNum(
        8,
        12,
        randomNumber + 4,
        randomNumber2 + 4,
        that.oldNumbers[2]
      );

      that.oldNumbers = [randomNumber, randomNumber2, randomNumber3];

      var randomImage = that.bgImages[randomNumber];

      var randomImage2 = that.bgImages[randomNumber2];

      var randomImage3 = that.bgImages[randomNumber3];

      //console.log(randomImage);
      randomImage.classList.remove('gray');
      randomImage.style.opacity = 1;
      randomImage2.classList.remove('gray');
      randomImage2.style.opacity = 1;
      randomImage3.classList.remove('gray');
      randomImage3.style.opacity = 1;
    }, 4000);
  }
}
