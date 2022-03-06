import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import AddCourt from './Pages/AddCourt';
import AddGym from './Pages/AddGym';
import GymList from './Pages/GymList';
import GymProfile from './Pages/GymProfile';
import {Navbar, Nav} from 'react-bootstrap';


function App() {
  return (

    
      <><Navbar className='navbar' bg="primary" variant="dark">

      <Navbar.Brand href="#home">ManageMate</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="http://localhost:3000/">Home</Nav.Link>
        <Nav.Link href="http://localhost:3000/gymlist">Gym List</Nav.Link>
        <Nav.Link href="#my-team">My Team</Nav.Link>
      </Nav>

    </Navbar><Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/addcourt/:gym_id" element={<AddCourt />} />
          <Route path="/addgym" element={<AddGym />} />
          <Route path="/gymlist" element={<GymList />} />
          <Route path="/gymprofile/:gym_name" element={<GymProfile />} />
        </Routes>
      </Router></>

  )

  
}

export default App;
