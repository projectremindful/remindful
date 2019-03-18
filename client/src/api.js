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

  // to protect routes
  isLoggedIn() {
    return localStorage.getItem("user") != null;
  },

  // --- SIGN UP,  LOGIN AND LOGOUT ROUTES -----

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

  // ----USER PROFILE AND INFORMATION -----
  getProfile() {
    return service.get("/my-profile").then(res => {
      return res.data;
    });
  },

  updateUserPreferences(preferences) {
    return service.put(`/my-profile`, preferences).then(res => {
      return res.data;
    });
  },

  updateUserMemory(dailyMemory) {
    return service.put("/my-memory", dailyMemory).then(res => {
      return res.data;
    });
  },

  updateProfile(body) {
    return this.service
      .put("/profile", body)
      .then(res => res.data)
      .catch(this.errorHandler);
  },

  // ---- MEMORIES ROUTES --------
  getUserMemories() {
    return service.get(`/memories`).then(res => res.data);
  },

  getMemory(memoryId) {
    return service.get(`memories/${memoryId}`).then(res => res.data);
  },

  updateMemory(memoryId, notes) {
    console.log("notes in the api method: ", notes, memoryId);
    return service.put(`memories/${memoryId}`, notes).then(res => {
      return res.data;
    });
  },

  saveNewMemory(newMemory) {
    return this.service
      .post("/memories", newMemory)
      .then(res => res.data)
      .catch(this.errorHandler);
  },

  delete(id) {
    return this.service.delete("/memories/" + id);
  },

  // -----FILE UPLOADS- ---------
  handleUpload(theFile) {
    return this.service
      .post("/upload", theFile)
      .then(res => res.data)
      .catch(this.errorHandler);
  }
};
