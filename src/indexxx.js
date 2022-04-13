import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { useState, useEffect } from "react";
import Post from "./Post";

const useFruit = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const totalValue = () => {
		const total = good + neutral + bad;
		if (total === 0) return 0;
		return (good + bad * -1) / total;
	};

	const positivePercent = () => {
		const total = good + neutral + bad;
		if (total === 0) return 0;
		return (good / total) * 100;
	};

	return {
		good: good,
		neutral,
		bad,
		total: good + neutral + bad,
		totalValue: totalValue(),
		positivePercent: positivePercent(),
		increaseGood: () => setGood(good + 1),
		increaseNeutral: () => setNeutral(neutral + 1),
		increaseBad: () => setBad(bad + 1),
	};
};

const useTheme = () => {
	const [theme, setTheme] = useState("light");

	useEffect(() => {
		if (theme === "dark") document.body.classList.add("dark");
		else document.body.classList.remove("dark");

		localStorage.setItem("theme", theme);
	}, [theme]);

	return [theme, setTheme];
};

const App = () => {
	const {
		good,
		neutral,
		bad,
		total,
		totalValue,
		positivePercent,
		increaseGood,
		increaseNeutral,
		increaseBad,
	} = useFruit();

	const [theme, setTheme] = useTheme();

	return (
		<div className="fixed left-96">
			<button
				className="bg-blue-700 dark:bg-blue-300 text-black dark:text-white font-bold py-2 px-4 rounded"
				onClick={() => setTheme(theme === "light" ? "dark" : "light")}
			>
				{theme === "light" ? "Dark" : "Light"}
			</button>
			<h1 className="text-xl">Estadisticas retroalimentativas</h1>
			<br></br>

			<h3>Post</h3>

			<Post />

			<br></br>
			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				onClick={increaseGood}
			>
				Good
			</button>
			<button
				className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
				onClick={increaseNeutral}
			>
				Neutral
			</button>
			<button
				className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
				onClick={increaseBad}
			>
				Bad
			</button>
			<br></br>
			<br></br>
			<h1 className="text-2xl">Estadisticas</h1>
			<p className="text-xl text-blue-500">Good: {good}</p>
			<p className="text-xl text-orange-500">Neutral: {neutral}</p>
			<p className="text-xl text-red-500">Bad: {bad}</p>
			<p className="text-xl font-bold">All: {total}</p>
			<p className="text-xl text-orange-500">Average: {totalValue}</p>
			<p className="text-xl text-orange-500">
				Positive: {positivePercent}
			</p>
		</div>
	);
};

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root"),
);
