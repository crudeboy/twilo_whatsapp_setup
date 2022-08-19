const express = require('express');
const router = express.Router();
const twilloController = require('./twilo_response')

router.route('/whatsapp').post(twilloController.send_whatsapp_response)
router.route('/getAllMessages').get(twilloController.allMessagesSent)
router.route('/getAllMessages/:phone').get(twilloController.allMessagesByPhoneNumber)


module.exports = router;