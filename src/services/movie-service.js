const { MovieRepository } = require("../database/repository");
const { FormateData, UniqueId } = require("../utils");
const { APIError } = require("../utils/error/app-errors");

class MovieService {
	constructor() {
		this.repository = new MovieRepository();
	}

	async CreateMovie({ name, rating, genre, cast, releaseDate, user }) {
		try {
			const id = UniqueId();
			const movie = await this.repository.CreateMovie({
				id,
				name,
				rating,
				genre,
				cast,
				releaseDate,
				user,
			});
			return FormateData(movie);
		} catch (e) {
			throw new APIError(e);
		}
	}

	async FindMovies({ userId }) {
		try {
			const movies = await this.repository.FindAll({ user: userId });
			return FormateData(movies);
		} catch (e) {
			throw new APIError(e);
		}
	}

	async UpdateMovie({ name, rating, genre, cast, releaseDate, id, user }) {
		try {
			const movie = await this.repository.UpdateMovies({
				name,
				rating,
				genre,
				cast,
				releaseDate,
				id,
				user,
			});

			return FormateData(movie);
		} catch (e) {
			throw new APIError(e);
		}
	}

	async DeleteMovie({ id, user }) {
		try {
			const data = await this.repository.DeleteMovies({ id, user });
			return FormateData(data);
		} catch (e) {
			throw new APIError(e);
		}
	}
}

module.exports = MovieService;
