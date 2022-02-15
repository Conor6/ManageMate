import { useEffect, useState} from "react";
import {useNavigate, useParams } from "react-router-dom";

function GymList() {

  let navigate = useNavigate();

  const [gym_data, setGymData] = useState([]);

  const getGyms =  async () => {
        

    const res = await fetch("http://localhost:3001/gymlist");
    const jsonData = await res.json();
    const data = jsonData.rows
  
  
    setGymData(data);
  
  
  };


  useEffect(() => {

    getGyms();

  }, []);

  const alertCall = (gym_id) => {

    navigate(`/gymprofile/${gym_id}`);

    console.log(gym_id);



    
  }
  

  return (
    
    <div className=" col-md-6 mx-auto" id="gymProfileDiv">

      <table className="table table-bordered" variant="dark">
          <thead>
            <tr>
              <th>Gym Name</th>
              <th>Edit Gym</th>
              <th>Delete Gym</th>
            </tr>
          </thead>
          <tbody>
            {gym_data.map(gym_data => (
              <tr key={gym_data.gym_id} data-item={gym_data}>
                <td data-title="Gym-Name" key={gym_data.id} onClick={(e) => alertCall(gym_data.gym_id)}>{gym_data.gym_name}</td>
                <td>Edit</td>
                <td>Delete</td>
              </tr>
            ))}
          </tbody>
        </table>

    </div>
  );
}

export default GymList;