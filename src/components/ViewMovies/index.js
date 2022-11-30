import React from "react";
import Movie from "../Movie";
function ViewMovies(props) {
	return (
		<div>
			{props.movies.map((item) => (
				<Movie
					item={item}
					key={item.id}
					movies={props.movies}
					setMovies={props.setMovies}
				></Movie>
			))}
		</div>
	);
}

export default ViewMovies;
