const express = require('express');
const meetingsController = require('./meeting.controller');
const router = express.Router();

router.get('/meeting/status/:meetingId', meetingsController.meetingStatus);
router.post('/meeting/create', meetingsController.createMeeting)
router.post('/meeting/verify-member', meetingsController.verifyMember)
router.post('/meeting/join', meetingsController.joinMeeting)

module.exports = router