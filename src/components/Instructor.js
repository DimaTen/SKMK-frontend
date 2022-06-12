import React, { useEffect, useState } from 'react'
useParams
import api from '../api/axios';

const Instructor = () => {
    const[instructors, setInstructors] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchInstructors = async () => {
            try {
                const response = await api.get('/instructors/show-all')
                setInstructors(response.data);
            } catch (error) {
                if(error.response.data) {
                console.log(error.response.status);
                console.log(error.response.headers);
                } else {
                console.log(`Error: ${error.message}`)
                }
            }  
        }
        fetchInstructors();
    }, [])


    const handleDelete = async (id) => {
        try {
            await api.delete(`/instructors/instructor/${id}`);
            const instructorsList = instructors.filter(instructor => instructor.id !== id);
            setInstructors(instructorsList);
            navigate('/instructors');
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }

    const { id } = useParams();
    const instructor = instructors.find(instructor => (instructor.id).toString() === id);

  return (
    <main className="PostPage">
    <article className="post">
        {instructor &&
            <>
                <h2>{instructor.firstname} {instructor.lastname}</h2>
                <p className="postBody">
                    Id: {instructor.id} <br/>
                    Email: {instructor.email} <br/>
                    Phone: {instructor.phoneNumber}<br/>
                    Grade: {instructor.grade}                       
                </p>
                <Link to={`/Instructors/instructor/edit/${instructor.id}`}><button className="editButton">Update</button></Link>
                <button onClick={() => handleDelete(instructor.id)}>
                    Delete 
                </button>
                
            </>
        }
        {!instructor &&
            <>
                <h2>Post Not Found</h2>
                <p>Well, that's disappointing.</p>
                <p>
                    <Link to='/instructors'>Return to Students</Link>
                </p>
            </>
        }
    </article>
    </main>

  )
}

export default Instructor