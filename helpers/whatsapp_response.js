var accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
var authToken = process.env.TWILIO_AUTH_TOKEN; // Your Auth Token from www.twilio.com/console
const fs = require("fs");
const users_messages = require("../user_messages.json");

const client = require("twilio")(accountSid, authToken, {
	lazyLoading: true,
});

// Function to send message to WhatsApp
const sendMessage = async (message, senderID) => {
	try {
		await client.messages.create({
			to: senderID,
			body: message,
			from: `whatsapp:+14155238886`,
		});
	} catch (error) {
		console.log(`Error at sendMessage --> ${error}`);
	}
};

const saveUsersResponse = async (message, senderNumber) => {
    console.log(message, "message", senderNumber, "senderNumber")
	if (users_messages[senderNumber]) {
		const messages_index = Object.keys(users_messages[senderNumber]);

		const last_entry_message_number = Number(messages_index.pop());
		const next_message_index = last_entry_message_number + 1;

		users_messages[senderNumber][next_message_index] = message;
		await writeMessageToJSON(users_messages);
        return
	}
	users_messages[senderNumber] = {};
	users_messages[senderNumber]["1"] = message;
    await writeMessageToJSON(users_messages);
	return;
};

const writeMessageToJSON = (updatedJSON) => {
	fs.writeFile("./../user_messages.json", JSON.stringify(updatedJSON), function writeJSON(err) {
		if (err) return console.log(err);
		console.log(JSON.stringify(updatedJSON));
	});
};

console.log(saveUsersResponse("Going places baby", "whatsapp:+2348148882785"));

module.exports = {
	sendMessage,
	saveUsersResponse,
};
