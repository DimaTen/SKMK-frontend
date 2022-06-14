import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/";

const getPublicContent = () => {
  return axios.get(API_URL + "api/test/all");
};


const getInstructorBoard = () => {
  return axios.get(API_URL + "api/test/mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const getStudentBoard = () => {
  return axios.get(API_URL + "students/get-all", { headers: authHeader() });
};

const deleteStudentRequest = (id) => {
  return axios.delete(API_URL + `students/student/${id}`, { header: authHeader() });
}

const getAttendance = () => {
  return axios.get(API_URL + "attendance/show-all", { headers: authHeader() })
}

const getStudentByEmail = (username) => {
  return axios.get(API_URL + `students/student/${username}`, { headers: authHeader() })
}

const getAllUsers = () => {
  return axios.get(API_URL + "users/get-all", { headers: authHeader() });
}

const deleteInstructor = (id) => {
  return axios.delete(API_URL + `instructors/instructor/${id}`, { header: authHeader() });
}

const updateInstructor = (id, editUsername, editPassword, editEmail, editFirstname, editLastname, editGrade, editPhone ) => {
  return axios.put(API_URL + `instructors/instructor/${id}`, { header: authHeader() }, {
    username: editUsername, 
    password: editPassword, 
    email: editEmail, 
    firstname: editFirstname, 
    lastname: editLastname,
    grade: editGrade,
    phoneNumber: editPhone,

  });
}



const checkIn = (instructor, username) => {
  return axios.post(API_URL + "attendance/check-in", {
    instructor: instructor, 
    username: username, 
  });
};

const getCurriculum = () => {
  return axios.get(API_URL + "curriculum/get-all", { headers: authHeader() });
}

const UserService = {
  getPublicContent,
  getStudentBoard,
  getInstructorBoard,
  getAdminBoard,
  deleteStudentRequest,
  getAttendance,
  checkIn,
  getStudentByEmail,
  getAllUsers,
  deleteInstructor,
  updateInstructor,
  getCurriculum
};

export default UserService;
