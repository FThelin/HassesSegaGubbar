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
        <Link to="/games">MATCHER</Link>
        <p>|</p>
        <a href="http://www.korpengbg.se/Innebandy/2020-21/" target="_blank">TABELL</a>
      </div>
    </div>
  )
}

export default Navbar