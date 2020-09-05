import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setLogout } from '../actions/index';


class Logout extends Component {

    render() {
        this.props.logoutOK()
        return (
            <div>
                Logout Success
            </div>

        )
    }
}


const mapDispatchToProps = (dispatch) => ({
    logoutOK: () => dispatch(setLogout())
})

Logout = connect(null, mapDispatchToProps)(Logout)


export default Logout;