const tedious = require("tedious");
const { Sequelize } = require("sequelize");
const { DBNAME, DBPASSWORD, DBHOST, DBDIALECT } = require("../../config");
const { User, Movies } = require("../models");
const dbConfig = {
	userName: DBNAME,
	password: DBPASSWORD,
	host: DBHOST,
	dialect: DBDIALECT,
	dbName: DBNAME,
};

const db = {};

async function ensureDbExists(dbName) {
	return new Promise((resolve, reject) => {
		const connection = new tedious.Connection(dbConfig);
		connection.connect((err) => {
			if (err) {
				console.error(err);
				reject(`Connection Failed: ${err.message}`);
			}

			const createDbQuery = `IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = '${dbName}') CREATE DATABASE [${dbName}];`;
			const request = new tedious.Request(createDbQuery, (err) => {
				if (err) {
					console.error(err);
					reject(`Create DB Query Failed: ${err.message}`);
				}

				// query executed successfully
				resolve();
			});

			connection.execSql(request);
		});
	});
}

const ConnectDB = async () => {
	try {
		const { userName, password, dbName, dialect, host } = dbConfig;

		// await ensureDbExists(dbName);
		const sequelize = new Sequelize(dbName, userName, password, {
			host,
			dialect,
		});

		const userDB = User(sequelize);
		const moviesDB = Movies(sequelize);
		userDB.hasMany(moviesDB);
		db.User = userDB;
		db.Movies = moviesDB;

		await sequelize.sync({ alter: true });
	} catch (e) {
		throw Error(`Database cannot be connected ${e}`);
	}
};

module.exports = { ConnectDB, db };
