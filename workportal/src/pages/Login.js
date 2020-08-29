//source: https://gist.github.com/joelgriffith/43a4a8195c9fd237a222fe84c2b2e2b4
//with modification
import React, { Component } from 'react';
import loginpict from './loginpict.jpg';

export class LoginPage extends Component {
    constructor() {
        super();
        this.stringrole = "";
        this.state = {
            username: '',
            password: '',
            error: '',
            showPopup: false,
            role: '',
        };

        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dismissError = this.dismissError.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
        this.togglePopup2 = this.togglePopup2.bind(this);
    }
    

    togglePopup(name) {
        this.setState({
               showPopup: !this.state.showPopup,
        }, () => {  this.stringrole = name; });
             
      }

      togglePopup2() {
        this.setState({
               showPopup: !this.state.showPopup,
        });
      }

    //   updateState = () => {
    //     console.log('changing state');
    //      this.setState({
    //        x: 2
    //      },() => { console.log('new state', this.state); })
    //    }

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

        const { history } = this.props;
        var i;
        if (this.stringrole === "employee") {
            
            var users = JSON.parse(localStorage.getItem("userlist"))

            for (i = 0 ; i<users.length ; i++) {
                if (users[i].user === this.state.username && users[i].pass === this.state.password) {
                sessionStorage.setItem("isUserOn", true)
                sessionStorage.setItem("theUser", users[i].user)
                sessionStorage.setItem("theRole", "employee")
                history.push('/employee');
                window.location.reload(false)
                } else  {
                this.setState({error:'Username or Password invalid'})
                }
            }
        } 

        if (this.stringrole === "hrd") {
             users = JSON.parse(localStorage.getItem("hrdlist"))

            for ( i = 0;i<users.length;i++) {
                if (users[i].user === this.state.username && users[i].pass === this.state.password) {
                sessionStorage.setItem("isUserOn", true)
                sessionStorage.setItem("theUser", users[i].user)
                sessionStorage.setItem("theRole", "hrd")
                history.push('/hrd');
                window.location.reload(false)
                } else  {
                  this.setState({error:'Username or Password invalid'})
                 }
            }
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
            <div><img src={loginpict} alt="workleen" />
            <div className="login-container">
            <div></div>
            <div className="login-container-employee">
            <button className="button" onClick={e => this.togglePopup("employee")} ><span>Login Karyawan </span></button>
            </div>
            <div></div>
            <div className="login-container-hrd">
            <button className="button" onClick={e => this.togglePopup("hrd")} ><span>Login HRD </span></button>
            </div>
            <div></div>
            </div>

            
            {this.state.showPopup ? 
          <Popup
            text={
                <div className="form-container" style={{textAlign:"center"}}>
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
          
          
          </div>
        );
    }
}

class Popup extends Component {
    render() {
      return (
        <div className='popup'>
          <div className='popup_inner'>
            
            <div style={{textAlign:"right"}}>
          <button onClick={this.props.closePopup }>X</button>
          </div>
          <h1>{this.props.text}</h1>
          </div>
        </div>
      );
    }
  }