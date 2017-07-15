const path= require('path');
const http= require('http');
const express= require('express');
const socketIO=require('socket.io');

const {generateMessage, generateLocationMessage}= require('./utils/message');

const PublicPath= path.join(__dirname,'../public');
const port= process.env.PORT || 3000;
const app =express();
const server = http.createServer(app);
const io=socketIO(server);

app.use(express.static(PublicPath));

io.on('connection',(socket)=>{
	console.log('New user connected');

	socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));

	socket.broadcast.emit('newMessage',generateMessage('Admin','New User Joined.'));

	socket.on('createMessage',(message,callback)=>{
		console.log('createEmail',message);
		io.emit('newMessage',generateMessage(message.from,message.text));
		callback('This is from the server');
	});

	socket.on('createLocationMessage',(coords)=> {
		io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
	});




	socket.on('disconnect',()=>{
		console.log('Client disconnected');
	});

});


server.listen(port,()=>{

	console.log(`Server is up on ${port}`);
})