import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import api from '../api/axios';

const StudentPage = () => {

    const [students, setStudents] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await api.get('/student/getAll')
                setStudents(response.data);
            } catch (err) {
                if (err.resonse) {
                    console.log(err.resonse.data);
                    console.log(err.resonse.status);
                    console.log(err.resonse.headers);
                  } else {
                    console.log(`Error: ${err.message}`)
                  }            
            }
        }
        fetchStudents();
    }, [])

    const handleDelete = async (id) => {
        try {
            await api.delete(`/student/${id}`);
            const studentsList = students.filter(student => student.student_id !== id);
            setStudents(studentsList);
            navigate('/students');
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }




    const { id } = useParams();
    const student = students.find(student => (student.studentId).toString() === id);
    // const student = students.find(student => (student.studentId).toString() === id);
    return (
        <main className="PostPage">
            <article className="post">
                {student &&
                    <>
                        <h2>{student.firstName} {student.lastName}</h2>
                        <p className="postBody">
                            Id: {student.studentId} <br/>
                            Email: {student.email} <br/>
                            Phone: {student.phoneNumber}<br/>
                            Grade: {student.grade}                       
                        </p>
                        <button onClick={() => handleDelete(student.studentId)}>
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
