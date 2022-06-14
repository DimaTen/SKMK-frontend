
import AuthService from '../services/auth.service'
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import UserService from '../services/user.service';
import EventBus from "../common/EventBus";
import * as moment from 'moment'

const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

const CheckIn = () => {
    const currentUser = AuthService.getCurrentUser();
    const[email, setEmail] = useState('');
    const[username, setUsername] = useState('');

    const instructor = currentUser.username;



    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [successful, setSuccessful] = useState(false);

    const form = useRef();
    const checkBtn = useRef();



        
  


    const handleCheckIn = (e) => {
        e.preventDefault();
      
        UserService.checkIn(instructor, username).then(
            (response) => {
                setUsername('')
                },
                (error) => {
                const resMessage =
                    (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();
 
                }
        );
    }


      return (
        <div className="formContainer">
            <form className="postForm" onSubmit={handleCheckIn}>
                <label htmlFor="username">Username:</label>
                <input
                    id="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            
                <button type="submit">Submit</button>
            </form>
        </div>


      );

}


export default CheckIn