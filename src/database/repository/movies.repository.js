const { APIError, STATUS_CODES } = require("../../utils/error/app-errors");
const { db } = require("../connection");

class MovieRepository {
	async CreateMovie({ name, rating, genre, cast, releaseDate, user, id }) {
		try {
			console.log({ name, rating, genre, cast, releaseDate, user, id });

			const movie = await db.Movies.create({
				name,
				rating,
				id,
				genre,
				cast,
				releaseDate,
				user,
			});
			return movie;
		} catch (e) {
			throw new APIError(
				"API Error",
				STATUS_CODES.INTERNAL_ERROR,
				`Error on creating movies ${e}`
			);
		}
	}

	async UpdateMovies({ name, rating, genre, cast, releaseDate, user, id }) {
		try {
			// console.log({ name, rating, genre, cast, releaseDate, user, id });
			const existingMovie = await db.Movies.findOne({
				where: { id: id, user: user },
			});
			existingMovie.name = name;
			existingMovie.rating = rating;
			existingMovie.genre = genre;
			existingMovie.cast = cast;
			existingMovie.releaseDate = releaseDate;
			existingMovie.user = user;
			const movie = await existingMovie.save();
			return movie;
		} catch (e) {
			throw new APIError(
				"API Error",
				STATUS_CODES.INTERNAL_ERROR,
				`Error on updating movies ${e}`
			);
		}
	}

	async DeleteMovies({ id, user }) {
		try {
			const existingMovie = await db.Movies.findOne({
				where: { id: id, user: user },
			});
			await existingMovie.destroy();
			return { status: "Deleted" };
		} catch (e) {
			throw new APIError(
				"API Error",
				STATUS_CODES.INTERNAL_ERROR,
				`Error on deleting movies ${e}`
			);
		}
	}

	async FindAll(query) {
		try {
			const movies = await db.Movies.findAll({ where: query });
			return movies;
		} catch (e) {
			throw new APIError(
				"API Error",
				STATUS_CODES.INTERNAL_ERROR,
				`Error on finding movies ${e}`
			);
		}
	}
}

module.exports = MovieRepository;
