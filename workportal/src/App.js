import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Header, Footer } from './template';
import { Error, Home, LoginPage, Employee, Hrd, LogoutPage } from './pages/index';
import './App.css';

function App() {
  return (
    <div className="theHome">
      <Router>
        <Header />
       
        <Switch>
          {/* <Route path="/loginkaryawan" component={LoginPage} /> */}
          <Route path="/login" component={LoginPage} />
          <Route path="/logout" component={LogoutPage} />
          <Route path="/employee" component={Employee} />
          <Route path="/hrd" component={Hrd} />
          <Route path="/" component={Home} exact />
          <Route component={Error} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;