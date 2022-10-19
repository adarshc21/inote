import React, { useState } from 'react'
import {NavLink, useNavigate} from "react-router-dom"

export default function Login() {

  const [credentials, setCredentials] = useState({email:"", password:""})

  async function getUser(){
    const response = await fetch("http://localhost:5000/v1/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials)
    })
    const data = await response.text();
    localStorage.setItem("authToken", data);
  }
  
  const navigate = useNavigate();
  function handleSubmit(e){
    e.preventDefault();
    getUser();
    navigate("/");
  }

  function onChange(e){
    setCredentials({...credentials, [e.target.name]:e.target.value})
  }

  return (
    <div className="container d-flex align-items-center justify-content-center w-100" style={{minHeight:"80vh"}}>
      <form className='shadow p-4' style={{maxWidth:"500px"}} onSubmit={handleSubmit}>
        <h5 className='my-2'>Login to conitnue</h5>
        <hr />
        <div className="mb-3" >
          <label htmlFor="exampleInputEmail0" className="form-label">Email address</label>
          <input type="email" name='email' onChange={onChange} className="form-control" autoComplete='username' id="exampleInputEmail0" aria-describedby="emailHelp"/>
          <small style={{fontSize:"11px"}}>please enter valid email</small>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" name='password' onChange={onChange} autoComplete='current-password' className="form-control" id="exampleInputPassword1"/>
          <small style={{fontSize:"11px"}}>password should atleast 7 mix chars</small>
        </div>
        <button type="submit" className="btn btn-primary px-4">Login</button>
        <p className='pt-3' style={{fontSize: "13px"}}>
          New user <NavLink to="/signup" style={{textDecoration:"none"}}>click here</NavLink>
        </p>
      </form>
    </div>
  )
}
