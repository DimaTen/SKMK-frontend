import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
import Editor from './components/Editor';
import Admin from './components/Admin';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import Lounge from './components/Lounge';
import LinkPage from './components/LinkPage';
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';
import StudentsHome from './components/StudentsHome';
import NewStudent from './components/NewStudent';
import Attendance from './components/Attendance';

import Grading from './Grading';
import StudentPage from './components/StudentPage';
import 'bootstrap/dist/css/bootstrap.min.css';

const ROLES = {
    'USER': "ROLE_USER",
    'MODERATOR': "ROLE_MODERATOR",
    'ADMIN': "ROLE_ADMIN"
  }

function App() {


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


            <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                <Route path="admin" element={<Admin />} />
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
