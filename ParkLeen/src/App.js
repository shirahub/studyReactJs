import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Home, Login, Error, AdminPortal, Logout } from "./pages/index";

function App() {
  return (
    <Router>
      <header>
        <div className="logo">
          <Link to="/">
            <h1>ParkLeen</h1>
            <h2>Masuk Gratis, Keluar Bayar</h2>
          </Link>
        </div>
        <div className="links-container">
          {isLoggedIn()}
        </div>
      </header>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/admin" component={AdminPortal} />
        <Route component={Error} />
      </Switch>
      <footer>
        <h5>@2020Shirleen</h5>
      </footer>
    </Router>
  );
}

export default App;

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

/*
TUGAS:
  - Convert/Buat Website Parkir menjadi sebuah aplikasi React
  - Halaman:
    - Masuk
    - Keluar
    - Log
    - Login
*/
