import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function Logout(props) {
	const navigate = useNavigate();

	const logoutHandler = () => {
		try {
			localStorage.removeItem("movielistinfo");
		} catch (e) {
			console.log(e);
		} finally {
			navigate("/login");
		}
	};

	return (
		<div>
			<Button variant="danger" onClick={logoutHandler}>
				Logout
			</Button>
		</div>
	);
}

export default Logout;
