import { Link } from "react-router-dom"
import Nav from 'react-bootstrap/Nav'
import Table from 'react-bootstrap/table'
import  useAxiosFetch from '../hooks/useAxiosFetch';
import useWindowSize from '../hooks/useWindowSize';
import { useEffect, useState } from "react";
import { alignPropType } from "react-bootstrap/esm/types";
import api from '../api/axios';
import InstructorsFeed from "./InstructorsFeed";


const Instructors = ({ 
    users, 
    search,   
    setSearch, 
    searchResults, 
    setSearchResults,
    }) => {

    
    useEffect(() => {
        const filteredResults = users.filter((user) => 
        user.title === "Instructor" &&
        (((user.email).toLowerCase()).includes(search.toLowerCase()) ||
        ((user.firstname).toLowerCase()).includes(search.toLowerCase()) ||
        ((user.lastname).toLowerCase()).includes(search.toLowerCase()) ||
        ((user.phoneNumber).toLowerCase()).includes(search.toLowerCase()) ||
        ((user.grade).toLowerCase()).includes(search.toLowerCase())));
        setSearchResults(filteredResults.reverse());
    }, [users, search])

    return (
        <main className="MainContent">
            <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="search">Search Posts</label>
                <input
                    id="search"
                    type="text"
                    placeholder="Search Posts"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
        <>
        {searchResults.length ? <InstructorsFeed instructors={searchResults} /> : <p className="statusMsg">No posts to display.</p>}

                
        </>
        </main>

    )
}

export default Instructors