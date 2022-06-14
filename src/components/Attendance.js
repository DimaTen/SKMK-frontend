import React from 'react'
import { useState, useEffect } from 'react';

import { Table } from 'react-bootstrap'

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

const Attendance = () => {
  const [checkedInList, setCheckedInList] = useState([]);
  const [checkInSearch, setCheckInSearch] = useState('');
  const [checkInSearchResults, setCheckInSearchResults] = useState([]);


  useEffect(() => {
    const fetchAttendance = async () => {
      UserService.getAttendance().then(
        (response) => {
          setCheckedInList(response.data);
          console.log(response.data);
        },
        (error) => {
          const _checkedInList =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
  
            setCheckedInList(_checkedInList);
  
          if (error.response && error.response.status === 401) {
            EventBus.dispatch("logout");
          }
        }
      );
    }
    fetchAttendance();
    
    
  }, []);


  useEffect(() => {
    const filteredResults = checkedInList.filter((checkIn) => 

    ((checkIn.date).toLowerCase()).includes(checkInSearch.toLowerCase()) ||
    ((checkIn.instructor).toLowerCase()).includes(checkInSearch.toLowerCase()) ||
    ((checkIn.student).toLowerCase()).includes(checkInSearch.toLowerCase()) ||
    ((checkIn.studentsGrade).toLowerCase()).includes(checkInSearch.toLowerCase()));
    setCheckInSearchResults(filteredResults.reverse());
}, [checkedInList, checkInSearch])



  return (
    <div>
      <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search">Search Posts</label>
        <input
            id="checkInSearch"
            type="text"
            placeholder="Search Posts"
            value={checkInSearch}
            onChange={(e) => setCheckInSearch(e.target.value)}
        />
      </form>

      <Table striped bordered hover size="sm">
    <thead>
        <tr>

        <th>Date</th>
        <th>Instructor</th>
        <th>Student</th>
        <th>Grade</th>
        </tr>
    </thead>
    {
        checkInSearchResults.map(checkIn => (
            <tbody key={checkIn.id}>
            <tr>

            <td>{checkIn.date}</td>
            <td>{checkIn.instructor}</td>
            <td>{checkIn.student}</td>
            <td>{checkIn.studentsGrade}</td>
            </tr>
            
        </tbody>
        
        ))
    }
            <th>Sum: {checkInSearchResults.length}</th>
            

    </Table>
    </div>
  )
}

export default Attendance
