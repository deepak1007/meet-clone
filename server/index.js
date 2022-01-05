require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


// const socketio = require('socketio');
// const peerjs = require('peerjs');

 mongoose.connect('mongodb://localhost:27017/test');
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const app = express();
const server = app.listen(8000, ()=> {
    console.log("server is working at port 8000");
})

const socket = require('socket.io');
const io = socket(server);
require('./socket/meeting.socket')(io);


app.use(cors({
    origin: '*'
}))

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded())






const meetingrouter = require('./meeting/meeting.route')


app.use('/api', meetingrouter);

app.use(async function(error, req, res, next) {
    return res.status(500).json({success: false, message: 'error.message'})
})

