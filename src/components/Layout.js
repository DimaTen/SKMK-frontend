import { Outlet } from "react-router-dom"
import MainNavBar from "./MainNavBar"

const Layout = () => {
    return (
        <div className="App">
            <MainNavBar />
                
            <Outlet />
        </div>

    )
}

export default Layout