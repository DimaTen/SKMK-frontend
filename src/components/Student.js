import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material'

export default function Student() {
    const paperStyle={padding: '50px 20px', width:600, margin: "20px auto"}
    // Variables to add students
    const[name, setName]=useState('')
    const[address, setAddress]=useState('')
    // This is to display all students
    const[students, setStudents]=useState([])



    const handleClick=(e)=>{
        e.preventDefault()
        const student={name, address}
        console.log(student)
        fetch("http://localhost:8080/student/add",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(student)
    }).then(()=>{
        console.log("New Student added")
    })
    }

    
    // This is to display students
    useEffect(() => {
        fetch("http://localhost:8080/student/getAll")
        .then(res=>res.json())
        .then((result)=>{
            setStudents(result);
        }
    )  
    }, [])


  return (
      <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1 style={{color:"blue"}}><u>Add Student</u></h1>
            <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1},
            }}
            noValidate
            autoComplete="off"
            >
            <TextField id="outlined-basic" label="Student Name" variant="outlined" fullWidth 
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />
            <TextField id="outlined-basic" label="Address" variant="outlined" fullWidth 
            value={address}
            onChange={(e)=>setAddress(e.target.value)}
            />
            <Button variant="contained" onClick={handleClick}>Submit</Button>
           

            </Box>
            </Paper>
            <h1>Students here</h1>
            <Paper elevation={3} style={paperStyle}>
                {students.map(student =>(
                    <Paper elevation={6} style={{margin:"10px", padding:"15px", textAlign:"left"}} key={student.id}>
                        Id:{student.studentId}<br/>
                        First name:{student.firstName}<br/>
                        Last name:{student.lastName}<br/>
                        E-mail:{student.email}<br/>
                        Phone number:{student.phoneNumber}<br/>
                        Grade:{student.grade}
                    </Paper>
                ))}

            </Paper>
            {name}
            {address}
      </Container>

  );
}
