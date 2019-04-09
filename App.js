import React, { Component } from 'react';
import './App.css';
import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8000');
//import { subscribeToTimer } from './api';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };

    /*subscribeToTimer((err, timestamp) => this.setState({ 
      timestamp 
    }));*/
  }

  handleChange = (e) => {
    this.setState({
      message: e.target.value
    });
  }

  handleSubmit = () => {
    let list = [
      {p: 'leon', t: 'barra'},
      {p: 'corona', t: 'barra'},
      {p: 'pizza', t: 'cocina'}
    ]
    socket.emit('chat message', list)
  }

  handleDisconnection = () => {
    socket.close();
  }

  render() {
    socket.on('barra', (elementos) => console.log(elementos));
    //socket.on('pedidos', (elementos) => console.log(elementos));
    return (
      <div className="App">
        <input type="text" value={this.state.message} onChange={(e) => this.handleChange(e)} />
        <button onClick={this.handleSubmit}>Submit</button>
        <button onClick={this.handleDisconnection}>Disconnect</button>
      </div>
    );
  }
}

export default App;
