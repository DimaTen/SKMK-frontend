import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';


const MainNavBar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
            <Navbar.Brand href="/">SKMK</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                <NavDropdown title="Students" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/students">Students</NavDropdown.Item>
                    <NavDropdown.Item href="/students/add">Add student</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/attendance">Attendance</Nav.Link>
                <Nav.Link href="/curriculum">Curriculum</Nav.Link>
                <Nav.Link href="/instructors">Instructors</Nav.Link>

                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default MainNavBar