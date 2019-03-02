import axios from "axios";

class Service {
  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:5000/api",
      withCredentials: true
    });
    this.service = service;
  }

  errorHandler = err => {
    // console.error(err);
    throw err;
  };

  handleUpload = theFile => {
    return this.service
      .post("/upload", theFile)
      .then(res => res.data)
      .catch(this.errorHandler);
  };

  saveNewMemory = newMemory => {
    return this.service
      .post("/memories/create", newMemory)
      .then(res => res.data)
      .catch(this.errorHandler);
  };

  updateProfile = body => {
    return this.service
      .post("/profile/edit", body)
      .then(res => res.data)
      .catch(this.errorHandler);
  };

  delete = id => {
    return this.service.delete("/memory/" + id);
  };
}

export default Service;
