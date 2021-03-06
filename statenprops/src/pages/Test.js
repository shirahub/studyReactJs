import React, { Component } from 'react';
import loginpict from './loginpict.jpg';
import { Redirect, withRouter, useHistory } from 'react-router-dom';


export class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: '',
            showPopup: false,
            showPopupR: false,
            role: '',
            theUser: '',
            datalist: '',
        };
        

        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitR = this.handleSubmitR.bind(this);
        this.dismissError = this.dismissError.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
        this.togglePopup2 = this.togglePopup2.bind(this);
        this.togglePopupR2 = this.togglePopupR2.bind(this);
        this.togglePopupRegistrasi = this.togglePopupRegistrasi.bind(this);
    }


    togglePopup(name) {
        this.setState({
            showPopup: !this.state.showPopup,
        }, () => { this.stringrole = name; });

    }

    togglePopup2() {
        this.setState({
            showPopup: !this.state.showPopup,
        });
    }
    togglePopupR2() {
        this.setState({
            showPopupR: !this.state.showPopupR,
        });
    }
    togglePopupRegistrasi() {
        this.setState({
            showPopupR: !this.state.showPopupR,
        });
    }

    dismissError() {
        this.setState({ error: '' });
    }

    handleSubmit(evt) {
        // const history = useHistory();
        evt.preventDefault();
        if (!this.state.username) {
            return this.setState({ error: 'Username is required' });
        }

        if (!this.state.password) {
            return this.setState({ error: 'Password is required' });
        }

        var i;
        for (i = 0; i < this.props.datalist.length; i++) {
            if (this.props.datalist[i].user === this.state.username && this.props.datalist[i].pass === this.state.password) {

                this.props.aUserHasLoggedOn(this.state.username)
                console.log(this.props.theUser)
                // history.push("/loginsuccess");
                // window.location.replace("/loginsuccess");
                // return <Redirect to="/loginsuccess"></Redirect>
            } else {
                this.setState({ error: 'Username or Password invalid' })
            }
        }

    }

    handleSubmitR = async (evt) => {
        evt.preventDefault();

        if (!this.state.username) {
            return this.setState({ error: 'Username is required' });
        }

        if (!this.state.password) {
            return this.setState({ error: 'Password is required' });
        }

        var i;
        for (i = 0; i < this.props.datalist.length; i++) {
            if (this.props.datalist[i].user === this.state.username) {
                return this.setState({ error: 'Username has already been used' })
            }
        }

        var newUser = { "user": this.state.username, "pass": this.state.password }


        this.state.datalist =this.props.datalist
        this.state.datalist.push(newUser)
        this.props.newUserRegistration(this.state.datalist)
        this.props.aUserHasLoggedOn(this.state.username)


        // return <Redirect to="/"></Redirect>

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
            <div><img src={loginpict} alt="workleen" />
                <div className="login-container">
                    <div className="login-container-employee">
                        <button className="button" onClick={e => this.togglePopup("employee")} ><span>Login Karyawan </span></button>
                    </div>
                    <button className="button" onClick={e => this.togglePopupRegistrasi()}><span>Registrasi</span></button>
                </div>


                {this.state.showPopup ?
                    <Popup
                        text={
                            <div className="form-container" style={{ textAlign: "center" }}>
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

                        }
                        closePopup={this.togglePopup2.bind(this)}
                    />
                    : null
                }

                {this.state.showPopupR ?
                    <Popup
                        text={
                            <div className="form-container" style={{ textAlign: "center" }}>
                                <form onSubmit={this.handleSubmitR}>
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

                        }
                        closePopup={this.togglePopupR2.bind(this)}
                    />
                    : null
                }


            </div>
        );
    }
}

class Popup extends Component {
    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>

                    <div style={{ textAlign: "right" }}>
                        <button onClick={this.props.closePopup}>X</button>
                    </div>
                    <h1>{this.props.text}</h1>
                </div>
            </div>
        );
    }
}
