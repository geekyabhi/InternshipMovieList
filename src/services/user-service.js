const { UserRepository } = require("../database/repository");
const {
	FormateData,
	GeneratePassword,
	GenerateSalt,
	GenerateSignature,
	ValidatePassword,
	UniqueId,
} = require("../utils");
const { APIError, BadRequestError } = require("../utils/error/app-errors");

class UserService {
	constructor() {
		this.repository = new UserRepository();
	}
	async Register({ name, email, password }) {
		try {
			let salt = await GenerateSalt();
			const id = UniqueId();
			let userPassword = await GeneratePassword(password, salt);

			const customer = await this.repository.CreateUser({
				email,
				password: userPassword,
				name,
				id,
				date: Date.now(),
				salt,
			});

			const token = await GenerateSignature({
				email: email,
				id: customer.id,
			});

			return FormateData({
				id: customer.id,
				token,
				name: customer.name,
				email: customer.email,
			});
		} catch (e) {
			throw new APIError(e);
		}
	}

	async SignIn({ email, password }) {
		try {
			const existingCustomer = await this.repository.FindOneUser({
				email,
			});

			if (existingCustomer) {
				const validPassword = await ValidatePassword(
					password,
					existingCustomer.password,
					existingCustomer.salt
				);

				if (validPassword) {
					const token = await GenerateSignature({
						email: existingCustomer.email,
						id: existingCustomer.id,
					});
					return FormateData({
						id: existingCustomer.id,
						token,
						name: existingCustomer.name,
						email: existingCustomer.email,
					});
				} else {
					throw new BadRequestError("Wrong Password");
				}
			}
			return FormateData(null);
		} catch (e) {
			throw new APIError(e);
		}
	}

	async GetProfile({ id }) {
		try {
			const existingCustomer = await this.repository.FindUserById({
				id,
			});
			return FormateData(existingCustomer);
		} catch (e) {
			throw new APIError(e);
		}
	}
}

module.exports = UserService;
