import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export class Employee extends Component {

    isEmployee() {
        var isEmployee = sessionStorage.getItem("theRole")

        if (isEmployee !== "employee") {
            return <Redirect to="/"></Redirect>
        }
    }

    getProfile() {
        var user = sessionStorage.getItem("theUser")
        var users = JSON.parse(localStorage.getItem("userlist"))
        var profile = {};

        for (var i = 0; i<users.length;i++) {
            if (users[i].user === user) {
                profile = {user : users[i].user, pass : users[i].pass, nama: users[i].nama, ktp : users[i].ktp, divisi: users[i].divisi};
                console.log(profile)
                break;
            }
        }

        return (
            <div style={{marginLeft:"40px"}}>
                <h2>Hello, {profile.nama}!</h2>
                <br />
                <h3>KTP: {profile.ktp}</h3>
                <h3>Divisi : {profile.divisi}</h3>
            </div>
        )

    }

    render() {
        return (
            <div>
                {this.isEmployee()}
                {this.getProfile()}
            </div>
        )
    }
}