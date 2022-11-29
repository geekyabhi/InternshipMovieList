const { MovieRepository } = require("../database/repository");
const { FormateData } = require("../utils");
const { APIError } = require("../utils/error/app-errors");

class MovieService {
	constructor() {
		this.repository = new MovieRepository();
	}

	async CreateMovie({ name, rating, genre, cast, relaseDate, user }) {
		try {
			const id = uuidv4();

			const movie = await this.repository.CreateMovie({
				id,
				name,
				rating,
				genre,
				cast,
				relaseDate,
				user,
			});
			return FormateData(movie);
		} catch (e) {
			throw new APIError(e);
		}
	}

	async FindMovies({ userId }) {
		try {
			const movies = await this.repository.FindAll({ userId });
			return FormateData(movies);
		} catch (e) {
			throw new APIError(e);
		}
	}
}

module.exports = MovieService;
