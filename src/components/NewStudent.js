import React from 'react'
import { useState, useEffect } from 'react';
import api from '../api/axios';
import { useParams, Link, useNavigate } from "react-router-dom";

const NewStudent = () => {
    const [students, setStudents] = useState([]);
    const [studentFirstName,setStudentFirstName] = useState('');
    const [studentLastName,setStudentLastName] = useState('');
    const [studentEmail,setStudentEmail] = useState('');
    const [studentPhoneNumber,setStudentPhoneNumber] = useState('');
    const [studentGrade,setStudentGrade] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = students.length ? students[students.length -1].id + 1 : 1;
        const newStudent = { studentId: id, firstName: studentFirstName, lastName: studentLastName,
        email: studentEmail, phoneNumber: studentPhoneNumber, grade: studentGrade };
        try {
            const response = await api.post('/student/add', newStudent);
            const allStudents = [...students, response.data];
            setStudents(allStudents);
            setStudentFirstName('');
            setStudentLastName('');
            setStudentEmail('');
            setStudentPhoneNumber('');
            setStudentGrade('');
            navigate('/students/add');
        } catch (err) {
            console.log(`Error: ${err.message}`)
        }    
    }


  return (
    <div className="formContainer">
        <form className="postForm" onSubmit={handleSubmit}>
            <label htmlFor="studentFirstName">First name:</label>
            <input
                id="studentFirstName"
                type="text"
                required
                value={studentFirstName}
                onChange={(e) => setStudentFirstName(e.target.value)}
            />
            <label htmlFor="studentLastName">Last Name:</label>
            <input
                id="studentLastName"
                type="text"
                required
                value={studentLastName}
                onChange={(e) => setStudentLastName(e.target.value)}
            />
            <label htmlFor="studentEmail">Email:</label>
            <input
                id="studentEmail"
                type="text"
                required
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
            />
            <label htmlFor="studentPhoneNumber">Phone number:</label>
            <input
                id="studentPhoneNumber"
                type="text"
                required
                value={studentPhoneNumber}
                onChange={(e) => setStudentPhoneNumber(e.target.value)}
            />
            <label htmlFor="studentGrade">Grade:</label>
            <input
                id="studentGrade"
                type="text"
                required
                value={studentGrade}
                onChange={(e) => setStudentGrade(e.target.value)}
            />
            
            <button type="submit">Submit</button>
        </form>
    </div>
    
  )
}

export default NewStudent