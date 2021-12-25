const express = require('express')
const app = express()

const server = require('http').createServer(app)
//go through socket.io docs
const io = require('socket.io')(server, {
  cors: {
    origin: '*'
  }
}) //creating socket

io.on('connection', (socket) => {
  // console.log('What is Socket', socket);
  console.log('Socket is active to be connected!!!')
  socket.on('chat', (payload) => {
    // console.log('What is Payload', payload);
    io.emit('chat', payload)
  })
})
const PORT = process.env.PORT || 5500
server.listen(PORT, () => console.log(`Listing on Port ${PORT}... `))
