import React, { Component } from 'react';

export class AddEmployee extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            fullname: '',
            ktp: '',
            error: '',
            divisi: '',
        };

        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleKTPChange = this.handleKTPChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dismissError = this.dismissError.bind(this);
    }

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

        if (!this.state.fullname) {
            return this.setState({ error: 'Name is required' });
        }

        if (!this.state.ktp) {
            return this.setState({ error: 'KTP is required' });
        }

        var i;
        var users = JSON.parse(localStorage.getItem("userlist"))
            for (i = 0 ; i<users.length ; i++) {
                if (users[i].user === this.state.username) {
                return this.setState({error:'Username has been used'})
                }
                if (users[i].ktp === this.state.ktp) {
                return this.setState({error:'KTP has been used'})
                }
                
            }

        var newUser = {user: this.state.username, pass: this.state.password, nama: this.state.fullname, ktp: this.state.ktp, divisi: ''}

        
        users.push(newUser)
        localStorage.setItem("userlist", JSON.stringify(users))
        
        return this.setState({error: "New Employee added succesfully"})
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

    handleKTPChange(evt) {
        this.setState({
            ktp: evt.target.value,
        });
    };

    handleNameChange(evt) {
        this.setState({
            fullname: evt.target.value,
        });
    }

    render() {
        return (
            <div>
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
                        <div>
                        <label>Nama Lengkap</label>
                        <br />
                        <input type="text" data-test="fullname" value={this.state.fullname} onChange={this.handleNameChange} />
                        </div>
                        <div>
                        <label>KTP</label>
                        <br />
                        <input type="text" data-test="ktp" value={this.state.ktp} onChange={this.handleKTPChange} />
                        </div>
                        <br />
                        <div>
                        <input type="submit" value="Tambah Employee" data-test="submit" />
                        </div>
                    </form>
                    {
                        this.state.error &&
                        <h3 data-test="error" onClick={this.dismissError}>
                            {this.state.error}
                        </h3>
                    }
            </div>
            </div>
        )
    }
}