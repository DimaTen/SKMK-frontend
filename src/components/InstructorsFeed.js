import React from 'react'
import { Table } from 'react-bootstrap'
import Instructor from './Instructor'
import Accordion from 'react-bootstrap/Accordion'
import { Link, useNavigate } from 'react-router-dom'


const InstructorsFeed = ({ instructors }) => {


  return (
    <main className='InstructorsPage'>
      {instructors.map(instructor => (
        <Accordion key={instructor.id}> 
            <Accordion.Item eventKey="0" >
            <Accordion.Header>{instructor.firstname} {instructor.lastname}</Accordion.Header>
            <Accordion.Body>
            <Link to={`/instructors/instructor/${instructor.id}`}>
                    <h3>Grade: {instructor.grade}</h3>
                    <p>Username: {instructor.username} </p>
                    <p>Email: {instructor.email}</p>
                    <p>Phone: {instructor.phoneNumber}</p>
                    <p>Password: {instructor.password}</p>
                    
            </Link>
            </Accordion.Body>
          </Accordion.Item>
    
        </Accordion>
        ))}
     
      
      
    </main>
  )
}

export default InstructorsFeed
