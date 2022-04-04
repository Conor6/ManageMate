import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {Navbar, Nav, Container} from 'react-bootstrap';
import { useEffect, useState} from "react";
import { StyledEngineProvider } from '@mui/material/styles';

import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import AddCourt from './Pages/AddCourt';
import AddGym from './Pages/AddGym';
import GymList from './Pages/GymList';
import GymProfile from './Pages/GymProfile';
import Dashboard from './Pages/Dashboard';
import Schedule from './Pages/Schedule';
import TeamProfile from './Pages/TeamProfile';
import  AppBar  from './Components/AppBar';
import Email from './Pages/Email';
import CreateAccount from './Pages/CreateAccount';
import TeamList from './Pages/TeamList';


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
      <StyledEngineProvider injectFirst>

        <Router>

          <AppBar></AppBar>        

          <Routes>

            <Route path="/" element={ !isAuthenticated ? ( <Login setAuth={setAuth}/> ) : (<Navigate to="/gymlist"/>)} />

            <Route path="/createaccount" element={ !isAuthenticated ? ( <CreateAccount setAuth={setAuth}/> ) : (<Navigate to="/"/>)} />

            <Route path="/addcourt/:gym_id" element={ isAuthenticated ? ( <AddCourt setAuth={setAuth}/> ) : (<Navigate to="/"/>)} />

            <Route path="/addgym" element={ isAuthenticated ? ( <AddGym setAuth={setAuth}/> ) : (<Navigate to="/"/>)} />

            <Route path="/gymlist" element={ isAuthenticated ? ( <GymList setAuth={setAuth}/> ) : (<Navigate to="/"/>)} />

            <Route path="/gymprofile/:gym_name" element={<GymProfile />} />

            <Route path="/dashboard" element={ isAuthenticated ? ( <Dashboard setAuth={setAuth}/> ) : (<Navigate to="/"/>)} />

            <Route path="/schedule" element={<Schedule /> } />

            <Route path="/teamprofile/:team" element={<TeamProfile/> } />

            <Route path="/email" element={<Email/> } />

            <Route path="/signup/:token" element={<SignUp /> } />

            <Route path="/teamlist" element={<TeamList /> } />



          </Routes>

        </Router>
      </StyledEngineProvider>
    </>





  )

  
}

export default App;
