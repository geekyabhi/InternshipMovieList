const { Sequelize } = require("sequelize");
module.exports = (sequelize) => {
	const Movies = sequelize.define("Movies", {
		name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		rating: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		genre: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		cast: {
			type: Sequelize.STRING,
			allowNull: false,
			get() {
				return this.getDataValue("cast").split("#");
			},
			set(val) {
				this.setDataValue("cast", val.join("#"));
			},
		},
		relaseDate: {
			type: Sequelize.DATE(6),
		},
		user: {
			type: Sequelize.UUID,
			references: {
				model: "Users",
				key: "id",
			},
		},
	});

	return Movies;
};
