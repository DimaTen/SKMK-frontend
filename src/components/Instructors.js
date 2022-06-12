import { Link } from "react-router-dom"
import Nav from 'react-bootstrap/Nav'
import Table from 'react-bootstrap/table'
import  useAxiosFetch from '../hooks/useAxiosFetch';
import useWindowSize from '../hooks/useWindowSize';
import { useEffect, useState } from "react";
import { alignPropType } from "react-bootstrap/esm/types";
import api from '../api/axios';
import InstructorsFeed from "./InstructorsFeed";


const Instructors = () => {
    const { fetchError, isLoading } = useAxiosFetch('http://localhost:8080/instructors/show-all');

    const [ instructors, setInstructors ] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const[username, setUsername] = useState('');
    const[email, setEmail] = useState('');
    const[firstname, setFirstname] = useState('');
    const[lastname, setLastname] = useState('');
    const[grade, setGrade] = useState('');
    const[password, setPassword] = useState('');
    
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

    
    useEffect(() => {
        const filteredResults = instructors.filter((instructor) => 
        ((instructor.email).toLowerCase()).includes(search.toLowerCase()) ||
        ((instructor.firstName).toLowerCase()).includes(search.toLowerCase()) ||
        ((instructor.lastName).toLowerCase()).includes(search.toLowerCase()) ||
        ((instructor.phoneNumber).toLowerCase()).includes(search.toLowerCase()) ||
        ((instructor.grade).toLowerCase()).includes(search.toLowerCase()));
        setSearchResults(filteredResults.reverse());
    }, [instructors, search])

    return (
        <main className="MainContent">

        <Nav variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
            <Nav.Link href="/admin">Show all</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link href="/register">Register new instructor</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey="disabled" disabled>
            Disabled
            </Nav.Link>
        </Nav.Item>
        </Nav>
        {isLoading && <p className="statusMsg">Loading posts...</p>}
        {!isLoading && fetchError && <p className="statusMsg" style={{ color: "red" }}>{fetchError}</p>}
        {!isLoading && !fetchError && (searchResults.length ? <InstructorsFeed instructors={searchResults} /> : <p className="statusMsg">No posts to display.</p>)}

        
            

        </main>

    )
}

export default Instructors