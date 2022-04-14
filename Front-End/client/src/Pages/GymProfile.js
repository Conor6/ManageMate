import '../CSS/GymProfile.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate, useParams } from "react-router-dom";
import {Navbar, Container, Nav} from 'react-bootstrap';


function GymProfile({setAuth}) {
    
    let navigate = useNavigate();
    let gym_name = useParams();

    const toAddCourt = (gym_name) => {
        navigate(`/addcourt/${gym_name}`);
    }

    return (
        <>
            <div className='heading'>
                <h1 className='gym-name'> {gym_name.gym_name} </h1>
            </div>

            <button onClick={()=> toAddCourt(gym_name.gym_name)}>Add court</button>
        </>
    );
}
  
export default GymProfile;