import React, { Component } from 'react';

export class AddDivision extends Component {
    constructor() {
        super();
        this.state = {
            error: '',
            divisi: '',
        };

        this.handleDivisionChange = this.handleDivisionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dismissError = this.dismissError.bind(this);
    }

    dismissError() {
        this.setState({ error: '' });
    }

    handleSubmit(evt) {
        evt.preventDefault();

        if (!this.state.divisi) {
            return this.setState({ error: 'Divisi is required' });
        }

        var i;
        var divisions = JSON.parse(localStorage.getItem("divisilist"))
            for (i = 0 ; i<divisions.length ; i++) {
                if (divisions[i].divisi === this.state.divisi) {
                return this.setState({error:'Division name has been used'})
                }
            }

        var newDivisi = {divisi: this.state.divisi}

        
        divisions.push(newDivisi)
        localStorage.setItem("divisilist", JSON.stringify(divisions))
        
        return this.setState({error: "New Division added succesfully"})
    }

    handleDivisionChange(evt) {
        this.setState({
            divisi: evt.target.value,
        });
    };


    render() {
        return (
            <div>
                <div className="form-container" style={{textAlign:"center"}}>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                        <label>Division</label>
                        <br />
                        <input type="text" data-test="division" value={this.state.divisi} onChange={this.handleDivisionChange} />
                        </div>
                        <div>
                        <input type="submit" value="Add Division" data-test="submit" />
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