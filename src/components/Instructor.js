import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from "react-router-dom";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

const Instructor = ({ users, setUsers }) => {
    const navigate = useNavigate();


    const handleDelete = async (id) => {
        await UserService.deleteInstructor(id).then(() => {
            const instructorsList = users.filter(instructor => instructor.id != id);
            setUsers(instructorsList)
            navigate("/instructors");
        }, (error) => {
            const _users =
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
    const instructor = users.find(instructor => (instructor.id).toString() === id);

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