import React, { Component } from 'react';


class LogoutPage extends Component {

    render() {
        this.props.logout('')
        return (
            <div>
                Logout Success
            </div>
        )
    }
}
export default LogoutPage;