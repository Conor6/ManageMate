import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useEffect, useRef, useState} from "react";
import {useNavigate } from "react-router-dom";

function GymList() {

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


  return (
    
    <div className=" col-md-6 mx-auto" id="gymProfileDiv">

      <table className="table table-bordered">
          <thead>
            <tr>
              <th>Gym Name</th>
              <th>Edit Gym</th>
              <th>Delete Gym</th>
            </tr>
          </thead>
          <tbody>
            {gym_data.map(gym_data => (
              <tr>
                <td key={gym_data.id}>{gym_data.gym_name}</td>
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
