import './App.css';
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";

function AddCourt() {
    
    
    return (
  
        <div className=" col-md-6 mx-auto" id="addCourtDiv">
        
            <h2 className="courtTitle" id="courtTitle">Add Court</h2>

            <Form>
                <Form.Group className="mb-3" controlId="courtName">

                <Form.Label className="courtLabels">Court Name:</Form.Label>

                <Form.Control className="" type="text" />

                </Form.Group>

                <Form.Group className="mb-3" id="courtDesc" controlId="crtDescription">

                <Form.Label className="courtLabels">Court Description:</Form.Label>

                <Form.Control className="" type="text" />

                </Form.Group>

                <Button className="col-2" id="courtSaveBtn" variant="primary">Save</Button>

            </Form>

        </div>
  
    );
  }
  
  export default AddCourt;