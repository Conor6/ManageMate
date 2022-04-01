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
import S2 from './Pages/S2';
import S3 from './Pages/S3';
import Sidebar from './Components/SideBar';
import TeamProfile from './Pages/TeamProfile';
import  AppBar  from './Components/AppBar';
import Email from './Pages/Email';


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

          <AppBar>
            
          </AppBar>        

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
            <Route path="/sidebar" element={<Sidebar/> } />
            <Route path="/teamprofile" element={<TeamProfile/> } />
            <Route path="/appbar" element={<AppBar/> } />
            <Route path="/email" element={<Email/> } />


          </Routes>

        </Router>
      </StyledEngineProvider>
    </>





  )

  
}

export default App;
