import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate()
  
  function handleLogout(){
    localStorage.removeItem("authToken");
    navigate("/");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow-sm">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Note2Cloud
        </NavLink>
        { token===null && 
        <div className="d-flex gap-2">
          <NavLink className="py-2 px-4 text-dark" style={{textDecoration:"none"}} to="/login">Login</NavLink>
          <NavLink className="btn btn-outline-primary px-3" to="/signup">Signup</NavLink>
        </div>
        } 
        { token!==null && 
        <div className="d-flex gap-2">
          <button className="btn btn-outline-primary px-3" onClick={handleLogout}>Logout</button>
        </div>
        } 
      </div>
    </nav>
  );
}
