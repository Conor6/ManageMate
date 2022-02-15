import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate, useParams } from "react-router-dom";




function GymProfile() {
    
    let navigate = useNavigate();
    let gym_id = useParams();

    console.log(gym_id.gym_id);


    const toAddCourt = (gym_id) => {

        console.log(gym_id);

        navigate(`/addcourt/${gym_id}`);


    }

    return (

        <>
            <h1>Gym Profile for id = {gym_id.gym_id}</h1>

            <button onClick={()=> toAddCourt(gym_id.gym_id)}>Add court</button>
  
        </>
    );
}
  
export default GymProfile;