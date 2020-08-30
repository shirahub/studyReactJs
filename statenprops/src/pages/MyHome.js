import React, { Component } from 'react';

export class MyHome extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //       theUser: '',
    //   };
    // }

    
    handleButton() {
        this.props.mengubahPesanSaya("Pesan dari Child")
    }
   
    render() {
       

        return (
          <div>
             Hello, {this.props.data}
             <button onClick={this.handleButton.bind(this) }>Klik</button>
      </div>

    )
    }
}



