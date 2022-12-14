const express = require("express");
const cors = require("cors");
const { user, movies } = require("./api");
const ErrorHandler = require("./utils/error/error-handler");
const morganMiddleware = require("./middleware/morgan");
module.exports = async (app, channel) => {
	app.use(morganMiddleware);
	app.use(express.json({ limit: "1mb" }));
	app.use(express.urlencoded({ extended: true, limit: "1mb" }));
	app.use(cors());

	user(app);
	movies(app);

	app.use("/status", (req, res, next) => {
		res.send("Customer service running properly");
	});

	app.use(ErrorHandler);
};
