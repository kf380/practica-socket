const path = require('path');
const express = require('express');
const app = express();

//configuracion
app.set('port', process.env.PORT || 3000);

// archivos estaticos
app.use(express.static(path.join(__dirname,'public')));

// arrancando el servidor
const server = app.listen(app.get('port'),()=>{
    console.log('Corriendo en el puerto', app.get('port'))
})

// websockets
const SocketIO = require('socket.io')
const io = SocketIO(server)

io.on('connection', (socket) =>{
    console.log('new connection', socket.id)
    socket.on('chat:message',(data)=>{
        io.sockets.emit('chat:message', data)
    })
    socket.on('chat:typing',(data)=>{
        socket.broadcast.emit('chat:typing', data)
    })
})
