const path= require('path');
const http= require('http');
const express= require('express');
const socketIO=require('socket.io');

const PublicPath= path.join(__dirname,'../public');
const port= process.env.PORT || 3000;
const app =express();
const server = http.createServer(app);
const io=socketIO(server);

app.use(express.static(PublicPath));

io.on('connection',(socket)=>{
	console.log('New user connected');


	socket.emit('newMessage',{
		from: 'pbr@pbr.com',
		text: 'Sup pbr',
		createdAt: 1234
	    });

	socket.on('createMessage',(message)=>{
		console.log('createEmail',message);

	});


	socket.on('disconnect',()=>{
		console.log('Client disconnected');
	});

});


server.listen(port,()=>{

	console.log(`Server is up on ${port}`);
})