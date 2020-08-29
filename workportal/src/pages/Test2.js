import React, { Component } from 'react';
import homepagepict from './homepagepict.jpg';
import { Link } from "react-router-dom"

export class Test2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false
        }
    }


    render() {
        return (
            <div>

                <img src={homepagepict} alt="homepage"></img>
                <h2  className="overimage"><span>TOTALITAS TANPA BATAS</span></h2>
            </div>
        )
    }
}