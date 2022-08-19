const WA = require("../../helpers/whatsapp_response");
const messages = require("../../messages.json");
const all_messages = require("../../user_messages.json");
const fs = require("fs");

// Route for WhatsApp
const send_whatsapp_response = async (req, res) => {
	console.log(req.body);
	let message = req.body.Body;
	let senderID = req.body.From;

	console.log(message, "message");
	console.log(senderID, "senderID");

	//save user's message
	await WA.saveUsersResponse(message, senderID);

	// // Write a function to send message back to WhatsApp
	await WA.sendMessage(messages["WELCOME-MESSAGE"], senderID);
};

const allMessagesSent = async (req, res) => {
	console.log(all_messages, "all_messages");
	return res.json(all_messages);
};

const allMessagesByPhoneNumber = async (req, res) => {
	const { phone } = req.params;
	console.log(all_messages, "all_messages");
    const messages_sent = all_messages[`whatsapp:${phone}`]
	return res.json(messages_sent);
};

module.exports = {
	send_whatsapp_response,
	allMessagesSent,
    allMessagesByPhoneNumber
};
