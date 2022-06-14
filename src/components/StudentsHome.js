import Accordion from 'react-bootstrap/Accordion'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

const StudentsHome = ({ users, search, setSearch, searchResults, setSearchResults}) => {




    useEffect(() => {
        const filteredResults = users.filter((student) => 
        student.title === "Student" &&
        (((student.email).toLowerCase()).includes(search.toLowerCase()) ||
        ((student.firstname).toLowerCase()).includes(search.toLowerCase()) ||
        ((student.lastname).toLowerCase()).includes(search.toLowerCase()) ||
        ((student.phoneNumber).toLowerCase()).includes(search.toLowerCase()) ||
        ((student.grade).toLowerCase()).includes(search.toLowerCase())));
        setSearchResults(filteredResults.reverse());
    }, [users, search])

  
    return (
      <main className='InstructorsPage'>
        
            <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="search">Search Posts</label>
                <input
                    id="search"
                    type="text"
                    placeholder="Search Posts"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>

      {searchResults.map(student => (
      <Accordion key={student.id} student={student} > 
          <Accordion.Item eventKey="0">
          <Accordion.Header>{student.firstname} {student.lastname}</Accordion.Header>
          <Accordion.Body>
          <Link to={`/students/student/${student.id}`}>
                  <h3>Grade: {student.grade}</h3>
                  <p>Username: {student.username} </p>
                  <p>Email: {student.email}</p>
                  <p>Phone: {student.phoneNumber}</p>
                  <p>Password: {student.password}</p>
                  
          </Link>
          </Accordion.Body>
        </Accordion.Item>
  
      </Accordion>
        ))}
     

      
    </main>
    );
  };

export default StudentsHome
