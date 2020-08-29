import { Component } from 'react';


export class LogoutPage extends Component {

    render() {
        const { history } = this.props;
        sessionStorage.setItem("isUserOn", false);
        sessionStorage.setItem("theUser", "")
        sessionStorage.setItem("theRole", "")
        history.push('/');
        return (
            window.location.reload(false)
        );
    }
}