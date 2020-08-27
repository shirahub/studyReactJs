import React, { Component } from 'react';

export default class ParkirMasuk extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            car: '',
            number: '',
            message1: '',
            message2: '',
        };
        this.handleIdChange = this.handleIdChange.bind(this);
        this.handleCarChange = this.handleCarChange.bind(this);
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitOut = this.handleSubmitOut.bind(this);
        this.dismissMessage1 = this.dismissMessage1.bind(this);
        this.dismissMessage2 = this.dismissMessage2.bind(this);
    }

    renderTableData() {
        var parkers = JSON.parse(localStorage.getItem("parker"))
        return parkers.map((parker, index) => {
            const { id, car, number, status, timein, timeout } = parker
            return (
                    <tr key={id}>
                        <td>{id}</td>
                        <td>{car}</td>
                        <td>{number}</td>
                        <td>{status}</td>
                        <td>{timein}</td>
                        <td>{timeout}</td>
                    </tr>
            )
        })
    }

    renderTableHead() {
        return (
            <tr>
                <th>Id</th>
                <th>Jenis</th>
                <th>Plat</th>
                <th>Status</th>
                <th>Waktu Masuk</th>
                <th>Waktu Keluar</th>
            </tr>
        )
    }
    renderTable() {
        return (
           <div>
              <table id='parkers'>
                 <tbody>
                    {this.renderTableHead()}
                    {this.renderTableData()}
                 </tbody>
              </table>
           </div>
        )
     }

    dismissMessage1() {
        this.setState({ message1: '' });
    }

    dismissMessage2() {
        this.setState({ message2: '' });
    }

    handleSubmit(evt) {
        evt.preventDefault();

        if (!this.state.car) {
            return this.setState({ message1: 'car is required' });
        }

        if (!this.state.number) {
            return this.setState({ message1: 'number is required' });
        }
       

        var newParker = { id: (Math.random().toString(36).substr(2, 5)).toUpperCase(), car: this.state.car, number: this.state.number, status: "in", timein: new Date(), timeout: "" }
        // var timeString = newParker.timein.getDate() + "-" + newParker.timein.getMonth() + "-" + newParker.timein.getFullYear() + " " +
        //     + newParker.timein.getHours() + ":" + newParker.timein.getMinutes() + ":" + newParker.timein.getSeconds()

        var parkers = JSON.parse(localStorage.getItem("parker"))
        parkers.push(newParker)
        localStorage.setItem("parker", JSON.stringify(parkers))
        
        return this.setState({message1: "ok"})

    }

    handleCarChange(evt) {
        this.setState({
            car: evt.target.value,
        });
    };

    handleNumberChange(evt) {
        this.setState({
            number: evt.target.value,
        });
    }

    handleIdChange(evt) {
        this.setState({
            id: evt.target.value,
        });
    }

    handleSubmitOut(evt) {
        evt.preventDefault();

        var parkers = JSON.parse(localStorage.getItem("parker"))
        console.log(parkers)
        console.log(this.state.id)
       
        for (var i = 0; i<parkers.length ; i++) {
            if (parkers[i].id === this.state.id) {

                var timeOut = new Date()
                var timeIn = Date.parse(parkers[i].timein)
                console.log(timeIn)
                var diff = timeOut-timeIn
                console.log(diff)
                var hh = Math.ceil(diff / 1000 / 60 / 60)

                parkers[i].status = "out"
                parkers[i].timeout = timeOut

                localStorage.setItem("parker", JSON.stringify(parkers))
                
                if (parkers[i].car === "mobil") {
                    return this.setState({message2: (5000*hh)})    
                } else if (parkers[i].car === "motor") {
                    return this.setState({message2: (2000*hh)})    
                } else {
                    return this.setState({message2: (7000*hh)})    
                }
            } 
        }  

        return this.setState({
            message2: 'Not Found'})

    }
        

    render() {

        if ((sessionStorage.getItem("isUserOn")) === "false") {
            const { history } = this.props;
            history.push('/');
        return (
            window.location.reload(false)
        )
        }
            

        return (
            <div>
            <div className="portal-container">
                <div className="portal-masuk">
                    <h3>Parkir Masuk</h3>
                    <form onSubmit={this.handleSubmit}>
                <label>Jenis Kendaraan</label><br />
                <input type="radio" name={this.state.car} value="mobil" onChange={this.handleCarChange} />Mobil<br />
                <input type="radio" name={this.state.car} value="motor" onChange={this.handleCarChange} />Motor<br />
                <input type="radio" name={this.state.car} value="bus" onChange={this.handleCarChange} />Bus<br />
                <br />
                <label>Plat Nomor</label><br />
                <input type="text" name={this.state.number} onChange={this.handleNumberChange}></input>
                <br />
                <br />
                <input type="submit" value="Masuk"></input>
                {
                    this.state.message1 &&
                    <p data-test="message" onClick={this.dismissMessage1}>
                        {this.state.message1}
                    </p>
                }
            </form>
                </div>
                <div className="portal-keluar">
                    <h3>Parkir Keluar</h3>
                    <form onSubmit={this.handleSubmitOut}>
                <label>ID</label><br />
                <input type="text" name={this.state.id} onChange={this.handleIdChange}></input>
                <br />
                <br />
                <input type="submit" value="Keluar"></input>
                {
                    this.state.message2 &&
                    <p data-test="message" onClick={this.dismissMessage2}>
                        {this.state.message2}
                    </p>
                }
            </form>

                </div>
            </div>
            <div className="log-container">
               {this.renderTable()}
            </div>
            </div>

        );
    }
}
