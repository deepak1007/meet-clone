const express = require('express');
const Meeting = require('./meeting.model');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
module.exports = {
    //checks meeting details for new joiners.
    meetingStatus: async(req, res, next) => {  
        try {
            const {meetingId} = req.params;
            if(!meetingId || typeof meetingId != "string") {
                return res.status(400).json({success: false, message: "invalid meeting Id"})
            }

            const meetingDetails = await Meeting.findOne({_id : mongoose.Types.ObjectId(meetingId), endAt: {$exists: false}}, {members: 0, email: 0});
            if(!meetingDetails) {
                return res.status(200).json({success: false, message: "Meeting is not available or might have ended"})
            }

            res.status(200).json({success: true, message: "Meeting Found", data: meetingDetails})

        } catch (error) {
            next(error);
        }
    },

    //creates meeting with details provided
    createMeeting : async (req, res, next) => {
        try {
            const { email, name } = req.body;
            if(!email || !name) 
               return res.status(400).json({success : false, message: "incomplete details"})
            if(typeof email != 'string' || typeof name != 'string')
               return res.status(400).json({success: false, message: "invalid email or name"});
            
            const meeting = new Meeting({
                creatorName: name,
                creatorEmail: email,
            })

            await meeting.save()
            

            jwt.sign({ name : name, email : email, meetingId: meeting._id, isOwner: true}, process.env.jwt_secret, { expiresIn : 60 * 60}, function(err, token) {
                if(err) {
                    return res.status(500).json({success: false, message: "sorry some error occured"});
                }

                res.status(200).json({success: true, message: "meeting created", data: {meetingId: meeting._id, meetingVerificationToken : token}})
            });
        } catch(error){
            next(error);
        }
    },

    //generate jwt containing details of joiner.
    joinMeeting : async(req, res, next) => {
        try {
            const {name, email, meetingId} = req.body;
            if(!email || !name || !meetingId) 
                return res.status(400).json({success : false, message: "incomplete details"})
            if(typeof email != 'string' || typeof name != 'string' || typeof meetingId != 'string')
                return res.status(400).json({success: false, message: "invalid email or name"});
            
            jwt.sign({ name : name, email : email, meetingId: meetingId, isOwner: false},process.env.jwt_secret, { expiresIn : 60 * 60}, function(err, token) {
                if(err) {
                    return res.status(500).json({success: false, message: "sorry some error occured"});
                }
    
                res.status(202).json({
                    success: true, 
                    message: "meeting created", 
                    data: {meetingId: meetingId, meetingVerificationToken : token}
                })
            });
        } catch (error) {
            next(error);
        }
    },

    //verify user by their jwt.
    verifyMember : async(req, res, next) => {
        try {
            const {token, meetingId} = req.body;
            var decodedData = await jwt.verify(token, process.env.jwt_secret);

            if(decodedData.isOwner) {
                if(meetingId != decodedData.meetingId) {
                    return res.status(400).json({success: false, message: "Invalid Meeting Id"})
                }
            }

            res.status(200).json({success: true, message: "user verified", data: decodedData})
        } catch (error) {
            next(error)
        }
    }
}