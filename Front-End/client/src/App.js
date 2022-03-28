import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';
import { useEffect, useState} from "react";

import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import AddCourt from './Pages/AddCourt';
import AddGym from './Pages/AddGym';
import GymList from './Pages/GymList';
import GymProfile from './Pages/GymProfile';
import Dashboard from './Pages/Dashboard';
import Schedule from './Pages/Schedule';
import S2 from './Pages/S2';
import S3 from './Pages/S3';


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function stillAuth() {
    try{

      const response = await fetch("http://localhost:3001/verify",{

        method: "GET",
        headers: {token: localStorage.token}
      });

      const parseRes = await response.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);

    }
    catch(err){

      console.log(err.message);

    }
  }

  useEffect(() => {
    stillAuth()
  }, [])

  return (

    <>
      <Navbar className='navbar' bg="primary" variant="dark">

        <Navbar.Brand href="#home">ManageMate</Navbar.Brand>

        <Nav className="me-auto">
          <Nav.Link href="http://localhost:3000/">Home</Nav.Link>
          <Nav.Link href="http://localhost:3000/gymlist">Gym List</Nav.Link>
          <Nav.Link href="#my-team">My Team</Nav.Link>
          <Nav.Link href="#my-bookings">My Bookings</Nav.Link>
        </Nav>

      </Navbar>
    
      <Router>
      <Routes>

        <Route path="/" element={ !isAuthenticated ? ( <Login setAuth={setAuth}/> ) : (<Navigate to="/gymlist"/>)} />

        <Route path="/signup" element={ !isAuthenticated ? ( <SignUp setAuth={setAuth}/> ) : (<Navigate to="/"/>)} />

        <Route path="/addcourt/:gym_id" element={ isAuthenticated ? ( <AddCourt setAuth={setAuth}/> ) : (<Navigate to="/"/>)} />

        <Route path="/addgym" element={ isAuthenticated ? ( <AddGym setAuth={setAuth}/> ) : (<Navigate to="/"/>)} />

        <Route path="/gymlist" element={ isAuthenticated ? ( <GymList setAuth={setAuth}/> ) : (<Navigate to="/"/>)} />

        <Route path="/gymprofile/:gym_name" element={<GymProfile />} />

        <Route path="/dashboard" element={ isAuthenticated ? ( <Dashboard setAuth={setAuth}/> ) : (<Navigate to="/"/>)} />

        <Route path="/schedule" element={<Schedule/> } />
        <Route path="/S2" element={<S2/> } />
        <Route path="/S3" element={<S3/> } />

      </Routes>

      </Router>
    </>





  )

  
}

export default App;
