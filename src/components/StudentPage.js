import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import api from '../api/axios';
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

const StudentPage = () => {

    const [students, setStudents] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        UserService.getStudentBoard().then(
          (response) => {
              setStudents(response.data);
          },
          (error) => {
            const _students =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
    
              setStudents(_students);
    
            if (error.response && error.response.status === 401) {
              EventBus.dispatch("logout");
            }
          }
        );
      }, []);

    const handleDelete = async (id) => {
        await UserService.deleteStudentRequest(id).then(() => {
            const studentsList = students.filter(student => student.id != id);
            setStudents(studentsList)
            navigate("/students");
        }, (error) => {
            const _students =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
    
            if (error.response && error.response.status === 401) {
              EventBus.dispatch("logout");
            }
          }
           
              
        )
    }




    const { id } = useParams();
    const student = students.find(student => (student.id) == id);
    // const student = students.find(student => (student.studentId).toString() === id);
    return (
        <main className="PostPage">
            <article className="post">
                {student &&
                    <>
                        <h2>{student.firstname} {student.lastname}</h2>
                        <p className="postBody">
                            Id: {student.id} <br/>
                            Email: {student.email} <br/>
                            Phone: {student.phoneNumber}<br/>
                            Grade: {student.grade}                       
                        </p>
                        <Link to={`/students/student/edit/${student.id}`}><button className="editButton">Update</button></Link>
                        <button onClick={() => handleDelete(student.id)}>
                            Delete 
                        </button>
                        
                    </>
                }
                {!student &&
                    <>
                        <h2>Post Not Found</h2>
                        <p>Well, that's disappointing.</p>
                        <p>
                            <Link to='/students'>Return to Students</Link>
                        </p>
                    </>
                }
            </article>
        </main>
    )
}

export default StudentPage
