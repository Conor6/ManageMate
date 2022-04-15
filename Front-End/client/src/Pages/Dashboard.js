import { useEffect, useState} from "react";
import {useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";

function Dashboard({setAuth}) {

  
  

  return (
    <Container fluid>
        <h1>Dashboard</h1>

        <Button id="Btn" variant="primary" onClick={()=> setAuth(false)}>Logout</Button>

    </Container>
  );
}

export default Dashboard;