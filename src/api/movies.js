const Auth = require("../middleware/auth");
const MovieService = require("../services/movie-service");
module.exports = (app) => {
	const service = new MovieService();
	app.post("/movies/", Auth, async (req, res, next) => {
		try {
			const user = req.user.id;
			const { name, rating, genre, cast, releaseDate } = req.body;
			const data = await service.CreateMovie({
				name,
				rating,
				genre,
				cast,
				releaseDate,
				user,
			});
			return res.json({ success: true, data });
		} catch (e) {
			next(e);
		}
	});

	app.get("/movies/", Auth, async (req, res, next) => {
		try {
			const userId = req.user.id;
			const data = await service.FindMovies({ userId });
			return res.json({ success: true, data });
		} catch (e) {
			next(e);
		}
	});

	app.put("/movies/:id", Auth, async (req, res, next) => {
		try {
			const { id } = req.params;
			const user = req.user.id;
			const { name, rating, genre, cast, releaseDate } = req.body;
			const data = await service.UpdateMovie({
				name,
				rating,
				genre,
				cast,
				releaseDate,
				id,
				user,
			});
			return res.json({ success: true, data });
		} catch (e) {
			next(e);
		}
	});

	app.delete("/movies/:id", Auth, async (req, res, next) => {
		try {
			const { id } = req.params;
			const user = req.user.id;
			const data = await service.DeleteMovie({ id, user });
			return res.json({ success: true, data });
		} catch (e) {
			next(e);
		}
	});
};
