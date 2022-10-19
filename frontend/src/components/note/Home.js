import React, { useEffect } from 'react'
import Notes from './Notes'
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  
  useEffect(()=>{
    if(token === null){
      navigate("/login");      
    }
  })

  return (
    <>
      <AddNote/>
      <Notes/>`
    </>
  )
}
