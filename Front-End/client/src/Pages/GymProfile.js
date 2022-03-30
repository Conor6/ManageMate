import '../CSS/GymProfile.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate, useParams } from "react-router-dom";
import {Navbar, Container, Nav} from 'react-bootstrap';


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
        
            <div className='heading'>

                <h1 className='gym-name'> {gym_name.gym_name} </h1>

            </div>

            <Container className='Pictures'>
            </Container>

            <Container className='content'>

                <Navbar className='content-nav-bar' bg="primary" variant="dark">
                    
                    <Container className="justify-content-center">

                        <Nav className="test">

                            <Nav.Link className="title" href="#schedule">Schedule</Nav.Link>
                            <Nav.Link className="title"  href="#details">Details</Nav.Link>
                            <Nav.Link className="title"  href="#location">Location</Nav.Link>
                            <Nav.Link className="title"  href="#add-court">Courts</Nav.Link>                        
                            
                        </Nav>

                    </Container>
                </Navbar>

                <Container className='content-view'>
                    
                
                </Container>

               

            </Container>
                        
                

                
            <button onClick={()=> toAddCourt(gym_name.gym_name)}>Add court</button>

        </>
        
    );
}
  
export default GymProfile;