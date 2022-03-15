import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useRef } from "react";
import {useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

function SignUp({setAuth}) {

  let navigate = useNavigate();

    const usr_email = useRef(null);
    const usr_password = useRef(null);
    const usr_type = useRef(null);
    

    const signUpUser =  async () => {

      const data = {
      
        usr_email: usr_email.current.value,
        usr_password: usr_password.current.value,
        usr_type : usr_type.current.value
    
      }

      try{

        const body = data;

        const response = await fetch("http://localhost:3001/signup", {

          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body)

        });
        
        //console.log(response);

        /*if(response.status === 200){
          navigate("/");
        }
        */
       
        const parseRes = await response.json();

        console.log(parseRes);

        localStorage.setItem("token", parseRes.token);
        setAuth(true);

        
      }
      catch(err){
        
        console.log(err.message)
        
      }
    
  }
  return (
    <div className="text-center col-md-6 mx-auto" id="loginDiv">

      <h2 className="loginTitle" id="login-title">Sign Up</h2>

      <Form>
        <Form.Group className="mb-3" controlId="userEmail">

          <Form.Control className="text-center col-md-6 mx-auto" type="email" placeholder="Email" ref = {usr_email}/>
          
        </Form.Group>

        <Form.Group className="mb-3" id="usrPassword" controlId="Password">

          <Form.Control className="text-center col-md-6 mx-auto" type="password" placeholder="Password" ref = {usr_password}/>

        </Form.Group>

        <Form.Group className="mb-3" id="usrPassword" controlId="Password">

          <Form.Control className="text-center col-md-6 mx-auto" type="text" placeholder="Select User Type" ref = {usr_type}/>

        </Form.Group>


        <Button id="loginBtn" variant="primary" onClick={()=> signUpUser()}>Sign Up</Button>

      </Form>
    </div>
  );
}

export default SignUp;
