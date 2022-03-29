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

  const appointments = [
    {  id: 1, title:'Mail New Leads for Follow Up', startDate: '2022-03-22T10:00', uid: 3},
    {  id: 2, title: 'Product Meeting', startDate: '2022-03-22T14:00', endDate: '2022-03-22T16:00' },
    {  id: 3, title: 'Send Territory Sales Breakdown', startDate: '2022-03-19T22:00' },
    {  id: 4, title: 'test', startDate: 'Mon Mar 22 2022 11:00:00 GMT+0000 (Greenwich Mean Time)', endDate: 'Mon Mar 22 2022 11:30:00 GMT+0000 (Greenwich Mean Time)', allDay: false},
    {  id: 5, title: 'testing, startDate'}
  ];


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



        <Route path="/schedule" element={<Schedule /> } />
        <Route path="/S2" element={<S2/> } />
        <Route path="/S3" element={<S3/> } />

      </Routes>

      </Router>
    </>





  )

  
}

export default App;
