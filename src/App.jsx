import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Landing from './pages/Landing.jsx'
import Home from './pages/Home.jsx'
import Navbar from './components/Navbar.jsx'
import Details from './pages/Details.jsx'
import StreamingPlatforms from './pages/StreamingPlatforms.jsx';
import Result from './pages/Result.jsx'
import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/home" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path='/streaming/:id' element={ <StreamingPlatforms />} />
        <Route path='/results' element={<Result />} />
      </Routes>
    </Router>
  )
}

export default App
