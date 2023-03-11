import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css'


import { Login } from "./Login";
import { Signup } from './Signup';
import { Profile } from "./Profile";

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
