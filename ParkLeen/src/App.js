import React, {useState} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { Home, Login, Error, AdminPortal, Logout } from "./pages/index";

function App() {

  const [theUser, setTheUser] = useState('');

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
          {isLoggedIn(theUser)}
        </div>
      </header>
      {isLoggedInPortal(theUser)}
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login">
          <Login theUser={theUser} login={theUser => setTheUser(theUser)}></Login>
        </Route>
        <Route path="/logout" >
      <Logout logout={theUser => setTheUser(theUser)}></Logout>
        </Route>

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

function isLoggedIn(theUser) {
  if (theUser !== '') {
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

function isLoggedInPortal(theUser) {
  if (theUser !== '') {
    return (
        <Redirect to="/admin"></Redirect>
    )
  } else {
    return (
      <Redirect to="/"></Redirect>
  )
  }
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
