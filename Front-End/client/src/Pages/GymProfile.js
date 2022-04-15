import '../CSS/GymProfile.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate, useParams,} from "react-router-dom";
import {Navbar, Container, Nav} from 'react-bootstrap';
import Schedule from '../Components/Schedule';
import { useState, useEffect } from 'react';


function GymProfile({setAuth}) {
    
    const [gymApps, setGymApps] = useState([]);
    let navigate = useNavigate();
    let gym_name = useParams();

    console.log(gym_name);

    const getGymApps = async (gym_name) => {

        console.log("Test "+gym_name);

        const data = {
            gym_name: gym_name
        }
      
        const body = data;
        const res =  await fetch("http://localhost:3001/getgymapps",{
          method: "POST",
          headers: {"Content-Type": "application/json", token: localStorage.token},
          body: JSON.stringify(body)
        })

        console.log("Ran");
        const jsonData = await res.json();
        setGymApps(jsonData.rows)
      }

      useEffect(() => {
        getGymApps(gym_name.gym_name);
      }, []);
  

    return (
        <>
            <Container className='heading'>
                <h1 className='gym-name'> {gym_name.gym_name} </h1>
                <Schedule appointments={gymApps}></Schedule>
            </Container>
        </>
    );
}
  
export default GymProfile;