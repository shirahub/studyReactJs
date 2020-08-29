import React, { Component } from 'react';

export class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
          theUser: '',
      };
    }

   
    render() {
        if (this.props.theUser !== '') {
            this.props.aUserHasLoggedOut()
        }
        return (
          <div>
              Logout Berhasil
         </div>

    )
    }
}



