import axios from "axios";
import React, { useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import style from "./style.module.css";
import { url } from "../../utilities";
import Message from "../Message";
import Logout from "../Logout";
function CreateMovie({ movies, setMovies }) {
	const [name, setName] = useState("");
	const [genre, setGenre] = useState("");
	const [rating, setRating] = useState("");
	const [releaseDate, setReleaseDate] = useState("");
	const [cast, setCast] = useState("");
	const [loading, setLoading] = useState(null);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState("");

	const localData = localStorage.getItem("movielistinfo");
	const userInfo = localData ? JSON.parse(localData) : null;

	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userInfo.token}`,
		},
	};

	const m = [...movies];

	setTimeout(() => {
		setError(null);
		setSuccess(null);
	}, 3000);

	const submitCreate = async (e) => {
		try {
			e.preventDefault();
			let body = {
				name,
				genre,
				rating,
				cast: cast.split(","),
				releaseDate,
			};
			if (!(name && genre && rating && cast && releaseDate)) {
				setError("Empty Fields");
				return;
			}
			setLoading(true);
			const { data } = await axios.post(`${url}/movies`, body, config);
			m.push(data.data.data);
			setMovies(m);
			setLoading(false);
			setSuccess(true);
		} catch (err) {
			console.log(err);
			setError("Error while creating movie");
			setLoading(false);
		}
	};

	return (
		<>
			<div className={style.wrap}>
				{success && (
					<Message variant={"success"}>Successfully created</Message>
				)}
				{error && <Message variant={"danger"}>{error}</Message>}
				<Form>
					<Form.Group
						as={Row}
						className="mb-3"
						controlId="formPlaintextPassword"
					>
						<Form.Label column sm="2">
							Name
						</Form.Label>
						<Col sm="10">
							<Form.Control
								type="text"
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
								type="text"
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
							Cast
						</Form.Label>
						<Col sm="10">
							<Form.Control
								type="text"
								value={cast}
								onChange={(e) => {
									setCast(e.target.value);
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
					variant="success"
					size="sm"
					onClick={submitCreate}
					disabled={loading}
				>
					Create
				</Button>{" "}
			</div>
			<Logout></Logout>
		</>
	);
}

export default CreateMovie;
