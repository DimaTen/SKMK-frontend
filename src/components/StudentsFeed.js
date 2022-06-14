import Accordion from 'react-bootstrap/Accordion'
import { Link, useNavigate } from 'react-router-dom'

const StudentsFeed = ({ students }) => {

    return (
        <main className='InstructorsPage'>
          {students.map(student => (
        <Accordion > 
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
         
          
          {/* {instructors.map(instructor => (
            <Instructor key={instructor.id} instructor={instructor} />
          ))} */}
          
          
        </main>
      )
}

export default StudentsFeed