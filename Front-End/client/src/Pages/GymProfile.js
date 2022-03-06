import './GymProfile.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate, useParams } from "react-router-dom";
import {Navbar, Container, Nav, Row} from 'react-bootstrap';





function GymProfile() {
    
    let navigate = useNavigate();
    let gym_name = useParams();

    console.log(gym_name.gym_name);

    console.log(gym_name);


    const toAddCourt = (gym_name) => {

        console.log(gym_name);

        navigate(`/addcourt/${gym_name}`);


    }

    return (

        
        <>
            <Navbar className='navbar' bg="primary" variant="dark">
                
                <Navbar.Brand href="#home">ManageMate</Navbar.Brand>
                <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#gym-list">Gym List</Nav.Link>
                <Nav.Link href="#my-team">My Team</Nav.Link>
                </Nav>

            </Navbar>
            
            <div className='heading'>

                <h1 className='gym-name'> {gym_name.gym_name} </h1>

            </div>

            <Container>

                <Navbar className='content-view' bg="primary" variant="dark">
                    
                    <Container>

                        <Nav className="content-view me-auto">

                            <Container fluid>

                                <Nav.Link className="title" href="#schedule">Schedule</Nav.Link>
                                <Nav.Link className="title"  href="#details">Details</Nav.Link>
                                <Nav.Link className="title"  href="#location">Location</Nav.Link>

                            </Container>
                            
                        </Nav>

                    </Container>
                </Navbar>

            </Container>
                        
                

                
            <button onClick={()=> toAddCourt(gym_name.gym_name)}>Add court</button>

        </>
        
    );
}
  
export default GymProfile;