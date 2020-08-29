import React, { Component } from 'react';
import { Link } from "react-router-dom"

export class Header extends Component {
    constructor(props) {
        super(props);
    }

   isLoggedIn() {
      if (this.props.theUser !== '') {
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
    render() {
      console.log(this.props.theUser)
        return (
<header>
        <div className="logo">
          <Link to="/">
            <h1>WorkLeen</h1>
            <h2>Kerja Keras Bagai Kuda</h2>
          </Link>
        </div>
        <div className="links-container">
          {this.isLoggedIn()}
        </div>

        
      </header>
    )
    }
}



