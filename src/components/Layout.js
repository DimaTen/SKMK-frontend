import { Outlet } from "react-router-dom"

import NavbarMain from "./NavbarMain"

const Layout = ({ showInstructorBoard, showAdminBoard, currentUser, logOut }) => {
    return (
        <div className="App">
            <NavbarMain               
              showInstructorBoard={showInstructorBoard}
              showAdminBoard={showAdminBoard}
              currentUser={currentUser}
              logOut={logOut} />
                
            <Outlet />
        </div>

    )
}

export default Layout