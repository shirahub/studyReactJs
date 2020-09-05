import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makeNewEmployee } from '../actions/index';
import { FirebaseContext } from '../config';


class SeeAllEmployee extends Component {
    constructor() {
        super();
        this.state = {
            showPopup: false,
            username: '',
            email: '',
            password: '',
            name: '',
            github: '',
            motto: '',
            photo: '',
            error: '',
        };

        this.togglePopup=this.togglePopup.bind(this)
        this.handleNameChange=this.handleNameChange.bind(this)
        this.handleEmailChange=this.handleEmailChange.bind(this)
        this.handleMottoChange=this.handleMottoChange.bind(this)
        this.handleGithubChange=this.handleGithubChange.bind(this)
        this.handlePhotoChange=this.handlePhotoChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    handleNameChange(evt) {
        this.setState({
            name: evt.target.value,
        });
    };
    handleEmailChange(evt) {
        this.setState({
            email: evt.target.value,
        });
    };
    handleMottoChange(evt) {
        this.setState({
            motto: evt.target.value,
        });
    };
    handlePhotoChange(evt) {
        this.setState({
            photo: evt.target.value,
        });
    };
    handleGithubChange(evt) {
        this.setState({
            github: evt.target.value,
        });
    };

    handleSubmit(evt) {
        evt.preventDefault();

        this.props.newEmployee(this.state.name, this.state.motto, this.state.photo, this.state.github)
    }

    saveRegFirebase =() => {
        this.props.firebase
        .registerFirebaseUser(this.state.email, this.state.password)
        .then(user => {
            console.info(user)
        })
        .catch(err => {
            alert(err.message)
        })
    }

    togglePopup() {
        this.setState({
               showPopup: !this.state.showPopup,
        });
      }

    renderCards() {
        var emp = JSON.parse(this.props.employeelist.employeeList)
        return emp.map((e, index) => {
            const {id, name, motto, photo, github} = e
            return (
                <div className="card">
                <img src={photo} alt="Avatar" />
                <div className="container">
                    <h4><b>{name}</b></h4>
                    <h4>{motto}</h4>
                    <a href={github}>Github</a>
                </div>
            </div>
            )
        }

        )
    }

    addNewEmployee() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} style={{textAlign:"left"}}>
                    <label>Nama</label>
                    <input type="text" value={this.state.name} onChange={this.handleNameChange}></input>
                    <br />
                    <label>Email</label>
                    <input type="text" value={this.state.email} onChange={this.handleEmailChange}></input>
                    <br />
                    <label>Motto</label>
                    <input type="text" value={this.state.motto} onChange={this.handleMottoChange}></input>
                    <br />
                    <label>Link Foto</label>
                    <input type="text" value={this.state.photo} onChange={this.handlePhotoChange}></input>
                    <br />
                    <label>Link Github</label>
                    <input type="text" value={this.state.github} onChange={this.handleGithubChange}></input>
                    <br />
                    <input type="submit" value="Daftar"></input>
                {
                    this.state.error &&
                    <p data-test="message" onClick={this.dismissError}>
                        {this.state.error}
                    </p>
                }
                </form>
            </div>
        )

    }


    render() {
        console.log(this.props.employeelist.employeeList)
        return (
            <div>
            <div>
                <button onClick={this.togglePopup}>ADD NEW EMPLOYEE</button>
                
            </div>
            <div style={{display: "flex"}}>
                {this.renderCards()}
            </div>
            {this.state.showPopup ? 
          <Popup
            text={
                <div className="form-container" style={{textAlign:"center"}}>
                   {this.addNewEmployee()}
                </div>
            }
            closePopup={this.togglePopup}
          />
          : null
        }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    employeelist: state.employeelist
})

const mapDispatchToProps = (dispatch) => ({
    newEmployee: (name, motto, photo, github) => dispatch(makeNewEmployee(name, motto, photo, github))
    // loginOK: (user, id, role) => dispatch(setLogin(user, id, role))
})

SeeAllEmployee = connect(mapStateToProps, mapDispatchToProps)(SeeAllEmployee)

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

class Register extends Component {
    render() {
        return (
            <FirebaseContext.Consumer>
                {firebase => <SeeAllEmployee firebase={firebase} {...this.props} />}
            </FirebaseContext.Consumer>
        )
    }
}
export default Register;