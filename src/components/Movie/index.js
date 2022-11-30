import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import style from "./style.module.css";
import { url } from "../../utilities";

function Movie({ item, movies, setMovies }) {
	const [name, setName] = useState(item.name);
	const [genre, setGenre] = useState(item.genre);
	const [rating, setRating] = useState(item.rating);
	const [releaseDate, setReleaseDate] = useState(
		moment(item.releaseDate).format("YYYY-MM-DD")
	);
	const [cast, setCast] = useState(item.cast);
	const [loading, setLoading] = useState(null);

	const localData = localStorage.getItem("movielistinfo");
	const userInfo = localData ? JSON.parse(localData) : null;

	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userInfo.token}`,
		},
	};

	const changeCast = (e) => {
		e.preventDefault();
		const name = e.target.value;
		const arr = name?.split(",");
		const newCast = arr.filter((a) => {
			return a.length > 0;
		});
		setCast(newCast);
	};

	const submitUpdate = async (e) => {
		try {
			e.preventDefault();
			let body = {
				name,
				genre,
				rating,
				cast,
				releaseDate,
			};
			setLoading(true);
			const data = await axios.put(
				`${url}/movies/${item.id}`,
				body,
				config
			);
			setLoading(false);
		} catch (err) {
			setLoading(false);
		}
	};

	const submitDelete = async () => {
		try {
			setLoading(true);
			await axios.delete(`${url}/movies/${item.id}`, config);
			setLoading(false);
			movies = movies.filter((mov) => {
				return mov.id !== item.id;
			});
			setMovies(movies);
		} catch (err) {
			setLoading(false);
		}
	};

	return (
		<div className={style.wrap}>
			<Form>
				<Form.Group
					as={Row}
					className="mb-3"
					controlId="formPlaintextEmail"
				>
					<Form.Label column sm="2">
						Name
					</Form.Label>
					<Col sm="10">
						<Form.Control
							plaintext
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
						/>
					</Col>
				</Form.Group>

				<Form.Group
					as={Row}
					className="mb-3"
					controlId="formPlaintextPassword"
				>
					<Form.Label column sm="2">
						Genre
					</Form.Label>
					<Col sm="10">
						<Form.Control
							plaintext
							value={genre}
							onChange={(e) => {
								setGenre(e.target.value);
							}}
						/>
					</Col>
				</Form.Group>

				<Form.Group
					as={Row}
					className="mb-3"
					controlId="formPlaintextPassword"
				>
					<Form.Label column sm="2">
						Rating
					</Form.Label>
					<Col sm="10">
						<Form.Control
							type="number"
							value={rating}
							onChange={(e) => {
								setRating(e.target.value);
							}}
						/>
					</Col>
				</Form.Group>

				<Form.Group
					as={Row}
					className="mb-3"
					controlId="formPlaintextPassword"
				>
					<Form.Label column sm="2">
						Cast
					</Form.Label>
					<Col sm="10">
						<Form.Control
							type="text"
							value={cast.join(",")}
							onChange={(e) => {
								changeCast(e);
							}}
						/>
					</Col>
				</Form.Group>

				<Form.Group
					as={Row}
					className="mb-3"
					controlId="formPlaintextPassword"
				>
					<Form.Label column sm="2">
						Release Date
					</Form.Label>
					<Col sm="10">
						<Form.Control
							type="date"
							value={releaseDate}
							onChange={(e) => {
								setReleaseDate(e.target.value);
							}}
						/>
					</Col>
				</Form.Group>
			</Form>
			<Button
				variant="primary"
				size="sm"
				onClick={submitUpdate}
				disabled={loading}
			>
				Update
			</Button>{" "}
			<Button
				variant="danger"
				size="sm"
				active
				onClick={submitDelete}
				disabled={loading}
			>
				Delete
			</Button>
		</div>
	);
}

export default Movie;
