import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useRef} from "react";
import {useNavigate } from "react-router-dom";

function Login({setAuth}) {

  let navigate = useNavigate();

  const usr_email = useRef(null);
  const usr_password = useRef(null);
    

  const loginUser =  async () => {

      const data = {
      
        usr_email: usr_email.current.value,
        usr_password: usr_password.current.value
    
      }

      try{

        const body = data;

        const response = await fetch("http://localhost:3001/login", {

          method: "POST",
          headers: {"Content-Type": "application/json", },
          body: JSON.stringify(body)

        });
        
        console.log(response.status);

        if(response.status === 200){

          navigate("/gymlist");

          console.log("Navigating...");

        }
        
      }
      catch(err){
        
          console.log(err.message)
        
      }
    
  }

  return (
    <div className="text-center col-md-6 mx-auto" id="loginDiv">

      <h2 className="loginTitle" id="login-title">Login</h2>

      <Form>
        <Form.Group className="mb-3" controlId="userEmail">

          <Form.Control className="text-center col-md-6 mx-auto" type="email" placeholder="Email" ref = {usr_email}/>
          
        </Form.Group>

        <Form.Group className="mb-3" id="usrPassword" controlId="Password">

          <Form.Control className="text-center col-md-6 mx-auto" type="password" placeholder="Password" ref = {usr_password}/>

        </Form.Group>

        <Button id="loginBtn" variant="primary" onClick={()=> setAuth(true)}>Login</Button>

      </Form>
    </div>
  );
}

export default Login;
