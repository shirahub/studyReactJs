import React, { Component } from 'react';
import homepagepict from './homepagepict.jpg';
import { Link } from "react-router-dom"

export class Home extends Component {

    isWho() {
        var isEmployee = sessionStorage.getItem("theRole")

        if (isEmployee === "hrd") {
            return (
                <div>
                    <div className="login-container"></div>
            <button className="button" ><span><Link to="/hrd"><h3>Assign Divisi</h3></Link></span></button>
                </div>
            )
        } else if (isEmployee === "employee") {
            return (
                <div>
                    <div className="login-container"></div>
            <button className="button" ><span><Link to="/employee"><h3>Lihat Profile</h3></Link></span></button>
                </div>
            )

        } else {
            return (<div></div>)
        }
    }

    render() {
        return (
            <div>
                
                <img src={homepagepict} alt="homepage"></img>
                <h2  className="overimage"><span>TOTALITAS TANPA BATAS</span></h2>
                {this.isWho()}
            </div>
        )
    }
}