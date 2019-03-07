import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import $ from 'jquery';
import {
  Col,
  CustomInput,
  Button,
  Container,
  FormFeedback,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

// import the service file since we need it to send (and get) the data to(from) server
import api from '../../api';

export default class AddMemory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      date: '',
      notes: '',
      reflection: false,
      motivation: false,
      nostalgia: false,
      viewed: false,
      imgUrl:
        'https://res.cloudinary.com/fracloudo/image/upload/v1551962224/defaultMemory.jpg',
      _owner: ''
    };
    this.oldNumbers = [-1, -1, -1, -1];
    this.bgImages = [];
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
    console.log('The file to be uploaded is: ', e.target.files[0]);

    const uploadData = new FormData();
    // imgUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new memory in '/api/memories/create' POST route
    uploadData.append('imgUrl', e.target.files[0]);
    api
      .handleUpload(uploadData)
      .then(response => {
        console.log('response is: ', response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        this.setState({ imgUrl: response.secure_url });
      })
      .catch(err => {
        console.log('Error while uploading the file: ', err);
      });
  };

  // this method submits the form
  handleSubmit = e => {
    e.preventDefault();
    api
      .saveNewMemory(this.state)
      .then(res => {
        console.log('added: ', res);
        this.props.testProp('...Test from add memory after new memory saved');
        setTimeout(
          function() {
            alert('Image successfully uploaded');
            this.props.history.push('/memory-gallery');
          }.bind(this),
          2000
        );
      })
      .catch(err => {
        console.log('Error while adding the memory: ', err);
      });
  };

  progress = () => {
    console.log('Test executed');
    var current_progress = 0;
    var interval = setInterval(function() {
      current_progress += 10;
      $('#dynamic')
        .css('width', current_progress + '%')
        .attr('aria-valuenow', current_progress)
        .text(current_progress + '% uploaded');
      if (current_progress >= 100) clearInterval(interval);
    }, 100);
  };

  render() {
    console.log(this.state.reflection);
    return (
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
                    placeholder="Add what you'd like to reflect on in this memory, note your thoughts or memories."
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
                    onChange={e => this.handlePrefChange('reflection')}
                    type="switch"
                    id="reflection"
                    name="reflection"
                    label="reflection"
                  />
                  <CustomInput
                    checked={this.state.nostalgia}
                    onChange={e => this.handlePrefChange('nostalgia')}
                    type="switch"
                    id="nostalgia"
                    name="nostalgia"
                    label="nostalgia"
                  />
                  <CustomInput
                    checked={this.state.motivation}
                    onChange={e => this.handlePrefChange('motivation')}
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
              <Button
                style={{
                  backgroundColor: '#24f0a9',
                  color: 'white',
                  border: 'white'
                }}
                type="submit"
                onClick={() => this.progress()}
              >
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
                  style={{ width: '0%' }}
                >
                  <span id="current-progress" />
                </div>
              </div>
            </Form>
          </div>
        </Container>
      </div>
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
        // chosenMemory: user.chosenMemory
      });
    });

    setTimeout(() => {
      this.bgImages = document.querySelectorAll('.mosaic-images img');
    }, 100);

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
      randomImage.classList.remove('gray');
      randomImage.style.opacity = 1;
      randomImage2.classList.remove('gray');
      randomImage2.style.opacity = 1;
      randomImage3.classList.remove('gray');
      randomImage3.style.opacity = 1;
      randomImage4.classList.remove('gray');
      randomImage4.style.opacity = 1;
    }, 3000);
  }
}
