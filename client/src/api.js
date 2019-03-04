import axios from "axios";

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "/api"
      : "http://localhost:5000/api",
  withCredentials: true
});

const errHandler = err => {
  console.error(err);
  if (err.response && err.response.data) {
    console.error("API response", err.response.data);
    throw err.response.data.message;
  }
  throw err;
};

export default {
  service: service,

  isLoggedIn() {
    return localStorage.getItem("user") != null;
  },

  signup(userInfo) {
    return service
      .post("/signup", userInfo)
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem("user", JSON.stringify(res.data));
        return res.data;
      })
      .catch(errHandler);
  },

  login(username, password) {
    return service
      .post("/login", {
        username,
        password
      })
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem("user", JSON.stringify(res.data));
        return res.data;
      })
      .catch(errHandler);
  },

  logout() {
    localStorage.removeItem("user");
    return service.get("/logout");
  },

  getProfile() {
    return service.get("/my-profile").then(res => {
      return res.data;
    });
  },

  getUserMemories() {
    return service.get(`/memories`).then(res => res.data);
  },

  chooseMemoryForUser(preferences, memories) {
    // .then for loop each memories loop through and match preferences agsint tags
    // remove any that have been viewed
    // use a counter inthe for loop to count the pushes
    // if array length is 0
    // if counter is 1
    // random number between 0 and counter
    // return an array[] of posisble memories
    // select a random memory from that array based on its length
    // set chosenMem field in preferences to that
  },

  updateUserPreferences(userId, preferences) {
    // TO CREATE CHOSEN MEM FIELD IN USER MODEL
    // update get memories route to be user memories only
    // use that route
    // selectChosenMem method
    // that service.put
    return service.put(`user/${userId}`, preferences).then(res => {
      return res.data;
      // console.log('Im in the api method',res)
    });
  }
};
