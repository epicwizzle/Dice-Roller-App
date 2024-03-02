/**
 * This is a simple dice roller app. It allows the user to roll multiple dice at once.
 * The user can add or remove dice, increase or decrease the number of sides on each die, and roll all dice at once.
 * The app uses React hooks to manage state and update the UI.
 * The app is limited to a maximum of 6 dice, and each die can have between 1 and 20 sides.
 * The app uses SVG to display the dice values, and the UI is styled with Bootstrap.
 * The app is rendered in the "root" div in the HTML file.
 *
 * StAuth10244: I Esenwa Michael, 000876059 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
 * @author Esenwa Michael
 * @version 1.0
 * @since 2024-03-02
 */

const { useState } = React; // Import the useState hook from the React library
/**
 * This component represents a single die. It takes two props: value and diceSides.
 * @param { number } value - The current value of the die.
 * @param { number } diceSides - The number of sides on the die.
 */
const Dice = ({ value, diceSides }) => {};
/**
 * This component allows the user to add or remove dice, increase or decrease the number of sides on each die, and roll all dice at once.
 * @returns { JSX.Element } - The UI of the app.
 */
const AddDice = () => {
	const [diceList, setDiceList] = useState([
		<Dice key={0} value={1} diceSides={6} />,
	]);
	const [count, setCount] = useState(1);

	const MAX_DICE = 6; // Maximum number of dice allowed. Change this value to allow more dice.
	/**
	 * This function adds a new die to the list of dice.
	 */
	const addDice = () => {
		if (diceList.length < MAX_DICE) {
			const newDice = <Dice key={diceList.length} value={1} diceSides={6} />;
			setDiceList(diceList.map((dice) => dice).concat(newDice));
			setCount(count + 1);
		}
	};
	/**
	 * This function removes the last die from the list of dice.
	 */
	const removeDice = () => {
		if (diceList.length > 1) {
			setDiceList(diceList.slice(0, diceList.length - 1));
			setCount(count - 1);
		}
	};
	/**
	 * This function increases the value of a die by 1, or resets it to 1 if it is already at the maximum value.
	 * @param {number} index - The index of the die to increase the value of.
	 */

	const increaseValue = (index) => {
		setDiceList(
			diceList.map((dice, i) => {
				if (i === index) {
					if (dice.props.value < dice.props.diceSides) {
						return (
							<Dice
								key={i}
								value={dice.props.value + 1}
								diceSides={dice.props.diceSides}
							/>
						);
					} else {
						return <Dice key={i} value={1} diceSides={dice.props.diceSides} />;
					}
				}
				return dice;
			})
		);
	};
	/**
	 * This function rolls all the dice and updates their values.
	 */
	const rollAll = () => {
		const rolledValues = diceList.map(
			(dice) => Math.floor(Math.random() * dice.props.diceSides) + 1
		);
		setDiceList(
			diceList.map((dice, index) => {
				return (
					<Dice
						key={index}
						value={rolledValues[index]}
						diceSides={dice.props.diceSides}
					/>
				);
			})
		);
	};
	/**
	 * This function resets the dice to their initial state.
	 */
	const reset = () => {
		setDiceList([<Dice key={0} value={1} diceSides={6} />]);
		setCount(1);
	};
	/**
	 * This function increases the number of sides on a die by 1, or resets it to 1 if it is already at the maximum value.
	 * @param {number} index - The index of the die to increase the number of sides of.
	 */
	const increaseSides = (index) => {
		setDiceList(
			diceList.map((dice, i) => {
				if (i === index) {
					if (dice.props.diceSides < 20) {
						return (
							<Dice
								key={i}
								value={dice.props.value}
								diceSides={dice.props.diceSides + 1}
							/>
						);
					}
				}
				return dice;
			})
		);
	};
	/**
	 * This function decreases the number of sides on a die by 1, or resets it to 1 if it is already at the minimum value.
	 * @param {number} index - The index of the die to decrease the number of sides of.
	 */
	const decreaseSides = (index) => {
		setDiceList(
			diceList.map((dice, i) => {
				if (i === index) {
					if (dice.props.diceSides > 1) {
						return (
							<Dice
								key={i}
								value={dice.props.value}
								diceSides={dice.props.diceSides - 1}
							/>
						);
					}
				}
				return dice;
			})
		);
	};
	/**
	 * This function returns the SVG representation of a dice.
	 * @param {Dice} dice - The dice to be displayed
	 * @returns - The SVG representation of the dice
	 */
	const svg = (dice) => {
		return (
			<svg
				style={{ backgroundColor: "black" }}
				width="100%"
				height="auto"
				margin="auto"
				viewBox="0 0 50 50"
			>
				<text
					x="50%"
					y="50%"
					fontSize="30"
					textAnchor="middle"
					alignmentBaseline="middle"
					fill="white"
				>
					{dice.props.value}
				</text>
			</svg>
		);
	};

	return (
		<div className="container">
			<h2 className="btn " onClick={addDice} style={{ color: "white" }}>
				Number of Dice: <span>{count}</span>
			</h2>
			<button className="btn btn-warning mb-3" onClick={reset}>
				Reset
			</button>
			<div className="card-group">
				{diceList.map((dice, index) => {
					return (
						<div key={index} className="card">
							<h3 className="card-header">Dice {index + 1}</h3>
							<div className="card-body">
								<button className="btn " onClick={() => increaseValue(index)}>
									{svg(dice)}
								</button>
								<p className="card-text mb-2">
									Sides: <span>{dice.props.diceSides}</span>
								</p>
								<button
									className="btn btn-secondary"
									onClick={() => increaseSides(index)}
								>
									+
								</button>
								<button
									className="btn btn-secondary"
									onClick={() => decreaseSides(index)}
								>
									-
								</button>
							</div>
						</div>
					);
				})}
			</div>
			<div className="btn-group mt-2">
				<button className="btn btn-danger" onClick={removeDice}>
					Remove Dice
				</button>
				<button className="btn btn-success" onClick={rollAll}>
					Roll All
				</button>
			</div>
		</div>
	);
};

ReactDOM.render(<AddDice />, document.getElementById("root"));
