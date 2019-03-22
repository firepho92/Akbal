import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8000');

function connect(list, cb) {
  socket.emit('chat message', list);
}

export { connect };