import CreateMovie from "../CreateMovie";
import ViewMovies from "../ViewMovies";
import style from "./style.module.css";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { url } from "../../utilities";

function Home() {
	const [movies, setMovies] = useState([]);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const localData = localStorage.getItem("movielistinfo");
	const userInfo = localData ? JSON.parse(localData) : null;

	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userInfo.token}`,
		},
	};

	const loadList = async () => {
		try {
			setLoading(true);
			const { data } = await axios.get(`${url}/movies`, config);
			setLoading(false);
			console.log(data.data.data);
			setMovies(data.data.data);
		} catch (e) {
			setError("Error while loading list");
			setLoading(false);
		}
	};

	useEffect(() => {
		loadList();
	}, []);

	return (
		<div className={style.box}>
			<div className={style.left}>
				<ViewMovies movies={movies} setMovies={setMovies}></ViewMovies>{" "}
			</div>
			<div className={style.right}>
				<CreateMovie></CreateMovie>
			</div>
		</div>
	);
}

export default Home;
