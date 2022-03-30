import React from 'react'
import { Container, Row } from "react-bootstrap";
import '../CSS/TeamProfile.css'
import Schedule from './Schedule';

function TeamProfile() {
  return (

    <Container fluid className='team-profile-container col-12'>
        <div className='team-header'>
            <h1 className='team-name col-12'>Team Name</h1>

        </div>

        <Container className='team-details-container'>
            <div className='team-details'>
                <h2 className='details-header'>Details</h2>
                <h3 className='training-time'>Upcoming bookings:</h3>
                <div className='scheduler'>
                    <Schedule></Schedule>
                </div>
                

                <h3 className='training-time'>Coach:</h3>
                <h3 className='training-time'>Manager:</h3>
            </div>
            <div className='parents-details'>
                <h3>List of parents emails to remind about training etc...</h3>
            </div>
        </Container>



    </Container>
  )
}

export default TeamProfile;