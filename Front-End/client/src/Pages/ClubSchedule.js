import React from 'react'
import Schedule from '../Components/Schedule';
import {useState, useEffect} from 'react';
import { Container, } from "react-bootstrap";
import '../CSS/ClubSchedule.css';

function ClubSchedule({setAuth}) {

    const [apps, setApps] = useState([]);

    const getApps = async () => {

        const res =  await fetch("http://localhost:3001/getapps",{
            method: "GET",
            headers: {"Content-Type": "application/json", token: localStorage.token},
        })
      
        const jsonData = await res.json();

        if(jsonData.msg === "Token is not valid"){
            setAuth(false);
        }
        else{
            const data = jsonData.rows;    
            setApps(data)
        }
    }

    useEffect(() => {
        getApps();
    }, []);

  return (

    <Container fluid>
        <h1 className='title'>Club Schedule</h1>
        <Schedule appointments={apps}/>
    </Container>

    

  )
}

export default ClubSchedule