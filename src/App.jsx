import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Landing from './Pages/Landing.jsx'
import Home from './pages/Home.jsx'
import Navbar from './components/Navbar.jsx'
import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
