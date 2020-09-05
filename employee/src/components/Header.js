import React from 'react';
import { Link } from "react-router-dom"
import { connect } from 'react-redux';

let Header = ({ info }) => (

    <header>
        {console.log(info)}
        <div className="logo">
            <Link to="/">
                <h1>Employleen</h1>
                <h2>We are Full Stuck Developer</h2>
            </Link>
        </div>
        <div className="login">
        {who(info.theUser)}
        </div>
        <div className="links-container">
            {isLoggedIn(info.isLogin)}
        </div>
    </header>
)
const who = (user) => {
    if (user !== '') {
        return (
            <div>
                <h3>Welcome, {user}</h3>
                </div>
        )
    }
}

const isLoggedIn = (statusLogin) => {

    if (statusLogin === true) {
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

const mapStateToProps = (state) => ({
    info: state.auth
})


Header = connect(mapStateToProps)(Header)

export default Header;


