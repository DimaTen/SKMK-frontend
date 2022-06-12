import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
import Editor from './components/Editor';
import Admin from './components/Instructors';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import Lounge from './components/Lounge';
import LinkPage from './components/LinkPage';
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';
import StudentsHome from './components/StudentsHome';
import NewStudent from './components/NewStudent';
import Attendance from './components/Attendance';
import Instructor from './components/Instructor';

import Grading from './Grading';
import StudentPage from './components/StudentPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Instructors from './components/Instructors';
import EditInstructor from './components/EditInstructor';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from './api/axios';

const ROLES = {
    'USER': "ROLE_USER",
    'MODERATOR': "ROLE_MODERATOR",
    'ADMIN': "ROLE_ADMIN"
  }

function App() {

    const[instructors, setInstructors] = useState([]);


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


  return (
<Routes>
        <Route path="/" element={<Layout />}>
            {/* public routes */}
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="linkpage" element={<LinkPage />} />
            <Route path="unauthorized" element={<Unauthorized />} />

            {/* we want to protect these routes */}
            <Route > {/* element={<RequireAuth allowedRoles={[ROLES.USER]} />} */}
                <Route path="/" element={<Home />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.MODERATOR]} />}>
                <Route path="editor" element={<Editor />} />
            </Route>


            <Route > {/* element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />} */}
                <Route path="instructors" element={<Instructors />} />
                <Route path="instructors/instructor/:id" element={<Instructor />}/>
                <Route path="instructors/instructor/edit/:id" element={<EditInstructor instructors={instructors} />}/>

            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.MODERATOR, ROLES.ADMIN]} />}>
                <Route path="lounge" element={<Lounge />} />
            </Route>

            {/* Students */}
            <Route  >  
                <Route > {/* element={<RequireAuth allowedRoles={[ROLES.USER]} />} */}
                    <Route path="students" element={<StudentsHome />} />
                    <Route path="students/add" element={<NewStudent />} />
                    <Route path="students/student/:id" element={<StudentPage />} />
                    <Route path="students/student/add" element={<NewStudent />} />
                <Route>
                    
            </Route>
                    
                </Route> 
          
                
            </Route>
            <Route>  {/* Protect with Role */} 
                    <Route path="attendance" element={<Attendance />} />    
            </Route> 
            <Route>  {/* Protect with Role */} 
                    <Route path="grading" element={<Grading />} />    
            </Route> 





            {/* catch all */}
            <Route path="*" element={<Missing />} />
        </Route>
    </Routes>
  );
}

export default App;
