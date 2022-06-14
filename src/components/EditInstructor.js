import {useRef, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import UserService from "../services/user.service";


const EditInstructor = ({users}) => {
    const { id } = useParams();
    const instructor = users.find(user => (user.id).toString() === id);

    const[editUsername, setEditUsername] = useState('');
    const[editFirstname, setEditFirstname] = useState('');
    const[editLastname, setEditLastname] = useState('');
    const[editEmail, setEditEmail] = useState('');
    const[editGrade, setEditGrade] = useState('');
    const[editPhone, setEditPhone] = useState('');
    const[editPassword, setEditPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const errRef = useRef();



    useEffect(() => {
        if(instructor) {
            setEditUsername(instructor.username)
            setEditFirstname(instructor.firstname)
            setEditLastname(instructor.lastname)
            setEditEmail(instructor.email)
            setEditGrade(instructor.grade)
            setEditPassword(instructor.password)
            setEditPhone(instructor.phoneNumber)
        }
    }, [editUsername, editPassword, editFirstname, editLastname, editGrade, editPhone])

    
    const handleGradeChange = (e) => {
        setEditGrade(e.target.value)
    }



    const handleEdit = async (id) => {
        await UserService.updateInstructor(id, JSON.stringify({ username: editUsername, 
            password: editPassword, 
            email: editEmail, 
            firstname: editFirstname, 
            lastname: editLastname,
            grade: editGrade,
            phoneNumber: editPhone, 
            roles: "INSTRUCTOR"}),).then(() => {
                setEditUsername('');
                setEditFirstname('');
                setEditLastname('');
                setEditEmail('');
                setEditGrade('');
                setEditPhone('');
                setEditPassword('');
            }, (err) => {
                if (!err?.response) {
                    setErrMsg('No Server Response');
                } else if (err.response?.status === 409) {
                    setErrMsg('Username Taken');
                } else {
                    setErrMsg('Registration Failed')
                }
                errRef.current.focus();
            })
    }
        



  return (
  <main className="MainContent">
    {editUsername &&
    <>
        <h2>Edit Post</h2>
        <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="postTitle">Username:</label>
            <input
                id="postTitle"
                type="text"
                required
                value={editUsername}
                onChange={(e) => setEditUsername(e.target.value)}
            />
            <label htmlFor="postBody">Email:</label>
            <input
                id="postBody"
                required
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
            />
            <button type="submit" onClick={() => handleEdit(instructor.id)}>Submit</button>
        </form>
    </>
}
{!editUsername &&
    <>
        <h2>Post Not Found</h2>
        <p>Well, that's disappointing.</p>
        <p>
            <Link to='/'>Visit Our Homepage</Link>
        </p>
    </>
}

        </main>
  )
}

export default EditInstructor
