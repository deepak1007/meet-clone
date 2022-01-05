const jwt = require('jsonwebtoken')
const MeetingModel = require('../meeting/meeting.model');
const Mongoose = require('mongoose');

module.exports = (io) => {
    io.on('connection', socket => {
        console.log('client connected', socket.id)
        socket.on('join-meeting', async(meetingToken)=>{
            try {
                const decoded = await jwt.verify(meetingToken, process.env.jwt_secret)
                const {name, email, meetingId, isOwner} = decoded;

                const updatedMeeting = await MeetingModel.findOneAndUpdate({
                    _id: Mongoose.Types.ObjectId(meetingId), 
                    endAt: {$exists: false}
                }, {
                    $addToSet: {
                        members: {
                            name: name,
                            email: email,
                            clientId : socket.id,
                            isOwner : isOwner
                        }
                    }
                }, {
                    new: true
                })
                .catch((error)=> {
                    throw("sorry some error occured while joining")
                })
                if(!updatedMeeting) {
                    return res.status(200).json({success: false, message: "sorry no details found for the meeting Id " + meetingId });
                }

                console.log(updatedMeeting);
                socket.join(meetingId);
                socket.emit('joined', updatedMeeting);
                // io.sockets.in(meetingId).broadcast.emit('new-member', updatedMeeting.members)
            } catch (error) {
                console.log(error);
                socket.emit('error', {errorType: "meeting-join-error", error})
            }
        })
    });
}