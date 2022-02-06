import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import AddCourt from './Pages/AddCourt';
import AddGym from './Pages/AddGym';


function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/addcourt" element={<AddCourt />}/>
        <Route path="/addgym" element={<AddGym />}/>
      </Routes>
    </Router>

  )

  
}

export default App;
