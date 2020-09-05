import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setLogin } from '../actions/index';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
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

        if (!this.state.username) {
            return this.setState({ error: 'Username is required' });
        }

        if (!this.state.password) {
            return this.setState({ error: 'Password is required' });
        }

        if (this.state.username === this.props.admin.user && this.state.password === this.props.admin.pass) {
            this.props.loginOK(this.state.username, this.props.admin.id, 'admin')
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

const mapStateToProps = (state) => ({
    admin: state.adminlogin.admin
})

const mapDispatchToProps = (dispatch) => ({
    loginOK: (user, id, role) => dispatch(setLogin(user, id, role))
})

Login = connect(mapStateToProps, mapDispatchToProps)(Login)


export default Login;