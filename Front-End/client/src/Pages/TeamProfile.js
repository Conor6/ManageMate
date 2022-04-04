import React from 'react'
import { Container, Row } from "react-bootstrap";
import '../CSS/TeamProfile.css'
import Schedule from './Schedule';
import {useState} from 'react';


function TeamProfile() {

    const getTeamDetails = async () => {

        const info = {
            
        }
        
        const body = info;
        const res = await fetch("http://localhost:3001/getuserteams",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        });
        
        const jsonData = await res.json();
        let data = jsonData.rows;

    }


  return (

    <Container fluid className='team-profile-container col-12'>
        <div className='team-header'>
            <h1 className='team-name col-12'>Team Name</h1>

        </div>

        <Container className='team-details-container'>
            <div className='team-details'>

                <h3 className='training-time'>Coach:</h3>
                <h3 className='training-time'>Manager:</h3>

                <h2 className='details-header'>Details</h2>
                <h3 className='training-time'>Upcoming bookings:</h3>
                <div className='scheduler'>
                    <Schedule></Schedule>
                </div>
                

            </div>

        </Container>



    </Container>
  )
}

export default TeamProfile;