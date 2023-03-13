import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css'


import { Login } from "./Components/Login";
import { Signup } from './Components/Signup';
import { Profile } from "./Components/Profile";



function App() {
  return (

    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Login />}/>
          <Route path = '/signup' element={<Signup />}/>
          <Route path = '/profile' element={<Profile />}/>
        </Routes>
      </div>
    </Router>

  )
}

export default App
