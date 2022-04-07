import React from 'react'
import {useState, useEffect} from 'react';
import {useNavigate, useParams } from "react-router-dom";
import sampleImage from './images/black.jpg';
import {Card, Button, Container, Row, Col} from 'react-bootstrap';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box'

function TeamList() {

    const [userData, setUserData] = useState();
    const [userTeams, setUserTeams] = useState();
    const [loading, setLoading] = useState(true);
    let navigate = useNavigate();

    const getUserData =  async () => {
        
        const res = await fetch("http://localhost:3001/user-info",{
          method: "GET",
          headers: {token: localStorage.token}
        });
    
        const jsonData = await res.json();
        setUserData(jsonData);
    };

    const getUserTeams = async () => {

        const info = {
          usr_id: userData.usr_id,
        }
    
        const body = info;
        const res = await fetch("http://localhost:3001/getuserteams",{
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body)
        });
    
        const jsonData = await res.json();
        let data = jsonData.rows;
   
        data = data[0].usr_teams;
        let teamsArray = []
        let i = 1;

        ;
        

        //Modify the data so that it is compatible with the Select menus
        Object.keys(data).forEach(key => {
          
          teamsArray.push({id: i, team: data[key] })
          i++;
        })
        
        console.log(teamsArray);
        setUserTeams(teamsArray);
        setLoading(false);
    }

    const navButton = (userData) => {
      console.log("")
      navigate(`/teamprofile/${userData.team}`);
    }

    useEffect(() => {
        getUserData();
    }, []);

    useEffect(() => {

      if(userData != undefined){
        getUserTeams()
      }

    }, [userData]);


  return (

    <Container fluid className="container">
      <h1 className="title">My Teams</h1>
        {!loading ? (
          <>
            <Row xs={1} sm={2} md={3} lg={3} xl={3} xxl={3} className="con-rows g-6">
              {userTeams.map((userTeams) => (
                <Col className="con-column">
                  <Card style={{ width: '18rem' }} key={userTeams.id} className="cards">
                    <Card.Img variant="top" src={sampleImage}/>
                    <Card.Body>
                      <Card.Title>{userTeams.team}</Card.Title>
                      <Button variant="primary" onClick={() => navButton(userTeams)}>Profile</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>

        ):
        (
          <Box sx={{ display: 'flex', justifyContent: 'center', size: 25}}>
            <CircularProgress />
          </Box>
        )
      }
    </Container>

  )
}

export default TeamList