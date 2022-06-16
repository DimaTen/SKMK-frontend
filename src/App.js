import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardStudent";
import BoardInstructor from "./components/BoardInstructor";
import BoardAdmin from "./components/BoardAdmin";

import EventBus from "./common/EventBus";
import BoardStudent from "./components/BoardStudent";
import NavbarMain from "./components/NavbarMain";
import Layout from "./components/Layout";
import StudentsHome from "./components/StudentsHome";
import NewStudent from "./components/NewStudent";
import StudentPage from "./components/StudentPage";
import Missing from "./components/Missing";
import Attendance from "./components/Attendance";
import CheckIn from "./components/CheckIn";
import Instructors from "./components/Instructors";
import UserService from "./services/user.service";
import InstructorsFeed from "./components/InstructorsFeed";
import Instructor from "./components/Instructor";
import EditInstructor from "./components/EditInstructor";
import Curriculum from "./components/Curriculum";


const App = () => {
  const [showInstructorBoard, setShowInstructorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const[techniques, setTechniques] = useState([]);

    useEffect(() => {
      UserService.getCurriculum().then(
        (response) => {
          setTechniques(response.data);
        },
        (error) => {
          const _techniques =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
  
            setTechniques(_techniques);
  
          if (error.response && error.response.status === 401) {
            EventBus.dispatch("logout");
          }
        }
      );
    }, []);



  useEffect(() => {
    const loggedInUser = AuthService.getCurrentUser();

    if (loggedInUser) {
      setCurrentUser(loggedInUser);
      setShowInstructorBoard(loggedInUser.roles.includes("ROLE_INSTRUCTOR"));
      setShowAdminBoard(loggedInUser.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  useEffect(() => {
    UserService.getAllUsers().then(
      (response) => {
          setUsers(response.data);
      },
      (error) => {
        const _users =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

          setUsers(_users);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowInstructorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };



  return (
    <container>
        <Routes>
        <Route path="/" element={<Layout
              showInstructorBoard={showInstructorBoard}
              showAdminBoard={showAdminBoard}
              currentUser={currentUser}
              logOut={logOut}/>}>
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/mod" element={<BoardInstructor/>} />
          
          <Route path="students" element={<StudentsHome
               users={users}     
               search={search}
               setSearch={setSearch}
               searchResults={searchResults}
               setSearchResults={setSearchResults} />} />
          <Route path="students/add" element={<NewStudent />} />
          <Route path="students/student/:id" element={<StudentPage />} />

          <Route path="attendance/show-all" element={<Attendance currentUser={currentUser} />} />
          <Route path="attendance/check-in" element={<CheckIn currentUser={currentUser}  />}/>

          <Route path="instructors" element={<Instructors 
            users={users}     
            search={search}
            setSearch={setSearch}
            searchResults={searchResults}
            setSearchResults={setSearchResults}
             />} />

          <Route path="instructors/instructor/:id" element={<Instructor users={users} setUsers={setUsers} />} />
          <Route path="instructors/instructor/edit/:id" element={<EditInstructor users={users}/>} />
          <Route path="curriculum" element={<Curriculum techniques={techniques}/>} />
          
          <Route path="*" element={<Missing />} />
        </Route>
         
        </Routes>


    </container>
  );
};

export default App;
