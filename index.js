import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { useState } from "react";

const Showpanel = ({ prop }) => {
	if (prop[2]) {
		return <h1 className="text-5xl ">{prop[2]}</h1>;
	} else {
		return <h1 className="text-5xl ">{prop[0]}</h1>;
	}
};

const Numberbutton = (props) => {
	return (
		<button className="px-5 py-2.5 mr-2 mb-2" onClick={props.onClick}>
			{props.number}
		</button>
	);
};

const Operatorbutton = (props) => {
	return (
		<button
			className="text-orange-500 px-5 py-2.5 mr-2 mb-2"
			onClick={props.onClick}
		>
			{props.operator}
		</button>
	);
};

const App = () => {
	const [visual, setVisual] = useState([0]);
	const [equal, setEqual] = useState([]);
	const [aux, setAux] = useState([0]);
	const [firstOperator, setFirstoperator] = useState(0);
	const [decimal, setDecimal] = useState("");

	const reset = (e) => {
		if (e == "c") {
			setVisual([0]);
			setEqual([]);
			setAux([0]);
			setFirstoperator(0);
			setDecimal("");
		} else {
			setVisual([0]);
			setEqual([]);
			setAux([e]);
			setFirstoperator(0);
			setDecimal("");
		}
	};
	//arrow funtion to change visual value

	const addDecimal = (e) => {
		if (decimal == "") {
			setDecimal(decimal + e.toString());
		}
	};
	console.log(decimal);
	const changeVisual = (e) => {
		setVisual((previousNumber) => {
			if (previousNumber != 0) {
				let number = previousNumber.toString() + e.toString();
				return [number];
			} else {
				let number = e.toString();

				return [number];
			}
		});
	};
	//control whats happens when click a number
	const numbers = (e) => {
		if (equal[equal.length - 1] == "=") {
			setEqual([]);
			for (let i = 0; i <= aux.length; i++) {
				aux.pop();
			}
		}
		//when the number have more than one digits
		if (!isNaN(e) && !isNaN(aux[aux.length - 1])) {
			if (decimal[0] == ".") {
				let auxstring = decimal + e.toString();
				let split = auxstring.split(".");
				let decimals = 1;
				for (let i = 0; i < split[1].length; i++) {
					decimals = decimals * 10;
				}
				let setvar = aux.pop() + e / decimals;
				aux.push(setvar);
				setFirstoperator(setvar);

				console.log(split[1].length);
				setDecimal(auxstring);
			} else {
				let setvar = aux.pop() * 10 + e;

				aux.push(setvar);
				setFirstoperator(setvar);
			}
		} else {
			if (decimal[0] == ".") {
				let auxstring = decimal + e.toString();
				let split = auxstring.split(".");
				let decimals = 1;
				for (let i = 0; i < split[1].length; i++) {
					decimals = decimals * 10;
				}
				let setvar = aux.pop() + e / decimals;
				aux.push(setvar);
				setFirstoperator(setvar);

				console.log(split[1].length);
				setDecimal(auxstring);
			} else {
				//only one digit
				aux.push(e);
				setFirstoperator(e);
			}
		}
		changeVisual(e);
		setAux(aux);
	};

	console.log(aux);
	console.log(equal);

	const operators = (e) => {
		setDecimal("");
		if (equal[equal.length - 1] == "=") {
			console.log(e);
			setEqual((previousequal) => [...previousequal, e]);
		}

		//when the aux array has a three positions
		if (isNaN(aux[aux.length - 2]) && !isNaN(aux[aux.length - 3])) {
			let right = aux.pop();
			let operator = aux.pop();
			let left = aux.pop();

			console.log(equal);
			switch (operator) {
				case "+":
					aux.push(left + right);
					break;
				case "-":
					aux.push(left - right);
					break;
				case "x":
					aux.push(left * right);
					break;
				case "÷":
					aux.push(left / right);
					break;

				default:
					aux.push(0);
			}
			//setAux(aux);
		}

		changeVisual(e);

		setAux((previousOperator) => {
			if (!isNaN(aux[0]) && aux.length < 2) {
				console.log("un solo");
				return [...previousOperator, e];
			}
			if (aux[1] !== e && aux.length > 1) {
				console.log("un dos");
				aux.pop();
				return [...previousOperator, e];
			}
			if (aux[1] == e && aux.length > 1) {
				console.log("un tres");

				return [...previousOperator];
			}
		});
	};

	//arrow function to do the operation with the =
	const docalc = (e) => {
		//if exist left number , operator and right number
		if (isNaN(aux[aux.length - 2]) && !isNaN(aux[aux.length - 3])) {
			setEqual([firstOperator, "="]);
			operators(aux[aux.length - 2]);
			//if only exist left number and operator
		} else if (isNaN(aux[aux.length - 1]) && !isNaN(aux[aux.length - 2])) {
			setEqual([firstOperator, "="]);
			console.log(equal);
			aux.push(firstOperator);
			operators(aux[aux.length - 2]);
		}
	};

	const invert = () => {
		if (!isNaN(aux[aux.length - 1])) {
			setAux([aux[aux.length - 1] * -1]);
		}
	};

	const percent = () => {
		setAux([aux[0] / 100]);
	};

	return (
		<div className="grid content-center m-[100px]">
			<div className="bg-black rounded-lg max-w-[280px] max-h-[400px] mx-auto ">
				<div className="text-white text-right">
					<Showpanel prop={aux}></Showpanel>
					<h6 className="text-sm">{visual}</h6>
				</div>

				<div className="ml-3 mt-4 text-lg text-slate-100 grid grid-cols-4 gap-1 ">
					<Operatorbutton
						operator="c"
						onClick={() => reset("c")}
					></Operatorbutton>
					<Operatorbutton
						operator="+/-"
						onClick={() => invert()}
					></Operatorbutton>

					<Operatorbutton
						operator="%"
						onClick={() => percent()}
					></Operatorbutton>
					<Operatorbutton
						operator="÷"
						onClick={() => operators("÷")}
					></Operatorbutton>

					<Numberbutton
						number="7"
						onClick={() => numbers(7)}
					></Numberbutton>
					<Numberbutton
						number="8"
						onClick={() => numbers(8)}
					></Numberbutton>
					<Numberbutton
						number="9"
						onClick={() => numbers(9)}
					></Numberbutton>

					<Operatorbutton
						operator="x"
						onClick={() => operators("x")}
					></Operatorbutton>

					<Numberbutton
						number="4"
						onClick={() => numbers(4)}
					></Numberbutton>
					<Numberbutton
						number="5"
						onClick={() => numbers(5)}
					></Numberbutton>
					<Numberbutton
						number="6"
						onClick={() => numbers(6)}
					></Numberbutton>
					<Operatorbutton
						operator="-"
						onClick={() => operators("-")}
					></Operatorbutton>

					<Numberbutton
						number="1"
						onClick={() => numbers(1)}
					></Numberbutton>
					<Numberbutton
						number="2"
						onClick={() => numbers(2)}
					></Numberbutton>
					<Numberbutton
						number="3"
						onClick={() => numbers(3)}
					></Numberbutton>
					<Operatorbutton
						operator="+"
						onClick={() => operators("+")}
					></Operatorbutton>

					<Numberbutton
						number="0"
						onClick={() => numbers(0)}
					></Numberbutton>
					<button
						className="px-5 py-2.5 mr-2 mb-2"
						onClick={() => addDecimal(".")}
					>
						,
					</button>
					<button
						className="focus:outline-none text-white bg-orange-500 hover:bg-orange-400 focus:ring-4 focus:ring-orange-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-orange-900 col-span-2"
						onClick={() => docalc("=")}
					>
						=
					</button>
				</div>
				<br></br>
			</div>
		</div>
	);
};

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root"),
);
