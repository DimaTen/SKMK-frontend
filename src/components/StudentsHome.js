import React from 'react'
import StudentsFeed from '../components/StudentsFeed';
import { useState, useEffect } from 'react';
import { Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom';
import  useAxiosFetch from '../hooks/useAxiosFetch';
import useWindowSize from '../hooks/useWindowSize';
import api from '../api/axios';
import StudentPage from './StudentPage';


const StudentsHome = () => {
    const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:8080/student/getAll');

    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [studentFirstName,setStudentFirstName] = useState('');
    const [studentLastName,setStudentLastName] = useState('');
    const [studentEmail,setStudentEmail] = useState('');
    const [studentPhoneNumber,setStudentPhoneNumber] = useState('');
    const [studentGrade,setStudentGrade] = useState('');
    const navigate = useNavigate();
    const { width } = useWindowSize();

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await api.get('/student/getAll')
                setStudents(response.data);
            } catch (err) {
                if (err.response) {
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                  } else {
                    console.log(`Error: ${err.message}`)
                  }            
            }
        }
        fetchStudents();
    }, [])

    useEffect(() => {
        const filteredResults = students.filter((student) => 
        ((student.email).toLowerCase()).includes(search.toLowerCase()) ||
        ((student.firstName).toLowerCase()).includes(search.toLowerCase()) ||
        ((student.lastName).toLowerCase()).includes(search.toLowerCase()) ||
        ((student.phoneNumber).toLowerCase()).includes(search.toLowerCase()) ||
        ((student.grade).toLowerCase()).includes(search.toLowerCase()));
        setSearchResults(filteredResults.reverse());
    }, [students, search])



  return (
    <main className="MainContent">
        <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="search">Search student</label>
                <input
                    id="search"
                    type="text"
                    placeholder="Search student"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
        </form>
            
        {isLoading && <p className="statusMsg">Loading posts...</p>}
        {!isLoading && fetchError && <p className="statusMsg" style={{ color: "red" }}>{fetchError}</p>}
        {!isLoading && !fetchError && (searchResults.length ? <StudentsFeed students={searchResults} /> : <p className="statusMsg">No posts to display.</p>)}

    </main>
  )
}

export default StudentsHome
