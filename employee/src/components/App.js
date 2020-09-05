import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"

import { connect } from 'react-redux';

import '../styles/App.css';
import {Footer} from './Footer';
import Header from './Header';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import Home from '../pages/Home';
import SeeAllEmployee from '../pages/SeeAllEmployee';
import { FirebaseContext } from '../config';

let App = ({info}) => (
  <div >
    <Router>
      {userOn(info.isLogin)}
      <FirebaseContext.Consumer>
        {checkFirebase()}
      </FirebaseContext.Consumer>
          <Header />
          <Switch>
          <Route path="/" exact>
            <Home></Home>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/logout">
              <Logout></Logout>
            </Route>
            <Route path="/seeallemployee">
              <SeeAllEmployee></SeeAllEmployee>
            </Route>
          </Switch>
          <Footer />
        </Router>
  </div>

)

const checkFirebase = () => {
  return firebase => (
    <div>Firebase sukses!</div>
  )
}

const userOn = (user) => {
  console.log(user)
  if (user !== false) {
    return (
      <Redirect to="/"></Redirect>
    )
  }
}

const mapStateToProps = (state) => ({
  info: state.auth
})


App = connect(mapStateToProps)(App)

export default App;
