const { APIError, STATUS_CODES } = require("../../utils/error/app-errors");
const { db } = require("../connection");

class UserRepository {
	async CreateUser({ email, name, password, id, date, salt }) {
		try {
			const user = await db.User.create({
				email,
				password,
				name,
				id,
				date,
				salt,
			});
			return user;
		} catch (e) {
			throw new APIError(
				"API Error",
				STATUS_CODES.INTERNAL_ERROR,
				`Error on creating customer ${e}`
			);
		}
	}

	async FindOneUser({ email }) {
		try {
			const user = await db.User.findOne({ where: { email: email } });
			return user;
		} catch (e) {
			throw new APIError(
				"API Error",
				STATUS_CODES.INTERNAL_ERROR,
				`Error on finding user ${e}`
			);
		}
	}

	async FindUserById({ id }) {
		try {
			const user = await db.User.findOne({
				where: { id: id },
				attributes: [
					"name",
					"email",
					"id",
					"date",
					"createdAt",
					"updatedAt",
				],
			});
			return user;
		} catch (e) {
			throw new APIError(
				"API Error",
				STATUS_CODES.INTERNAL_ERROR,
				`Error on finding user ${e}`
			);
		}
	}
}

module.exports = UserRepository;
