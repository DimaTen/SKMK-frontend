import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavbarMain = ({currentUser, showInstructorBoard, showAdminBoard, logOut}) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
        <Navbar.Brand href="/">SKMK</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            
            
            
            {showInstructorBoard && (
                <Nav>
                <NavDropdown title="Students" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/students">Students</NavDropdown.Item>
                    <NavDropdown.Item href="/students/add">Add student</NavDropdown.Item>
                    <NavDropdown.Item href="/attendance/show-all">Attendance</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/attendance/check-in">Check in</NavDropdown.Item>
                </NavDropdown>

                
                <NavDropdown title="Curriculum" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/curriculum">Curriculum</NavDropdown.Item>
                    <NavDropdown.Item href="/training">Training</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/grading">Grading</NavDropdown.Item>
                </NavDropdown>
                </Nav>
            )}

            {showInstructorBoard && (
                <NavDropdown title="Instructors" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/instructors">Instructors</NavDropdown.Item >
                    <NavDropdown.Item href="/register">Add instructor</NavDropdown.Item>
                </NavDropdown>
            )}


            </Nav>
            <Nav className="navbar-nav ml-auto">
            {currentUser ? (
                <Nav>
                <Nav.Link href="/profile">{currentUser.username}</Nav.Link>
                <Nav.Link onClick={logOut} href="/login">
                    Log out
                </Nav.Link>
                </Nav>

            ) : (
                <Nav>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">
                    Sign up
                </Nav.Link>
                </Nav>
            )}


            </Nav>
        </Navbar.Collapse>
    </Container>
</Navbar>
  )
}

export default NavbarMain