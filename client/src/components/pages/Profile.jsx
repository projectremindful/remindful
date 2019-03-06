import React, { Component } from 'react';
import api from '../../api';
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
} from 'reactstrap';

// import the service file since we need it to send (and get) the data to(from) server
import Service from '../../service';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      username: '',
      email: '',
      profileUrl: '',
      preference: '',
      chosenMemory: ''
    };
    this.service = new Service();
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handlePrefChange = this.handlePrefChange.bind(this);
    this.oldNumbers = [-1, -1, -1];
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
    console.log('The file to be uploaded is: ', e.target.files[0]);

    const uploadData = new FormData();
    // imgUrl => this name has to be the same as in the model since we pass
    uploadData.append('imgUrl', e.target.files[0]);
    this.service
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

  // this method submits the form updating the users profile informaiton
  handleSubmit = e => {
    e.preventDefault();
    this.service
      .updateProfile(this.state)
      .then(res => {
        console.log('added: ', res);
        alert('Profile Picture successfully uploaded');
      })
      .catch(err => {
        console.log('Error while updating Profile Picture: ', err);
      });
  };

  handleClick() {
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
        api.updateUserPreferences(this.state._id, preferences).then(res => {});
      });
  }

  render() {
    return true ? (
      // when user information has loaded render this
      <div>
        <div className="box-gallery">
          <div className="mosaic-images">
            <img className="child gray" src="./mosaic-images/IMG_2904.jpg" />
            <img className="child" src="./mosaic-images/IMG_2463.jpg" />
            <img className="child gray" src="./mosaic-images/IMG_1869.jpg" />
            <img className="child gray" src="./mosaic-images/IMG_2616.jpg" />
            <img className="child" src="./mosaic-images/IMG_1675.jpg" />
            <img className="child gray" src="./mosaic-images/IMG_1882.jpg" />
            <img className="child gray" src="./mosaic-images/IMG_1732.jpg" />
            <img className="child gray" src="./mosaic-images/IMG_1698.jpg" />
            <img className="child gray" src="./mosaic-images/IMG_1871.jpg" />
            <img className="child gray" src="./mosaic-images/IMG_1663.jpg" />
            <img className="child" src="./mosaic-images/IMG_3045.jpg" />
            <img className="child gray" src="./mosaic-images/IMG_2728.jpg" />
          </div>
        </div>
        <Container className="forms">
          <div className="profilebox">
            <h4 className="p-2">Profile Preferences</h4>
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
              <br />
              <FormGroup row className="preferences">
                <Col sm={10}>
                  <Label>
                    What would you like to get out of using Remindful?
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
                    checked={this.state.preference === 'motivation'}
                    onChange={e => this.handlePrefChange('motivation')}
                    type="switch"
                    id="motivation"
                    name="motivation"
                    label="For motivation"
                  />
                  <CustomInput
                    checked={this.state.preference === 'nostalgia'}
                    onChange={e => this.handlePrefChange('nostalgia')}
                    type="switch"
                    id="nostalgia"
                    name="nostalgia"
                    label="To enjoy happy memories"
                  />
                </Col>
              </FormGroup>
              <br />
              <p>
                These preferences will determine what memories you are reminded
                of
              </p>
              <Button
                style={{
                  backgroundColor: '#24f0a9',
                  color: 'white',
                  border: 'white'
                }}
                onClick={this.handleClick}
              >
                Submit Changes
              </Button>
            </Form>
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
        preference: user.preference
      });
    });
    var bgImages = document.querySelectorAll('.mosaic-images img');
    function setAllToGrayScale() {
      for (var i = 0; i < bgImages.length; i++) {
        // bgImages[i].style.filter = 'grayscale(100%)';
        // bgImages[i].style.filter = 'brightness(50%)';
        bgImages[i].classList.add('gray');
      }
    }
    var that = this;
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

      var randomImage = bgImages[randomNumber];

      var randomImage2 = bgImages[randomNumber2];

      var randomImage3 = bgImages[randomNumber3];

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

// 0123 1230
// 3012 3012
// 1230 0123
