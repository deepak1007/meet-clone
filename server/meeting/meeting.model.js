const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Members = new schema({
    name: String,
    email: String,
    clientId : String, //socketId
    joinedAt : {type: Date, default: Date.now},
    leavedAt : Date,
    totalTimeInMeeting: Number,
    isOwner : {type: String, default: false}
})

const meeting = new schema({
    creatorName : String,
    creatorEmail : String,
    endAt : Date,
    totalTime : Number,
    totalMembers: {type: Number, default: 0},
    members : [Members]
}, {
    timestamps: true
})

module.exports = mongoose.model('meeting', meeting);