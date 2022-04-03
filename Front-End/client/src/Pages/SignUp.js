import React from 'react'
import { useParams } from "react-router-dom";
import {useState, useEffect, useRef} from 'react';
import { Form, Button } from "react-bootstrap";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import '../CSS/SignUp.css'
import { useNavigate } from "react-router-dom";

function SignUp() {

    const [user, setUser] = useState({});
    const [teams, setTeams] = useState([]);
    let params = useParams();
    const usr_password = useRef(null);
    const usr_team = useRef(null);
    let navigate = useNavigate();

    const [teamName, setTeamName] = useState([])

    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setTeamName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
      
    };

    const getCreateAccount =  async () => {
        
      const res = await fetch(`http://localhost:3001/signup/${params.token}`,{
          method: "GET",
      });

      const jsonData = await res.json();

      if(jsonData.message === "jwt expired"){
        console.log("JWT expired")
      }
      else{
        console.log("JWT not expired");
        const userData = jsonData;
        setUser(userData)
      }
      
    };

    const updateUserData = async () => {

      const data = {
        usr_id: user.usr_id,
        usr_password: usr_password.current.value,
        usr_team : teamName,
      }

      const body = data;

      const response = await fetch(`http://localhost:3001/register-user`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body),
      });
      
      if(response.status === 200){
        navigate(`/`);
      }

    }

    const getTeams = async () => {

      const res = await fetch(`http://localhost:3001/get-teams`,{
          method: "GET",
          headers: {"Content-Type": "application/json"},
      });

      const jsonData = await res.json();
      const teamsData = jsonData.rows;

      let teams_array = [];
      teamsData.forEach(element => teams_array.push(element.t_name[0]));
      setTeams(teams_array);
    }

    useEffect(() => {
      getCreateAccount();
      getTeams();
    }, []);

  return (
    <div className="text-center col-md-6 mx-auto" id="loginDiv">

    <h2 className="loginTitle" id="login-title">Sign Up</h2>

    <Form>
      <Form.Group className="mb-3" id="usrPassword" controlId="Password">

        <Form.Label >Create Password:</Form.Label>
        <Form.Control className="text-center col-md-6 mx-auto" type="password" ref = {usr_password}/>

      </Form.Group>

      <Form.Group className="mb-3" id="usrSelect" controlId="Select">

        <Form.Label >Select the Team(s) you are the Manager/Coach of:</Form.Label>

        <div className='col-12'>
        <Select
          className='team-select'
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={teamName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          sx={{maxWidth: 350, width: 350}}
        >
          {teams.map((team) => (
            <MenuItem key={team} value={team}>
              <Checkbox checked={teamName.indexOf(team) > -1} />
              <ListItemText primary={team} />
            </MenuItem>
          ))}
        </Select>
        </div>
        
      </Form.Group>


      <Button id="loginBtn" variant="primary" onClick={updateUserData}>Sign Up</Button>

    </Form>
  </div>
    
  )
}

export default SignUp;