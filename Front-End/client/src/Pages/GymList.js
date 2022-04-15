import { useEffect, useState} from "react";
import {useNavigate, useParams } from "react-router-dom";
import {Card, Button, Container, Row, Col} from 'react-bootstrap';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import '../CSS/GymList.css'
import sampleImage from './images/black.jpg';

function GymList({setAuth}) {

  let navigate = useNavigate();
  const [gym_data, setGymData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const getGyms =  async () => {
    try{

      const res = await fetch("http://localhost:3001/gymlist",{
        method: "GET",
        headers: {"Content-Type": "application/json", token: localStorage.token},
      });
      const jsonData = await res.json();
      if(jsonData.msg === "Token is not valid"){
        setAuth(false);
      }
      else{
        const data = jsonData.rows;    
        setGymData(data);
        setLoading(false);
      }
    }
    catch(error)
    {
      console.log(error);
    }
  };
  useEffect(() => {
    getGyms();
  }, []);

  const getGymData = (gym_data) => {
    navigate(`/gymprofile/${gym_data.gym_name}`);
  }

  return (
    
    <Container fluid className="container">
      <h1 className="title">Gym List</h1>
        {!loading ? (
          <>
            <Row xs={1} sm={2} md={3} lg={3} xl={3} xxl={3} className="con-rows g-6">
              {gym_data.map((gym_data) => (
                <Col className="con-column">
                  <Card style={{ width: '18rem' }} key={gym_data.gym_id} className="cards">
                    <Card.Img variant="top" src={sampleImage}/>
                    <Card.Body>
                      <Card.Title>{gym_data.gym_name}</Card.Title>
                      <Button variant="primary" onClick={() => getGymData(gym_data)}>Profile</Button>
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
  );
}

export default GymList;
