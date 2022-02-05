import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useRef} from "react";

function AddGym() {

    const gym_name = useRef(null);
    const gym_address = useRef(null);
    const gym_opening_hours = useRef(null);
    

    const insertGym =  async e => {

        const data = {
      
            gym_name: gym_name.current.value,
            gym_address: gym_address.current.value,
            gym_opening_hours: gym_opening_hours.current.value
    
        }

        try{

            const body = data;

            const response = await fetch("http://localhost:3001/addgym", {

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
    <div className=" col-md-6 mx-auto" id="addGymDiv">

      <h2 className="loginTitle" id="gymTitle">Add Gym</h2>

      <Form>
        <Form.Group className="mb-3" controlId="gymName">

          <Form.Label className="gymLabels">Gym Name:</Form.Label>
          <Form.Control className="" type="text" ref = {gym_name}/>

        </Form.Group>

        <Form.Group className="mb-3" id="gymAddr" controlId="gymAddress">

          <Form.Label className="gymLabels">Gym Address:</Form.Label>
          <Form.Control className="" type="text" ref = {gym_address}/>

        </Form.Group>

        <Form.Group className="mb-3" id="gymHours" controlId="gymTime">

          <Form.Label className="gymLabels">Opening Hours:</Form.Label>
          <Form.Control className="" type="text" ref = {gym_opening_hours}/>

        </Form.Group>

        <Button className="col-2" id="gymSaveBtn" variant="primary"onClick={()=> insertGym()}>Save</Button>

      </Form>

    </div>
  );
}

export default AddGym;
