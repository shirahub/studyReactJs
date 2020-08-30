import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from "react-router-dom"
import './App.css';
import { Component } from 'react';
import { Header, Footer } from "./template/index"
import {Test} from "./pages/Test"
import { LoginSuccess } from './pages/Login';
import { Logout  } from './pages/Logout';
import { MyHome  } from './pages/MyHome';



class App extends Component {
  constructor() {
    super();
    
    this.state = {
      datalist: [{"user":"shir", "pass":"leen"}],
      theUser: '',
      pesanSaya: '',
    };
  }

  mengubahPesanSaya(pesan) {
    this.setState({
      pesanSaya: pesan
    })
  }

  aUserHasLoggedOn = (user) => {
    this.setState({
      theUser: user
    })
  }

  aUserHasLoggedOut = () => {
    this.setState({
      theUser: ''
    })
  }

  LoginSuccess = () => {
    if (this.state.theUser!=='') {
      return <Redirect to="/loginsuccess"></Redirect>
    }
  }

  newUserRegistration = (user) => {
    this.setState( {
      datalist: user
    })
  }



  render() {
    console.log("pesansaya: " + this.state.pesanSaya)
    return (
      <Router>
        <div>
          <Header theUser={this.state.theUser}  />
          {this.LoginSuccess()}
          <Switch>
          <Route path="/" exact>
              <MyHome data="ini data" mengubahPesanSaya={this.mengubahPesanSaya.bind(this)}></MyHome>
            </Route>
            <Route path="/login">
              <Test theUser={this.state.theUser} datalist={this.state.datalist} aUserHasLoggedOn={this.aUserHasLoggedOn.bind(this)} newUserRegistration={this.newUserRegistration.bind(this)} />
            </Route>
            <Route path="/loginsuccess">
              <LoginSuccess datalist={this.state.datalist}></LoginSuccess>
            </Route>
            <Route path="/logout">
              <Logout theUser={this.state.theUser} aUserHasLoggedOut={this.aUserHasLoggedOut.bind(this)}  />
            </Route>
          </Switch>
        </div>
      </Router>

    )
  }
}

export default App;
