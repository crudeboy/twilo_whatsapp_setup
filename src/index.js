const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const appRoutes = require('./twilo/routes')

// Start the webapp
const webApp = express();

// Server Port
const PORT = process.env.PORT;

// Webapp settings
webApp.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
webApp.use(bodyParser.json());



// Home route
webApp.get("/", (req, res) => {
	res.send(`Hello World.!`);
});

webApp.use('/', appRoutes)

// Start the server
webApp.listen(PORT, () => {
	console.log(`Server is up and running at ${PORT}`);
});
