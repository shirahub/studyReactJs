import React, { Component } from 'react';

export class EmployeeList extends Component {
    constructor(props) {
        super(props);
        this.userlist = 
        this.state = {
      };
    }

    renderTableData() {
      return this.props.datalist.map((aUser, index) => {
          const { user } = aUser
          return (
                  <tr key={user}>
                      <td>{index+1}</td>
                      <td>{user}</td>
                  </tr>
          )
      })
  }

  renderTableHead() {
      return (
          <tr>
              <th>No</th>
              <th>User</th>
          </tr>
      )
  }

  renderTable() {
      return (
         <div style={{marginTop:"20px"}}>
             <form>
            <table id='users'>
               <tbody>
                  {this.renderTableHead()}
                  {this.renderTableData()}
               </tbody>
            </table>
            </form>
         </div>
      )
   }

   
    render() {
        return (
          <div>
              {this.renderTable()}
      </div>

    )
    }
}



