		var socket=io();

		socket.on('connect',function(){
			console.log('Connected to server');


		});

		socket.on('disconnect',function(){
			console.log('Disconnected from server');
		});

		socket.on('newMessage',function(message){
			let formattedTime = moment(message.createdAt).format('h:mm a');
			const li=jQuery('<li></li>');
			li.text(`${message.from} ${formattedTime}: ${message.text} `);

			jQuery('#messages').append(li);
		});


		var messageTextbox=jQuery('[name=message]')
		jQuery('#message-form').on('submit',function(e){
			e.preventDefault();

			socket.emit('createMessage',{
				from:'User',
				text: messageTextbox.val()
			}, function(){
				messageTextbox.val('')
			});
		});

		socket.on('newLocationMessage',function(message){
			let formattedTime =moment(message.createdAt).format('h:mm a');
			var li =jQuery('<li></li>');
			var a = jQuery('<a target="_blank">My current location</a>');
			li.text(`${message.from} ${formattedTime}: `);
			a.attr('href',message.url)
			li.append(a);
			jQuery('#messages').append(li);

		})

		const locationButton = jQuery('#send-location');
		locationButton.on('click',function(){
			if(!navigator.geolocation){
				return alert('geolocation not supported by your browser');
			}
			locationButton.attr('disabled', 'disabled').text('Sending location...');

		navigator.geolocation.getCurrentPosition(function(position){
			locationButton.removeAttr('disabled').text('Send location');
			socket.emit('createLocationMessage',{
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			});
		}, function(){
			locationButton.removeAttr('disabled').text('Send location');
			alert('unable to fetch location');
			});
		});