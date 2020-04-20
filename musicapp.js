var express = require('express');
var fileUpload = require('express-fileupload');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var methodOverride = require('method-override');
var _ = require('lodash');

var config = require("./config");
var apiService = require('./services/apiService');
var index = require('./routes/index.js');
//========================Create the application======================
var app = express()
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
//==============Add middleware necessary for REST API's===============
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.use(fileUpload());
app.use(cookieParser());
app.use(methodOverride('X-HTTP-Method-Override'));
//==========Add module to recieve file from angular to node===========
// app.use('/public', express.static(path.join(__dirname, 'public')));

//===========================CORS support==============================
app.use(function(req, res, next) {
    req.setEncoding('utf8');
    // Website you wish to allow to connect
    res.header("Access-Control-Allow-Origin", "*");

    // Request methods you wish to allow
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

    // Request headers you wish to allow
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");

    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
});

//=========================Load the routes===============================
var apiRoutes = require('./routes/apiRoutes.js')(app, express);
app.use('/api', apiRoutes);

var adminRoutes = require('./routes/adminRoutes.js')(app, express);
app.use('/admin', adminRoutes);
//=========================Load the views================================
// app.get("*", function (req, res) {
//     res.sendFile(__dirname + '/public/client/views/index.html');
// });
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
//===========================Connect to MongoDB==========================
// producation config or local config
// var producationString = "mongodb://" + config.production.username + ":" + config.production.password + "@" + config.production.host + ":" + config.production.port + "/" + config.production.dbName + "?authSource=" + config.production.authDb;
var producationString = config.local.database;

var options = {};
mongoose.Promise = global.Promise;
var db = mongoose.connect(producationString, options, function(err) {
    if (err) {
        console.log(err + "connection failed");
    } else {
        console.log('Connected to database ');
    }
});
//mongo on connection emit
mongoose.connection.on('connected', function(err) {
    console.log(producationString + " conection successfull");
});
//mongo on error emit
mongoose.connection.on('error', function(err) {
    console.log("MongoDB Error: ", err);
});
//mongo on dissconnection emit
mongoose.connection.on('disconnected', function() {
    console.log("mongodb disconnected and trying for reconnect");
    // mongoose.connectToDatabase();
});
//===========================Connect to MongoDB==========================
//===========================Socket====================================
io.sockets.on('connection', function(socket) {
    console.log(socket.id + 'a user connected');
    io.emit('authenticate');
    socket.on('authentication', function(data) {
        apiService.jwtAuthVerification(data, function(auth) {
            if (auth.response_code === 2000) {
                io.to(socket.id).emit('authenticated', auth);
                socket.join(data.user_id);
            }
            if (auth.response_code === 4000) {
                io.to(socket.id).emit('authenticated', auth);
            }
            if (auth.response_code === 5005) {
                io.to(socket.id).emit('authenticated', auth);
            }
        })
    })
    socket.on('startChat', function(startChatData) {
        apiService.startChat(startChatData, function(sRes) {
            io.to(startChatData.from).emit('chatStarted', sRes);
        })
    })
    socket.on('getChatList', function(userData) {
        apiService.getChatList(userData, function(chatList) {
            io.to(userData.user_id).emit('chatList', chatList);
        })
    })
    socket.on('sendMsg', function(msg) {
        io.to(msg.to).emit('rcvMsg', msg);
    })
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});
//===========================Socket====================================
app.set('port', config.port);

server.listen(app.get('port'), function(err) {
    if (err) {
        throw err;
    } else {
        console.log("Server is running at http://localhost:" + app.get('port'));
    }
});