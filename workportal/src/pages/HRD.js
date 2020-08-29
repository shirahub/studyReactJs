import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export class Hrd extends Component {

    constructor(props) {
        super(props);
        this.state = {value: ['']};
    }

     divisilist = JSON.parse(localStorage.getItem("divisilist"))
     employeelist = JSON.parse(localStorage.getItem("userlist"))

    handleOnchange = (evt) =>{
        console.log(evt.target.value)
        console.log(evt.target.name)

        for (var j = 0;j<this.employeelist.length;j++) {
            if (evt.target.name === this.employeelist[j].user) {
                this.employeelist[j].divisi = evt.target.value
            }
        }
        localStorage.setItem("userlist", JSON.stringify(this.employeelist))
        alert("Divisi berhasil diganti!")
    }

    renderSelectDivisi(b) {
        return this.divisilist.map((a, index) => {
            const { divisi, employee } = a
            if (divisi === b) {
                return(<option key="notused" value={divisi} selected="selected" >{divisi}</option>)
            } else {
                return (<option key="notused" value={divisi} >{divisi}</option>)
            }
        })
    }

    renderTableData() {
        return this.employeelist.map((employee, index) => {
            const { user, nama, ktp, divisi} = employee
            return (
                    <tr key={user}>
                        <td>{index+1}</td>
                        <td>{nama}</td>
                        <td>{ktp}</td>
                        <td><select name={user} onChange={e => this.handleOnchange(e)}>{this.renderSelectDivisi(divisi)}</select></td>
                    </tr>
            )
        })
    }

    renderTableHead() {
        return (
            <tr>
                <th>No</th>
                <th>Nama</th>
                <th>KTP</th>
                <th>Divisi</th>
            </tr>
        )
    }

    renderTable() {
        return (
           <div style={{marginTop:"20px"}}>
               <form>
              <table id='parkers'>
                 <tbody>
                    {this.renderTableHead()}
                    {this.renderTableData()}
                 </tbody>
              </table>
              {/* <input type="submit" value="Assign Divisi"></input> */}
              </form>
           </div>
        )
     }
     isHrd() {
        var isEmployee = sessionStorage.getItem("theRole")

        if (isEmployee !== "hrd") {
            return <Redirect to="/"></Redirect>
        }
    }

    render() {
        return (
            <div>
                {this.isHrd()}
                {this.renderTable()}
            </div>
        )
    }
}


//  handleSubmit = (evt) => {
    //     evt.preventDefault();
    //     // console.log(evt.target.selectedOptions)

    //     for (var k =0; k<this.employeelist.length;k++) {
    //         var x=document.getElementsByName(this.employeelist[k].user);
    //         console.log(x[k])
            // console.log(x.select[0].option.value)
            // for (var i = 0; i < x.select[k].option.length; i++) {
            //     if(x.select[k].option[i].selected === true){
            //          alert(x.select[k].option[i].value);
            //      }
            //  }
        // }

        // for ( k =0; k<this.employeelist.length;k++) {
        //      x=document.getElementById(this.employeelist[k].user);
        //     console.log(x)
        //     // console.log(x.select[0].option.value)
        //     // for (var i = 0; i < x.select[k].option.length; i++) {
        //     //     if(x.select[k].option[i].selected === true){
        //     //          alert(x.select[k].option[i].value);
        //     //      }
        //     //  }
        // }