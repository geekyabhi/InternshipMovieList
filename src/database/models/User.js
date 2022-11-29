const { Sequelize } = require("sequelize");
module.exports = (sequelize) => {
	const User = sequelize.define("User", {
		name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		email: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false,
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		salt: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		id: {
			type: Sequelize.UUID,
			allowNull: false,
			primaryKey: true,
		},
		date: {
			type: Sequelize.DATE(6),
		},
	});

	return User;
};
