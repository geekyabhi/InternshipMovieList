import CreateMovie from "../CreateMovie";
import ViewMovies from "../ViewMovies";
import style from "./style.module.css";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { url } from "../../utilities";
import { useNavigate } from "react-router-dom";

function Home() {
	const [movies, setMovies] = useState([]);

	const [, setLoading] = useState(false);
	const [, setError] = useState("");

	const localData = localStorage.getItem("movielistinfo");
	const userInfo = localData ? JSON.parse(localData) : null;

	const navigate = useNavigate();

	const loadList = async () => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${userInfo.token}`,
				},
			};
			setLoading(true);
			const { data } = await axios.get(`${url}/movies`, config);
			setLoading(false);
			setMovies(data.data.data);
		} catch (e) {
			setError("Error while loading list");
			setLoading(false);
		}
	};

	useEffect(() => {
		if (!userInfo) {
			navigate("/login");
		}
		loadList();
	}, [userInfo]);

	return (
		userInfo && (
			<div className={style.box}>
				<div className={style.left}>
					<ViewMovies
						movies={movies}
						setMovies={setMovies}
					></ViewMovies>{" "}
				</div>
				<div className={style.right}>
					<CreateMovie
						movies={movies}
						setMovies={setMovies}
					></CreateMovie>
				</div>
			</div>
		)
	);
}

export default Home;
