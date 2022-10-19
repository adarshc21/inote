import React from 'react'
import NoteState from './context/note/NoteState'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import Home from './components/note/Home'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <NoteState>
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>}/>  
            <Route path="/login" element={<Login/>}/>  
            <Route path="/signup" element={<Signup/>}/>  
            <Route path="/*" element={<Navigate to="/"/>}/>  
          </Routes>  
        </Router>  
    </NoteState>
  )
}

export default App