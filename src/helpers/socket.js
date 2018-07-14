import io from 'socket.io-client';

var socket;
if(window.location.origin.indexOf("localhost")) {
	socket = io('http://localhost:5000');	
}
else {
	socket = io('http://api.flinkseed.com');
}

export default socket;