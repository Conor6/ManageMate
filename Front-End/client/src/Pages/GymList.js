import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useRef, useState} from "react";
import {useNavigate } from "react-router-dom";
import axios from "axios";


function GymList() {


    const [gym_data, setGymData] = useState({});

    const getGyms =  async e => {
        
        /*try{

            const response = await fetch("http://localhost:3001/gymlist", {

                method: "GET",
                headers: {"Content-Type": "application/json"},
                

            });
        
            console.log("Select")

            console.log(response);

            
        
        }
        catch(err){
        
            console.log(err.message)

        }
        */



        const gym_list = await axios.get("http://localhost:3001/gymlist");


        let data = gym_list.data;
        console.log(data.rows);

        

        setGymData(data.rows);

        

        console.log(gym_data);

        
    
    }

    getGyms();


  return (
    
    <div className=" col-md-6 mx-auto" id="gymProfileDiv">
      
        {gym_data.map((gym)=> (
            <h1>{gym.rows[0]}</h1>
        ))}




      
    </div>
  );
}

export default GymList;
