//source: https://gist.github.com/joelgriffith/43a4a8195c9fd237a222fe84c2b2e2b4
//with modification
import React, { Component } from 'react';
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link
//   } from "react-router-dom";
//   import {Home} from "./pages/index";

class LoginPage extends Component {
    constructor() {
        super();
        this.state = {
            datalist: {"user":"shir", "pass":"leen"},
            username: '',
            password: '',
            error: '',
        };

        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dismissError = this.dismissError.bind(this);
    }

    dismissError() {
        this.setState({ error: '' });
    }

    handleSubmit(evt) {
        evt.preventDefault();

        // const { history } = this.props;

        if (!this.state.username) {
            return this.setState({ error: 'Username is required' });
        }

        if (!this.state.password) {
            return this.setState({ error: 'Password is required' });
        }

        if (this.state.username === this.state.datalist.user && this.state.password === this.state.datalist.pass) {
            
            this.props.login(this.state.username)
            // history.push('/admin');
            // window.location.reload(false)
        } else {
            return this.setState({error:'Username or Password invalid'})
        }
    }

    handleUserChange(evt) {
        this.setState({
            username: evt.target.value,
        });
    };

    handlePassChange(evt) {
        this.setState({
            password: evt.target.value,
        });
    }

    render() {

        return (
            <div className="login-container">
                <div className="login-form">
                    <form onSubmit={this.handleSubmit}>
                        <div>
                        <label>User Name</label>
                        <br />
                        <input type="text" data-test="username" value={this.state.username} onChange={this.handleUserChange} />
                        </div>
                        <div>
                        <label>Password</label>
                        <br />
                        <input type="password" data-test="password" value={this.state.password} onChange={this.handlePassChange} />
                        </div>
                        <br />
                        <div>
                        <input type="submit" value="Log In" data-test="submit" />
                        </div>
                    </form>
                    {
                        this.state.error &&
                        <h3 data-test="error" onClick={this.dismissError}>
                            
                            {this.state.error}
                        </h3>
                    }
                </div>
            </div>
        );
    }
}

export default LoginPage;