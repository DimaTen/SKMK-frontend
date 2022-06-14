import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const register = (username, email, password, firstname, lastname, grade, title, phoneNumber) => {
  return axios.post(API_URL + "signup", {
    username: username,
    email: email,
    password: password,
    firstname: firstname, 
    lastname: lastname, 
    grade: grade, 
    title: title, 
    phoneNumber: phoneNumber
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
