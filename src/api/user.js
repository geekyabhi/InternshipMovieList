const UserService = require("../services/user-service");

module.exports = (app) => {
	const service = new UserService();
	app.post("/user/register", async (req, res, next) => {
		try {
			const { name, email, password } = req.body;
			const { data } = await service.Register({
				name,
				email,
				password,
			});
			return res.json({ success: true, data });
		} catch (e) {
			next(e);
		}
	});

	app.post("/user/login", async (req, res, next) => {
		try {
			const { email, password } = req.body;
			const { data } = await service.SignIn({ email, password });
			return res.json({ success: true, data });
		} catch (e) {
			next(e);
		}
	});
};
