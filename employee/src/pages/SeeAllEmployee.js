import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makeNewEmployee, editEmployee, deleteEmployee } from '../actions/index';
import { FirebaseContext } from '../config';


class SeeAllEmployee extends Component {
    constructor() {
        super();
        this.state = {
            datalist: '',
            showPopup: false,
            showPopupEdit: false,
            username: '',
            email: '',
            password: '',
            name: '',
            github: '',
            phone: '',
            motto: '',
            photo: '',
            error: '',
        };

        this.togglePopup = this.togglePopup.bind(this)
        this.togglePopupEdit = this.togglePopupEdit.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleMottoChange = this.handleMottoChange.bind(this)
        this.handlePhoneChange = this.handlePhoneChange.bind(this)
        this.handleGithubChange = this.handleGithubChange.bind(this)
        this.handlePhotoChange = this.handlePhotoChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        // this.componentDidMount=this.componentDidMount.bind(this)
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
    handlePasswordChange(evt) {
        this.setState({
            password: evt.target.value,
        });
    };
    handleMottoChange(evt) {
        this.setState({
            motto: evt.target.value,
        });
    };
    handlePhoneChange(evt) {
        this.setState({
            phone: evt.target.value,
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

    handleEdit(evt) {
        evt.preventDefault();
        this.props.editEmployee(this.state.name, this.state.email, this.state.github, this.state.phone, this.state.motto, this.state.photo)
    }

    handleDelete(evt) {
        evt.preventDefault();
        this.props.deleteEmployee(evt.target.value)
    }

    editEmployee() {
        // console.log("email", a)
        // var emplist = this.props.employeelist.employeeList
        // let employee = emplist.filter(e => e.email === a);
        // console.log("theemployee", employee)
        // this.setState({
        //     name: employee[0].name,
        //     email: employee[0].email,
        //     motto: employee[0].motto,
        //     phone: employee[0].phone,
        //     photo: employee[0].photo,
        //     github: employee[0].github
        // });
      
        return (
            <div>
                <form onSubmit={this.handleEdit} style={{ textAlign: "left" }}>
                    <label>Nama</label>
                    <input type="text" value={this.state.name} onChange={this.handleNameChange}></input>
                    <br />
                    <label>Email</label>
                    <input readOnly type="text" value={this.state.email} onChange={this.handleEmailChange}></input>
                    <br />
                    <label>Motto</label>
                    <input type="text" value={this.state.motto} onChange={this.handleMottoChange}></input>
                    <br />
                    <label>Phone Number</label>
                    <input type="text" value={this.state.phone} onChange={this.handlePhoneChange}></input>
                    <br />
                    <label>Link Foto</label>
                    <input type="text" value={this.state.photo} onChange={this.handlePhotoChange}></input>
                    <br />
                    <label>Link Github</label>
                    <input type="text" value={this.state.github} onChange={this.handleGithubChange}></input>
                    <br />
                    <input type="submit" value="Edit"></input>
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

    handleSubmit(evt) {
        evt.preventDefault();

        this.props.newEmployee(this.state.name, this.state.email, this.state.password, this.state.github, this.state.phone, this.state.motto, this.state.photo)
        // this.saveRegFirebase()
    }

    // componentDidMount() {
    //     this.setState({
    //         datalist:this.props.firebase.getAllUser()
    //     })
    // }

    // saveRegFirebase =() => {
    //     this.props.firebase
    //     .registerFirebaseUser(this.state.email, this.state.password)
    //     .then(user => {
    //         console.info(user)
    //         this.saveUserFirebase()
    //     })
    //     .catch(err => {
    //         alert(err.message)
    //     })
    // }

    // saveUserFirebase =() => {
    //     this.props.firebase
    //     .insertNewUser(this.state.name, this.state.email, this.state.github, this.state.phone, this.state.motto, this.state.photo)
    //     .then(user => {
    //         console.info(user)
    //     })
    //     .catch(err => {
    //         alert(err.message)
    //     })
    // }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup,
        });
    }

    togglePopupEdit(evt) {
        if (evt.target.value === '') {
            this.setState({
                showPopupEdit: !this.state.showPopupEdit,
            });
            return
        }

        console.log("email", evt.target.value)
        var emplist = this.props.employeelist.employeeList
        let employee = emplist.filter(e => e.email === evt.target.value);
        console.log("theemployee", employee)
        this.setState({
            name: employee[0].name,
            email: employee[0].email,
            motto: employee[0].motto,
            phone: employee[0].phone,
            photo: employee[0].photo,
            github: employee[0].github,
            showPopupEdit: !this.state.showPopupEdit,
        });
    }

    renderCards() {
        // var emp = JSON.parse(this.props.employeelist.employeeList)
        var emp = this.props.employeelist.employeeList

        // console.log(this.state.datalist.length)
        // for (var i =0;i<this.state.datalist.length;i++) {
        //     console.log("b", this.state.datalist[i])
        // }
        return emp.map((e, index) => {
            const { name, motto, photo, github, email, phone } = e
            return (
                <div className="card">
                    <img src={photo} alt="Avatar" />
                    <div className="container">
                        <h4><b>{name}</b></h4>
                        <h4>{motto}</h4>
                        <h4>{phone}</h4>
                        <a href={github}>Github</a>
                        <br />
                        <button value={email} onClick={this.togglePopupEdit}>Edit</button>
                        {/* <button value={email} onClick={this.handleDelete}>Hapus</button> */}
                    </div>
                </div>
            )
        }

        )
    }

    addNewEmployee() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} style={{ textAlign: "left" }}>
                    <label>Nama</label>
                    <input type="text" value={this.state.name} onChange={this.handleNameChange}></input>
                    <br />
                    <label>Email</label>
                    <input type="text" value={this.state.email} onChange={this.handleEmailChange}></input>
                    <br />
                    <label>Password</label>
                    <input type="text" value={this.state.password} onChange={this.handlePasswordChange}></input>
                    <br />
                    <label>Motto</label>
                    <input type="text" value={this.state.motto} onChange={this.handleMottoChange}></input>
                    <br />
                    <label>Phone Number</label>
                    <input type="text" value={this.state.phone} onChange={this.handlePhoneChange}></input>
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
        console.log("a", this.props.employeelist)
        console.log("c", this.props.employeelist.length)
        // console.log(this.props.employeelist.employeeList)
        return (
            <div>
                <div>
                    <button onClick={this.togglePopup}>ADD NEW EMPLOYEE</button>

                </div>
                <div style={{ display: "flex" }}>
                    {this.renderCards()}
                </div>
                {this.state.showPopup ?
                    <Popup
                        text={
                            <div className="form-container" style={{ textAlign: "center" }}>
                                {this.addNewEmployee()}
                            </div>
                        }
                        closePopup={this.togglePopup}
                    />
                    : null
                }

                {this.state.showPopupEdit ?
                    <Popup
                        text={
                            <div className="form-container" style={{ textAlign: "center" }}>
                                {this.editEmployee(this.state.email)}
                            </div>
                        }
                        closePopup={this.togglePopupEdit}
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
    // this.state.name, this.state.email, this.state.github, this.state.phone, this.state.motto, this.state.photo
    newEmployee: (name, email, password, github, phone, motto, photo) => dispatch(makeNewEmployee(name, email, password, github, phone, motto, photo)),
    editEmployee:(name, email, github, phone, motto, photo) => dispatch(editEmployee(name, email, github, phone, motto, photo)),
    // deleteEmployee: (email) => dispatch(deleteEmployee(email))
    // loginOK: (user, id, role) => dispatch(setLogin(user, id, role))
})

SeeAllEmployee = connect(mapStateToProps, mapDispatchToProps)(SeeAllEmployee)

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

class Register extends Component {
    render() {
        return (
            <FirebaseContext.Consumer>
                {firebase => <SeeAllEmployee firebase={firebase} {...this.props} />}
            </FirebaseContext.Consumer>
            // <SeeAllEmployee></SeeAllEmployee>
        )
    }
}
export default Register;