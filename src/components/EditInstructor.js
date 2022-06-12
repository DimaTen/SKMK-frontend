import { useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import { useParams } from "react-router-dom";

const EditInstructor = (instructors) => {
    const[editUsername, setEditUsername] = useState([]);
    const[editFirstname, setEditFirstname] = useState('');
    const[editLastname, setEditLastname] = useState('');
    const[editEmail, setEditEmail] = useState('');
    const[editGrade, setEditGrade] = useState('');
    const[editPhone, setEditPhone] = useState('');
    const[editPassword, setEditPassword] = useState('');

    
    const handleGradeChange = (e) => {
        setEditGrade(e.target.value)
    }

    const { id } = useParams();
    const instructor = instructors.find(instructor => (instructor.id).toString() === id);

    const handleEdit = async (id) => {

        try {
            const response = await axios.put(REGISTER_URL,
                JSON.stringify({ username: editUsername, 
                    password: password, 
                    email: editEmail, 
                    firstname: editFirstname, 
                    lastname: editLastname,
                    grade: editGrade,
                    phoneNumber: editPhone, 
                    roles: "USER"}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response));
            setEditUsername('');
            setEditFirstname('');
            setEditLastname('');
            setEditEmail('');
            setEditGrade('G1');
            setEditPhone('');
            setEditPassword('');

        }catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
            }
        }



  return (
  <main className="MainContent">

                <section>
                    <h1>Register new instructor</h1>
                    <form className= "postForm" onSubmit={handleEdit}>
                    <label htmlFor="username">
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            autoComplete="off"
                            onChange={(e) => setEditUsername(e.target.value)}
                            value={username}                      

                        />
                        
                        <label htmlFor="email">
                            Email:
                        </label>
                        <input
                            type="text"
                            id="email"
                            autoComplete="off"
                            onChange={(e) => setEditEmail(e.target.value)}                           
                            value={email}                          
                        />

                        <label htmlFor="grade">
                            Grade:
                        </label>
                        <select value={grade} onChange={handleGradeChange}>
                            <option value="G1">Graduate 1</option>
                            <option value="G2">Graduate 2</option>
                            <option value="G3">Graduate 3</option>
                            <option value="G4">Graduate 4</option>
                            <option value="G5">Graduate 5</option>
                        </select>

                        <label htmlFor="firstname">
                            First name:      
                        </label>
                        <input
                            type="text"
                            id="firstname"
                            autoComplete="off"
                            onChange={(e) => setEditFirstname(e.target.value)}
                            value={firstname}                        
                        />

                        <label htmlFor="lastname">
                            Last name:
                        </label>
                        <input
                            type="text"
                            id="lastname"
                            autoComplete="off"
                            onChange={(e) => setEditLastname(e.target.value)}
                            value={lastname}                        
                        />
                       
                        <label htmlFor="phonenumber">
                            Phone number:
                        </label>
                        <input
                            type="text"
                            id="phonenumber"
                            autoComplete="off"
                            onChange={(e) => setEditPhone(e.target.value)}
                            value={phoneNumber}                            
                        />

                        <label htmlFor="password">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setEditPassword(e.target.value)}
                            value={password}                      
                        />

                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                        </label>

                        <button type="submit" onClick={() => handleEdit(instructor.id)}>Submit</button>
                    </form>
                </section>
          
        </main>
  )
}

export default EditInstructor
