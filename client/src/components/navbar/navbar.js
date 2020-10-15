import React from 'react';
import './navbar.css'
import Logo from "../../img/logo.png"
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className={"navbar-container"}>
      <div className={"navbar-image-container"}>
        <img src={Logo} alt="logo" />
      </div>
      <div className={"navbar"}>
        <Link to="/scores">POÄNGLIGAN</Link>
        <p>|</p>
        <a href="#">MATCHER</a>
        <p>|</p>
        <a href="#">TABELL</a>
      </div>
    </div>
  )
}

export default Navbar