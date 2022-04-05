import React from 'react'
import { Container, Row } from "react-bootstrap";
import '../CSS/TeamProfile.css'
import Schedule from './Schedule';
import {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";


function TeamProfile() {

    const [teamData, setTeamData] = useState();
    const [loading, setLoading] = useState(true);
    const [teamApps, setTeamApps] = useState();
    let teamName = useParams();

    const getTeamInfo = async (teamName) => {

      const data = {
        t_name: teamName.team,
      }
    
      const body = data;
      const res =  await fetch("http://localhost:3001/get-team",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      })

      const jsonData = await res.json();
      setTeamData(jsonData.rows[0])
      setLoading(false);
    }

    const getTeamApps = async (teamName) => {
      const data = {
        team: teamName.team,
      }
    
      const body = data;
      const res =  await fetch("http://localhost:3001/get-team-apps",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      })

      const jsonData = await res.json();
      setTeamApps(jsonData.rows)
    }

    useEffect(() => {

      getTeamInfo(teamName);
      getTeamApps(teamName);

    }, []);


  return (

    <Container fluid className='team-profile'>
      {!loading ? (
        <Container fluid className='team-container'>
          <h1 className='team-name col-12'>{teamName.team}</h1>
                
          <Container fluid className='team-details'>
            <Container fluid className='details'>
              <h2 className='details-header'>Team Details</h2>

              <h3 className='coach'>Coach: {teamData.t_coach}</h3>
              <h3 className='manager'>Manager: {teamData.t_manager}</h3>
              <h3 className='manager'>Training Days:</h3>

            </Container>

            <Container fluid className='schedule'>
              <h2 className='training-time'>Team Schedule:</h2>
              <Schedule appointments={teamApps}></Schedule>
            </Container>


          </Container>
        </Container>
        ):(

          <h1>Loading...</h1>
        )
      }
        

    </Container>
  )
}

export default TeamProfile;