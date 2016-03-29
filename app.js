var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var routes = require('./routes');
var sockets = {};
var users = {};
//hello git
app.get('/', function(req, res) {

    res.sendFile(__dirname + '/views/index.html');

});

app.get('/online', function(req, res) {
    var online = Object.keys(users);
    res.json({ online: online });
});

app.get('/checkUser', routes.insert);
app.get('/history', routes.getmsg);



io.on('connection', function(socket) {
    console.log('New Socket Connection');
    var connectedUserId = socket.handshake.query.userId;
    if (connectedUserId in users) {
        console.log('UserId :' + connectedUserId + ' already Connected');
        socket.userId = connectedUserId;
        users[socket.userId] = socket;
    } else {
        console.log('New User Connected');
        socket.userId = connectedUserId;
        users[socket.userId] = socket;
        var online = Object.keys(users);
        console.log("online" + online);
        io.emit('new user', socket.userId);
    }

    socket.on('chat message', function(msg) {
        console.log('message: ' + msg.sender);

        users["" + msg.recvr + ""].emit('chat message', msg);
        routes.insertmsg(msg);
        users["" + msg.sender + ""].emit('chat message', msg);
    });



});
//changed value

http.listen(3900, function() {
    console.log('listening on *:3900');
});
