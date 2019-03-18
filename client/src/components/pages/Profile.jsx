import React, { Component } from "react";
import api from "../../api";
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
} from "reactstrap";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      username: "",
      email: "",
      profileUrl: "",
      preference: "none",
      requiredFields: false,
      successMessage: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handlePrefChange = this.handlePrefChange.bind(this);
    this.oldNumbers = [-1, -1, -1];
    this.bgImages = [];
  }

  // changes to users information
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      successMessage: false
    });
  }

  // changes to users preferences
  handlePrefChange(name) {
    console.log(typeof this.state.preference);
    this.setState(() => ({
      preference: `${name}`,
      successMessage: false
    }));
  }

  //  on "save changes" button click validates input and sends update information to API
  // provides feedback on required fields
  handleClick() {
    if (
      this.state.username.length > 1 &&
      this.state.preference.length > 4 &&
      this.state.email.includes("@")
    ) {
      var preferences = {
        username: this.state.username,
        email: this.state.email,
        profileUrl: this.state.profileUrl,
        preference: this.state.preference
      };
      api.updateUserPreferences(preferences).then(res => {
        this.props.dailyMemory();
        this.setState({
          requiredFields: false,
          successMessage: true
        });
      });
    } else {
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
              src="./mosaic-images/IMG_2904_copy.jpg"
            />
            <img
              className="child"
              alt="profilebackground"
              src="./mosaic-images/IMG_2463_copy.jpg"
            />
            <img
              className="child gray"
              alt="profilebackground"
              src="./mosaic-images/IMG_1869_copy.jpg"
            />
            <img
              className="child gray"
              alt="profilebackground"
              src="./mosaic-images/IMG_2616_copy.jpg"
            />
            <img
              className="child"
              alt="profilebackground"
              src="./mosaic-images/IMG_1675_copy.jpg"
            />
            <img
              className="child gray"
              alt="profilebackground"
              src="./mosaic-images/IMG_1882_copy.jpg"
            />
            <img
              className="child gray"
              alt="profilebackground"
              src="./mosaic-images/IMG_1732_copy.jpg"
            />
            <img
              className="child"
              alt="profilebackground"
              src="./mosaic-images/IMG_1698_copy.jpg"
            />
            <img
              className="child gray"
              alt="profilebackground"
              src="./mosaic-images/IMG_1871_copy.jpg"
            />
            <img
              className="child gray"
              alt="profilebackground"
              src="./mosaic-images/IMG_1663_copy.jpg"
            />
            <img
              className="child"
              alt="profilebackground"
              src="./mosaic-images/IMG_3045_copy.jpg"
            />
            <img
              className="child gray"
              alt="profilebackground"
              src="./mosaic-images/IMG_2728_copy.jpg"
            />
            <img
              className="child gray smaller"
              alt="profilebackground"
              src="./mosaic-images/IMG_4183_copy.jpg"
            />
            <img
              className="child gray smaller"
              alt="profilebackground"
              src="./mosaic-images/IMG_4287_copy.jpg"
            />
            <img
              className="child smaller"
              alt="profilebackground"
              src="./mosaic-images/IMG_4321_copy.jpg"
            />
            <img
              className="child gray smaller"
              alt="profilebackground"
              src="./mosaic-images/IMG_4352_copy.jpg"
            />
            <img
              className="child gray smaller"
              alt="profilebackground"
              src="./mosaic-images/IMG_4720_copy.jpg"
            />
            <img
              className="child gray smaller"
              alt="profilebackground"
              src="./mosaic-images/IMG_4759_copy.jpg"
            />
            <img
              className="child smaller"
              alt="profilebackground"
              src="./mosaic-images/IMG_4904_copy.jpg"
            />
            <img
              className="child gray smaller"
              alt="profilebackground"
              src="./mosaic-images/IMG_E4392_copy.jpg"
            />
          </div>
        </div>
        <Container className="forms">
          <div className="profilebox">
            <h4 className="p-2">Profile Preferences</h4>
            {this.state.requiredFields ? (
              <p style={{ color: "red" }}>Please fill out required fields</p>
            ) : (
              " "
            )}
            <Form onSubmit={e => this.handleSubmit(e)}>
              <FormFeedback valid={this.state.successMessage} />
              <FormGroup row>
                <Label for="username" sm={2} size="sm">
                  Username
                  {this.state.requiredFields ? (
                    <span style={{ color: "red" }}>*</span>
                  ) : (
                    " "
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
                    <span style={{ color: "red" }}>*</span>
                  ) : (
                    " "
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
                      <span style={{ color: "red" }}>*</span>
                    ) : (
                      " "
                    )}
                  </Label>
                  <CustomInput
                    checked={this.state.preference === "reflection"}
                    onChange={e => this.handlePrefChange("reflection")}
                    type="switch"
                    id="reflection"
                    name="reflection"
                    label="To gain insight from my experiences"
                  />
                  <CustomInput
                    checked={this.state.preference === "nostalgia"}
                    onChange={e => this.handlePrefChange("nostalgia")}
                    type="switch"
                    id="nostalgia"
                    name="nostalgia"
                    label="To enjoy happy memories"
                  />
                  <CustomInput
                    checked={this.state.preference === "motivation"}
                    onChange={e => this.handlePrefChange("motivation")}
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
                  backgroundColor: "#24f0a9",
                  color: "white",
                  border: "white"
                }}
                onClick={this.handleClick}
              >
                Save Changes
              </Button>
            </Form>
            <br />
            {this.state.successMessage ? (
              <div>
                <p style={{ color: "#24f0a9" }}>
                  Your information has been successfully saved
                </p>
              </div>
            ) : (
              " "
            )}
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

    setTimeout(() => {
      this.bgImages = document.querySelectorAll(".mosaic-images img");
    }, 100);

    var that = this;

    function setAllToGrayScale() {
      for (var i = 0; i < that.bgImages.length; i++) {
        // this.bgImages[i].style.filter = 'grayscale(100%)';
        // this.bgImages[i].style.filter = 'brightness(50%)';
        that.bgImages[i].classList.add("gray");
      }
    }

    setInterval(function() {
      setAllToGrayScale();

      const randomNum = (max, min, except, except2, except3, except4) => {
        let num = Math.floor(Math.random() * (max - min)) + min;
        return num === except ||
          num === except2 ||
          num === except3 ||
          num === except4
          ? randomNum(max, min, except, except2, except3, except4)
          : num;
      };

      const randomNumber = randomNum(0, 5, -1, -2, -3, that.oldNumbers[0]);

      const randomNumber2 = randomNum(
        5,
        10,
        randomNumber + 5,
        -4,
        -5,
        that.oldNumbers[1]
      );

      // random generated number between 8 and 12, except from aligning items over and the old number
      const randomNumber3 = randomNum(
        10,
        15,
        -6,
        randomNumber + 5,
        randomNumber2 + 5,
        that.oldNumbers[2]
      );
      const randomNumber4 = randomNum(
        15,
        20,
        randomNumber + 5,
        randomNumber2 + 5,
        randomNumber3 + 5,
        that.oldNumbers[3]
      );

      that.oldNumbers = [
        randomNumber,
        randomNumber2,
        randomNumber3,
        randomNumber4
      ];

      var randomImage = that.bgImages[randomNumber];

      var randomImage2 = that.bgImages[randomNumber2];

      var randomImage3 = that.bgImages[randomNumber3];

      var randomImage4 = that.bgImages[randomNumber4];

      //console.log(randomImage);
      randomImage.classList.remove("gray");
      randomImage.style.opacity = 1;
      randomImage2.classList.remove("gray");
      randomImage2.style.opacity = 1;
      randomImage3.classList.remove("gray");
      randomImage3.style.opacity = 1;
      randomImage4.classList.remove("gray");
      randomImage4.style.opacity = 1;
    }, 3000);
  }
}
