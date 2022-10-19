import React, { useState } from 'react'
import {NavLink, useNavigate} from "react-router-dom"

export default function Signup() {

  const [credentials, setCredentials] = useState({name:"", email:"", password:""})

  function onChange(e){
    setCredentials({...credentials, [e.target.name]:e.target.value})
  }

  async function setUser(){
    const response = await fetch("http://localhost:5000/v1/api/auth/signup", {
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
    setUser();
    navigate("/");
  }

  return (
    <div className="container d-flex align-items-center justify-content-center w-100" style={{minHeight:"80vh"}}>
      <form className='shadow p-4' style={{MaxWidth:"500px"}} onSubmit={handleSubmit}>
        <h5 className='my-2'>Create new account</h5>
        <hr />
        <div className="mb-3">
          <label htmlFor="exampleInputEmail0" className="form-label">Name</label>
          <input type="text" name='name' onChange={onChange} className="form-control" id="exampleInputEmail0" aria-describedby="emailHelp"/>
          <small style={{fontSize:"11px"}}>name atleast 3 chars</small>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" onChange={onChange} name='email' className="form-control" autoComplete='username' id="exampleInputEmail1" aria-describedby="emailHelp"/>
          <small style={{fontSize:"11px"}}>please enter valid email</small>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" onChange={onChange} name='password' autoComplete='current-password' className="form-control" id="exampleInputPassword1"/>
          <small style={{fontSize:"11px"}}>password should atleast 7 mix chars</small>
        </div>
        <button type="submit" className="btn btn-primary">Create account</button>
        <p className='pt-3' style={{fontSize: "13px"}}>
          Already have an account <NavLink to="/login" style={{textDecoration:"none"}}>Login</NavLink>
        </p>
      </form>
    </div>
  )
}
