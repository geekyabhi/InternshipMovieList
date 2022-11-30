import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { url } from "../../utilities";
import Loader from "../Loader";
import styles from "./style.module.css";
import Message from "../Message";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(null);

	const localData = localStorage.getItem("movielistinfo");
	const userInfo = localData ? JSON.parse(localData) : null;
	const navigate = useNavigate();

	useEffect(() => {
		if (userInfo) {
			navigate("/");
		}
		// eslint-disable-next-line
	}, [userInfo]);

	setTimeout(() => {
		setError(null);
		setSuccess(null);
	}, 3000);

	const submitLogin = async (e) => {
		try {
			e.preventDefault();
			let obj = {
				email,
				password,
			};
			setLoading(true);
			const { data } = await axios.post(`${url}/user/login`, obj);
			setLoading(false);
			if (!data.success) setError("Error while logging");
			setSuccess(true);
			localStorage.setItem("movielistinfo", JSON.stringify(data.data));
		} catch (er) {
			console.log(er);
			setLoading(false);
			setError("Error while logging");
		}
	};

	return (
		<div className={styles.wrapper}>
			<div className="mt-4">
				{success && (
					<Message variant={"success"}>Successfully Loggedin</Message>
				)}
				{error && <Message variant={"danger"}>{error}</Message>}
				<Form onSubmit={submitLogin}>
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
							Login
						</Button>
					)}
				</Form>

				<div className="mt-3">
					<p>
						Dont have an account ?{" "}
						<Link to="/register">Register</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Login;
