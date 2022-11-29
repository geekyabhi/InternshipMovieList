import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { url } from "../../utilities";
import Loader from "../Loader";
import Message from "../Message";
import styles from "./style.module.css";
function Register() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(null);

	setTimeout(() => {
		setError(null);
		setSuccess(null);
	}, 3000);

	const submitRegister = async (e) => {
		e.preventDefault();
		try {
			let obj = { name, email, password };
			setLoading(true);
			const { data } = await axios.post(`${url}/user/register`, obj);
			setLoading(false);
			if (!data.success) setError(data.error);
			setSuccess("Successfully created");
			localStorage.setItem("movielistinfo", JSON.stringify(data.data));
		} catch (e) {
			console.log(e);
			setError("Error while creating User");
			setLoading(false);
		}
	};

	return (
		<div className={styles.wrapper}>
			<div className="mt-4">
				{success && (
					<Message variant={"success"}>Successfully created</Message>
				)}
				{error && <Message variant={"danger"}>{error}</Message>}
				<Form onSubmit={submitRegister}>
					<Form.Group controlId="formBasicName">
						<Form.Label>Username</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter Username"
							required
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter email"
							required
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Password"
							required
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
					</Form.Group>
					{loading ? (
						<Loader />
					) : (
						<Button
							type="submit"
							className={styles.btn}
							disabled={loading}
						>
							Signup
						</Button>
					)}
				</Form>
			</div>
		</div>
	);
}

export default Register;
