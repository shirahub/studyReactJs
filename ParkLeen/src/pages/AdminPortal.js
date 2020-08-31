import React, { Component } from 'react';

export default class ParkirMasuk extends Component {
    constructor() {
        super();
        this.state = {
            parklist: [{"id":"0PFPH","car":"motor","number":"3333","status":"in","timein":"2020-08-27T11:37:49.437Z","timeout":""},{"id":"NCQFI","car":"bus","number":"6777","status":"in","timein":"2020-08-27T11:39:11.615Z","timeout":""},{"id":"MZCP4","car":"motor","number":"777","status":"out","timein":"2020-08-27T11:42:09.108Z","timeout":"2020-08-27T11:42:15.747Z"},{"id":"T6ZID","car":"mobil","number":"B9999","status":"out","timein":"2020-08-27T12:15:23.478Z","timeout":"2020-08-27T12:15:36.422Z"}],
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
        var parkers = this.state.parklist
        return parkers.map((parker, index) => {
            const { id, car, number, status, timein, timeout } = parker
            return (
                    <tr key={id}>
                        <td>{id}</td>
                        <td>{car}</td>
                        <td>{number}</td>
                        <td>{status}</td>
                        <td>{timein.replace(/"/g,'')}</td>
                        <td>{timeout.replace(/"/g,'')}</td>
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

    updateParkList(parklist) {
        this.setState( {
            parklist: parklist
        })
    }

    handleSubmit(evt) {
        evt.preventDefault();

        if (!this.state.car) {
            return this.setState({ message1: 'car is required' });
        }

        if (!this.state.number) {
            return this.setState({ message1: 'number is required' });
        }
       
        var a = JSON.stringify(new Date())
        
        var newParker = { "id": (Math.random().toString(36).substr(2, 5)).toUpperCase(), "car": this.state.car, "number": this.state.number, "status": "in", "timein": a, "timeout": "" }
        // var timeString = newParker.timein.getDate() + "-" + newParker.timein.getMonth() + "-" + newParker.timein.getFullYear() + " " +
        //     + newParker.timein.getHours() + ":" + newParker.timein.getMinutes() + ":" + newParker.timein.getSeconds()

        var parkers = this.state.parklist
        parkers.push(newParker)

        this.updateParkList(parkers)
        
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

        var parkers = this.state.parklist
       
        for (var i = 0; i<parkers.length ; i++) {
            if (parkers[i].id === this.state.id) {

                var timeOut = new Date()
                console.log(parkers[i].timein.replace(/"/g,''))
                var timeIn = Date.parse(parkers[i].timein.replace(/"/g,''))
                console.log(timeIn)
                var diff = timeOut-timeIn
                var hh = Math.ceil(diff / 1000 / 60 / 60)

                parkers[i].status = "out"
                parkers[i].timeout = JSON.stringify(timeOut)

                this.updateParkList(parkers)
                
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

        // if ((sessionStorage.getItem("isUserOn")) === "false") {
        //     const { history } = this.props;
        //     history.push('/');
        // return (
        //     window.location.reload(false)
        // )
        // }
            

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
