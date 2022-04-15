import { Form, } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useRef, useState } from "react";
import {useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

function CreateAccount({setAuth}) {
  
    const usr_email = useRef(null);
    const usr_password = useRef(null);
    const usr_type = useRef(null);
    const [value, setValue] = useState();
    const options = [{id: 1, name: "Manager"},{id: 2, name: "Coach"}, {id: 3, name: "Comittee Member"}];

    const signUpUser =  async () => {
      const data = {
        usr_email: usr_email.current.value,
        usr_password: usr_password.current.value,
        usr_type : usr_type.current.value
      }

      try{
        const body = data;
        const response = await fetch("http://localhost:3001/createaccount", {

          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body)

        });
        
        const parseRes = await response.json();
        localStorage.setItem("token", parseRes.token);
        setAuth(true);

      }
      catch(err){
        console.log(err.message)
      }
    
  }
  return (
    <div className="text-center col-md-6 mx-auto" id="loginDiv">

      <h2 className="loginTitle" id="login-title">Create Account</h2>

      <Form>
        <Form.Group className="mb-3" controlId="userEmail">

          <Form.Label htmlFor="inputText5">Email</Form.Label>
          <Form.Control className="text-center col-md-6 mx-auto" type="email" placeholder="Email" ref = {usr_email}/>
          
        </Form.Group>

        <Form.Group className="mb-3" id="usrPassword" controlId="Password">

          <Form.Label htmlFor="inputPassword5">Password</Form.Label>
          <Form.Control className="text-center col-md-6 mx-auto" type="password" placeholder="Password" ref = {usr_password}/>

        </Form.Group>

        <Form.Group className="mb-3" id="usrSelect" controlId="Select">

          <Form.Label htmlFor="inputText5">User Type</Form.Label>

          <Form.Select 
            className="text-center col-md-6 mx-auto" 
            type="text" placeholder="Select User Type" 
            ref = {usr_type}
            value = {value}
            onChange={(e) => setValue(e.target.value)}
          >

          {options.map((o) => {

            const { name} = o;
              return <option value={name}>{name}</option>;
          })}

          </Form.Select>

         

        </Form.Group>


        <Button id="loginBtn" variant="primary" onClick={()=> signUpUser()}>Create Account</Button>

      </Form>
    </div>
  );
}

export default CreateAccount;
