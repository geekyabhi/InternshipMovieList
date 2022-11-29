require("dotenv").config({ path: ".env" });
module.exports = {
	PORT: process.env.PORT,
	DBHOST: process.env.DBHOST,
	DBPASSWORD: process.env.DBPASSWORD,
	DBUSER: process.env.DBUSER,
	DBNAME: process.env.DBNAME,
	DBDIALECT: process.env.DBDIALECT,
	APP_SECRET: process.env.APP_SECRET,
};
