import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom'

const Curriculum = ({ techniques }) => {



  return (
    <main className='InstructorsPage'>
      {techniques.map(tech => (
      <Accordion key={tech.id} tech={tech} > 
          <Accordion.Item eventKey="0">
          <Accordion.Header>{tech.category}{tech.technique} </Accordion.Header>
          <Accordion.Body>
          <Link to={`/students/student/${tech.id}`}>
                  <h3>Grade: {tech.grade}</h3>
                  <p>Category: {tech.category} </p>
                  <p>Description: {tech.description}</p>
                  <p>Link: {tech.link}</p>
                  <p>Times used: {tech.timesUsed}</p>
                  
          </Link>
          </Accordion.Body>
        </Accordion.Item>
  
      </Accordion>
        ))}

    </main>

  )
}

export default Curriculum