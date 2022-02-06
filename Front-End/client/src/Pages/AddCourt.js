import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css'
import { useRef} from "react";

function AddCourt() {
    
  const cNameRef = useRef(null);
  const cDescRef = useRef(null);
    

  const saveCourt =  async e => {

    const data = {
      
      crt_name: cNameRef.current.value,
      crt_desc: cDescRef.current.value

    }
    
    try{

      const body = data;
    
      //console.log("Court Name ");
      //console.log(body);
    
      const response = await fetch("http://localhost:3001/addcourt", {

        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)

      });
    
      console.log(response);
    
    }
    catch(err){
    
      console.log(err.message)
    
    
    }
      
  }
    
    return (
  
        <div className=" col-md-6 mx-auto" id="addCourtDiv">
        
            <h2 className="courtTitle" id="courtTitle">Add Court</h2>

            <Form>
                <Form.Group className="mb-3" controlId="courtName">

                    <Form.Label className="courtLabels">Court Name:</Form.Label>

                    <Form.Control ref ={cNameRef} className="" type="text" />

                </Form.Group>

                <Form.Group className="mb-3" id="courtDesc" controlId="crtDescription">

                    <Form.Label className="courtLabels">Court Description:</Form.Label>

                    <Form.Control ref = {cDescRef} className="" type="text" />

                </Form.Group>

                <Button className="col-2" id="courtSaveBtn" variant="primary" onClick={()=> saveCourt()} >Save</Button>

            </Form>

        </div>
  
    );
  }
  
  export default AddCourt;