import { Component } from 'react';


class LogoutPage extends Component {

    render() {
        const { history } = this.props;
        sessionStorage.setItem("isUserOn", false);
        history.push('/');
        return (
            window.location.reload(false)
        );
    }
}
export default LogoutPage;