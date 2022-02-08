import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import AddCourt from './Pages/AddCourt';
import AddGym from './Pages/AddGym';
import GymList from './Pages/GymList';


function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/addcourt" element={<AddCourt />}/>
        <Route path="/addgym" element={<AddGym />}/>
        <Route path="/gymlist" element={<GymList />}/>
      </Routes>
    </Router>

  )

  
}

export default App;
