import React, { Component } from 'react';
import { Link } from "react-router-dom"

export class Header extends Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        return (
<header>
        <div className="logo">
          <Link to="/">
            <h1>WorkLeen</h1>
            <h2>Kerja Keras Bagai Kuda</h2>
          </Link>
        </div>
        <div className="links-container">
          {isLoggedIn()}
        </div>
      </header>
    )
    }
}

function isLoggedIn() {
    if ((sessionStorage.getItem("isUserOn")) === "true") {
      return (
        <div className="logout">
          <Link to="/logout"><h3>Logout</h3></Link>
        </div>
      )
    }
    return (
      <div className="login">
        <Link to="/login"><h3>Login</h3></Link>
      </div>
    )
  }
